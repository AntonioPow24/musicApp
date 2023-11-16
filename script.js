

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
        path:'assets/LostSoulDown.mp3',
        displayName:'The Lost Soul Down',
        cover:'assets/theLostSoulDown.jpg',
        artist: 'NBSPLV'
    },
    {
        path:'assets/landslide.mp3',
        displayName:'Landslide',
        cover:'assets/landslide.jpg',
        artist: 'Vicetone ft. YoungBlood Hawke'
    },
    {
        path:'assets/meetme.mp3',
        displayName:'Meet Me Halfway',
        cover:'assets/meetme.jpg',
        artist: 'The Black Eyed Peas'
    },
    {
        path:'assets/JalebiBaby.mp3',
        displayName:'Jalebi Baby',
        cover:'assets/JabeliBaby.jpg',
        artist: 'Tesher'
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
        path:'assets/gimmie.mp3',
        displayName:'Gimmie More',
        cover:'assets/gimmie.jpg',
        artist: 'Britney Spears'
    },
    {
        path:'assets/vegas.mp3',
        displayName:'Vegas',
        cover:'assets/vegas.jpg',
        artist: 'Joseline Hernandez'
    },
    {
        path:'assets/chericheri.mp3',
        displayName:'Cheri Cheri Lady',
        cover:'assets/chericheri.jpg',
        artist: 'Modern Talking'
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
        path:'assets/stereolove.mp3',
        displayName:'Stereo Love',
        cover:'assets/stereolove.jpg',
        artist: 'Edward Maya ft. Vika Jigulina'
    },
    {
        path:'assets/nuestface.mp3',
        displayName:'FACE(페이스)',
        cover:'assets/nuestface.jpg',
        artist: "NU'EST(뉴이스트)"
    },
    {
        path:'assets/kirari.mp3',
        displayName:'Kirari',
        cover:'assets/kirari.jpg',
        artist: 'Fujii Kaze'
    },
    {
        path:'assets/ireally.mp3',
        displayName:'I really wanna stay at ur house',
        cover:'assets/ireally.jpg',
        artist: 'Rosa Walton & Hallie Coggins'
    },
    {
        path:'assets/TekIt.mp3',
        displayName:'Tek It -  Cafune',
        cover:'assets/TektIt.jpg',
        artist: 'Cafune'
    },
    {
        path:'assets/geazy.mp3',
        displayName:'Cravin',
        cover:'assets/geazy.jpg',
        artist: 'DaniLeigh ft. G-Eazy'
    },
    {
        path:'assets/troublemaker.mp3',
        displayName:'Trouble Maker',
        cover:'assets/troublemaker.jpg',
        artist: 'Hyuna & Hyunseung'
    },
    {
        path:'assets/thislove.mp3',
        displayName:'Is This Love',
        cover:'assets/thislove.jpg',
        artist: 'White Snake'
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

