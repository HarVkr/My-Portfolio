#!/usr/bin/env python3
import struct
import os
import shutil

SRC = "frontend/public/Introduction-Video-Export-5.mp4"
DST = "frontend/public/Introduction-Video-Export-5-faststart.mp4"
BAK = "frontend/public/Introduction-Video-Export-5.mp4.bak"

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

print("Original boxes:")
for btype, pos, size in boxes:
    print(f"  {btype.decode('latin1')}: offset={pos}, size={size}")

# Find ftyp, mdat, moov
ftyp_box = next((b for b in boxes if b[0] == b"ftyp"), None)
mdat_box = next((b for b in boxes if b[0] == b"mdat"), None)
moov_box = next((b for b in boxes if b[0] == b"moov"), None)

assert ftyp_box and mdat_box and moov_box, "Missing required boxes"

with open(SRC, "rb") as f:
    # Read ftyp
    f.seek(ftyp_box[1])
    ftyp_data = bytearray(f.read(ftyp_box[2]))

    # Read moov
    f.seek(moov_box[1])
    moov_data = bytearray(f.read(moov_box[2]))

# New order will be: ftyp (length = len(ftyp_data)) followed by moov (length = len(moov_data)) followed by mdat
new_mdat_offset = len(ftyp_data) + len(moov_data)
old_mdat_offset = mdat_box[1]
shift = new_mdat_offset - old_mdat_offset
print(f"Shift for all mdat chunk offsets: +{shift} bytes")

# Patch all stco boxes in moov_data
# An stco box has:
# 4 bytes size
# 4 bytes 'stco'
# 4 bytes version & flags (usually 0)
# 4 bytes entry count (uint32)
# entry count * 4 bytes (uint32 offsets)

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
    print(f"  Found stco at {pos}: size={box_size}, entries={entry_count}")

    # Patch entries
    entry_pos = pos + 12
    for i in range(entry_count):
        cur_offset = struct.unpack(">I", moov_data[entry_pos:entry_pos+4])[0]
        new_offset = cur_offset + shift
        struct.pack_into(">I", moov_data, entry_pos, new_offset)
        entry_pos += 4
        patched_entries += 1

    idx = pos + box_size

print(f"Patched {stco_count} stco table(s) with {patched_entries} chunk offsets.")

# Now write new faststart MP4 file: ftyp + patched_moov + mdat
print(f"Writing {DST}...")
with open(SRC, "rb") as f_in, open(DST, "wb") as f_out:
    # 1. ftyp
    f_out.write(ftyp_data)
    # 2. moov (now at the start!)
    f_out.write(moov_data)
    # 3. mdat (streamed in 1MB chunks)
    f_in.seek(mdat_box[1])
    remaining = mdat_box[2]
    while remaining > 0:
        chunk_size = min(remaining, 1024 * 1024)
        buf = f_in.read(chunk_size)
        f_out.write(buf)
        remaining -= chunk_size

dst_size = os.path.getsize(DST)
print(f"Done! {DST} written ({dst_size / 1024 / 1024:.2f} MB).")

