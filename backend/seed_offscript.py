#!/usr/bin/env python3
"""Seed OFF-SCRIPT post-credit scene content into MongoDB (idempotent, keyed by key).
Run once: python3 /app/backend/seed_offscript.py — later content edits live in the DB."""

import os
from pathlib import Path
from dotenv import load_dotenv
from pymongo import MongoClient

load_dotenv(Path(__file__).parent / ".env")

SCENES = [
    {
        "key": "movies",
        "order": 1,
        "tag": "SCENE 01",
        "title": "STILL WATCHING?",
        "text": "You made it to the post-credits — so yes, the streaming-platform act was intentional. Films and shows are how I refill: every genre, every era, plot twists welcome.",
        "stills": [],
    },
    {
        "key": "music",
        "order": 2,
        "tag": "SCENE 02",
        "title": "THE UNTRAINED VOICE",
        "text": "No formal training — just a mic, a keyboard and the nerve to use them. I sing for the love of it, and the stage has been kind so far.",
        "stills": [
            {"src": "/offscript/stills/sing-1.png", "alt": "Singing performance still", "caption": "The performance"},
            {"src": "/offscript/stills/keys-1.png", "alt": "Playing the keyboard", "caption": "At the keys"},
        ],
    },
    {
        "key": "editing",
        "order": 3,
        "tag": "SCENE 03",
        "title": "CUT TO: EVERYTHING",
        "text": "My first creative instrument was a timeline. I edit for rhythm, pacing and payoff — and cut whatever doesn't serve the story.",
        "stills": [],
    },
    {
        "key": "acting",
        "order": 4,
        "tag": "SCENE 04",
        "title": "TWO YEARS ON STAGE",
        "text": "Theatre for two years taught me presence, timing and how to hold a room. I still take the occasional act — the curtain hasn't fallen yet.",
        "stills": [],
    },
]


def main():
    client = MongoClient(os.environ["MONGO_URL"])
    db = client[os.environ["DB_NAME"]]
    for scene in SCENES:
        db.offscript_scenes.update_one({"key": scene["key"]}, {"$set": scene}, upsert=True)
    print(
        f"Seeded {len(SCENES)} off-script scenes "
        f"({db.offscript_scenes.count_documents({})} total)."
    )
    client.close()


if __name__ == "__main__":
    main()
