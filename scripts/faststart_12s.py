#!/usr/bin/env python3
import struct
import os

SRC = "frontend/public/Introduction-Video-12-secs.mp4"
DST = "frontend/public/Introduction-Video-12-secs-faststart.mp4"

filesize = os.path.getsize(SRC)

with open(SRC, "rb") as f:
    pos = 0
    boxes = []
    while pos < filesize:
        f.seek(pos)
        header = f.read(8)
        if len(header) < 8:
            break
        size, btype = struct.unpack(">I4s", header)
        if size == 1:
            size = struct.unpack(">Q", f.read(8))[0]
        elif size == 0:
            size = filesize - pos
        boxes.append((btype, pos, size))
        pos += size

ftyp_box = next((b for b in boxes if b[0] == b"ftyp"), None)
mdat_box = next((b for b in boxes if b[0] == b"mdat"), None)
moov_box = next((b for b in boxes if b[0] == b"moov"), None)

assert ftyp_box and mdat_box and moov_box, "Missing required boxes"

with open(SRC, "rb") as f:
    f.seek(ftyp_box[1])
    ftyp_data = bytearray(f.read(ftyp_box[2]))
    f.seek(moov_box[1])
    moov_data = bytearray(f.read(moov_box[2]))

new_mdat_offset = len(ftyp_data) + len(moov_data)
old_mdat_offset = mdat_box[1]
shift = new_mdat_offset - old_mdat_offset
print(f"Shift for 12s video: +{shift} bytes")

stco_count = 0
patched_entries = 0
idx = 0
while True:
    pos = moov_data.find(b"stco", idx)
    if pos == -1:
        break
    stco_count += 1
    box_start = pos - 4
    box_size = struct.unpack(">I", moov_data[box_start:box_start+4])[0]
    entry_count = struct.unpack(">I", moov_data[pos+8:pos+12])[0]

    entry_pos = pos + 12
    for i in range(entry_count):
        cur_offset = struct.unpack(">I", moov_data[entry_pos:entry_pos+4])[0]
        new_offset = cur_offset + shift
        struct.pack_into(">I", moov_data, entry_pos, new_offset)
        entry_pos += 4
        patched_entries += 1

    idx = pos + box_size

print(f"Patched {stco_count} stco table(s) with {patched_entries} chunk offsets.")

with open(SRC, "rb") as f_in, open(DST, "wb") as f_out:
    f_out.write(ftyp_data)
    f_out.write(moov_data)
    f_in.seek(mdat_box[1])
    remaining = mdat_box[2]
    while remaining > 0:
        chunk_size = min(remaining, 1024 * 1024)
        f_out.write(f_in.read(chunk_size))
        remaining -= chunk_size

os.replace(DST, SRC)
print("12s video faststart applied directly to Introduction-Video-12-secs.mp4!")

