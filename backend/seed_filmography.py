#!/usr/bin/env python3
"""Seed THE FILMOGRAPHY chapter content into MongoDB (idempotent, keyed by order).
Run once: python3 /app/backend/seed_filmography.py — later content edits live in the DB."""

import os
from pathlib import Path
from dotenv import load_dotenv
from pymongo import MongoClient

load_dotenv(Path(__file__).parent / ".env")

CHAPTERS = [
    {
        "key": "spit",
        "order": 1,
        "label": "01 / THE FOUNDATION",
        "title": "THE FOUNDATION",
        "org": "Sardar Patel Institute of Technology",
        "role": "B.Tech — Computer Engineering",
        "duration": "2022 — 2026",
        "desc": "Where curiosity became a craft. Four years of exploring technology, solving problems, building things, and developing the foundation to turn ideas into reality.",
        "image": "/filmography/chapter-spit.jpg",
        "logo": "/filmography/logos/spit.png",
        "logoAlt": "SPIT logo",
        "detail": {
            "overview": "Where curiosity became a craft. Four years of exploring technology, solving problems, building things, and developing the foundation to turn ideas into reality.",
            "meta": [
                {"k": "Institution", "v": "Sardar Patel Institute of Technology"},
                {"k": "Qualification", "v": "B.Tech — Computer Engineering"},
                {"k": "Period", "v": "Nov 2022 — Aug 2026"},
            ],
            "metrics": [],
            "highlights": [],
        },
    },
    {
        "key": "spjimr",
        "order": 2,
        "label": "02 / THE BUILDER'S CUT",
        "title": "THE BUILDER'S CUT",
        "org": "SPJIMR",
        "role": "Software Development Intern",
        "duration": "Nov 2024 — Mar 2025",
        "desc": "Helped shape NovaScholar, an AI-powered learning platform, from feature definition to pilot deployment. Partnered with faculty to ship 7+ features across classroom workflows and tested the experience with 20+ students, turning feedback and engagement insights into product improvements.",
        "image": "/filmography/chapter-spjimr.jpg",
        "logo": "/filmography/logos/spjimr.png",
        "logoAlt": "SPJIMR logo",
        "detail": {
            "overview": "NovaScholar is an AI-powered learning platform built with SPJIMR faculty. I owned features from definition to pilot deployment — translating classroom needs into product, and feedback into iterations.",
            "meta": [
                {"k": "Organisation", "v": "SPJIMR"},
                {"k": "Role", "v": "Software Development Intern"},
                {"k": "Project", "v": "NovaScholar"},
                {"k": "Period", "v": "Nov 2024 — Mar 2025"},
            ],
            "metrics": [
                {"value": "7+", "label": "Features shipped", "note": "across classroom workflows"},
                {"value": "20+", "label": "Pilot students", "note": "discovery through launch"},
                {"value": "3", "label": "Workflows covered", "note": "pre-, in- & post-class"},
                {"value": "5+", "label": "Engagement metrics", "note": "tracked for adoption"},
            ],
            "highlights": [
                "Owned end-to-end feature definition — translating user needs into personalized QnA, live polls and quizzes.",
                "Shipped 7+ features across pre-class, in-class and post-class workflows alongside faculty stakeholders.",
                "Led the pilot deployment for 20+ students from problem discovery through launch, running structured feedback sessions.",
                "Turned feedback and engagement insights into rapid iterations on scope and usability ahead of institutional-scale rollout.",
            ],
        },
    },
    {
        "key": "bakerhughes",
        "order": 3,
        "label": "03 / BEHIND THE SCENES",
        "title": "BEHIND THE SCENES",
        "org": "BAKER HUGHES",
        "role": "Digital Technology Intern — QA",
        "duration": "Jan 2026 — Oct 2026",
        "desc": "Worked alongside engineering teams across 12+ Agile sprints, defining acceptance criteria and tracking 100+ user stories. Designed 180+ test cases and built Playwright/Jest automation frameworks, doubling testing efficiency and helping achieve zero defects during UAT.",
        "image": "/filmography/chapter-bakerhughes.jpg",
        "logo": "/filmography/logos/baker-hughes.svg",
        "logoAlt": "Baker Hughes logo",
        "detail": {
            "overview": "On the Digital Technology team, I worked the seam between engineering and quality — keeping iterative delivery on track and the test coverage airtight.",
            "meta": [
                {"k": "Organisation", "v": "Baker Hughes"},
                {"k": "Role", "v": "Digital Technology Intern — QA"},
                {"k": "Period", "v": "Jan 2026 — Oct 2026"},
            ],
            "metrics": [
                {"value": "180+", "label": "Test cases designed", "note": "edge, failure & boundary"},
                {"value": "100+", "label": "User stories tracked", "note": "to milestone completion"},
                {"value": "×2", "label": "Testing efficiency", "note": "via automation frameworks"},
                {"value": "0", "label": "Defects in UAT", "note": "zero-defect release"},
            ],
            "highlights": [
                "Coordinated with engineering across 12+ Agile sprints to keep iterative product delivery on track.",
                "Defined acceptance criteria and tracked 100+ user stories to milestone completion, presenting highlights in sprint demos.",
                "Built Playwright and Jest automation frameworks for repeatable validation — cutting manual effort and speeding up releases.",
                "Findings drove fixes that strengthened API robustness and business-rule alignment.",
            ],
        },
    },
]

CONTACT = {
    "email": "harshal.v.official@gmail.com",
    "linkedin": "https://www.linkedin.com/in/harshal-vhatkar-372955258",
    "github": "https://github.com/HarVkr/",
}


def main():
    client = MongoClient(os.environ["MONGO_URL"])
    db = client[os.environ["DB_NAME"]]
    for ch in CHAPTERS:
        db.filmography_chapters.update_one(
            {"key": ch["key"]}, {"$set": ch}, upsert=True
        )
    db.filmography_meta.update_one(
        {"key": "contact"}, {"$set": {"key": "contact", **CONTACT}}, upsert=True
    )
    print(
        f"Seeded {len(CHAPTERS)} filmography chapters "
        f"({db.filmography_chapters.count_documents({})} total) + contact meta."
    )
    client.close()


if __name__ == "__main__":
    main()
