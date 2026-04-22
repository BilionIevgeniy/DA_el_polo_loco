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
      if (this.canvas.keyboard.RIGHT) {
        this.moveRight();
      }
      if (this.canvas.keyboard.LEFT) {
        this.moveLeft();
      }
      if (this.canvas.keyboard.UP) {
        this.moveUp();
      }
      if (this.canvas.keyboard.DOWN) {
        this.moveDown();
      }
    }, 60);
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

  jump() {}
}
