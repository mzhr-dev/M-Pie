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

//getSongs function that will call fetchSongs function and log the songs
async function getSongs() {

  let currentSong;

  let songs = await fetchSongs();
  let audio = new Audio(songs[0]);
  
  //Showing all the songs inside the playlist
  let songsUl = document.getElementById("playlist");

  for (let song of songs) {

    //extracting title from url
    let songTitle = song.split("/songs/")[1].split(".mp3")[0].replaceAll('-', ' ');

    // if (songTitle.length > 26) {
    //   songTitle = songTitle.slice(0 , 26).concat(" ...")
    // }

    //creating element inside playlist for each song
    let li = document.createElement("li");

    li.innerHTML = `<i class="fa-solid fa-music"></i>
                <div class="songListInfo">
                  <h3 class= "no-wrap">${songTitle}</h3>
                  <p>Artist: -Mazhar-Khan-</p>
                </div>
                <i class="fa-solid fa-play rounded"></i>`;

    songsUl.appendChild(li);
  }

  
  // //Attaching an event Listner to each song
  Array.from(document.querySelector("#playlist").getElementsByTagName('li')).forEach((e)=>{
    let h3Element = e.getElementsByTagName("h3")[0].innerText;
    console.log(h3Element)
  })

}

//calling the main function "getSongs"
getSongs();
