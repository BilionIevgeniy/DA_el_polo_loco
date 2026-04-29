import {
  characterImagesPaths,
  characterJumpImagesPaths,
  characterDeadPaths,
  characterHurtPaths,
} from "./constants.js";
import { MoveableObject } from "./moveable-object.class.js";

export class Character extends MoveableObject {
  height = 280;
  width = 100;
  y = 155;
  groundY = 155;
  speed = 15;
  flipped = false;
  showBoundingBox = true;
  gravity = 2;
  verticalSpeed = 0;
  jumpStrength = 28;

  isEnd = false;
  hitbox = {
    offsetX: 0,
    offsetY: 110,
    width: 55,
    height: 155,
  };

  damage_sound = new Audio("assets/sounds/character/characterDamage.mp3");
  walking_sound = new Audio("assets/sounds/character/characterRun.mp3");
  jumping_sound = new Audio("assets/sounds/character/characterJump.wav");
  dead_sound = new Audio("assets/sounds/character/characterDead.wav");
  snoring_sound = new Audio("assets/sounds/character/characterSnoring.mp3");

  constructor(canvas) {
    super();
    this.canvas = canvas;
    this.loadImageByPath(characterImagesPaths[0]);
    this.loadImagesByPath([
      ...characterImagesPaths,
      ...characterJumpImagesPaths,
      ...characterDeadPaths,
      ...characterHurtPaths,
    ]);
    this.animate();
    this.jumpImagesPaths = characterJumpImagesPaths;
  }

  animate() {
    setInterval(() => {
      if (this.isDead()) {
        this.changeMovementImg(characterDeadPaths);
        return;
      }

      if (this.isHurt()) {
        this.changeMovementImg(characterHurtPaths);
      } else {
        this.changeMovementImg([characterImagesPaths[0]]);
      }
      this.checkKeyboardState();
      this.checkCollision();
      this.applyGravity();
      this.hitbox.offsetX = this.flipped ? 30 : 15;
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

    // Check if the character has reached the ground
    if (this.y >= this.groundY) {
      this.y = this.groundY;
      this.verticalSpeed = 0;
      this.isJumping = false;
      this.currentImage = 0;
      this.animationTick = 0;
      this.img = this.imagesByPaths[characterImagesPaths[0]];
    }
  }

  checkKeyboardState() {
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
  }

  moveLeft() {
    super.moveLeft();
    this.walking_sound.play();
    this.flipped = true;
    this.canvas.kamera_x += this.speed;
    !this.isJumping &&
      !this.isHurt() &&
      this.changeMovementImg(characterImagesPaths);
  }

  moveRight() {
    super.moveRight();
    this.walking_sound.play();
    !this.isJumping &&
      !this.isHurt() &&
      this.changeMovementImg(characterImagesPaths);
  }

  checkCollision() {
    const enemy = this.canvas.level.enemies.find((enemy) => {
      return this.isColliding(this, enemy);
    });
    if (enemy) {
      this.hit();
      // this.damage_sound.play();
    }
  }
}
