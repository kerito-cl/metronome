
const slider = document.querySelector('.slider')
const tempo = document.getElementById('tempo')
const decreaseTempo = document.querySelector(".decrease-tempo")
const increaseTempo = document.querySelector(".increase-tempo")
const startStopBtn = document.getElementById('start-stop')
const subtractBeats = document.querySelector('.subtract-beats')
const addBeats = document.querySelector('.add-beats')
const measureCount = document.querySelector('.measure-count')
const tempoText = document.querySelector('.tempo-text')


let audioContext = null;
let notesInQueue = []
let currentBeatInBar = 0
let lookahead = 25
let scheduleAheadTime = 0.1
let nextNoteTime = 0.0
let bpm = 120
let beatsPerBar = 4
let isRunning = false;
let intervalID = null;

function nextNote() {

  var secondsPerBeat = 60.0 / bpm
  nextNoteTime += secondsPerBeat
  currentBeatInBar ++;
  if (currentBeatInBar == beatsPerBar) {
  
    currentBeatInBar = 0;
  }
}


function scheduleNote(beatNumber, time){

  notesInQueue.push({ note: beatNumber, time: time });
  const osc = audioContext.createOscillator();
  const envelope = audioContext.createGain();
  console.log(beatsPerBar)
  console.log(currentBeatInBar)
  if (beatNumber == 0) {

    osc.frequency.value = 1000
  }else{
    osc.frequency.value = 800
  }

  envelope.gain.value = 1;
  envelope.gain.exponentialRampToValueAtTime(1, time + 0.001);
  envelope.gain.exponentialRampToValueAtTime(0.001, time + 0.02);

  osc.connect(envelope);
  envelope.connect(audioContext.destination);
    
  osc.start(time);
  osc.stop(time + 0.03);

}

        



function scheduler(){

  while (nextNoteTime < audioContext.currentTime + scheduleAheadTime ) {
      scheduleNote(currentBeatInBar,nextNoteTime);
      nextNote();
    }    
}

function playClick() {

  if (isRunning) return;

  if (audioContext == null) {
    audioContext = new (window.AudioContext || window.webkitAudioContext)();
  }
  
  isRunning = true;
  currentBeatInBar = 0
  nextNoteTime = audioContext.currentTime + 0.05
   
  intervalID = setInterval(() => scheduler(), lookahead);
} 




function stop() {

  isRunning = false;
  clearInterval(intervalID)

}

function startStop(){
  if (isRunning){
    stop()
  }
  else{
    playClick()
  }
}






function updateMetronome() {
    tempo.textContent = bpm;
    slider.value = bpm;
}
function validateTempo() {
    if (bpm <= 20) { return };
    if (bpm >= 280) { return };
}

slider.addEventListener('input', () => {
  
  bpm = slider.value

  validateTempo();
  updateMetronome();
});

decreaseTempo.addEventListener('click', () => {
    if (bpm <= 20) { return };
    bpm--;
    validateTempo();
    updateMetronome();
});


increaseTempo.addEventListener('click', () => {
    if (bpm >= 280) { return };
    bpm++;
    updateMetronome();
});


addBeats.addEventListener('click', () => {
    if (beatsPerBar >= 12) { return };
    beatsPerBar++;
    measureCount.textContent = beatsPerBar;
    count = 0;
});

subtractBeats.addEventListener('click', () => {
    if (beatsPerBar <= 2) { return };
    beatsPerBar--;
    measureCount.textContent = beatsPerBar;
    count = 0;
});


startStopBtn.addEventListener('click', () => {


  startStop()

    if (isRunning) {
        startStopBtn.textContent = 'STOP';
    } else {
        startStopBtn.textContent = 'START';
    }
});


