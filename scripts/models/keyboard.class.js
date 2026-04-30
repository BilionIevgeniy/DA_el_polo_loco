/**
 * Tracks the state of keyboard keys and mobile touch buttons.
 */
export class Keyboard {
  LEFT  = false;
  RIGHT = false;
  UP    = false;
  DOWN  = false;
  SPACE = false;
  THROW = false;

  constructor() {
    window.addEventListener("keydown", (e) => this.onKeyDown(e));
    window.addEventListener("keyup",   (e) => this.onKeyUp(e));
    this.bindMobileButtons();
  }

  /**
   * Handles keydown events and maps them to action flags.
   * @param {KeyboardEvent} e
   */
  onKeyDown(e) {
    const map = {
      ArrowLeft:  "LEFT",
      ArrowRight: "RIGHT",
      ArrowUp:    "UP",
      ArrowDown:  "DOWN",
      Space:      "SPACE",
      KeyD:       "THROW",
    };
    if (map[e.code]) this[map[e.code]] = true;
  }

  /**
   * Handles keyup events and clears action flags.
   * @param {KeyboardEvent} e
   */
  onKeyUp(e) {
    const map = {
      ArrowLeft:  "LEFT",
      ArrowRight: "RIGHT",
      ArrowUp:    "UP",
      ArrowDown:  "DOWN",
      Space:      "SPACE",
      KeyD:       "THROW",
    };
    if (map[e.code]) this[map[e.code]] = false;
  }

  /**
   * Binds touch events on mobile control buttons to keyboard flags.
   */
  bindMobileButtons() {
    const bindings = {
      "btn-left":  "LEFT",
      "btn-right": "RIGHT",
      "btn-jump":  "UP",
      "btn-throw": "THROW",
    };
    Object.entries(bindings).forEach(([id, flag]) => {
      const el = document.getElementById(id);
      if (!el) return;
      el.addEventListener("touchstart", (e) => { e.preventDefault(); this[flag] = true;  }, { passive: false });
      el.addEventListener("touchend",   (e) => { e.preventDefault(); this[flag] = false; }, { passive: false });
      el.addEventListener("contextmenu", (e) => e.preventDefault());
    });
  }
}
