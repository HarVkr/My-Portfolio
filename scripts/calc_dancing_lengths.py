#!/usr/bin/env python3
import re
import math

# We can estimate the total length of each compound path by parsing line and curve segments
from test_dancing_fixed import c

glyphs = [
    ("H", c[0]),
    ("e", f"{c[1]} {c[2]}"),
    ("ll", f"{c[3]} {c[4]} {c[5]}"),
    ("o", f"{c[6]} {c[7]}"),
    (".", c[8]),
]

print("Glyph breakdown:")
for name, d in glyphs:
    print(f"Glyph '{name}': {len(d)} chars, subpaths: {d.count('M')}")

