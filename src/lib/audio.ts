// Sacred Web Audio API Synthesizer Engine
// Generates ambient organ chords, cathedral tubular bells, celestial flame ignitions, and crystalline sparkles

class SacredAudioEngine {
  private ctx: AudioContext | null = null;
  private masterGain: GainNode | null = null;
  private isPlaying = false;
  private organNodes: { osc: OscillatorNode; gain: GainNode }[] = [];
  private organGain: GainNode | null = null;
  private lfo: OscillatorNode | null = null;
  private lfoGain: GainNode | null = null;

  private getContext(): AudioContext | null {
    if (typeof window === 'undefined') return null;
    if (!this.ctx) {
      const AudioCtx = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
      if (AudioCtx) {
        this.ctx = new AudioCtx();
        this.masterGain = this.ctx.createGain();
        this.masterGain.gain.setValueAtTime(0.7, this.ctx.currentTime);
        this.masterGain.connect(this.ctx.destination);
      }
    }
    if (this.ctx && this.ctx.state === 'suspended') {
      this.ctx.resume().catch(() => {});
    }
    return this.ctx;
  }

  public init() {
    this.getContext();
  }

  public getIsPlaying(): boolean {
    return this.isPlaying;
  }

  public toggleSound(): boolean {
    if (this.isPlaying) {
      this.stop();
      return false;
    } else {
      this.start();
      return true;
    }
  }

  public start() {
    const ctx = this.getContext();
    if (!ctx || !this.masterGain) return;

    if (ctx.state === 'suspended') {
      ctx.resume().catch(() => {});
    }

    if (this.isPlaying) return;
    this.isPlaying = true;

    try {
      const now = ctx.currentTime;

      // Master organ gain with slow fade-in
      this.organGain = ctx.createGain();
      this.organGain.gain.setValueAtTime(0.001, now);
      this.organGain.gain.exponentialRampToValueAtTime(0.18, now + 2.5);

      // Low-pass filter for warm cathedral acoustic depth
      const filter = ctx.createBiquadFilter();
      filter.type = 'lowpass';
      filter.frequency.setValueAtTime(650, now);
      filter.Q.setValueAtTime(1.2, now);

      // Chorus / Vibrato LFO
      this.lfo = ctx.createOscillator();
      this.lfoGain = ctx.createGain();
      this.lfo.frequency.setValueAtTime(0.2, now); // 0.2 Hz slow breath
      this.lfoGain.gain.setValueAtTime(3.5, now);
      this.lfo.connect(this.lfoGain);

      // Sacred Cathedral Organ Chord (C Major 9 / Add 2 chord voicing: C3, G3, C4, E4, B4, D5)
      const frequencies = [130.81, 196.00, 261.63, 329.63, 392.00, 493.88, 587.33];
      this.organNodes = [];

      frequencies.forEach((freq, idx) => {
        const osc = ctx.createOscillator();
        const nodeGain = ctx.createGain();

        // Alternate sine and warm triangle for pipe organ harmonics
        osc.type = idx % 2 === 0 ? 'sine' : 'triangle';
        osc.frequency.setValueAtTime(freq, now);

        // Connect subtle pitch LFO for acoustic warmth
        if (this.lfoGain) {
          this.lfoGain.connect(osc.detune);
        }

        // Calibrated amplitude per harmonic
        const amp = 0.15 / (idx + 1);
        nodeGain.gain.setValueAtTime(amp, now);

        osc.connect(nodeGain);
        nodeGain.connect(filter);

        osc.start(now);
        this.organNodes.push({ osc, gain: nodeGain });
      });

      filter.connect(this.organGain);
      this.organGain.connect(this.masterGain);
      this.lfo.start(now);
    } catch {
      // Audio autoplay policy fallback
    }
  }

  public stop() {
    if (!this.isPlaying || !this.ctx || !this.organGain) {
      this.isPlaying = false;
      return;
    }

    try {
      const now = this.ctx.currentTime;
      this.organGain.gain.cancelScheduledValues(now);
      this.organGain.gain.setValueAtTime(this.organGain.gain.value, now);
      this.organGain.gain.exponentialRampToValueAtTime(0.0001, now + 1.2);

      setTimeout(() => {
        this.organNodes.forEach(({ osc }) => {
          try {
            osc.stop();
            osc.disconnect();
          } catch {}
        });
        this.organNodes = [];
        if (this.lfo) {
          try {
            this.lfo.stop();
            this.lfo.disconnect();
          } catch {}
          this.lfo = null;
        }
        this.organGain = null;
        this.isPlaying = false;
      }, 1300);
    } catch {
      this.isPlaying = false;
    }
  }

  public setVolume(vol = 0.7) {
    if (this.masterGain && this.ctx) {
      this.masterGain.gain.setValueAtTime(Math.max(0, Math.min(1, vol)), this.ctx.currentTime);
    }
  }

  // Play Cathedral Chime / Tubular Bell
  public playChime(pitchMultiplier = 1) {
    const ctx = this.getContext();
    if (!ctx || !this.masterGain) return;

    try {
      const now = ctx.currentTime;
      const baseFreq = 523.25 * pitchMultiplier; // C5 base

      // Tubular Bell harmonics: 1x, 2.76x, 5.4x, 8.9x
      const partials = [
        { freq: baseFreq, gain: 0.28, decay: 2.8 },
        { freq: baseFreq * 1.5, gain: 0.18, decay: 2.2 },
        { freq: baseFreq * 2.0, gain: 0.12, decay: 1.8 },
        { freq: baseFreq * 2.76, gain: 0.08, decay: 1.2 },
        { freq: baseFreq * 4.0, gain: 0.05, decay: 0.9 },
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

    try {
      const now = ctx.currentTime;

      // 1. Warm filtered noise swoosh (represents holy flame ignite)
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

      // 2. Harmonic sacred triad swell (C4, G4, E5)
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

      // 3. Golden chime accent
      this.playChime(1.5);
    } catch {}
  }

  // Play crystalline sparkle shimmers
  public playSparkles() {
    const ctx = this.getContext();
    if (!ctx || !this.masterGain) return;

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
