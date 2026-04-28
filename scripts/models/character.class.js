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
  groundY = 155;
  animationTick = 0;
  animationSpeed = 4;
  walking_sound = new Audio("assets/sounds/character/characterRun.mp3");

  constructor(canvas) {
    super();
    this.canvas = canvas;
    this.loadImage(characterImagesPaths[0]);
    this.loadImages([...characterImagesPaths, ...characterJumpImagesPaths]);
    this.animate();
    this.jumpImagesPaths = characterJumpImagesPaths;
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

      if (!this.canvas.keyboard.RIGHT && !this.canvas.keyboard.LEFT) {
        this.walking_sound.pause();
      }

      this.applyGravity();
    }, 50);
  }

  applyGravity() {
    if (!this.isJumping) {
      return;
    }

    this.animationTick++;
    // Change the character's image at a slower rate while jumping
    if (this.animationTick % this.animationSpeed === 0) {
      this.changeMovementImg(characterJumpImagesPaths);
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

  moveLeft() {
    super.moveLeft();
    this.walking_sound.play();
    this.flipped = true;
    this.canvas.kamera_x += this.speed;
    !this.isJumping && super.changeMovementImg(characterImagesPaths);
  }

  moveRight() {
    super.moveRight();
    this.walking_sound.play();
    !this.isJumping && super.changeMovementImg(characterImagesPaths);
  }
}
