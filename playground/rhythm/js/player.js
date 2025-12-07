window.onload = menuCheck;

const imagesToPreload = [
  'img/ch1-iddle.gif', 'img/ch1-active.png', 'img/ch1-active-flash.png',
  'img/ch2-iddle.gif', 'img/ch2-active.png', 'img/ch2-active-flash.png',
  'img/ch3-iddle.gif', 'img/ch3-active.png', 'img/ch3-active-flash.png',
  'img/ch4-iddle.gif', 'img/ch4-active.png', 'img/ch4-active-flash.png',
  'img/ch5-iddle.gif', 'img/ch5-active.png', 'img/ch5-active-flash.png',
  'img/ch6-iddle.gif', 'img/ch6-active.png', 'img/ch6-active-flash.png',
  'img/ch7-iddle.gif', 'img/ch7-active.png', 'img/ch7-active-flash.png'
];
imagesToPreload.forEach(src => {
  const img = new Image();
  img.src = src;
});

const DEFAULT_TEMPO = 200; // BPM

class RhythmPlayer {
  constructor(container, options = {}) {
    this.container = container;
    this.numTracks = options.numTracks || 4;
    this.numSteps = options.numSteps || 10;
    this.tempo = options.tempo || DEFAULT_TEMPO;
    this.sounds = options.sounds || [];

    this.grid = container.querySelector('.rhythm-grid');
    this.controls = container.querySelector('.rhythm-controls');
    this.toggleBtn = this.controls ? this.controls.querySelector('button') : null;
    this.tempoSlider = this.controls ? this.controls.querySelector('.rhythm-tempo') : null;
    this.tempoValue = this.controls ? this.controls.querySelector('.rhythm-tempo-value') : null;

    this.pads = [];
    this.currentStep = 0;
    this.interval = null;
    this.isPlaying = false;

    this._buildGrid();
    this._bindControls();
  }

  _buildGrid() {
    if (!this.grid) return;
    this.grid.innerHTML = '';
    for (let t = 0; t < this.numTracks; t++) {
      const row = document.createElement('div');
      row.className = 'rhythm-row';
      this.pads[t] = [];
      for (let s = 0; s < this.numSteps; s++) {
        const pad = document.createElement('button');
        pad.className = 'rhythm-pad';
        pad.dataset.track = t;
        pad.dataset.step = s;
        pad.textContent = '';
        pad.onclick = () => pad.classList.toggle('active');
        row.appendChild(pad);
        this.pads[t][s] = pad;
      }
      this.grid.appendChild(row);
    }
  }

  _bindControls() {
    // Toggle handler is wired externally with registry so players can stop each other.
    if (this.tempoSlider) {
      this.tempoSlider.addEventListener('input', (e) => {
        this.tempo = Number(e.target.value);
        if (this.tempoValue) this.tempoValue.textContent = String(this.tempo);
        if (this.isPlaying) {
          // restart interval with new tempo
          clearInterval(this.interval);
          this.interval = setInterval(this.playStep.bind(this), (60 / this.tempo) * 1000);
        }
      });
      // initialize display
      if (this.tempoValue) this.tempoValue.textContent = String(this.tempo);
    }
  }

  playStep() {
    for (let t = 0; t < this.numTracks; t++) {
      const pad = this.pads[t] && this.pads[t][this.currentStep];
      if (pad && pad.classList.contains('active') && this.sounds[t]) {
        const audio = new Audio(this.sounds[t]);
        audio.currentTime = 0;
        audio.play();
      }
    }

    // Visual step highlight for pads
    for (let s = 0; s < this.numSteps; s++) {
      for (let t = 0; t < this.numTracks; t++) {
        const pad = this.pads[t] && this.pads[t][s];
        if (pad) pad.classList.toggle('current', s === this.currentStep);
      }
    }

    // Visual highlight for characters inside this container
    const characters = this.container.querySelectorAll('.rhythm-characters .character');
    for (let t = 0; t < this.numTracks; t++) {
      if (characters[t]) {
        const active = this.pads[t] && this.pads[t][this.currentStep] && this.pads[t][this.currentStep].classList.contains('active');
        characters[t].classList.toggle('current', !!active);

        // Flash logic for both players
        if (this.container.id === 'player' || this.container.id === 'player_tempo') {
          // Check for more than 2 contiguous active pads in this track
          let maxContiguous = 0;
          let currentContiguous = 0;
          for (let s = 0; s < this.numSteps; s++) {
            const pad = this.pads[t] && this.pads[t][s];
            if (pad && pad.classList.contains('active')) {
              currentContiguous++;
              if (currentContiguous > maxContiguous) maxContiguous = currentContiguous;
            } else {
              currentContiguous = 0;
            }
          }
          if (maxContiguous > 2) {
            characters[t].classList.add('flash');
            setTimeout(() => {
              characters[t].classList.remove('flash');
            }, 100);
          }
        }
      }
    }

    this.currentStep = (this.currentStep + 1) % this.numSteps;
  }

  start(playersRegistry) {
    if (this.isPlaying) return;
    // stop other players
    if (playersRegistry && Array.isArray(playersRegistry)) {
      playersRegistry.forEach(p => { if (p !== this) p.stop(); });
    }
    this.currentStep = 0;
    this.playStep();
    this.interval = setInterval(this.playStep.bind(this), (60 / this.tempo) * 1000);
    if (this.toggleBtn) this.toggleBtn.classList.add('active');
    this.isPlaying = true;
  }

  stop() {
    if (!this.isPlaying) return;
    clearInterval(this.interval);
    this.interval = null;
    // Remove step highlight from pads
    for (let s = 0; s < this.numSteps; s++) {
      for (let t = 0; t < this.numTracks; t++) {
        const pad = this.pads[t] && this.pads[t][s];
        if (pad) pad.classList.remove('current');
      }
    }
    // Remove 'current' from characters inside this container
    const characters = this.container.querySelectorAll('.rhythm-characters .character');
    characters.forEach(ch => ch.classList.remove('current'));
    if (this.toggleBtn) this.toggleBtn.classList.remove('active');
    this.isPlaying = false;
  }

  toggle(playersRegistry) {
    if (!this.isPlaying) this.start(playersRegistry);
    else this.stop();
  }
}

document.addEventListener('DOMContentLoaded', () => {
  const players = [];

  // First player (default) - 4 tracks
  const p1Container = document.getElementById('player');
  if (p1Container) {
    const p1 = new RhythmPlayer(p1Container, {
      numTracks: 4,
      numSteps: 10,
      tempo: DEFAULT_TEMPO,
      sounds: ['sound/bongo.mp3','sound/bell.mp3','sound/tap.mp3','sound/cymbal.mp3']
    });
    players.push(p1);
  }

  // Second player (tempo adjustable) - 2 tracks
  const p2Container = document.getElementById('player_tempo');
  if (p2Container) {
    const p2 = new RhythmPlayer(p2Container, {
      numTracks: 3,
      numSteps: 10,
      tempo: DEFAULT_TEMPO,
      sounds: ['sound/harmonica-01.mp3','sound/harmonica-02.mp3','sound/harmonica-03.mp3']
    });
    players.push(p2);
  }

  // Wire up registry-aware toggles (so each player stops the others when starting)
  players.forEach(p => {
    if (p.toggleBtn) {
      p.toggleBtn.addEventListener('click', () => p.toggle(players));
    }
  });
});
function menuCheck() {
    document.querySelectorAll('.btn_play').forEach(button => {
        button.setAttribute('disabled', 'true');
        button.classList.add('disabled');
    });
}