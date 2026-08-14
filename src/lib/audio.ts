// Sacred Web Audio API Synthesizer Engine
// Generates ambient cathedral organ chords, sacred hymn progressions, tubular bells, and celestial flame effects

class SacredAudioEngine {
  private ctx: AudioContext | null = null;
  private masterGain: GainNode | null = null;
  private isMuted = false;
  private isRunning = false;
  private sequenceTimer: number | null = null;
  private activeVoices: { osc: OscillatorNode; gain: GainNode }[] = [];
  private listenersAttached = false;
  private stateChangeListeners: ((isPlaying: boolean) => void)[] = [];

  constructor() {
    if (typeof window !== 'undefined') {
      this.setupAutoUnlock();
    }
  }

  private getContext(): AudioContext | null {
    if (typeof window === 'undefined') return null;
    if (!this.ctx) {
      const AudioCtx = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
      if (AudioCtx) {
        try {
          this.ctx = new AudioCtx();
          this.masterGain = this.ctx.createGain();
          this.masterGain.gain.setValueAtTime(0.35, this.ctx.currentTime);
          this.masterGain.connect(this.ctx.destination);
        } catch {
          // AudioContext init error guard
        }
      }
    }
    return this.ctx;
  }

  public subscribeState(listener: (isPlaying: boolean) => void) {
    this.stateChangeListeners.push(listener);
    listener(!this.isMuted && this.isRunning);
    return () => {
      this.stateChangeListeners = this.stateChangeListeners.filter(l => l !== listener);
    };
  }

  private notifyState() {
    const isPlaying = !this.isMuted && this.isRunning;
    this.stateChangeListeners.forEach(l => {
      try {
        l(isPlaying);
      } catch {}
    });
  }

  public setupAutoUnlock() {
    if (this.listenersAttached || typeof window === 'undefined') return;
    this.listenersAttached = true;

    const unlock = () => {
      this.ensureStarted();
    };

    const events = ['pointerdown', 'touchstart', 'mousedown', 'keydown', 'click', 'scroll', 'wheel'];
    events.forEach(evt => {
      window.addEventListener(evt, unlock, { passive: true, once: false });
    });

    // Also attempt immediate start on mount
    setTimeout(() => {
      this.ensureStarted();
    }, 100);
  }

  public ensureStarted() {
    if (this.isMuted) return;
    const ctx = this.getContext();
    if (!ctx) return;

    if (ctx.state === 'suspended') {
      ctx.resume().then(() => {
        if (!this.isRunning && !this.isMuted) {
          this.startHymnLoop();
        }
        this.notifyState();
      }).catch(() => {});
    } else if (ctx.state === 'running') {
      if (!this.isRunning && !this.isMuted) {
        this.startHymnLoop();
      }
      this.notifyState();
    }
  }

  public init() {
    this.ensureStarted();
  }

  public getIsPlaying(): boolean {
    return !this.isMuted && this.isRunning;
  }

  public toggleSound(): boolean {
    if (this.isMuted) {
      this.isMuted = false;
      this.ensureStarted();
      return true;
    } else {
      this.isMuted = true;
      this.stop();
      return false;
    }
  }

  public start() {
    this.isMuted = false;
    this.ensureStarted();
  }

  private stopCurrentVoices() {
    if (this.sequenceTimer !== null) {
      window.clearTimeout(this.sequenceTimer);
      this.sequenceTimer = null;
    }

    if (!this.ctx) return;
    const now = this.ctx.currentTime;

    this.activeVoices.forEach(({ osc, gain }) => {
      try {
        gain.gain.cancelScheduledValues(now);
        gain.gain.setValueAtTime(gain.gain.value, now);
        gain.gain.exponentialRampToValueAtTime(0.0001, now + 0.8);
        osc.stop(now + 0.85);
        setTimeout(() => {
          try {
            osc.disconnect();
            gain.disconnect();
          } catch {}
        }, 900);
      } catch {}
    });
    this.activeVoices = [];
  }

  public stop() {
    this.stopCurrentVoices();
    this.isRunning = false;
    this.notifyState();
  }

