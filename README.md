# Snake & Ladder

A polished browser-based Snake and Ladder game built with HTML, CSS, and vanilla JavaScript.

## Features

- 10x10 game board
- Turn-based multi-player gameplay
- Random dice rolling
- Snake and ladder mechanics
- Winner detection
- Responsive layout for desktop and mobile
- Clean and modern UI

## Project Structure

```text
snake_ladder_game/
├── index.html
├── style.css
├── script.js
└── README.md
```

## How to Run

### Option 1: Open directly

Open `index.html` in your browser.

### Option 2: Run a local server

```bash
cd snake_ladder_game
python3 -m http.server 8000
```

Then visit:

```text
http://localhost:8000
```

## Game Rules

- Players take turns rolling a die.
- A player must land exactly on 100 to win.
- If a player lands on a ladder, they move upward.
- If a player lands on a snake, they move downward.
- If the roll exceeds 100, the move is ignored.

## Author

Tirtha212

## License

This project is open for personal and educational use.
