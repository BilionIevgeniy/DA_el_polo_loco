import { MoveableObject } from "../moveable-object.class.js";
import {
  BOSS_WALK,
  BOSS_ALERT,
  BOSS_ATTACK,
  BOSS_HURT,
  BOSS_DEAD,
} from "../constants.js";

/** Endboss states. */
const STATE = {
  PATROL: "patrol",
  ALERT: "alert",
  ATTACK: "attack",
  HURT: "hurt",
  DEAD: "dead",
};

/**
 * The endboss chicken with multi-state AnimatioInterval: patrol → alert on player sight → attack.
 */
export class Endboss extends MoveableObject {
  y = 60;
  height = 400;
  width = 250;
  energy = 100;
  speed = 1.5;
  isDying = false;
  isDead = false;
  hasBeenIntroduced = false;

  hitbox = { offsetX: 40, offsetY: 80, width: 170, height: 300 };

  constructor() {
    super();
    this.x = 720 * 5 - 500;
    this.state = STATE.PATROL;
    const allPaths = [
      ...BOSS_WALK,
      ...BOSS_ALERT,
      ...BOSS_ATTACK,
      ...BOSS_HURT,
      ...BOSS_DEAD,
    ];
    this.loadImagesByPath(allPaths);
    this.img = this.imagesCacheByPaths[BOSS_ALERT[0]];
    this.startAnimation();
  }

  /**
   * Starts the boss AnimatioInterval and animation loop.
   */
  startAnimation() {
    this.imgInterval = setInterval(() => this.updateImage(), 150);
  }

  /**
   * Moves toward the player and updates AnimatioInterval state.
   * @param {number} playerX - Character's current x position
   */
  updateMovement(playerX = 0) {
    if (this.state === STATE.DEAD) return;
    if (this.state === STATE.HURT) return;
    if (this.state === STATE.ATTACK || this.state === STATE.ALERT) {
      this.chasePlayer(playerX);
    }
  }

  /**
   * Moves the boss toward the player position.
   * @param {number} playerX
   */
  chasePlayer(playerX) {
    if (playerX < this.x) {
      this.x -= this.speed;
      this.flipped = false;
    } else if (playerX > this.x) {
      this.x += this.speed;
      this.flipped = true;
    } else {
      this.x = STATE.ATTACK;
    }
  }

  /**
   * Transitions to alert state when the player first enters boss range.
   */
  triggerAlert() {
    if (this.hasBeenIntroduced) return;
    this.hasBeenIntroduced = true;
    this.state = STATE.ALERT;
    setTimeout(() => {
      if (this.state !== STATE.DEAD) this.state = STATE.ATTACK;
    }, 2000);
  }

  /**
   * Updates the current animation image based on AnimatioInterval state.
   */
  updateImage() {
    const map = {
      [STATE.PATROL]: BOSS_WALK,
      [STATE.ALERT]: BOSS_ALERT,
      [STATE.ATTACK]: BOSS_WALK,
      [STATE.HURT]: BOSS_HURT,
      [STATE.DEAD]: BOSS_DEAD,
    };
    this.changeMovementImg(map[this.state] || BOSS_WALK);
  }

  /**
   * Applies damage and briefly enters hurt state.
   * @param {number} [amount=20]
   */
  damagedBy(amount = 20) {
    if (this.state === STATE.DEAD) return;
    this.energy = Math.max(0, this.energy - amount);
    this.lastHitTime = Date.now();
    if (this.energy <= 0) {
      this.die();
      return;
    }
    this.state = STATE.HURT;
    setTimeout(() => {
      if (this.state !== STATE.DEAD) this.state = STATE.ATTACK;
    }, 800);
  }

  /** Triggers the death sequence. */
  die() {
    if (this.isDying) return;
    this.isDying = true;
    this.state = STATE.DEAD;
    setTimeout(() => {
      this.isDead = true;
    }, 1200);
  }
}
