// Ancient Hellenic & Roman Classical Score Engine
// Features:
// - Realistic Plucked Greek Lyre & Concert Harp acoustics (physical plucked string synthesis)
// - Flowing harp arpeggios & ethereal cascading glissandos in ancient Dorian / Aeolian modes
// - Gentle ancient woodwind / Aulos pan flute melodies
// - Warm atmospheric sanctuary & temple choir drone resonances
// - ZERO modern drum beats, zero kicks, zero electronic percussion
// - Realistic Roman parchment unrolling sound effect and sacred chime accents

class SacredAudioEngine {
  private ctx: AudioContext | null = null;
  private masterGain: GainNode | null = null;
  private reverbConvolver: ConvolverNode | null = null;
  private isMuted = false;
  private isRunning = false;
  private currentVolume = 0.85;
  private sequenceTimer: number | null = null;
  private listenersAttached = false;
  private stateChangeListeners: ((isPlaying: boolean) => void)[] = [];
  private currentBar = 0;

  // Serene Classical Ancient Tempo: 72 BPM
  private readonly BPM = 72;
  private readonly beatDuration = 60 / 72; // ~0.833s per beat
  private readonly measureDuration = (60 / 72) * 4; // ~3.333s per 4/4 measure

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
          this.masterGain.gain.setValueAtTime(this.currentVolume, this.ctx.currentTime);

          // Create ancient acoustic temple hall reverb
          this.createSanctuaryReverb();

