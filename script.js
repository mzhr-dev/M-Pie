// Fetching and parsing songs from local server
async function fetchSongs() {
  let response = await fetch('http://127.0.0.1:5500/songs/');
  let data = await response.text();
  let element = document.createElement('div');
  element.innerHTML = data;
  let links = element.querySelectorAll('a');

  let songs = [];
  links.forEach(link => {
    if (link.href.endsWith('.mp3')) {
      songs.push(link.href);
    }
  });

  return songs;
}

// Decoding URL
const decodeUrl = (url) => {
  let title = decodeURIComponent(url.split("/songs/")[1].split(".mp3")[0].replaceAll('-', ' '));
  return title;
};

let songs = [];
let currentSong = new Audio();
let playButton = document.getElementById('playBtn');

// Play or pause the selected song
const playMusic = (songUrl, pause = false) => {
  currentSong.src = songUrl;
  if (!pause) {
    currentSong.play();
    playButton.className = 'fa-solid fa-pause';
  }
  document.querySelector('.currentSongTitle h3').innerText = decodeUrl(songUrl);
};

// Updating the playlist dynamically
function updatePlaylist() {
  let playlist = document.getElementById('playlist');
  playlist.innerHTML = '';

  songs.forEach(song => {
    let songTitle = decodeUrl(song);
    let li = document.createElement('li');

    li.innerHTML = `<i class="fa-solid fa-music"></i>
            <div class="songListInfo">
                <h3 class="no-wrap">${songTitle}</h3>
                <p>Artist: Mazhar Khan</p>
            </div>
            <i class="fa-solid fa-play rounded"></i>`;

    li.addEventListener('click', () => {
      playMusic(song);
    });
    playlist.appendChild(li);
  });
};

// Fetch songs and refresh songs every 5 seconds
async function refreshSongs() {
  songs = await fetchSongs();
  updatePlaylist();
}

// Handling play/pause button
playButton.addEventListener('click', () => {
  if (currentSong.paused) {
    currentSong.play();
    playButton.className = 'fa-solid fa-pause';
  } else {
    currentSong.pause();
    playButton.className = 'fa-solid fa-play';
  }
});

// Handle next/previous song
let previousBtn = document.getElementById('previousBtn');
let nextBtn = document.getElementById('nextBtn');

previousBtn.addEventListener('click', () => {
    let index = songs.indexOf(currentSong.src);
    if (index > 0) playMusic(songs[index - 1]);
});

nextBtn.addEventListener('click', () => {
    let index = songs.indexOf(currentSong.src);
    if (index < songs.length - 1) playMusic(songs[index + 1]);
});

// Seekbar functionality
let seekBar = document.getElementById('seekBar');
let seekCircle = document.getElementById('seekBarCircle');

currentSong.addEventListener("timeupdate", () => {
    let currentTimeDisplay = document.getElementById('currSongTime');
    let duration = currentSong.duration || 0;
    let currentTime = currentSong.currentTime || 0;
    currentTimeDisplay.innerText = `${formatTime(currentTime)} / ${formatTime(duration)}`;
    seekCircle.style.left = (currentTime / duration) * 100 + "%";
});

seekBar.addEventListener("click", (e) => {
    let percentage = (e.offsetX / seekBar.offsetWidth) * 100;
    currentSong.currentTime = (percentage / 100) * currentSong.duration;
});

function formatTime(seconds) {
    let minutes = Math.floor(seconds / 60).toString().padStart(2, '0');
    let remainingSeconds = Math.round(seconds % 60).toString().padStart(2, '0');
    return `${minutes}:${remainingSeconds}`;
}

// Hamburger menu functionality
let hamburger = document.getElementById('hamBurger');
let leftPanel = document.querySelector('.left');
let closeBtn = document.querySelector('.closeHamburger');

hamburger.addEventListener('click', () => leftPanel.style.transform = "translateX(0%)");
closeBtn.addEventListener('click', () => leftPanel.style.transform = "translateX(-120%)");

// Initialize the app
async function main() {
    await refreshSongs();
    if (songs.length > 0) playMusic(songs[0], true);
}

main();
setInterval(refreshSongs, 5000); // Check for new songs every 5 seconds

// Volume controller
let volumeSlider = document.getElementById('volRange');
volumeSlider.addEventListener('input', () => {
  let volume = volumeSlider.value/100;
  console.log(volume);
  currentSong.volume = volume;
});
