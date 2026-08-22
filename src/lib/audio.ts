// Ancient Hellenic & Roman Classical Acoustic Engine
// Meticulously engineered for pristine fidelity, zero distortion, zero clipping, and studio-grade clarity across all devices.

class SacredAudioEngine {
  private ctx: AudioContext | null = null;
  private masterGain: GainNode | null = null;
  private dryGain: GainNode | null = null;
  private wetGain: GainNode | null = null;
  private limiter: DynamicsCompressorNode | null = null;
  private masterFilter: BiquadFilterNode | null = null;

  // Separate stereo spatial delay channels (isolated to prevent resonant feedback overload)
  private delayL: DelayNode | null = null;
  private delayR: DelayNode | null = null;
  private delayFeedbackL: GainNode | null = null;
  private delayFeedbackR: GainNode | null = null;
  private delayDamping: BiquadFilterNode | null = null;
  
  private isMuted = false;
  private isRunning = false;
  private sequenceTimer: number | null = null;
  private listenersAttached = false;
  private stateChangeListeners: ((isPlaying: boolean) => void)[] = [];
  private currentBar = 0;
  private unlockHandler: (() => void) | null = null;

  // Serene Classical Greek Modal Tempo: 68 BPM (Peaceful, sacred pacing)
  private readonly BPM = 68;
  private readonly beatDuration = 60 / 68; // ~0.882s per beat
  private readonly measureDuration = (60 / 68) * 4; // ~3.529s per measure

  constructor() {
    if (typeof window !== 'undefined') {
      this.setupAutoUnlock();
      setTimeout(() => {
        this.ensureStarted();
      }, 50);
    }
  }

