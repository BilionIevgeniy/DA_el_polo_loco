import { characterImagesPaths } from "./constants.js";
import { MoveableObject } from "./moveable-object.class.js";

export class Character extends MoveableObject {
  height = 280;
  width = 150;
  y = 155;
  currentImage = 0;
  speed = 15;
  flipped = false;

  constructor(canvas) {
    super();
    this.canvas = canvas;
    this.loadImage(characterImagesPaths[0]);
    this.loadImages(characterImagesPaths);
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

  moveUp() {}

  jump() {}
}
