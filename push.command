#!/bin/bash
cd "/Users/vanshmandrawadker/Desktop/portfolio website"
rm -f .git/index.lock .git/HEAD.lock
git add -A
git commit -m "Batter & Fire: add batter-fire.png as live site image"
git push
echo "Done! Press any key to close."
read -n 1