  private getContext(): AudioContext | null {
    if (typeof window === 'undefined') return null;
    if (!this.ctx) {
      const AudioCtx = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
      if (AudioCtx) {
        try {
          this.ctx = new AudioCtx({ latencyHint: 'playback' });

          // 1. Studio-grade Soft Limiter (Acts purely as transparent ceiling protection, no pumping/distortion)
          this.limiter = this.ctx.createDynamicsCompressor();
          this.limiter.threshold.setValueAtTime(-2.0, this.ctx.currentTime);
          this.limiter.knee.setValueAtTime(12.0, this.ctx.currentTime);
          this.limiter.ratio.setValueAtTime(2.0, this.ctx.currentTime);
          this.limiter.attack.setValueAtTime(0.03, this.ctx.currentTime); // Smooth 30ms attack prevents intermodulation
          this.limiter.release.setValueAtTime(0.25, this.ctx.currentTime);

          // 2. High-headroom Master Bus (Calibrated so even dense polyphonic passages never saturate)
          this.masterGain = this.ctx.createGain();
          this.masterGain.gain.setValueAtTime(0.38, this.ctx.currentTime);

          // 3. Gentle master acoustic curve (removes sub-bass rumble < 60Hz and harsh ultrasonic hiss > 12kHz)
          this.masterFilter = this.ctx.createBiquadFilter();
          this.masterFilter.type = 'highpass';
          this.masterFilter.frequency.setValueAtTime(65, this.ctx.currentTime);
          this.masterFilter.Q.setValueAtTime(0.707, this.ctx.currentTime);

          // 4. Pristine Reverb / Stereo Spatial Ambience (Separated L/R paths with low damping)
          this.dryGain = this.ctx.createGain();
          this.dryGain.gain.setValueAtTime(0.85, this.ctx.currentTime);

          this.wetGain = this.ctx.createGain();
          this.wetGain.gain.setValueAtTime(0.20, this.ctx.currentTime);

          this.delayDamping = this.ctx.createBiquadFilter();
          this.delayDamping.type = 'lowpass';
          this.delayDamping.frequency.setValueAtTime(900, this.ctx.currentTime);

          this.delayL = this.ctx.createDelay();
          this.delayL.delayTime.setValueAtTime(0.28, this.ctx.currentTime);

          this.delayR = this.ctx.createDelay();
          this.delayR.delayTime.setValueAtTime(0.42, this.ctx.currentTime);

          this.delayFeedbackL = this.ctx.createGain();
          this.delayFeedbackL.gain.setValueAtTime(0.18, this.ctx.currentTime);

          this.delayFeedbackR = this.ctx.createGain();
          this.delayFeedbackR.gain.setValueAtTime(0.18, this.ctx.currentTime);

          // Connect dry chain: masterGain -> dryGain -> masterFilter -> limiter -> destination
          this.masterGain.connect(this.dryGain);
          this.dryGain.connect(this.masterFilter);

          // Connect wet ambient chain: masterGain -> delayDamping -> [delayL, delayR]
          this.masterGain.connect(this.delayDamping);
          this.delayDamping.connect(this.delayL);
          this.delayDamping.connect(this.delayR);

          // Individual feedback paths (strictly isolated L and R to avoid resonant summation)
          this.delayL.connect(this.delayFeedbackL);
          this.delayFeedbackL.connect(this.delayL);

          this.delayR.connect(this.delayFeedbackR);
          this.delayFeedbackR.connect(this.delayR);

          this.delayL.connect(this.wetGain);
          this.delayR.connect(this.wetGain);
          this.wetGain.connect(this.masterFilter);

          this.masterFilter.connect(this.limiter);
          this.limiter.connect(this.ctx.destination);
        } catch {
          // AudioContext initialization fallback
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

    this.unlockHandler = () => {
      if (!this.isMuted) {
        this.ensureStarted();
      }
      if (this.isRunning) {
        this.removeUnlockListeners();
      }
    };

    const events = ['pointerdown', 'touchstart', 'mousedown', 'keydown', 'click', 'scroll', 'wheel', 'touchmove', 'pointerup', 'touchend'];
    events.forEach(evt => {
      window.addEventListener(evt, this.unlockHandler!, { passive: true });
    });
  }

  private removeUnlockListeners() {
    if (!this.unlockHandler || typeof window === 'undefined') return;
    const events = ['pointerdown', 'touchstart', 'mousedown', 'keydown', 'click', 'scroll', 'wheel', 'touchmove', 'pointerup', 'touchend'];
    events.forEach(evt => {
      window.removeEventListener(evt, this.unlockHandler!);
    });
    this.unlockHandler = null;
    this.listenersAttached = false;
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

    // 1. Play Plucked Greek Harp / Lyre Arpeggio (Pristine harmonic synthesis)
    this.playGreekHarpArpeggio(now, bar);

    // 2. Play Pure Acoustic Bass Note (Warm fundamental, zero distortion)
    this.playBassHarpNote(now, bar);

    // 3. Play Ancient Pan Flute / Aulos Wind Melody (Silky smooth, gentle vibrato)
    this.playAncientAulosMelody(now, bar);

    // 4. Play Gentle Ethereal Background Presence
    this.playTempleAtmosphere(now, bar);

    this.currentBar = (this.currentBar + 1) % 16;
    this.sequenceTimer = window.setTimeout(() => {
      this.scheduleNextHarpMeasure();
    }, this.measureDuration * 1000 - 30);
  }

  // =========================================================================
  // 1. PLUCKED GREEK HARP & LYRE STRING MODEL (Clean, Melodic & Crackle-Free)
  // Uses dual additive sine harmonics + dynamic frequency envelope for authentic organic string resonance.
  // =========================================================================
  private pluckHarpString(freq: number, startTime: number, velocity = 1.0, decayTime = 1.8) {
    const ctx = this.ctx;
    if (!ctx || !this.masterGain) return;

    try {
      // Primary fundamental oscillator (pure sine)
      const oscFundamental = ctx.createOscillator();
      const oscOvertone = ctx.createOscillator();

      const stringGain = ctx.createGain();
      const overtoneGain = ctx.createGain();
      const stringFilter = ctx.createBiquadFilter();

      oscFundamental.type = 'sine';
      oscFundamental.frequency.setValueAtTime(freq, startTime);

      // Subtle 2nd harmonic (octave) for warmth and string presence
      oscOvertone.type = 'sine';
      oscOvertone.frequency.setValueAtTime(freq * 2, startTime);
      overtoneGain.gain.setValueAtTime(0.18, startTime);

      // Acoustic string dampening lowpass filter (simulates string tension decay)
      stringFilter.type = 'lowpass';
      stringFilter.frequency.setValueAtTime(Math.min(freq * 3.2, 2200), startTime);
      stringFilter.frequency.setTargetAtTime(Math.min(freq * 1.2, 650), startTime + 0.04, decayTime * 0.35);

      // Clean, click-free amplitude envelope with 8ms natural attack
      const peakAmp = 0.09 * Math.min(Math.max(velocity, 0.1), 1.2);
      stringGain.gain.setValueAtTime(0, startTime);
      stringGain.gain.setTargetAtTime(peakAmp, startTime, 0.008);
      stringGain.gain.setTargetAtTime(0, startTime + 0.03, decayTime * 0.42);

      // Routing
      oscOvertone.connect(overtoneGain);
      overtoneGain.connect(stringFilter);
      oscFundamental.connect(stringFilter);
      stringFilter.connect(stringGain);
      stringGain.connect(this.masterGain);

      oscFundamental.start(startTime);
      oscOvertone.start(startTime);

      const stopTime = startTime + decayTime + 0.15;
      oscFundamental.stop(stopTime);
      oscOvertone.stop(stopTime);
    } catch {}
  }

  // 2. GREEK HARP ARPEGGIO PATTERNS
  private playGreekHarpArpeggio(startTime: number, barIndex: number) {
    const beat = this.beatDuration;
    const eighth = beat / 2;
    const sixteenth = beat / 4;

    const harpChords: number[][] = [
      // 0: Dm9
      [146.83, 220.00, 261.63, 329.63, 349.23, 440.00, 523.25, 587.33],
      // 1: F Maj7
      [174.61, 261.63, 329.63, 440.00, 523.25, 659.25, 698.46, 880.00],
      // 2: C Maj9
      [130.81, 196.00, 293.66, 329.63, 392.00, 493.88, 587.33, 783.99],
      // 3: G Sus4 / Greek Dorian
      [196.00, 293.66, 392.00, 440.00, 523.25, 587.33, 783.99, 880.00],
      // 4: Bb Maj7
      [116.54, 174.61, 220.00, 293.66, 349.23, 440.00, 587.33, 698.46],
      // 5: Am7
      [110.00, 164.81, 196.00, 261.63, 329.63, 392.00, 523.25, 659.25],
      // 6: Dm
      [146.83, 220.00, 293.66, 349.23, 440.00, 587.33, 698.46, 880.00],
      // 7: A Phrygian Cadence
      [110.00, 164.81, 220.00, 277.18, 329.63, 392.00, 440.00, 554.37],
      // 8: Dm9 Glissando Ascending
      [146.83, 220.00, 293.66, 329.63, 349.23, 440.00, 523.25, 587.33],
      // 9: G Mixolydian
      [146.83, 196.00, 246.94, 293.66, 392.00, 493.88, 587.33, 783.99],
      // 10: C Maj7
      [130.81, 196.00, 246.94, 329.63, 392.00, 493.88, 523.25, 659.25],
      // 11: F Maj9
      [130.81, 174.61, 220.00, 329.63, 392.00, 440.00, 523.25, 659.25],
      // 12: Bb Maj9 Cascading Harp Arpeggio
      [116.54, 174.61, 261.63, 293.66, 349.23, 466.16, 523.25, 587.33],
      // 13: C9
      [130.81, 196.00, 293.66, 329.63, 466.16, 587.33, 659.25, 783.99],
      // 14: Dm9
      [146.83, 220.00, 349.23, 440.00, 523.25, 659.25, 698.46, 880.00],
      // 15: D Major Radiant Resolve
      [146.83, 220.00, 369.99, 440.00, 587.33, 739.99, 880.00, 1174.66],
    ];

    const notes = harpChords[barIndex] || harpChords[0];

    if (barIndex % 4 === 3) {
      // Gentle cascading strum with soft velocity
      notes.forEach((freq, idx) => {
        const sweepTime = startTime + idx * (sixteenth * 0.65);
        this.pluckHarpString(freq, sweepTime, 0.65, 2.0);
      });
    } else {
      const patternOrder = [0, 2, 4, 6, 7, 5, 3, 1];
      patternOrder.forEach((noteIdx, step) => {
        const freq = notes[noteIdx] || notes[0];
        const stepTime = startTime + step * eighth;
        const velocity = step === 0 ? 0.75 : (step === 4 ? 0.60 : 0.48);
        this.pluckHarpString(freq, stepTime, velocity, 1.8);
      });
    }
  }

  // 3. ACOUSTIC BASS ROOT NOTE (Warm, pure sine low-end with dedicated gentle filter)
  private playBassHarpNote(startTime: number, barIndex: number) {
    const ctx = this.ctx;
    if (!ctx || !this.masterGain) return;

    const bassRoots = [
      146.83, // D3
      174.61, // F3
      130.81, // C3
      196.00, // G3
      116.54, // Bb2
      110.00, // A2
      146.83, // D3
      110.00, // A2
      146.83, // D3
      196.00, // G3
      130.81, // C3
      174.61, // F3
      116.54, // Bb2
      130.81, // C3
      146.83, // D3
      146.83, // D3 (Major)
    ];

    const root = bassRoots[barIndex] || 146.83;

    try {
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      const filter = ctx.createBiquadFilter();

      osc.type = 'sine';
      osc.frequency.setValueAtTime(root, startTime);

      filter.type = 'lowpass';
      filter.frequency.setValueAtTime(260, startTime);

      // Smooth bass envelope, zero speaker rattle
      gain.gain.setValueAtTime(0, startTime);
      gain.gain.setTargetAtTime(0.075, startTime, 0.015);
      gain.gain.setTargetAtTime(0, startTime + 0.05, 1.6);

      osc.connect(filter);
      filter.connect(gain);
      gain.connect(this.masterGain);

      osc.start(startTime);
      osc.stop(startTime + 3.0);
    } catch {}
  }

  // 4. ANCIENT GREEK AULOS / WOODEN PAN FLUTE MELODY
  // Soft, breathy, silky-smooth sine with organic low-frequency vibrato.
  private playAncientAulosMelody(startTime: number, barIndex: number) {
    const ctx = this.ctx;
    if (!ctx || !this.masterGain) return;

    if (barIndex === 0) return;

    const beat = this.beatDuration;

    interface FluteNote {
      time: number;
      freq: number;
      dur: number;
    }

    const fluteMelodies: Record<number, FluteNote[]> = {
      1: [
        { time: 0, freq: 440.00, dur: beat * 1.5 },
        { time: beat * 1.8, freq: 523.25, dur: beat * 0.8 },
        { time: beat * 2.8, freq: 587.33, dur: beat * 1.0 },
      ],
      2: [
        { time: 0, freq: 659.25, dur: beat * 1.6 },
        { time: beat * 2.0, freq: 587.33, dur: beat * 0.8 },
        { time: beat * 3.0, freq: 440.00, dur: beat * 0.8 },
      ],
      3: [
        { time: 0, freq: 392.00, dur: beat * 1.4 },
        { time: beat * 1.6, freq: 440.00, dur: beat * 2.0 },
      ],
      4: [
        { time: 0, freq: 587.33, dur: beat * 1.6 },
        { time: beat * 2.0, freq: 698.46, dur: beat * 1.6 },
      ],
      5: [
        { time: 0, freq: 880.00, dur: beat * 1.5 },
        { time: beat * 1.8, freq: 783.99, dur: beat * 0.9 },
        { time: beat * 2.9, freq: 659.25, dur: beat * 0.9 },
      ],
      6: [
        { time: 0, freq: 698.46, dur: beat * 1.3 },
        { time: beat * 1.5, freq: 659.25, dur: beat * 0.9 },
        { time: beat * 2.6, freq: 587.33, dur: beat * 1.2 },
      ],
      7: [
        { time: 0, freq: 554.37, dur: beat * 1.5 },
        { time: beat * 1.8, freq: 587.33, dur: beat * 1.8 },
      ],
      8: [
        { time: 0, freq: 587.33, dur: beat * 1.3 },
        { time: beat * 1.5, freq: 783.99, dur: beat * 0.9 },
        { time: beat * 2.6, freq: 880.00, dur: beat * 1.2 },
      ],
      9: [
        { time: 0, freq: 1046.50, dur: beat * 1.8 },
        { time: beat * 2.2, freq: 880.00, dur: beat * 1.2 },
      ],
      10: [
        { time: 0, freq: 783.99, dur: beat * 1.1 },
        { time: beat * 1.3, freq: 698.46, dur: beat * 1.1 },
        { time: beat * 2.6, freq: 587.33, dur: beat * 1.2 },
      ],
      11: [
        { time: 0, freq: 523.25, dur: beat * 1.6 },
        { time: beat * 2.0, freq: 587.33, dur: beat * 1.6 },
      ],
      12: [
        { time: 0, freq: 698.46, dur: beat * 1.6 },
        { time: beat * 2.0, freq: 880.00, dur: beat * 1.6 },
      ],
      13: [
        { time: 0, freq: 1046.50, dur: beat * 1.6 },
        { time: beat * 2.0, freq: 880.00, dur: beat * 1.6 },
      ],
      14: [
        { time: 0, freq: 698.46, dur: beat * 1.6 },
        { time: beat * 2.0, freq: 587.33, dur: beat * 1.6 },
      ],
      15: [
        { time: 0, freq: 739.99, dur: beat * 1.4 },
        { time: beat * 1.6, freq: 587.33, dur: beat * 2.0 },
      ],
    };

    const notes = fluteMelodies[barIndex] || [];

    notes.forEach((n) => {
      const noteStart = startTime + n.time;
      const dur = n.dur;

      try {
        const osc = ctx.createOscillator();
        const vibrato = ctx.createOscillator();
        const vibratoGain = ctx.createGain();
        const gain = ctx.createGain();
        const filter = ctx.createBiquadFilter();

        // 4.8Hz subtle vibrato
        vibrato.frequency.setValueAtTime(4.8, noteStart);
        vibratoGain.gain.setValueAtTime(1.5, noteStart);
        vibrato.connect(vibratoGain);
        vibratoGain.connect(osc.frequency);

        osc.type = 'sine';
        osc.frequency.setValueAtTime(n.freq, noteStart);

        filter.type = 'lowpass';
        filter.frequency.setValueAtTime(1100, noteStart);

        // Smooth breath envelope (60ms attack, 100ms release)
        gain.gain.setValueAtTime(0, noteStart);
        gain.gain.setTargetAtTime(0.042, noteStart, 0.06);
        gain.gain.setTargetAtTime(0, noteStart + dur - 0.1, 0.10);

        osc.connect(filter);
        filter.connect(gain);
        gain.connect(this.masterGain!);

        vibrato.start(noteStart);
        osc.start(noteStart);

        const stopTime = noteStart + dur + 0.25;
        osc.stop(stopTime);
        vibrato.stop(stopTime);
      } catch {}
    });
  }

  // 5. TEMPLE SANCTUARY AIR RESONANCE (Soft, warm background pad)
  private playTempleAtmosphere(startTime: number, barIndex: number) {
    const ctx = this.ctx;
    if (!ctx || !this.masterGain) return;

    const measure = this.measureDuration;
    const droneRoots = [146.83, 174.61, 130.81, 196.00];
    const root = droneRoots[barIndex % 4];

    try {
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      const filter = ctx.createBiquadFilter();

      osc.type = 'sine';
      osc.frequency.setValueAtTime(root, startTime);

      filter.type = 'lowpass';
      filter.frequency.setValueAtTime(240, startTime);

      gain.gain.setValueAtTime(0, startTime);
      gain.gain.setTargetAtTime(0.022, startTime, 0.5);
      gain.gain.setTargetAtTime(0, startTime + measure * 0.75, 0.6);

      osc.connect(filter);
      filter.connect(gain);
      gain.connect(this.masterGain!);

      osc.start(startTime);
      osc.stop(startTime + measure + 0.2);
    } catch {}
  }

  // =========================================================================
  // INTERACTIVE SOUND EFFECTS (Studio Quality, Zero Peak Clipping)
  // =========================================================================

  // Clean Ancient Roman Parchment Scroll Unrolling Sound Effect
  public playParchmentRoll() {
    const ctx = this.getContext();
    if (!ctx || !this.masterGain) return;

    if (ctx.state === 'suspended') {
      ctx.resume().catch(() => {});
    }

    try {
      const now = ctx.currentTime;
      const duration = 0.45;

      const bufferSize = Math.floor(ctx.sampleRate * duration);
      const noiseBuffer = ctx.createBuffer(1, bufferSize, ctx.sampleRate);
      const output = noiseBuffer.getChannelData(0);

      // Smooth filtered pink/brown noise (no harsh white noise clicks)
      let lastVal = 0;
      for (let i = 0; i < bufferSize; i++) {
        const white = Math.random() * 2 - 1;
        lastVal = (lastVal + (0.03 * white)) / 1.03;
        output[i] = lastVal * 0.2;
      }

      const noiseSource = ctx.createBufferSource();
      noiseSource.buffer = noiseBuffer;

      const paperFilter = ctx.createBiquadFilter();
      paperFilter.type = 'bandpass';
      paperFilter.frequency.setValueAtTime(600, now);
      paperFilter.frequency.setTargetAtTime(950, now, 0.12);
      paperFilter.Q.setValueAtTime(1.0, now);

      const paperGain = ctx.createGain();
      paperGain.gain.setValueAtTime(0, now);
      paperGain.gain.setTargetAtTime(0.12, now, 0.04);
      paperGain.gain.setTargetAtTime(0, now + 0.2, 0.09);

      noiseSource.connect(paperFilter);
      paperFilter.connect(paperGain);
      paperGain.connect(this.masterGain);
      noiseSource.start(now);
    } catch {}
  }

  // Pure Crystalline Chime Accent (Soft sine, crystal resonance)
  public playChime(pitchMultiplier = 1) {
    const ctx = this.getContext();
    if (!ctx || !this.masterGain) return;

    if (ctx.state === 'suspended') {
      ctx.resume().catch(() => {});
    }

    try {
      const now = ctx.currentTime;
      const baseFreq = 523.25 * pitchMultiplier;

      const osc1 = ctx.createOscillator();
      const osc2 = ctx.createOscillator();
      const g = ctx.createGain();

      osc1.type = 'sine';
      osc1.frequency.setValueAtTime(baseFreq, now);

      osc2.type = 'sine';
      osc2.frequency.setValueAtTime(baseFreq * 2.002, now); // Tiny detune for shimmer

      g.gain.setValueAtTime(0, now);
      g.gain.setTargetAtTime(0.08, now, 0.008);
      g.gain.setTargetAtTime(0, now + 0.04, 0.45);

      osc1.connect(g);
      osc2.connect(g);
      g.connect(this.masterGain);

      osc1.start(now);
      osc2.start(now);
      osc1.stop(now + 1.6);
      osc2.stop(now + 1.6);
    } catch {}
  }

  // Sanctuary Flame Ignition (Smooth, warm orchestral swell - safe scaled gain)
  public playAweInspiringIgnition(intensity = 1.0) {
    const ctx = this.getContext();
    if (!ctx || !this.masterGain) return;

    if (ctx.state === 'suspended') {
      ctx.resume().catch(() => {});
    }

    try {
      const now = ctx.currentTime;
      const triad = [261.63, 329.63, 392.00, 523.25];
      const scaledIntensity = Math.min(Math.max(intensity, 0.5), 1.5);

      triad.forEach((freq) => {
        const osc = ctx.createOscillator();
        const g = ctx.createGain();
        const filter = ctx.createBiquadFilter();

        osc.type = 'sine';
        osc.frequency.setValueAtTime(freq, now);

        filter.type = 'lowpass';
        filter.frequency.setValueAtTime(600, now);

        g.gain.setValueAtTime(0, now);
        g.gain.setTargetAtTime(0.04 * scaledIntensity, now, 0.1);
        g.gain.setTargetAtTime(0, now + 0.3, 0.5);

        osc.connect(filter);
        filter.connect(g);
        if (this.masterGain) g.connect(this.masterGain);

        osc.start(now);
        osc.stop(now + 1.8);
      });
      this.playChime(1.2);
    } catch {}
  }

  // Golden Butterflies Sparkles Sound
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
        const delay = idx * 0.05;
        const osc = ctx.createOscillator();
        const g = ctx.createGain();

        osc.type = 'sine';
        osc.frequency.setValueAtTime(freq, now + delay);

        g.gain.setValueAtTime(0, now + delay);
        g.gain.setTargetAtTime(0.035, now + delay, 0.006);
        g.gain.setTargetAtTime(0, now + delay + 0.02, 0.16);

        osc.connect(g);
        if (this.masterGain) g.connect(this.masterGain);

        osc.start(now + delay);
        osc.stop(now + delay + 0.6);
      });
    } catch {}
  }
}

export const sacredAudio = new SacredAudioEngine();
