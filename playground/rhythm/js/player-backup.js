const NUM_TRACKS = 4;
const NUM_STEPS = 10;
const TEMPO = 200; // BPM
const SOUNDS = [
  'sound/bongo.mp3',
  'sound/bell.mp3',
  'sound/tap.mp3',
  'sound/cymbal.mp3'
];

// Create grid UI
document.addEventListener('DOMContentLoaded', () => {
  const grid = document.querySelector('.rhythm-grid');
  const playToggleBtn = document.getElementById('rhythm-toggle');
  if (!grid || !playToggleBtn) return;
  const pads = [];
  for (let t = 0; t < NUM_TRACKS; t++) {
    const row = document.createElement('div');
    row.className = 'rhythm-row';
    pads[t] = [];
    for (let s = 0; s < NUM_STEPS; s++) {
      const pad = document.createElement('button');
      pad.className = 'rhythm-pad';
      pad.dataset.track = t;
      pad.dataset.step = s;
      pad.textContent = '';
      pad.onclick = () => {
        pad.classList.toggle('active');
      };
      row.appendChild(pad);
      pads[t][s] = pad;
    }
    grid.appendChild(row);
  }

  // Audio
  let currentStep = 0;
  let interval = null;
  let isPlaying = false;

  function playStep() {
    for (let t = 0; t < NUM_TRACKS; t++) {
      if (pads[t][currentStep].classList.contains('active')) {
        const audio = new Audio(SOUNDS[t]);
        audio.currentTime = 0;
        audio.play();
      }
    }
    // Visual step highlight for pads
    for (let s = 0; s < NUM_STEPS; s++) {
      for (let t = 0; t < NUM_TRACKS; t++) {
        pads[t][s].classList.toggle('current', s === currentStep);
      }
    }

    // Visual step highlight for characters
    const characters = document.querySelectorAll('.rhythm-characters .character');
    for (let t = 0; t < NUM_TRACKS; t++) {
      if (characters[t]) {
        if (pads[t][currentStep].classList.contains('active')) {
          characters[t].classList.add('current');
        } else {
          characters[t].classList.remove('current');
        }
      }
    }

    currentStep = (currentStep + 1) % NUM_STEPS;
  }

  playToggleBtn.onclick = () => {
    if (!isPlaying) {
      // Start playing
      currentStep = 0;
      playStep();
      interval = setInterval(playStep, (60 / TEMPO) * 1000);
      // playToggleBtn.textContent = 'Pause';
      playToggleBtn.classList.add('active');
      isPlaying = true;
    } else {
      // Stop playing
      clearInterval(interval);
      interval = null;
      for (let s = 0; s < NUM_STEPS; s++) {
        for (let t = 0; t < NUM_TRACKS; t++) {
          pads[t][s].classList.remove('current');
        }
      }
      // Remove 'current' from all characters
      const characters = document.querySelectorAll('.rhythm-characters .character');
      characters.forEach(ch => ch.classList.remove('current'));
      // playToggleBtn.textContent = 'Play';
      playToggleBtn.classList.remove('active');
      isPlaying = false;
    }
  };
  // Set initial button state
  // playToggleBtn.textContent = 'Play';
  playToggleBtn.classList.remove('active');
});