  // Sacred Cathedral Hymn Chord Progression Sequence
  // Hymn of Grace: Cmaj9 -> Am9 -> Fmaj7 -> G7sus4 -> Em7 -> Fmaj9 -> Dm7 -> G7 -> Cmaj
  private hymnProgression = [
    {
      bass: 65.41, // C2
      chords: [130.81, 196.00, 261.63, 329.63, 493.88, 587.33], // C3, G3, C4, E4, B4, D5 (Cmaj9)
      duration: 4.8,
    },
    {
      bass: 55.00, // A1
      chords: [110.00, 164.81, 220.00, 261.63, 329.63, 493.88], // A2, E3, A3, C4, E4, B4 (Am9)
      duration: 4.8,
    },
    {
      bass: 43.65, // F1
      chords: [87.31, 130.81, 174.61, 261.63, 329.63, 392.00], // F2, C3, F3, C4, E4, G4 (Fmaj7)
      duration: 4.8,
    },
    {
      bass: 49.00, // G1
      chords: [98.00, 146.83, 196.00, 261.63, 293.66, 392.00], // G2, D3, G3, C4, D4, G4 (G7sus4)
      duration: 4.8,
    },
    {
      bass: 41.20, // E1
      chords: [82.41, 123.47, 164.81, 246.94, 329.63, 392.00], // E2, B2, E3, B3, E4, G4 (Em7)
      duration: 4.8,
    },
    {
      bass: 43.65, // F1
      chords: [87.31, 130.81, 174.61, 261.63, 329.63, 440.00], // F2, C3, F3, C4, E4, A4 (Fmaj9)
      duration: 4.8,
    },
    {
      bass: 36.71, // D1
      chords: [73.42, 110.00, 146.83, 220.00, 261.63, 349.23], // D2, A2, D3, A3, C4, F4 (Dm7)
      duration: 4.8,
    },
    {
      bass: 49.00, // G1
      chords: [98.00, 146.83, 196.00, 246.94, 293.66, 392.00], // G2, D3, G3, B3, D4, G4 (G7)
      duration: 4.8,
    },
  ];

  private currentChordIndex = 0;

  private startHymnLoop() {
    if (this.isMuted) return;
    const ctx = this.getContext();
    if (!ctx || !this.masterGain) return;

    if (ctx.state === 'suspended') {
      ctx.resume().catch(() => {});
    }

    this.isRunning = true;
    this.notifyState();
    this.playNextChord();
  }

