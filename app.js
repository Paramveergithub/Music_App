let songList = document.querySelector(".song-list");
let progressBar = document.querySelector("#progress");
let playButton = document.querySelector(".play-btn");
let forwardButton = document.querySelector(".forward");
let backwardButton = document.querySelector(".backward");

let songs = [
  {
    name: "Fikar Not",
    id: 1,
  },
  {
    name: "Pati-Pati jeans",
    id: 2,
  },
  {
    name: "Pesa he to",
    id: 3,
  },
  {
    name: "She don't know",
    id: 4,
  },
  {
    name: "Tera ghata",
    id: 5,
  },
  {
    name: "Ud ja kale kowe",
    id: 6,
  },
];

let currentSongIndex = 0;
let audio = new Audio(`./music/${songs[currentSongIndex].name}.mp3`);

for (let song of songs) {
  let li = document.createElement("li");
  li.innerText = song.name;
  li.setAttribute("id", song.id);
  songList.append(li);
  li.classList.add("song-item");
}

playButton.addEventListener("click", () => {
  audio.paused ? audio.play() : audio.pause();
  playButton.children[0].classList.toggle("fa-play");
  playButton.children[0].classList.toggle("fa-pause");
});

function playSong() {
  playButton.children[0].classList.add("fa-pause");
  playButton.children[0].classList.remove("fa-play");
} 

audio.addEventListener("timeupdate", function () {
  let currentProgress = (audio.currentTime * 100) / audio.duration;
  progressBar.value = currentProgress;
});

progressBar.addEventListener("input", function () {
  let updateTime = (audio.duration * progressBar.value) / 100;
  audio.currentTime = updateTime;
});

songList.addEventListener("click", function (e) {
  let name = e.target.innerText;
  currentSongIndex = songs.findIndex(function (song) {
    return song.name === name;
  });

  audio.src = `./music/${name}.mp3`;
  audio.currentTime = 0;
  audio.play();
  playSong();
});

forwardButton.addEventListener("click", function () {
  changeSong(1);
});

backwardButton.addEventListener("click", function () {
  changeSong(-1);
});

function changeSong(direction) {
  currentSongIndex += direction;

  if (currentSongIndex < 0) {
    currentSongIndex = songs.length - 1;
  } else if (currentSongIndex >= songs.length) {
    currentSongIndex = 0;
  }
  loadSong();
}

function loadSong() {
  audio.src = `./music/${songs[currentSongIndex].name}.mp3`;
  audio.currentTime = 0;
  audio.play();
  playSong();
}
