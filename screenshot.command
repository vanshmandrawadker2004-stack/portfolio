#!/bin/bash
echo "Opening batterandfire.shop..."
open -a "Google Chrome" "https://www.batterandfire.shop"
sleep 7

echo "Capturing window..."
python3 - <<'PYEOF'
import subprocess, time

# Bring Chrome to front
subprocess.run(['osascript', '-e', 'tell app "Google Chrome" to activate'])
time.sleep(1)

# Get window bounds
r = subprocess.run(['osascript', '-e', '''
tell application "Google Chrome"
    set b to bounds of window 1
    return (item 1 of b) & "," & (item 2 of b) & "," & (item 3 of b) & "," & (item 4 of b)
end tell
'''], capture_output=True, text=True)

parts = r.stdout.strip().split(', ')
left, top, right, bottom = int(parts[0]), int(parts[1]), int(parts[2]), int(parts[3])
w, h = right - left, bottom - top

out = '/Users/vanshmandrawadker/Desktop/portfolio website/public/projects/batter-fire-screenshot.png'
subprocess.run(['screencapture', '-R', f'{left},{top},{w},{h}', '-x', out])
print(f"Saved: {out}")
PYEOF

echo "Done! Press any key to close."
read -n 1
