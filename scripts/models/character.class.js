import { characterImagesPaths, characterJumpImagesPaths } from "./constants.js";
import { MoveableObject } from "./moveable-object.class.js";

export class Character extends MoveableObject {
  height = 280;
  width = 150;
  y = 155;
  currentImage = 0;
  speed = 15;
  flipped = false;

  gravity = 2;
  verticalSpeed = 0;
  jumpStrength = 28;
  isJumping = false;
  groundY = 155;
  animationTick = 0;
  animationSpeed = 4;

  constructor(canvas) {
    super();
    this.canvas = canvas;
    this.loadImage(characterImagesPaths[0]);
    this.loadImages([...characterImagesPaths, ...characterJumpImagesPaths]);
    this.animate();
  }

  animate() {
    setInterval(() => {
      if (
        this.canvas.keyboard.RIGHT &&
        this.x < this.canvas.level.level_end_right_x
      ) {
        this.moveRight();
        !this.isJumping && super.walkAnimation(characterImagesPaths);
      }
      if (
        this.canvas.keyboard.LEFT &&
        this.x - 150 > this.canvas.level.level_end_left_x
      ) {
        this.moveLeft();
        !this.isJumping && super.walkAnimation(characterImagesPaths);
      }
      if (this.canvas.keyboard.UP) {
        this.moveUp();
      }
      if (this.canvas.keyboard.DOWN) {
        this.moveDown();
      }

      this.applyGravity();
    }, 50);
  }

  moveRight() {
    this.flipped = false;
    this.x += this.speed;
    this.canvas.kamera_x -= this.speed;
  }

  moveLeft() {
    this.flipped = true;
    this.x -= this.speed;
    this.canvas.kamera_x += this.speed;
  }

  moveUp() {
    if (!this.isJumping) {
      this.jump();
    }
  }

  moveDown() {
    // Placeholder so the animate loop can safely handle the down arrow.
  }

  jump() {
    this.isJumping = true;
    this.currentImage = 0;
    this.animationTick = 0;
    this.verticalSpeed = -this.jumpStrength;
    this.walkAnimation(characterJumpImagesPaths);
  }

  applyGravity() {
    if (!this.isJumping) {
      return;
    }

    this.animationTick++;
    // Change the character's image at a slower rate while jumping
    if (this.animationTick % this.animationSpeed === 0) {
      this.walkAnimation(characterJumpImagesPaths);
    }

    this.y += this.verticalSpeed;
    this.verticalSpeed += this.gravity;

    if (this.y >= this.groundY) {
      this.y = this.groundY;
      this.verticalSpeed = 0;
      this.isJumping = false;
      this.currentImage = 0;
      this.animationTick = 0;
      this.img = this.imagesByPaths[characterImagesPaths[0]];
    }
  }
}
