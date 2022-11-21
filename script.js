console.log("welcome to spotify");
let songIndex = 0;
let audioElement = new Audio('Songs/1.mp3');
let masterPlay = document.getElementById('masterPlay');
let myProgressBar = document.getElementById('myProgressBar');
let gif = document.getElementById('gif');
let masterSongName = document.getElementById('masterSongName');
let songItems = Array.from(document.getElementsByClassName('songItem'));
let currSongIndex;
let pausedTime;

let songs =[
    {songName: "Kuch To Hua Hai", filePath: "Songs/1.mp3", coverPath: "Covers/1.jpeg", duration: "05:19"},
    {songName: "Sajna Vaari Vaari", filePath: "Songs/2.mp3", coverPath: "Covers/2.jpeg", duration: "03:43"},
    {songName: "Mehnga Marka", filePath: "Songs/3.mp3", coverPath: "Covers/3.jpeg", duration: "03:45"},
    {songName: "Jaane Kyon Log Pyar", filePath: "Songs/4.mp3", coverPath: "Covers/4.jpeg", duration: "04:49"},
    {songName: "Online Babbu Maan", filePath: "Songs/5.mp3", coverPath: "Covers/5.jpeg", duration: "06:39"},
    {songName: "Pata Chalgea", filePath: "Songs/6.mp3", coverPath: "Covers/6.jpeg", duration: "04:43"}
]
songItems.forEach((element, i) =>{
    element.getElementsByTagName("img")[0].src = songs[i].coverPath;
    element.getElementsByClassName("songName")[0].innerText = songs[i].songName;
    element.getElementsByClassName("timestamp")[0].innerText = songs[i].duration;
})
// audioElement.play();

masterPlay.addEventListener('click', ()=> {
    if(audioElement.paused || audioElement.currentTime <= 0){
        audioElement.play();
        masterPlay.classList.remove('fa-play-circle');
        masterPlay.classList.add('fa-pause-circle');
        gif.style.opacity = 1;
    }
    else{
        audioElement.pause();
        masterPlay.classList.remove('fa-pause-circle');
        masterPlay.classList.add('fa-play-circle');
        gif.style.opacity = 0;
    }
})

audioElement.addEventListener('timeupdate', ()=>{
    progress = parseInt((audioElement.currentTime/audioElement.duration)*100);
    myProgressBar.value = progress;
})

myProgressBar.addEventListener('change', ()=>{
    audioElement.currentTime = (myProgressBar.value * audioElement.duration)/100;
})

const makeAllPlays = () =>{
    Array.from(document.getElementsByClassName('songItemPlay')).forEach((element)=>{
        element.classList.remove('fa-pause-circle');
        element.classList.add('fa-play-circle');
    })
}

Array.from(document.getElementsByClassName('songItemPlay')).forEach((element)=>{
    element.addEventListener('click', (e)=>{
        // if(currSongIndex == songIndex){
        //     audioElement.currentTime = pausedTime
        //     audioElement.play();
        // }
        if(audioElement.paused || audioElement.currentTime <= 0){
            makeAllPlays();
            songIndex = parseInt(e.target.id);
            currSongIndex = songIndex;
            e.target.classList.remove('fa-play-circle');
            e.target.classList.add('fa-pause-circle');
            audioElement.src = `Songs/${songIndex+1}.mp3`;
            audioElement.currentTime = 0;
            audioElement.play();
            masterSongName.innerText = songs[songIndex].songName;
            gif.style.opacity = 1;
            masterPlay.classList.remove('fa-play-circle');
            masterPlay.classList.add('fa-pause-circle'); 
        }
        else{
            audioElement.pause();
            pausedTime = audioElement.currentTime;
            e.target.classList.remove('fa-pause-circle');
            e.target.classList.add('fa-play-circle');
            masterPlay.classList.remove('fa-pause-circle');
            masterPlay.classList.add('fa-play-circle');
            gif.style.opacity = 0;
        }
    })
})

document.getElementById('next').addEventListener('click', ()=>{
    if(songIndex >= songs.length-1){
        songIndex = 0;
    }
    else{
        songIndex += 1;
    }
    audioElement.src = `Songs/${songIndex+1}.mp3`;
    masterSongName.innerText = songs[songIndex].songName;
    audioElement.currentTime = 0;
    audioElement.play();
    gif.style.opacity = 1;
    masterPlay.classList.remove('fa-play-circle');
    masterPlay.classList.add('fa-pause-circle');
})

document.getElementById('previous').addEventListener('click', ()=>{
    if(songIndex <= 0){
        songIndex = songs.length-1;
    }
    else{
        songIndex -= 1;
    }
    audioElement.src = `Songs/${songIndex+1}.mp3`;
    masterSongName.innerText = songs[songIndex].songName;
    audioElement.currentTime = 0;
    audioElement.play();
    gif.style.opacity = 1;
    masterPlay.classList.remove('fa-play-circle');
    masterPlay.classList.add('fa-pause-circle');
})