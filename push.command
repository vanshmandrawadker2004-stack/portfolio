#!/bin/bash
cd "/Users/vanshmandrawadker/Desktop/portfolio website"
rm -f .git/index.lock .git/HEAD.lock
git add -A
git commit -m "Work This Way button scrolls to work section; add batter-fire screenshot"
git push
echo "Done! Press any key to close."
read -n 1
