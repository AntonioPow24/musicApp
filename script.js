
const image=document.getElementById('cover'),
title = document.getElementById('music-title'),
artist=document.getElementById('music-artist'),
currentTimeMusic=document.getElementById('current-time'),
durationMusic=document.getElementById('duration'),
progress=document.getElementById('progress'),
playerProgress=document.getElementById('player-progress'),
prevBtn= document.getElementById('prev'),
nextBtn=document.getElementById('next'),
playBtn=document.getElementById('play')
background=document.getElementById('bg-img')


const music = new Audio();
const songs = [
    {
        path:'assets/Dangerous.mp3',
        displayName:'Dangerous - Akon',
        cover:'assets/DangerousAkon.jpg',
        artist: 'Akon'
    },
    {
        path:'assets/TekIt.mp3',
        displayName:'Tek It -  Cafune',
        cover:'assets/TektIt.jpg',
        artist: 'Cafune'
    },
    {
        path:'assets/TebyaZizz.mp3',
        displayName:'Malo Tebya',
        cover:'assets/maloTebya.jpg',
        artist: 'Tebya'
    },
    {
        path:'assets/confident.mp3',
        displayName:'Confident',
        cover:'assets/confident.jpg',
        artist: 'Justin Bieber'
    },
    {
        path:'assets/unlockit.mp3',
        displayName:'Unlock It',
        cover:'assets/unlockit.jpg',
        artist: 'Charli XCX ft. Kim Petras'
    },
    {
        path:'assets/geazy.mp3',
        displayName:'Cravin',
        cover:'assets/geazy.jpg',
        artist: 'DaniLeigh ft. G-Eazy'
    },
    {
        path:'assets/getinto.mp3',
        displayName:'Get Into It',
        cover:'assets/getinto.jpg',
        artist: 'Doja Cat'
    },
    {
        path:'assets/badsad.mp3',
        displayName:'BAD SAD AND MAD',
        cover:'assets/badsad.jpg',
        artist: 'BIBI(비비)'
    },
    {
        path:'assets/starboy.mp3',
        displayName:'Starboy',
        cover:'assets/starboy.jpg',
        artist: 'The Weeknd ft. Daft Punk'
    },
    {
        path:'assets/ChasingTime.mp3',
        displayName:'Chasing Time vs ID',
        cover:'assets/chasingTime.jpg',
        artist: 'Vicetone'
    },
    {
        path:'assets/LostSoulDown.mp3',
        displayName:'The Lost Soul Down',
        cover:'assets/theLostSoulDown.jpg',
        artist: 'NBSPLV'
    }
];

let musicIndex= 0
let isPlaying = false

function togglePlay(){
    if(isPlaying){
        pauseMusic();
    }else{
        playMusic()
    }
}

function playMusic(){
    isPlaying=true
    //Cambiando el icono del Button Play
    playBtn.classList.replace('bx-play','bx-pause')

    // Set Button Hover Title
    playBtn.setAttribute('title','Play')
    music.play()
}
function pauseMusic(){
    isPlaying=false
    //Cambiando el icono del Button Pause
    playBtn.classList.replace('bx-pause','bx-play')

    // Set Button Hover Title
    playBtn.setAttribute('title','Pause')
    music.pause()
}


function loadMusic(song){
    music.src=song.path
    title.textContent=song.displayName
    artist.textContent= song.artist
    image.src=song.cover
    background.src=song.cover
}

function changeMusic(direction){
    musicIndex=(musicIndex+direction+songs.length)%songs.length
    loadMusic(songs[musicIndex])
    playMusic()
}

function updateProgressBar(){
    const {duration,currentTime}=music
    const progressPercent = (currentTime/duration) *100
    progress.style.width= `${progressPercent}%`

    const formatTime = (time) => String(Math.floor(time)).padStart(2, '0')
    durationMusic.textContent = `${formatTime(duration/60)}:${formatTime(duration % 60)}`
    currentTimeMusic.textContent = `${formatTime(currentTime/60)}:${formatTime(currentTime % 60)}`
}

function setProgressBar(e){
    const width = playerProgress.clientWidth
    const clickX= e.offsetX
    music.currentTime=(clickX/width) * music.duration

}

playBtn.addEventListener('click',togglePlay)
prevBtn.addEventListener('click',()=> changeMusic(-1))
nextBtn.addEventListener('click',()=> changeMusic(1))

music.addEventListener('ended', () => changeMusic(1))
music.addEventListener('timeupdate',updateProgressBar)
playerProgress.addEventListener('click',setProgressBar)

loadMusic(songs[musicIndex])

