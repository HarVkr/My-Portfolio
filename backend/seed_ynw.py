#!/usr/bin/env python3
"""Seed the YOUR NEXT WATCH film catalog into MongoDB (idempotent, keyed by reel+order).
Run once: python3 /app/backend/seed_ynw.py — later content edits live in the DB."""

import os
from pathlib import Path
from dotenv import load_dotenv
from pymongo import MongoClient

load_dotenv(Path(__file__).parent / ".env")

FRAMES = [
    # REEL A — THE BUILDS
    {"reel": "a", "order": 1, "tag": "CHAPTER 01", "title": "THE BUILDS",
     "desc": "High-impact engineering systems and full-stack architecture.",
     "renderer": "title-card", "links": {}},
    {"reel": "a", "order": 2, "tag": "FEATURED BUILD", "title": "REVIFY",
     "desc": "B2C AI analytics trust layer with personalized feature sentiment & custom scoring.",
     "renderer": "revify",
     "links": {"github": "https://github.com", "live": "https://revify-ai.vercel.app"}},
    {"reel": "a", "order": 3, "tag": "BUILD", "title": "EMFLOW",
     "desc": "Centralized workforce workflow, task delegation & operational ticketing.",
     "renderer": "emflow",
     "links": {"github": "https://github.com", "live": "https://emflow-app.vercel.app"}},
    {"reel": "a", "order": 4, "tag": "BUILD", "title": "RAG ASSISTANT",
     "desc": "Retrieval-augmented generation engine with hybrid search, pgvector, and Gemini.",
     "renderer": "rag", "links": {"github": "https://github.com/HarVkr/jiopay-rag-chatbot"}},
    # REEL B — THE THINKING
    {"reel": "b", "order": 1, "tag": "CHAPTER 02", "title": "THE THINKING",
     "desc": "Product strategy teardowns, market insights and UX.",
     "renderer": "title-card", "links": {}},
    {"reel": "b", "order": 2, "tag": "FEATURED CASE STUDY", "title": "SWIGGY\nPRODUCT TEARDOWN",
     "desc": "Hyperlocal UX friction, cart abandonment and retention loops.",
     "renderer": "swiggy", "links": {}},
    {"reel": "b", "order": 3, "tag": "CASE STUDY", "title": "REVIFY\nPRD",
     "desc": "Product requirements, Akash persona, and weighted sentiment scoring.",
     "renderer": "revify-prd", "links": {}},
    {"reel": "b", "order": 4, "tag": "HYPERVERGE CASE STUDY", "title": "BHARATSAATHI",
     "desc": "Simplifying Digital KYC for Bharat using AI — voice-first guidance, offline-friendly hybrid OCR.",
     "renderer": "bharatsaathi", "links": {"doc": "https://drive.google.com/file/d/18QIjkYB5ZfamfvYVMiEBNywS8D1Vq7Hn/view?usp=sharing"}},
]


def main():
    client = MongoClient(os.environ["MONGO_URL"])
    db = client[os.environ["DB_NAME"]]
    for frame in FRAMES:
        db.ynw_frames.update_one(
            {"reel": frame["reel"], "order": frame["order"]},
            {"$set": frame},
            upsert=True,
        )
    print(f"Seeded {len(FRAMES)} film frames across 2 reels.")


if __name__ == "__main__":
    main()