  private playNextChord() {
    if (this.isMuted || !this.isRunning) return;
    const ctx = this.getContext();
    if (!ctx || !this.masterGain) return;

    const chordData = this.hymnProgression[this.currentChordIndex];
    const now = ctx.currentTime;
    const duration = chordData.duration;

    // Filter node for cathedral pipe acoustic response
    const filter = ctx.createBiquadFilter();
    filter.type = 'lowpass';
    filter.frequency.setValueAtTime(750, now);
    filter.frequency.linearRampToValueAtTime(1100, now + duration * 0.4);
    filter.frequency.linearRampToValueAtTime(700, now + duration);
    filter.Q.setValueAtTime(1.5, now);

    const chordMasterGain = ctx.createGain();
    chordMasterGain.gain.setValueAtTime(0.0001, now);
    chordMasterGain.gain.linearRampToValueAtTime(0.16, now + 1.2); // Gentle swell
    chordMasterGain.gain.setValueAtTime(0.16, now + duration - 0.8);
    chordMasterGain.gain.linearRampToValueAtTime(0.0001, now + duration + 0.3);

    filter.connect(chordMasterGain);
    chordMasterGain.connect(this.masterGain);

    // 1. Bass Pedal Pipe
    const bassOsc = ctx.createOscillator();
    const bassGain = ctx.createGain();
    bassOsc.type = 'triangle';
    bassOsc.frequency.setValueAtTime(chordData.bass, now);
    bassGain.gain.setValueAtTime(0.001, now);
    bassGain.gain.linearRampToValueAtTime(0.22, now + 0.8);
    bassGain.gain.setValueAtTime(0.22, now + duration - 0.8);
    bassGain.gain.exponentialRampToValueAtTime(0.001, now + duration);

    bassOsc.connect(bassGain);
    bassGain.connect(filter);
    bassOsc.start(now);
    bassOsc.stop(now + duration + 0.4);
    this.activeVoices.push({ osc: bassOsc, gain: bassGain });

    // 2. Harmonic Cathedral Organ Pipes
    chordData.chords.forEach((freq, idx) => {
      const osc = ctx.createOscillator();
      const g = ctx.createGain();

      // Alternate Sine & Triangle for warm pipe organ harmonics
      osc.type = idx % 2 === 0 ? 'sine' : 'triangle';
      osc.frequency.setValueAtTime(freq, now);

      // Subtle celestial vibrato detune
      const detuneAmount = (idx % 3 === 0 ? 3 : -2) * (idx + 1) * 0.5;
      osc.detune.setValueAtTime(detuneAmount, now);

      const voiceAmp = 0.08 / (idx * 0.4 + 1);
      g.gain.setValueAtTime(0.0001, now);
      g.gain.linearRampToValueAtTime(voiceAmp, now + 1.0 + idx * 0.1);
      g.gain.setValueAtTime(voiceAmp, now + duration - 0.9);
      g.gain.exponentialRampToValueAtTime(0.0001, now + duration);

      osc.connect(g);
      g.connect(filter);
      osc.start(now);
      osc.stop(now + duration + 0.4);
      this.activeVoices.push({ osc, gain: g });
    });

    // 3. Occasional soft chime on major phrase roots (first chord of cycle)
    if (this.currentChordIndex === 0) {
      this.playSoftBell(1046.5); // High C6
    }

    // Schedule next chord in progression
    this.currentChordIndex = (this.currentChordIndex + 1) % this.hymnProgression.length;
    this.sequenceTimer = window.setTimeout(() => {
      this.playNextChord();
    }, (duration - 0.6) * 1000); // 600ms crossfade overlap
  }

  private playSoftBell(freq = 1046.5) {
    const ctx = this.getContext();
    if (!ctx || !this.masterGain) return;
    try {
      const now = ctx.currentTime;
      const bellOsc = ctx.createOscillator();
      const bellGain = ctx.createGain();
      bellOsc.type = 'sine';
      bellOsc.frequency.setValueAtTime(freq, now);

      bellGain.gain.setValueAtTime(0.0001, now);
      bellGain.gain.linearRampToValueAtTime(0.03, now + 0.02);
      bellGain.gain.exponentialRampToValueAtTime(0.00001, now + 3.0);

      bellOsc.connect(bellGain);
      bellGain.connect(this.masterGain);
      bellOsc.start(now);
      bellOsc.stop(now + 3.1);
    } catch {}
  }

  public setVolume(vol = 0.35) {
    if (this.masterGain && this.ctx) {
      this.masterGain.gain.setValueAtTime(Math.max(0, Math.min(1, vol)), this.ctx.currentTime);
    }
  }

  // Play Cathedral Chime / Tubular Bell for interactive UI buttons
  public playChime(pitchMultiplier = 1) {
    const ctx = this.getContext();
    if (!ctx || !this.masterGain) return;

    if (ctx.state === 'suspended') {
      ctx.resume().catch(() => {});
    }

    try {
      const now = ctx.currentTime;
      const baseFreq = 523.25 * pitchMultiplier; // C5 base

      const partials = [
        { freq: baseFreq, gain: 0.22, decay: 2.5 },
        { freq: baseFreq * 1.5, gain: 0.14, decay: 2.0 },
        { freq: baseFreq * 2.0, gain: 0.09, decay: 1.6 },
        { freq: baseFreq * 2.76, gain: 0.05, decay: 1.1 },
        { freq: baseFreq * 4.0, gain: 0.03, decay: 0.8 },
      ];

      partials.forEach(({ freq, gain, decay }) => {
        const osc = ctx.createOscillator();
        const g = ctx.createGain();

        osc.type = 'sine';
        osc.frequency.setValueAtTime(freq, now);

        g.gain.setValueAtTime(0.0001, now);
        g.gain.linearRampToValueAtTime(gain, now + 0.015);
        g.gain.exponentialRampToValueAtTime(0.00001, now + decay);

        osc.connect(g);
        if (this.masterGain) g.connect(this.masterGain);

        osc.start(now);
        osc.stop(now + decay + 0.1);
      });
    } catch {}
  }