          if (this.reverbConvolver) {
            this.masterGain.connect(this.reverbConvolver);
            this.reverbConvolver.connect(this.ctx.destination);
          }
          this.masterGain.connect(this.ctx.destination);
        } catch {}
      }
    }
    return this.ctx;
  }

  // Generates a soft, lush 2.8s acoustic hall impulse response for rich harp resonance
  private createSanctuaryReverb() {
    if (!this.ctx) return;
    try {
      const rate = this.ctx.sampleRate;
      const length = Math.floor(rate * 2.8);
      const impulse = this.ctx.createBuffer(2, length, rate);
      const left = impulse.getChannelData(0);
      const right = impulse.getChannelData(1);

      for (let i = 0; i < length; i++) {
        const decay = Math.exp(-i / (rate * 0.9));
        left[i] = (Math.random() * 2 - 1) * decay * 0.35;
        right[i] = (Math.random() * 2 - 1) * decay * 0.35;
      }

      this.reverbConvolver = this.ctx.createConvolver();
      this.reverbConvolver.buffer = impulse;
    } catch {}
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

    const events = ['pointerdown', 'touchstart', 'mousedown', 'keydown', 'click', 'scroll'];
    events.forEach(evt => {
      window.addEventListener(evt, unlock, { passive: true, once: false });
    });

    setTimeout(() => {
      this.ensureStarted();
    }, 150);
  }

  public ensureStarted() {
    if (this.isMuted) return;
    const ctx = this.getContext();
    if (!ctx) return;

    if (ctx.state === 'suspended') {
      ctx.resume().then(() => {
        if (!this.isRunning && !this.isMuted) {
          this.startHarpScoreLoop();
        }
        this.notifyState();
      }).catch(() => {});
    } else if (ctx.state === 'running') {
      if (!this.isRunning && !this.isMuted) {
        this.startHarpScoreLoop();
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
    if (this.isMuted || !this.isRunning) {
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

  public stop() {
    if (this.sequenceTimer !== null) {
      window.clearTimeout(this.sequenceTimer);
      this.sequenceTimer = null;
    }
    this.isRunning = false;
    this.notifyState();
  }

  // =========================================================================
  // GREEK HARP & LYRE ACOUSTIC SCORE (Ancient Modal Progression: D Dorian / A Minor)
  // Progression (16 Measures):
  // 0-3:   D Dorian (Dm9) -> F Maj7 -> C Maj9 -> G (with suspended 4th)
  // 4-7:   Bb Maj7 -> Am7 -> Dm (Aeolian cadence) -> A Phrygian / Major 7th
  // 8-11:  Dm -> G -> C Maj7 -> F
  // 12-15: Bb Maj9 -> C9 -> Dm9 -> D Major tierce (Luminous resolve)
  // =========================================================================
  private startHarpScoreLoop() {
    if (this.isMuted) return;
    const ctx = this.getContext();
    if (!ctx || !this.masterGain) return;

    if (ctx.state === 'suspended') {
      ctx.resume().catch(() => {});
    }

    this.isRunning = true;
    this.notifyState();
    this.currentBar = 0;
    this.scheduleNextHarpMeasure();
  }

  private scheduleNextHarpMeasure() {
    if (this.isMuted || !this.isRunning) return;
    const ctx = this.getContext();
    if (!ctx || !this.masterGain) return;

    const now = ctx.currentTime;
    const bar = this.currentBar;

    // 1. Play Plucked Greek Harp / Lyre Arpeggio
    this.playGreekHarpArpeggio(now, bar);

    // 2. Play Deep Acoustic Bass Harp Pluck
    this.playBassHarpNote(now, bar);

    // 3. Play Ancient Pan Flute / Aulos Wind Melody
    this.playAncientAulosMelody(now, bar);

    // 4. Play Gentle Ethereal Temple Atmosphere & String Pad
    this.playTempleAtmosphere(now, bar);

    this.currentBar = (this.currentBar + 1) % 16;
    this.sequenceTimer = window.setTimeout(() => {
      this.scheduleNextHarpMeasure();
    }, this.measureDuration * 1000 - 40);
  }

  // =========================================================================
  // 1. PLUCKED GREEK HARP & LYRE STRING MODEL (Rich Harmonic Overtones)
  // =========================================================================
  private pluckHarpString(freq: number, startTime: number, velocity = 1.0, duration = 3.2) {
    const ctx = this.ctx;
    if (!ctx || !this.masterGain) return;

    // Plucked string harmonic spectrum with physical wooden body resonance:
    // Fundamental + 2nd, 3rd, 4th, 5th, 6th partials with natural decay
    const partials = [
      { ratio: 1.0, amp: 0.45, decay: duration },
      { ratio: 2.002, amp: 0.28, decay: duration * 0.75 },
      { ratio: 3.006, amp: 0.16, decay: duration * 0.55 },
      { ratio: 4.012, amp: 0.09, decay: duration * 0.4 },
      { ratio: 5.02, amp: 0.05, decay: duration * 0.28 },
      { ratio: 6.03, amp: 0.025, decay: duration * 0.18 },
    ];

    // Initial fingernail pluck transient
    const pluckNoise = ctx.createBufferSource();
    try {
      const pLen = Math.floor(ctx.sampleRate * 0.015);
      const pBuf = ctx.createBuffer(1, pLen, ctx.sampleRate);
      const pData = pBuf.getChannelData(0);
      for (let i = 0; i < pLen; i++) pData[i] = (Math.random() * 2 - 1) * Math.exp(-i / (pLen * 0.3));
      pluckNoise.buffer = pBuf;

      const pFilter = ctx.createBiquadFilter();
      pFilter.type = 'bandpass';
      pFilter.frequency.setValueAtTime(freq * 2.5, startTime);
      pFilter.Q.setValueAtTime(3.0, startTime);

      const pGain = ctx.createGain();
      pGain.gain.setValueAtTime(0.12 * velocity, startTime);
      pGain.gain.exponentialRampToValueAtTime(0.0001, startTime + 0.02);

      pluckNoise.connect(pFilter);
      pFilter.connect(pGain);
      pGain.connect(this.masterGain);
      pluckNoise.start(startTime);
    } catch {}

    // Resonant string harmonics
    partials.forEach(({ ratio, amp, decay }) => {
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      const filter = ctx.createBiquadFilter();

      osc.type = ratio === 1.0 ? 'triangle' : 'sine';
      osc.frequency.setValueAtTime(freq * ratio, startTime);

      // Wooden body tone damping
      filter.type = 'lowpass';
      filter.frequency.setValueAtTime(freq * 4.5, startTime);
      filter.frequency.exponentialRampToValueAtTime(freq * 1.8, startTime + decay * 0.5);

      const noteAmp = amp * velocity * 0.32;
      gain.gain.setValueAtTime(0.0001, startTime);
      gain.gain.linearRampToValueAtTime(noteAmp, startTime + 0.004);
      gain.gain.exponentialRampToValueAtTime(0.00001, startTime + decay);

      osc.connect(filter);
      filter.connect(gain);
      gain.connect(this.masterGain!);

      osc.start(startTime);
      osc.stop(startTime + decay + 0.1);
    });
  }

  // 2. GREEK HARP ARPEGGIO PATTERNS (8 notes per measure, rolling arpeggios & glissandos)
  private playGreekHarpArpeggio(startTime: number, barIndex: number) {
    const beat = this.beatDuration;
    const eighth = beat / 2;
    const sixteenth = beat / 4;

    // Frequencies (Hz)
    // D3=146.83, F3=174.61, A3=220.00, C4=261.63, D4=293.66, E4=329.63, F4=349.23, G4=392.00, A4=440.00, B4=493.88, C5=523.25, D5=587.33, E5=659.25, F5=698.46, A5=880.00

    const harpChords: number[][] = [
      // 0: Dm9 (D3, A3, C4, E4, F4, A4, C5, D5)
      [146.83, 220.00, 261.63, 329.63, 349.23, 440.00, 523.25, 587.33],
      // 1: F Maj7 (F3, C4, E4, A4, C5, E5, F5, A5)
      [174.61, 261.63, 329.63, 440.00, 523.25, 659.25, 698.46, 880.00],
      // 2: C Maj9 (C3, G3, D4, E4, G4, B4, D5, G5)
      [130.81, 196.00, 293.66, 329.63, 392.00, 493.88, 587.33, 783.99],
      // 3: G Sus4 / Greek Dorian (G3, D4, G4, A4, C5, D5, G5, A5)
      [196.00, 293.66, 392.00, 440.00, 523.25, 587.33, 783.99, 880.00],
      // 4: Bb Maj7 (Bb2, F3, A3, D4, F4, A4, D5, F5)
      [116.54, 174.61, 220.00, 293.66, 349.23, 440.00, 587.33, 698.46],
      // 5: Am7 (A2, E3, G3, C4, E4, G4, C5, E5)
      [110.00, 164.81, 196.00, 261.63, 329.63, 392.00, 523.25, 659.25],
      // 6: Dm (D3, A3, D4, F4, A4, D5, F5, A5)
      [146.83, 220.00, 293.66, 349.23, 440.00, 587.33, 698.46, 880.00],
      // 7: A Phrygian Cadence (A2, E3, A3, C#4, E4, G4, A4, C#5)
      [110.00, 164.81, 220.00, 277.18, 329.63, 392.00, 440.00, 554.37],
      // 8: Dm9 Glissando Ascending
      [146.83, 220.00, 293.66, 329.63, 349.23, 440.00, 523.25, 587.33],
      // 9: G / Greek Mixolydian (G2, D3, B3, D4, G4, B4, D5, G5)
      [98.00, 146.83, 246.94, 293.66, 392.00, 493.88, 587.33, 783.99],
      // 10: C Maj7 (C3, G3, B3, E4, G4, B4, C5, E5)
      [130.81, 196.00, 246.94, 329.63, 392.00, 493.88, 523.25, 659.25],
      // 11: F Maj9 (F2, C3, A3, E4, G4, A4, C5, E5)
      [87.31, 130.81, 220.00, 329.63, 392.00, 440.00, 523.25, 659.25],
      // 12: Bb Maj9 Cascading Harp Arpeggio
      [116.54, 174.61, 261.63, 293.66, 349.23, 466.16, 523.25, 587.33],
      // 13: C9 (C3, G3, D4, E4, Bb4, D5, E5, G5)
      [130.81, 196.00, 293.66, 329.63, 466.16, 587.33, 659.25, 783.99],
      // 14: Dm9 (D3, A3, F4, A4, C5, E5, F5, A5)
      [146.83, 220.00, 349.23, 440.00, 523.25, 659.25, 698.46, 880.00],
      // 15: D Major Radiant Resolve (D3, A3, F#4, A4, D5, F#5, A5, D6)
      [146.83, 220.00, 369.99, 440.00, 587.33, 739.99, 880.00, 1174.66],
    ];

    const notes = harpChords[barIndex] || harpChords[0];

    // Every 4th bar, perform a rapid cascading harp sweep across the strings
    if (barIndex % 4 === 3) {
      notes.forEach((freq, idx) => {
        const sweepTime = startTime + idx * (sixteenth * 0.75);
        this.pluckHarpString(freq, sweepTime, 0.85 + (idx % 2) * 0.15, 3.8);
      });
    } else {
      // Flowing 8-note harp arpeggio (gentle thumb & fingers wave)
      const patternOrder = [0, 2, 4, 6, 7, 5, 3, 1];
      patternOrder.forEach((noteIdx, step) => {
        const freq = notes[noteIdx] || notes[0];
        const stepTime = startTime + step * eighth;
        const velocity = step === 0 ? 1.0 : (step === 4 ? 0.85 : 0.65);
        this.pluckHarpString(freq, stepTime, velocity, 3.4);
      });
    }
  }

  // 3. DEEP ACOUSTIC BASS HARP PILLAR NOTE (Beats 1 and 3)
  private playBassHarpNote(startTime: number, barIndex: number) {
    const bassRoots = [
      73.42, // D2
      87.31, // F2
      65.41, // C2
      98.00, // G2
      58.27, // Bb1
      55.00, // A1
      73.42, // D2
      55.00, // A1
      73.42, // D2
      98.00, // G2
      65.41, // C2
      87.31, // F2
      58.27, // Bb1
      65.41, // C2
      73.42, // D2
      73.42, // D2 (Major)
    ];

    const root = bassRoots[barIndex] || 73.42;

    // Deep fundamental on beat 1
    this.pluckHarpString(root, startTime, 1.1, 4.5);

    // Warm fifth overtone on beat 3
    this.pluckHarpString(root * 1.5, startTime + this.beatDuration * 2, 0.7, 3.8);
  }

  // 4. ANCIENT GREEK AULOS / WOODEN PAN FLUTE MELODY
  private playAncientAulosMelody(startTime: number, barIndex: number) {
    const ctx = this.ctx;
    if (!ctx || !this.masterGain) return;

    // Melody enters after bar 1 for meditative emergence
    if (barIndex === 0) return;

    const beat = this.beatDuration;

    interface FluteNote {
      time: number;
      freq: number;
      dur: number;
    }

    const fluteMelodies: Record<number, FluteNote[]> = {
      // Bar 1: Serene introductory pastoral phrase (A4 -> C5 -> D5)
      1: [
        { time: 0, freq: 440.00, dur: beat * 1.6 },
        { time: beat * 1.8, freq: 523.25, dur: beat * 0.9 },
        { time: beat * 2.8, freq: 587.33, dur: beat * 1.1 },
      ],
      // Bar 2: Gentle descent (E5 -> D5 -> A4)
      2: [
        { time: 0, freq: 659.25, dur: beat * 1.8 },
        { time: beat * 2.0, freq: 587.33, dur: beat * 0.9 },
        { time: beat * 3.0, freq: 440.00, dur: beat * 0.9 },
      ],
      // Bar 3: Lingering breath (G4 -> A4)
      3: [
        { time: 0, freq: 392.00, dur: beat * 1.5 },
        { time: beat * 1.6, freq: 440.00, dur: beat * 2.2 },
      ],
      // Bar 4: Regal Ancient Call (D5 -> F5)
      4: [
        { time: 0, freq: 587.33, dur: beat * 1.8 },
        { time: beat * 2.0, freq: 698.46, dur: beat * 1.8 },
      ],
      // Bar 5: High Pan Flute Crest (A5 -> G5 -> E5)
      5: [
        { time: 0, freq: 880.00, dur: beat * 1.6 },
        { time: beat * 1.8, freq: 783.99, dur: beat * 1.0 },
        { time: beat * 2.9, freq: 659.25, dur: beat * 1.0 },
      ],
      // Bar 6: Lydian Ornament (F5 -> E5 -> D5)
      6: [
        { time: 0, freq: 698.46, dur: beat * 1.4 },
        { time: beat * 1.5, freq: 659.25, dur: beat * 1.0 },
        { time: beat * 2.6, freq: 587.33, dur: beat * 1.3 },
      ],
      // Bar 7: Phrygian Suspense (C#5 -> D5)
      7: [
        { time: 0, freq: 554.37, dur: beat * 1.6 },
        { time: beat * 1.8, freq: 587.33, dur: beat * 2.0 },
      ],
      // Bar 8: High Mythic Arc
      8: [
        { time: 0, freq: 587.33, dur: beat * 1.4 },
        { time: beat * 1.5, freq: 783.99, dur: beat * 1.0 },
        { time: beat * 2.6, freq: 880.00, dur: beat * 1.3 },
      ],
      // Bar 9: High C6 Whisper
      9: [
        { time: 0, freq: 1046.50, dur: beat * 2.2 },
        { time: beat * 2.4, freq: 880.00, dur: beat * 1.4 },
      ],
      // Bar 10: Graceful Descending Run (G5 -> F5 -> D5)
      10: [
        { time: 0, freq: 783.99, dur: beat * 1.2 },
        { time: beat * 1.3, freq: 698.46, dur: beat * 1.2 },
        { time: beat * 2.6, freq: 587.33, dur: beat * 1.3 },
      ],
      // Bar 11: Warm Sacred Breath (C5 -> D5)
      11: [
        { time: 0, freq: 523.25, dur: beat * 1.8 },
        { time: beat * 2.0, freq: 587.33, dur: beat * 1.8 },
      ],
      // Bars 12-15: Final Hymn Phrase
      12: [
        { time: 0, freq: 698.46, dur: beat * 1.8 },
        { time: beat * 2.0, freq: 880.00, dur: beat * 1.8 },
      ],
      13: [
        { time: 0, freq: 1046.50, dur: beat * 1.8 },
        { time: beat * 2.0, freq: 880.00, dur: beat * 1.8 },
      ],
      14: [
        { time: 0, freq: 698.46, dur: beat * 1.8 },
        { time: beat * 2.0, freq: 587.33, dur: beat * 1.8 },
      ],
      15: [
        { time: 0, freq: 739.99, dur: beat * 1.5 }, // F#5 (Tierce de Picardie)
        { time: beat * 1.6, freq: 587.33, dur: beat * 2.3 }, // D5 resolve
      ],
    };

    const notes = fluteMelodies[barIndex] || [];

    notes.forEach((n) => {
      const noteStart = startTime + n.time;
      const dur = n.dur;

      // Wooden Pipe Physical Modeling: Sine wave + gentle breath vibrato + soft turbulence
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      const vibrato = ctx.createOscillator();
      const vibratoGain = ctx.createGain();

      osc.type = 'sine';
      osc.frequency.setValueAtTime(n.freq, noteStart);

      // Subtle 4.8 Hz human breath vibrato
      vibrato.frequency.setValueAtTime(4.8, noteStart);
      vibratoGain.gain.setValueAtTime(2.2, noteStart);
      vibrato.connect(osc.frequency);

      // Flute envelope: Soft breath attack, gentle sustain, trailing release
      gain.gain.setValueAtTime(0.0001, noteStart);
      gain.gain.linearRampToValueAtTime(0.13, noteStart + 0.12);
      gain.gain.setValueAtTime(0.12, noteStart + dur - 0.1);
      gain.gain.exponentialRampToValueAtTime(0.00001, noteStart + dur + 0.25);

      osc.connect(gain);
      gain.connect(this.masterGain!);

      vibrato.start(noteStart);
      osc.start(noteStart);
      osc.stop(noteStart + dur + 0.3);
      vibrato.stop(noteStart + dur + 0.3);
    });
  }

  // 5. TEMPLE SANCTUARY ETHEREAL DRONE (No drums, pure acoustic hall atmosphere)
  private playTempleAtmosphere(startTime: number, barIndex: number) {
    const ctx = this.ctx;
    if (!ctx || !this.masterGain) return;

    const measure = this.measureDuration;
    const droneRoots = [146.83, 174.61, 130.81, 196.00];
    const root = droneRoots[barIndex % 4];

    [root, root * 1.5].forEach((freq) => {
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      const filter = ctx.createBiquadFilter();

      osc.type = 'triangle';
      osc.frequency.setValueAtTime(freq, startTime);

      filter.type = 'lowpass';
      filter.frequency.setValueAtTime(450, startTime);
      filter.Q.setValueAtTime(1.5, startTime);

      gain.gain.setValueAtTime(0.0001, startTime);
      gain.gain.linearRampToValueAtTime(0.07, startTime + measure * 0.4);
      gain.gain.setValueAtTime(0.07, startTime + measure * 0.7);
      gain.gain.exponentialRampToValueAtTime(0.0001, startTime + measure);

      osc.connect(filter);
      filter.connect(gain);
      gain.connect(this.masterGain!);

      osc.start(startTime);
      osc.stop(startTime + measure + 0.1);
    });
  }

  // =========================================================================
  // INTERACTIVE SOUND EFFECTS
  // =========================================================================

  // Authentic Roman Parchment Scroll Unrolling Sound Effect
  public playParchmentRoll() {
    const ctx = this.getContext();
    if (!ctx || !this.masterGain) return;

    if (ctx.state === 'suspended') {
      ctx.resume().catch(() => {});
    }

    try {
      const now = ctx.currentTime;
      const duration = 0.85;

      const bufferSize = Math.floor(ctx.sampleRate * duration);
      const noiseBuffer = ctx.createBuffer(1, bufferSize, ctx.sampleRate);
      const output = noiseBuffer.getChannelData(0);

      let b0 = 0, b1 = 0, b2 = 0;
      for (let i = 0; i < bufferSize; i++) {
        const white = Math.random() * 2 - 1;
        b0 = 0.99886 * b0 + white * 0.0555179;
        b1 = 0.99332 * b1 + white * 0.0750759;
        b2 = 0.96900 * b2 + white * 0.1538520;
        const pink = b0 + b1 + b2 + white * 0.5362;
        output[i] = pink * 0.22 * (1 + 0.3 * Math.sin((i / bufferSize) * Math.PI * 18));
      }

      const noiseSource = ctx.createBufferSource();
      noiseSource.buffer = noiseBuffer;

      const paperFilter = ctx.createBiquadFilter();
      paperFilter.type = 'bandpass';
      paperFilter.frequency.setValueAtTime(650, now);
      paperFilter.frequency.exponentialRampToValueAtTime(2400, now + 0.35);
      paperFilter.frequency.exponentialRampToValueAtTime(750, now + duration);
      paperFilter.Q.setValueAtTime(2.2, now);

      const paperGain = ctx.createGain();
      paperGain.gain.setValueAtTime(0.001, now);
      paperGain.gain.linearRampToValueAtTime(0.4, now + 0.12);
      paperGain.gain.linearRampToValueAtTime(0.28, now + 0.45);
      paperGain.gain.exponentialRampToValueAtTime(0.0001, now + duration);

      noiseSource.connect(paperFilter);
      paperFilter.connect(paperGain);
      paperGain.connect(this.masterGain);
      noiseSource.start(now);

      // Wooden Spindle Dowel Glide
      const dowelOsc = ctx.createOscillator();
      const dowelGain = ctx.createGain();
      dowelOsc.type = 'triangle';
      dowelOsc.frequency.setValueAtTime(220, now);
      dowelOsc.frequency.exponentialRampToValueAtTime(360, now + 0.3);
      dowelOsc.frequency.exponentialRampToValueAtTime(140, now + duration);

      dowelGain.gain.setValueAtTime(0.0001, now);
      dowelGain.gain.linearRampToValueAtTime(0.14, now + 0.15);
      dowelGain.gain.exponentialRampToValueAtTime(0.0001, now + duration * 0.85);

      dowelOsc.connect(dowelGain);
      dowelGain.connect(this.masterGain);
      dowelOsc.start(now);
      dowelOsc.stop(now + duration);
    } catch {}
  }

  // Classic Chime Accent
  public playChime(pitchMultiplier = 1) {
    const ctx = this.getContext();
    if (!ctx || !this.masterGain) return;

    if (ctx.state === 'suspended') {
      ctx.resume().catch(() => {});
    }

    try {
      const now = ctx.currentTime;
      const baseFreq = 523.25 * pitchMultiplier;

      const partials = [
        { freq: baseFreq, gain: 0.32, decay: 2.2 },
        { freq: baseFreq * 1.5, gain: 0.22, decay: 1.8 },
        { freq: baseFreq * 2.0, gain: 0.14, decay: 1.4 },
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

  // Sanctuary Flame Ignition
  public playAweInspiringIgnition(intensity = 1.5) {
    const ctx = this.getContext();
    if (!ctx || !this.masterGain) return;

    if (ctx.state === 'suspended') {
      ctx.resume().catch(() => {});
    }

    try {
      const now = ctx.currentTime;
      const triad = [261.63, 392.00, 523.25];
      triad.forEach((freq, idx) => {
        const osc = ctx.createOscillator();
        const g = ctx.createGain();

        osc.type = idx === 0 ? 'triangle' : 'sine';
        osc.frequency.setValueAtTime(freq, now);

        g.gain.setValueAtTime(0.0001, now);
        g.gain.linearRampToValueAtTime(0.2 * intensity, now + 0.2);
        g.gain.exponentialRampToValueAtTime(0.00001, now + 1.8);

        osc.connect(g);
        if (this.masterGain) g.connect(this.masterGain);

        osc.start(now);
        osc.stop(now + 1.9);
      });
      this.playChime(1.5);
    } catch {}
  }

  public playSparkles() {
    const ctx = this.getContext();
    if (!ctx || !this.masterGain) return;

    if (ctx.state === 'suspended') {
      ctx.resume().catch(() => {});
    }

    try {
      const now = ctx.currentTime;
      const pitches = [1046.50, 1318.51, 1567.98, 2093.00];

      pitches.forEach((freq, idx) => {
        const delay = idx * 0.08;
        const osc = ctx.createOscillator();
        const g = ctx.createGain();

        osc.type = 'sine';
        osc.frequency.setValueAtTime(freq, now + delay);

        g.gain.setValueAtTime(0.0001, now + delay);
        g.gain.linearRampToValueAtTime(0.16, now + delay + 0.01);
        g.gain.exponentialRampToValueAtTime(0.00001, now + delay + 0.5);

        osc.connect(g);
        if (this.masterGain) g.connect(this.masterGain);

        osc.start(now + delay);
        osc.stop(now + delay + 0.6);
      });
    } catch {}
  }
}

export const sacredAudio = new SacredAudioEngine();
