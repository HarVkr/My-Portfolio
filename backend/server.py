from fastapi import FastAPI, APIRouter
from dotenv import load_dotenv
from starlette.middleware.cors import CORSMiddleware
from motor.motor_asyncio import AsyncIOMotorClient
import os
import logging
from pathlib import Path
from pydantic import BaseModel, Field, ConfigDict
from typing import List
import uuid
from datetime import datetime, timezone


ROOT_DIR = Path(__file__).parent
load_dotenv(ROOT_DIR / '.env')

# MongoDB connection
mongo_url = os.environ['MONGO_URL']
client = AsyncIOMotorClient(mongo_url)
db = client[os.environ['DB_NAME']]

# Create the main app without a prefix
app = FastAPI()

# Create a router with the /api prefix
api_router = APIRouter(prefix="/api")


# Define Models
class StatusCheck(BaseModel):
    model_config = ConfigDict(extra="ignore")  # Ignore MongoDB's _id field
    
    id: str = Field(default_factory=lambda: str(uuid.uuid4()))
    client_name: str
    timestamp: datetime = Field(default_factory=lambda: datetime.now(timezone.utc))

class StatusCheckCreate(BaseModel):
    client_name: str

# Add your routes to the router instead of directly to app
@api_router.get("/")
async def root():
    return {"message": "Hello World"}

@api_router.post("/status", response_model=StatusCheck)
async def create_status_check(input: StatusCheckCreate):
    status_dict = input.model_dump()
    status_obj = StatusCheck(**status_dict)
    
    # Convert to dict and serialize datetime to ISO string for MongoDB
    doc = status_obj.model_dump()
    doc['timestamp'] = doc['timestamp'].isoformat()
    
    _ = await db.status_checks.insert_one(doc)
    return status_obj

@api_router.get("/status", response_model=List[StatusCheck])
async def get_status_checks():
    # Exclude MongoDB's _id field from the query results
    status_checks = await db.status_checks.find({}, {"_id": 0}).to_list(1000)
    
    # Convert ISO string timestamps back to datetime objects
    for check in status_checks:
        if isinstance(check['timestamp'], str):
            check['timestamp'] = datetime.fromisoformat(check['timestamp'])
    
    return status_checks

YNW_REEL_NAMES = {"a": "THE BUILDS", "b": "THE THINKING"}


@api_router.get("/ynw/reels")
async def get_ynw_reels():
    """Film-roll catalog for the YOUR NEXT WATCH section (frames grouped by reel)."""
    frames = await db.ynw_frames.find({}, {"_id": 0}).sort([("reel", 1), ("order", 1)]).to_list(100)
    reels = []
    for key in ("a", "b"):
        reel_frames = [f for f in frames if f.get("reel") == key]
        if reel_frames:
            reels.append({"key": key, "name": YNW_REEL_NAMES[key], "frames": reel_frames})
    return {"reels": reels}

@api_router.get("/toolkit")
async def get_toolkit():
    """THE TOOLKIT section content (sections + programming languages)."""
    sections = await db.toolkit_sections.find({}, {"_id": 0}).sort([("order", 1)]).to_list(50)
    languages_doc = await db.toolkit_meta.find_one({"key": "languages"}, {"_id": 0})
    languages = (languages_doc or {}).get(
        "items", ["C", "C++", "Java", "JavaScript", "Python"]
    )
    return {"sections": sections, "languages": languages}

@api_router.get("/filmography")
async def get_filmography():
    """THE FILMOGRAPHY experience chapters."""
    chapters = await db.filmography_chapters.find({}, {"_id": 0}).sort([("order", 1)]).to_list(20)
    return {"chapters": chapters}

@api_router.get("/offscript")
async def get_offscript():
    """OFF-SCRIPT post-credit scenes (personal interests)."""
    scenes = await db.offscript_scenes.find({}, {"_id": 0}).sort([("order", 1)]).to_list(20)
    return {"scenes": scenes}

# Include the router in the main app
app.include_router(api_router)

app.add_middleware(
    CORSMiddleware,
    allow_credentials=True,
    allow_origins=os.environ.get('CORS_ORIGINS', '*').split(','),
    allow_methods=["*"],
    allow_headers=["*"],
)

# Configure logging
logging.basicConfig(
    level=logging.INFO,
    format='%(asctime)s - %(name)s - %(levelname)s - %(message)s'
)
logger = logging.getLogger(__name__)

@app.on_event("shutdown")
async def shutdown_db_client():
    client.close()