// Fetching & Parsing the songs from the local server
async function fetchSongs() {
  let a = await fetch("http://127.0.0.1:5500/songs/");
  let data = await a.text();
  let element = document.createElement("div");
  element.innerHTML = data;
  let as = element.querySelectorAll("a");

  let songs = [];

  for (let index = 0; index < as.length; index++) {
    const element = as[index];
    if (element.href.endsWith(".mp3")) {
      songs.push(element.href);
    }
  }
  return songs;
}

let play = document.getElementById('playBtn') //selecting media player button
let currentSong = new Audio() //defining current song variable

//defining playMusic function.
const playMusic = (audio, pause= false)=> {
  currentSong.src = audio 
  if (!pause) {
    currentSong.play()
    play.className = "fa-solid fa-pause"
  }

  currentSongTitle = document.querySelector('.currentSongTitle').getElementsByTagName('h3')[0]
  currentSongTitle.innerText = audio.split("/songs/")[1].split(".mp3")[0].replaceAll('-', ' ');
}

//getSongs function that will call fetchSongs function and log the songs
async function main() {

  let songs = await fetchSongs();
  playMusic(songs[0], pause= true)

  //Showing all the songs inside the playlist
  let songsUl = document.getElementById("playlist");

  for (let song of songs) {

    //extracting title from url
    let songTitle = song.split("/songs/")[1].split(".mp3")[0].replaceAll('-', ' ');

    //creating element inside playlist for each song
    let li = document.createElement("li");

    li.innerHTML = `<i class="fa-solid fa-music"></i>
                <div class="songListInfo">
                  <h3 class= "no-wrap">${songTitle}</h3>
                  <p>Artist: -Mazhar-Khan-</p>
                </div>
                <i id="libraryPlayBtn" class= "fa-solid fa-play rounded"></i>`;

    songsUl.appendChild(li);
  }

  
  // //Attaching an event Listner to each song
  Array.from(document.querySelector('#playlist').getElementsByTagName('li')).forEach(e=> {
    let eachSong = e.getElementsByClassName('songListInfo')[0].getElementsByTagName('h3')[0];
    let song = 'http://127.0.0.1:5500/songs/'+ eachSong.innerText + '.mp3'
    let songURL = song.replaceAll(' ', '-');

    e.addEventListener ('click', element=> {
      playMusic(songURL);
    })

    //Attach an eventListner to play pause and previous
    
    play.addEventListener('click', ()=> {
      if (currentSong.paused) {
        currentSong.play()
        play.className = "fa-solid fa-pause";
      } 
      else {
          currentSong.pause()
          play.className = "fa-solid fa-play";
      }
    })
  })

  function secondsToMinutes(seconds) {
    // Calculate minutes and seconds
    let minutes = Math.floor(seconds / 60);
    let remainingSeconds = Math.round(seconds % 60);

    // Format seconds to always show two digits (e.g., 09 instead of 9)
    minutes = minutes < 10 ? '0' + minutes : minutes; 
    remainingSeconds = remainingSeconds < 10 ? '0' + remainingSeconds : remainingSeconds;
  
    // Return the formatted string
    return `${minutes}:${remainingSeconds}`;
  }
  
  //Listen for timeupdate event
  currentSong.addEventListener("timeupdate", ()=> {
    
    let currSongTime = document.getElementById('currSongTime') // targetting current song time from media player
    currSongTime.innerText = `${secondsToMinutes(currentSong.currentTime)} / ${secondsToMinutes(currentSong.duration)}`
    
    // targetting circle on the seekbar
    let circle = document.getElementById('seekBarCircle')
    circle.style.left = (currentSong.currentTime/ currentSong.duration) * 100 + "%";
  })

  // Add an event Listner to seekbar
  let seekBar = document.getElementById('seekBar');
  seekBar.addEventListener('click', (e)=> {
    console.log(e.offsetX)
  })
}


//calling the main function
main();