  // Play Warm Sanctuary Flame Ignition & Organ Swell
  public playAweInspiringIgnition(intensity = 2) {
    const ctx = this.getContext();
    if (!ctx || !this.masterGain) return;

    if (ctx.state === 'suspended') {
      ctx.resume().catch(() => {});
    }

    try {
      const now = ctx.currentTime;

      // 1. Warm filtered noise swoosh
      const bufferSize = ctx.sampleRate * 1.5;
      const noiseBuffer = ctx.createBuffer(1, bufferSize, ctx.sampleRate);
      const output = noiseBuffer.getChannelData(0);
      for (let i = 0; i < bufferSize; i++) {
        output[i] = Math.random() * 2 - 1;
      }

      const whiteNoise = ctx.createBufferSource();
      whiteNoise.buffer = noiseBuffer;

      const noiseFilter = ctx.createBiquadFilter();
      noiseFilter.type = 'bandpass';
      noiseFilter.frequency.setValueAtTime(300, now);
      noiseFilter.frequency.exponentialRampToValueAtTime(1200, now + 0.3);
      noiseFilter.frequency.exponentialRampToValueAtTime(400, now + 1.2);
      noiseFilter.Q.setValueAtTime(3.0, now);

      const noiseGain = ctx.createGain();
      noiseGain.gain.setValueAtTime(0.001, now);
      noiseGain.gain.linearRampToValueAtTime(0.25 * intensity, now + 0.15);
      noiseGain.gain.exponentialRampToValueAtTime(0.0001, now + 1.2);

      whiteNoise.connect(noiseFilter);
      noiseFilter.connect(noiseGain);
      noiseGain.connect(this.masterGain);
      whiteNoise.start(now);

      // 2. Harmonic sacred triad swell
      const triad = [261.63, 392.00, 523.25, 659.25];
      triad.forEach((freq, idx) => {
        const osc = ctx.createOscillator();
        const g = ctx.createGain();

        osc.type = idx === 0 ? 'triangle' : 'sine';
        osc.frequency.setValueAtTime(freq, now);

        g.gain.setValueAtTime(0.0001, now);
        g.gain.linearRampToValueAtTime(0.12 * intensity, now + 0.25);
        g.gain.exponentialRampToValueAtTime(0.00001, now + 2.0);

        osc.connect(g);
        if (this.masterGain) g.connect(this.masterGain);

        osc.start(now);
        osc.stop(now + 2.1);
      });

      this.playChime(1.5);
    } catch {}
  }

  // Play crystalline sparkle shimmers
  public playSparkles() {
    const ctx = this.getContext();
    if (!ctx || !this.masterGain) return;

    if (ctx.state === 'suspended') {
      ctx.resume().catch(() => {});
    }

    try {
      const now = ctx.currentTime;
      const pitches = [1046.50, 1318.51, 1567.98, 2093.00, 2637.02];

      pitches.forEach((freq, idx) => {
        const delay = idx * 0.08;
        const osc = ctx.createOscillator();
        const g = ctx.createGain();

        osc.type = 'sine';
        osc.frequency.setValueAtTime(freq, now + delay);

        g.gain.setValueAtTime(0.0001, now + delay);
        g.gain.linearRampToValueAtTime(0.08, now + delay + 0.01);
        g.gain.exponentialRampToValueAtTime(0.00001, now + delay + 0.6);

        osc.connect(g);
        if (this.masterGain) g.connect(this.masterGain);

        osc.start(now + delay);
        osc.stop(now + delay + 0.7);
      });
    } catch {}
  }
}

export const sacredAudio = new SacredAudioEngine();
