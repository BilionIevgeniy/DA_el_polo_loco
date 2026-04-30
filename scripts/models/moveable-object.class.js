import { DrawableObject } from "./drawable-object.class.js";

/**
 * Base class for all moveable game objects.
 * Handles drawing, image loading, animation, physics, and collision.
 */
export class MoveableObject extends DrawableObject {
  x = 100;
  y = 280;
  height = 150;
  width = 100;
  imagesByPaths = {};
  currentImage = 0;
  isJumping = false;
  jumpImagesPaths = [];
  animationTick = 0;
  animationSpeed = 4;
  showBoundingBox = false;
  energy = 100;
  flipped = false;
  speed = 1;
  verticalSpeed = 0;
  gravity = 2;
  jumpStrength = 28;
  groundY = 0;
  lastHitTime = 0;
  isDying = false;

  hitbox = { offsetX: 0, offsetY: 0, width: 0, height: 0 };

  constructor() {
    super();
  }

  /**
   * Advances the animation frame from the given image array.
   * @param {string[]} paths - Array of image paths to cycle through
   */
  changeMovementImg(paths) {
    const index = this.currentImage % paths.length;
    this.img = this.imagesByPaths[paths[index]];
    this.currentImage++;
  }

  /** Moves the object left by its speed. */
  moveLeft() {
    this.x -= this.speed;
  }

  /** Moves the object right by its speed. */
  moveRight() {
    this.x += this.speed;
    this.flipped = false;
  }

  /** Initiates a jump if not already jumping. */
  moveUp() {
    if (!this.isJumping) this.jump();
  }

  /** Initiates the jump physics. */
  jump() {
    this.isJumping = true;
    this.currentImage = 0;
    this.animationTick = 0;
    this.verticalSpeed = -this.jumpStrength;
  }

  /**
   * Applies gravity to a jumping object each frame.
   * @param {string[]} jumpPaths - Jump animation frame paths
   */
  applyGravity(jumpPaths) {
    if (!this.isJumping) return;

    this.animationTick++;
    if (this.animationTick % this.animationSpeed === 0) {
      this.changeMovementImg(jumpPaths);
    }

    this.y += this.verticalSpeed;
    this.verticalSpeed += this.gravity;

    if (this.y >= this.groundY) {
      this.y = this.groundY;
      this.verticalSpeed = 0;
      this.isJumping = false;
      this.currentImage = 0;
      this.animationTick = 0;
    }
  }

  /**
   * Starts an automatic leftward movement animation.
   * @returns {number} The interval ID
   */
  animateMovementLeft() {
    return setInterval(() => this.moveLeft(), 1000 / 60);
  }

  /**
   * Starts cycling through an image array at a given rate.
   * @param {string[]} paths - Image paths to cycle
   * @param {number} [intervalMs=200] - Milliseconds per frame
   * @returns {number} The interval ID
   */
  animateImageMovement(paths, intervalMs = 200) {
    return setInterval(() => this.changeMovementImg(paths), intervalMs);
  }

  /**
   * Draws the object on the canvas context.
   * @param {CanvasRenderingContext2D} ctx
   */
  draw(ctx) {
    if (!this.img) return;
    this.flipped ? this.drawFlipped(ctx) : this.drawNormal(ctx);
    if (this.showBoundingBox) this.drawBoundingBox(ctx);
  }

  /**
   * Draws the image normally.
   * @param {CanvasRenderingContext2D} ctx
   */
  drawNormal(ctx) {
    ctx.drawImage(this.img, this.x, this.y, this.width, this.height);
  }

  /**
   * Draws the image mirrored horizontally.
   * @param {CanvasRenderingContext2D} ctx
   */
  drawFlipped(ctx) {
    ctx.save();
    ctx.translate(this.x + this.width / 2, this.y + this.height / 2);
    ctx.scale(-1, 1);
    ctx.drawImage(
      this.img,
      -this.width / 2,
      -this.height / 2,
      this.width,
      this.height,
    );
    ctx.restore();
  }

  /**
   * Draws the hitbox rectangle for debugging.
   * @param {CanvasRenderingContext2D} ctx
   */
  drawBoundingBox(ctx) {
    const { offsetX, offsetY, width, height } = this.hitbox;
    ctx.strokeStyle = "rgba(255,0,0,0.8)";
    ctx.lineWidth = 2;
    ctx.strokeRect(this.x + offsetX, this.y + offsetY, width, height);
  }

  /**
   * Checks AABB collision between two moveable objects using their hitboxes.
   * @param {MoveableObject} a
   * @param {MoveableObject} b
   * @returns {boolean}
   */
  isColliding(a, b) {
    const r1 = this.getHitRect(a);
    const r2 = this.getHitRect(b);
    return (
      r1.bottom > r2.top &&
      r1.top < r2.bottom &&
      r1.right > r2.left &&
      r1.left < r2.right
    );
  }

  /**
   * Computes the world-space hit rectangle for an object.
   * @param {MoveableObject} obj
   * @returns {{left:number, right:number, top:number, bottom:number}}
   */
  getHitRect(obj) {
    return {
      left: obj.x + obj.hitbox.offsetX,
      right: obj.x + obj.hitbox.offsetX + obj.hitbox.width,
      top: obj.y + obj.hitbox.offsetY,
      bottom: obj.y + obj.hitbox.offsetY + obj.hitbox.height,
    };
  }

  /**
   * Reduces energy by the given amount and records the hit time.
   * @param {number} [amount=5] - Damage amount
   */
  hit(amount = 5) {
    if (this.energy <= 0) return;
    this.energy = Math.max(0, this.energy - amount);
    this.lastHitTime = Date.now();
  }

  /** @returns {boolean} True if energy is zero */
  isDead() {
    return this.energy <= 0;
  }

  /**
   * @returns {boolean} True if the object was hit within the last 500ms
   */
  isHurt() {
    return (Date.now() - this.lastHitTime) / 1000 < 0.5;
  }

  /**
   * Returns true if the given object is landing on top of this one.
   * @param {MoveableObject} jumper
   * @returns {boolean}
   */
  isJumpedOnBy(jumper) {
    const jumperRect = this.getHitRect(jumper);
    const selfRect = this.getHitRect(this);
    const fromAbove = jumper.verticalSpeed > 0;
    const headLevel = jumperRect.bottom < selfRect.top + 20;
    return fromAbove && headLevel && this.isColliding(jumper, this);
  }
}
