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

  constructor(canvas) {
    super();
    this.canvas = canvas;
    this.loadImage(characterImagesPaths[0]);
    this.loadImages(characterImagesPaths);
    this.loadImages(characterJumpImagesPaths);
    this.animate();
  }

  animate() {
    setInterval(() => {
      if (
        this.canvas.keyboard.RIGHT &&
        this.x < this.canvas.level.level_end_right_x
      ) {
        this.moveRight();
      }
      if (
        this.canvas.keyboard.LEFT &&
        this.x - 150 > this.canvas.level.level_end_left_x
      ) {
        this.moveLeft();
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
    let i = this.currentImage % characterImagesPaths.length;
    let path = characterImagesPaths[i];
    this.img = this.images[path];
    this.flipped = false;
    this.x += this.speed;
    this.currentImage++;
    this.canvas.kamera_x -= this.speed;
  }

  moveLeft() {
    let i = this.currentImage % characterImagesPaths.length;
    let path = characterImagesPaths[i];
    this.img = this.images[path];
    this.flipped = true;
    this.x -= this.speed;
    this.currentImage++;
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
    this.loadImages(characterJumpImagesPaths);
    this.verticalSpeed = -this.jumpStrength;
  }

  applyGravity() {
    if (!this.isJumping) {
      return;
    }

    this.y += this.verticalSpeed;
    this.verticalSpeed += this.gravity;

    if (this.y >= this.groundY) {
      this.loadImages(characterImagesPaths);
      this.y = this.groundY;
      this.verticalSpeed = 0;
      this.isJumping = false;
    }
  }
}
