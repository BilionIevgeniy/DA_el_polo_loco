import { characterImagesPaths } from "./constants.js";
import { MoveableObject } from "./moveable-object.class.js";

export class Character extends MoveableObject {
  height = 280;
  width = 150;
  y = 155;
  currentImage = 0;
  keyboard;
  speed = 5;
  flipped = false;

  constructor() {
    super();
    this.loadImage(characterImagesPaths[0]);
    this.loadImages(characterImagesPaths);
    this.animate();
  }

  animate() {
    setInterval(() => {
      if (this.keyboard.RIGHT) {
        this.moveRight();
      }
      if (this.keyboard.LEFT) {
        this.moveLeft();
      }
      if (this.keyboard.UP) {
        this.moveUp();
      }
      if (this.keyboard.DOWN) {
        this.moveDown();
      }
    }, 60);
  }

  set setKeyboard(keyboard) {
    this.keyboard = keyboard;
  }

  moveRight() {
    let i = this.currentImage % characterImagesPaths.length;
    let path = characterImagesPaths[i];
    this.img = this.images[path];
    this.flipped = false;
    this.x += this.speed;
    this.currentImage++;
  }

  moveLeft() {
    let i = this.currentImage % characterImagesPaths.length;
    let path = characterImagesPaths[i];
    this.img = this.images[path];
    this.flipped = true;
    this.x -= this.speed;
    this.currentImage++;
  }

  jump() {}
}
