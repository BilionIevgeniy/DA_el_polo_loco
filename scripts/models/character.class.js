import { MoveableObject } from "./moveable-object.class.js";
import {
  CHARACTER_WALK,
  CHARACTER_IDLE,
  CHARACTER_SLEEP,
  CHARACTER_JUMP,
  CHARACTER_HURT,
  CHARACTER_DEAD,
} from "./constants.js";

const IDLE_TIMEOUT_MS = 5000;
const SLEEP_TIMEOUT_MS = 15000;

/**
 * The player-controlled character with walk, jump, idle, sleep, hurt and dead states.
 */
export class Character extends MoveableObject {
  height = 280;
  width = 100;
  y = 155;
  groundY = 155;
  speed = 15;
  flipped = false;
  gravity = 2;
  verticalSpeed = 0;
  jumpStrength = 28;
  energy = 100;
  coins = 0;
  bottleCount = 0;
  lastActionTime = Date.now();

  hitbox = { offsetX: 20, offsetY: 110, width: 60, height: 155 };

  /**
   * @param {Canvas} canvas - Reference to the canvas/game world
   * @param {SoundManager} sounds
   */
  constructor(canvas) {
    super();
    this.canvas = canvas;
    this.sounds = canvas.sounds;
    this.preloadImages();
    this.startAnimation();
  }

  /** Preloads all character animation frames. */
  preloadImages() {
    this.loadImageByPath(CHARACTER_IDLE[0]);
    this.loadImagesByPath([
      ...CHARACTER_WALK,
      ...CHARACTER_IDLE,
      ...CHARACTER_SLEEP,
      ...CHARACTER_JUMP,
      ...CHARACTER_HURT,
      ...CHARACTER_DEAD,
    ]);
  }

  /** Starts the main character update loop at 60 fps. */
  startAnimation() {
    this.animInterval = setInterval(() => this.update(), 1000 / 60);
    this.imgInterval = setInterval(() => this.updateImage(), 80);
  }

  /** Updates physics, input, and camera every frame. */
  update() {
    this.applyGravity(CHARACTER_JUMP);
    this.handleKeyboard();
  }

  /** Selects and advances the correct animation frame. */
  updateImage() {
    if (this.isDead()) return this.changeMovementImg(CHARACTER_DEAD);
    if (this.isHurt()) return this.changeMovementImg(CHARACTER_HURT);
    if (this.isJumping) return;
    if (this.isMoving()) return this.changeMovementImg(CHARACTER_WALK);
    if (this.isSleeping()) return this.changeMovementImg(CHARACTER_SLEEP);
    this.changeMovementImg(CHARACTER_IDLE);
  }

  /** Processes keyboard input and moves the character. */
  handleKeyboard() {
    const kb = this.canvas.keyboard;
    if (kb.RIGHT && this.x < this.canvas.level.level_end_right_x)
      this.walkRight();
    if (kb.LEFT && this.x > this.canvas.level.level_end_left_x) this.walkLeft();
    if (kb.UP || kb.SPACE) this.tryJump();
    if (!kb.RIGHT && !kb.LEFT) this.sounds.pause("walk");
  }

  /** Moves character right and updates camera. */
  walkRight() {
    this.moveRight();
    this.canvas.kamera_x -= this.speed;
    this.lastActionTime = Date.now();
    this.sounds.play("walk");
  }

  /** Moves character left and updates camera. */
  walkLeft() {
    this.moveLeft();
    this.canvas.kamera_x += this.speed;
    this.flipped = true;
    this.lastActionTime = Date.now();
    this.sounds.play("walk");
  }

  /** Initiates a jump if grounded. */
  tryJump() {
    if (this.isJumping) return;
    this.jump();
    this.lastActionTime = Date.now();
    this.sounds.play("jump");
  }

  /** @returns {boolean} True if character has been moving recently */
  isMoving() {
    return this.canvas.keyboard.LEFT || this.canvas.keyboard.RIGHT;
  }

  /** @returns {boolean} True when idle for > SLEEP_TIMEOUT_MS */
  isSleeping() {
    return Date.now() - this.lastActionTime > SLEEP_TIMEOUT_MS;
  }

  /**
   * Applies a hit and plays the hurt sound.
   * @param {number} [amount=5]
   */
  hit(amount = 5) {
    super.hit(amount);
    this.sounds.play("damage");
    if (this.isDead()) this.sounds.play("dead");
  }

  /**
   * Collects a coin and increments the coin counter.
   * @returns {number} New total coins (0–10 max)
   */
  collectCoin() {
    this.coins = Math.min(this.coins + 1, 10);
    this.sounds.play("coin");
    return this.coins;
  }

  /**
   * Collects a bottle and increments the bottle counter.
   * @returns {number} New total bottles (0–10 max)
   */
  collectBottle() {
    this.bottleCount = Math.min(this.bottleCount + 1, 10);
    this.sounds.play("bottle");
    return this.bottleCount;
  }
}
