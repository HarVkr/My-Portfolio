import struct
import os

filepath = "frontend/public/Introduction-Video-12-secs.mp4"
filesize = os.path.getsize(filepath)

with open(filepath, "rb") as f:
    pos = 0
    boxes = []
    while pos < filesize:
        f.seek(pos)
        header = f.read(8)
        if len(header) < 8:
            break
        size, btype = struct.unpack(">I4s", header)
        btype = btype.decode("latin1", errors="replace")
        header_len = 8
        if size == 1:
            size = struct.unpack(">Q", f.read(8))[0]
            header_len = 16
        elif size == 0:
            size = filesize - pos
        
        boxes.append((btype, pos, size, header_len))
        pos += size

print("Boxes in 12s video:")
for btype, pos, size, header_len in boxes:
    print(f"  Box: {btype:<6} Offset: {pos:<10} Size: {size:<10} ({size / 1024 / 1024:.2f} MB)")

