#!/usr/bin/env python3
from fontTools.ttLib import TTFont
from fontTools.varLib.instancer import instantiateVariableFont
from fontTools.pens.svgPathPen import SVGPathPen
from fontTools.pens.boundsPen import BoundsPen
from fontTools.pens.transformPen import TransformPen
import os

SRC = "frontend/public/fonts/DancingScript-VariableFont_wght.ttf"
# Check if font exists in public or system
if not os.path.exists(SRC):
    for root, dirs, files in os.walk("."):
        for f in files:
            if "DancingScript" in f:
                SRC = os.path.join(root, f)
                break

print("Found font at:", SRC)

