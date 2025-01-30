// Fetching songs from the local server
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

//getSongs function that will call fetchSongs function and log the songs
async function getSongs() {
    let songs = await fetchSongs();
    console.log(songs);

    // play the first song
    let audio = new Audio(songs[0]);
    audio.play();

    audio.addEventListener ('loadeddata', () => {
        let duration = audio.duration;
        console.log (duration);
    });
}
 
getSongs();