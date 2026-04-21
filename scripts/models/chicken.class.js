import { chickenImagesPaths } from "./constants.js";
import { MoveableObject } from "./moveable-object.class.js";

export class Chicken extends MoveableObject {
  y = 360;
  height = 60;
  width = 60;
  currentImage = 0;
  speed = 0.3 + Math.random() * 0.2;

  constructor() {
    super();
    this.x = 200 + Math.random() * 500;
    this.loadImages(chickenImagesPaths);
    this.animate();
  }

  animate() {
    this.changeImage();
    setInterval(() => {
      this.changeImage();
    }, 200);
    this.moveLeft();
  }

  changeImage() {
    let i = this.currentImage % chickenImagesPaths.length;
    let path = chickenImagesPaths[i];
    this.img = this.images[path];
    this.currentImage++;
  }
}
