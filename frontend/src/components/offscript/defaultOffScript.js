// Bundled fallback catalog — mirrors the MongoDB seed (backend/seed_offscript.py).
// The live section fetches /api/offscript and falls back to this if offline.
//
// To replace the music stills: drop the files into frontend/public/offscript/stills/
// with the names below (sing-1.png, keys-1.png) or update the src paths in the DB.

export const DEFAULT_SCENES = [
  {
    key: "movies",
    order: 1,
    tag: "SCENE 01",
    title: "STILL WATCHING?",
    text: "You made it to the post-credits — so yes, the streaming-platform act was intentional. Films and shows are how I refill: every genre, every era, plot twists welcome.",
    stills: [],
  },
  {
    key: "music",
    order: 2,
    tag: "SCENE 02",
    title: "THE UNTRAINED VOICE",
    text: "No formal training — just a mic, a keyboard and the nerve to use them. I sing for the love of it, and the stage has been kind so far.",
    stills: [
      {
        src: "/offscript/stills/sing-1.png",
        alt: "Singing performance still",
        caption: "The performance",
      },
      {
        src: "/offscript/stills/keys-1.png",
        alt: "Playing the keyboard",
        caption: "At the keys",
      },
    ],
  },
  {
    key: "editing",
    order: 3,
    tag: "SCENE 03",
    title: "CUT TO: EVERYTHING",
    text: "My first creative instrument was a timeline. I edit for rhythm, pacing and payoff — and cut whatever doesn't serve the story.",
    stills: [],
  },
  {
    key: "acting",
    order: 4,
    tag: "SCENE 04",
    title: "TWO YEARS ON STAGE",
    text: "Theatre for two years taught me presence, timing and how to hold a room. I still take the occasional act — the curtain hasn't fallen yet.",
    stills: [],
  },
];
