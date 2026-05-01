import { MoveableObject } from "../moveable-object.class.js";
import { BOTTLE_ROTATION, BOTTLE_SPLASH } from "../constants.js";

/**
 * A bottle thrown by the character that travels until it hits something or the ground.
 */
export class ThrowableObject extends MoveableObject {
  width = 60;
  height = 80;
  speed = 12;
  isSplashing = false;
  hasHit = false;
  groundY = 380;

  hitbox = { offsetX: 5, offsetY: 5, width: 50, height: 65 };

  /**
   * @param {number} x - Starting world x
   * @param {number} y - Starting world y
   * @param {boolean} [throwLeft=false] - Direction of throw
   */
  constructor(x, y, throwLeft = false) {
    super();
    this.x = x;
    this.y = y;
    this.throwLeft = throwLeft;
    this.verticalSpeed = -10;
    this.loadImagesByPath([...BOTTLE_ROTATION, ...BOTTLE_SPLASH]);
    this.img = this.imagesByPaths[BOTTLE_ROTATION[0]];
    this.startAnimation();
  }

  /** Starts the throw movement and rotation animation loop. */
  startAnimation() {
    this.animationInterval = setInterval(() => this.updateFrame(), 50);
  }

  /** Updates position and animation each tick. */
  updateFrame() {
    if (this.isSplashing) {
      this.playSplash();
      return;
    }
    this.moveHorizontal();
    this.applyThrowGravity();
    this.changeMovementImg(BOTTLE_ROTATION);
  }

  /** Moves the bottle left or right depending on throw direction. */
  moveHorizontal() {
    this.throwLeft ? (this.x -= this.speed) : (this.x += this.speed);
  }

  /** Applies vertical gravity to the thrown bottle. */
  applyThrowGravity() {
    this.y += this.verticalSpeed;
    this.verticalSpeed += 1.5;
    if (this.y >= this.groundY) this.triggerSplash();
  }

  /** Triggers the splash animation when the bottle hits the ground. */
  triggerSplash() {
    this.isSplashing = true;
    this.currentImage = 0;
  }

  /** Advances the splash animation and marks done when finished. */
  playSplash() {
    if (this.currentImage >= BOTTLE_SPLASH.length) {
      clearInterval(this.animationInterval);
      this.hasHit = true;
      return;
    }
    this.img = this.imagesByPaths[BOTTLE_SPLASH[this.currentImage]];
    this.currentImage++;
  }

  /** Triggers a splash on enemy hit (not ground). */
  hitEnemy() {
    this.triggerSplash();
    this.speed = 0;
    this.verticalSpeed = 0;
  }
}
