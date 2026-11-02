import os

# Check MP4 atom locations (moov vs mdat)
with open("frontend/public/Introduction-Video-Export-5.mp4", "rb") as f:
    data = f.read(256 * 1024) # read first 256KB
    moov_at_start = b"moov" in data
    print("Is 'moov' near start of file (FastStart enabled)?:", moov_at_start)
    if not moov_at_start:
        f.seek(-256 * 1024, os.SEEK_END)
        tail = f.read(256 * 1024)
        moov_at_end = b"moov" in tail
        print("Is 'moov' at end of file (FastStart disabled)?:", moov_at_end)

