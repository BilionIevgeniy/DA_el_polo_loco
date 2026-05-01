/**
 * Manages all game sounds and mute state.
 * Persists mute preference in localStorage.
 */
export class SoundManager {
  static MUTE_KEY = "elPolloLoco_muted";
  sounds = {};

  constructor() {
    this.muted = localStorage.getItem(SoundManager.MUTE_KEY) === "true";
  }

  /**
   * Registers and returns an Audio instance.
   * @param {string} key - Unique identifier for the sound
   * @param {string} src - Path to the audio file
   * @param {boolean} [loop=false] - Whether the sound loops
   * @returns {HTMLAudioElement}
   */
  registerSound(key, src, loop = false) {
    const audio = new Audio(src);
    audio.loop = loop;
    audio.muted = this.muted;
    this.sounds[key] = audio;
    return audio;
  }

  /**
   * Plays a registered sound by key.
   * @param {string} key
   */
  play(key) {
    const sound = this.sounds[key];
    if (!sound || this.muted) return;
    if (key !== "walk") sound.currentTime = 0;
    sound.play().catch(() => {
      console.log("Error in sound");
    });
  }

  /**
   * Pauses a registered sound by key.
   * @param {string} key
   */
  pause(key) {
    const sound = this.sounds[key];
    if (sound) sound.pause();
  }

  /**
   * Stops all registered sounds.
   */
  stopAll() {
    Object.values(this.sounds).forEach((s) => {
      s.pause();
      s.currentTime = 0;
    });
  }

  /**
   * Toggles mute state and persists it to localStorage.
   * @returns {boolean} New muted state
   */
  toggleMute() {
    this.muted = !this.muted;
    localStorage.setItem(SoundManager.MUTE_KEY, this.muted);
    Object.values(this.sounds).forEach((s) => (s.muted = this.muted));
    return this.muted;
  }
}
