export class Keyboard {
  LEFT = false;
  RIGHT = false;
  UP = false;
  DOWN = false;
  SPACE = false;

  constructor() {
    window.addEventListener("keydown", (e) => this.keyDownHandler(e));
    window.addEventListener("keyup", (e) => this.keyUpHandler(e));
  }

  keyDownHandler(e) {
    switch (e.code) {
      case "ArrowLeft":
        this.LEFT = true;
        break;
      case "ArrowRight":
        this.RIGHT = true;
        break;
      case "ArrowUp":
        this.UP = true;
        break;
      case "ArrowDown":
        this.DOWN = true;
        break;
      case "Space":
        this.SPACE = true;
        break;
    }
    this.logState();
  }

  keyUpHandler(e) {
    switch (e.code) {
      case "ArrowLeft":
        this.LEFT = false;
        break;
      case "ArrowRight":
        this.RIGHT = false;
        break;
      case "ArrowUp":
        this.UP = false;
        break;
      case "ArrowDown":
        this.DOWN = false;
        break;
      case "Space":
        this.SPACE = false;
        break;
    }
    this.logState();
  }

  logState() {
    console.log(
      `LEFT: ${this.LEFT}, RIGHT: ${this.RIGHT}, UP: ${this.UP}, DOWN: ${this.DOWN}, SPACE: ${this.SPACE}`,
    );
  }
}
