# Music Player App

A simple web-based music player that dynamically fetches songs from a local server, updates the playlist automatically, and allows users to play, pause, and navigate through songs.

## Features
- **Dynamic Playlist**: Automatically fetches songs from the `/songs/` directory and updates the list every 5 seconds.
- **Play/Pause Functionality**: Users can play or pause songs with a single button.
- **Next/Previous Controls**: Navigate through the playlist using next and previous buttons.
- **Seekbar**: Allows users to track and change song progress.
- **Responsive UI**: Includes a hamburger menu for mobile-friendly navigation.

## Technologies Used
- **HTML, CSS, JavaScript**
- **Font Awesome (for icons)**

## Installation & Setup
### Prerequisites
Ensure you have a local server running (e.g., using **Live Server** extension in VS Code or Python's built-in server).

### Steps
1. Clone this repository:
   ```bash
   git clone https://github.com/yourusername/music-player-app.git
   ```
2. Navigate to the project folder:
   ```bash
   cd musi
   ```
3. Start a local server:
   - Using Python (for Python 3.x):
     ```bash
     python -m http.server 5500
     ```
   - Or use **Live Server** extension in VS Code.
4. Open `http://127.0.0.1:5500/` in your browser.

## File Structure
```
/music-player-app
│── index.html       # Main HTML file
│── styles.css       # CSS for styling the UI
│── script.js        # JavaScript logic for music player
│── /songs/          # Directory containing MP3 files
│── README.md        # Project documentation
```

## Usage
1. Start the server and access the app in the browser.
2. Click on any song from the playlist to play it.
3. Use the play/pause button to control playback.
4. Use the next/previous buttons to navigate.
5. Drag the seekbar to skip to different parts of the song.
6. Open or close the sidebar menu with the hamburger button.

## Future Enhancements
- Implement a **drag-and-drop** feature for playlist reordering.
- Add **volume control** and **equalizer** options.
- Integrate with **Spotify API** for streaming online music.

## License
This project is licensed under the MIT License. Feel free to modify and use it.

---
Made with ❤️ by Muhammad Mazhar.

