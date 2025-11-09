const NUM_TRACKS = 3;
const NUM_STEPS = 8;
const TEMPO = 120; // BPM
const SOUNDS = [
  'sound/bell.mp3',
  'sound/low.mp3',
  'sound/high.mp3'
];

// Create grid UI
document.addEventListener('DOMContentLoaded', () => {
  const playerDiv = document.getElementById('player');
  if (!playerDiv) return;
  playerDiv.innerHTML = '';
  const grid = document.createElement('div');
  grid.className = 'rhythm-grid';
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
  playerDiv.appendChild(grid);

  // Controls
  const controls = document.createElement('div');
  controls.className = 'rhythm-controls';
  const playBtn = document.createElement('button');
  playBtn.textContent = 'Play';
  const stopBtn = document.createElement('button');
  stopBtn.textContent = 'Stop';
  controls.appendChild(playBtn);
  controls.appendChild(stopBtn);
  playerDiv.appendChild(controls);

  // Audio
  const audioEls = SOUNDS.map(src => new Audio(src));
  let currentStep = 0;
  let interval = null;

  function playStep() {
    for (let t = 0; t < NUM_TRACKS; t++) {
      if (pads[t][currentStep].classList.contains('active')) {
        // Clone audio to allow retriggering
        const audio = new Audio(SOUNDS[t]);
        audio.currentTime = 0;
        audio.play();
      }
    }
    // Visual step highlight
    for (let s = 0; s < NUM_STEPS; s++) {
      for (let t = 0; t < NUM_TRACKS; t++) {
        pads[t][s].classList.toggle('current', s === currentStep);
      }
    }
    currentStep = (currentStep + 1) % NUM_STEPS;
  }

  playBtn.onclick = () => {
    if (interval) return;
    currentStep = 0;
    playStep();
    interval = setInterval(playStep, (60 / TEMPO) * 1000);
  };
  stopBtn.onclick = () => {
    clearInterval(interval);
    interval = null;
    // Remove step highlight
    for (let s = 0; s < NUM_STEPS; s++) {
      for (let t = 0; t < NUM_TRACKS; t++) {
        pads[t][s].classList.remove('current');
      }
    }
  };
});
