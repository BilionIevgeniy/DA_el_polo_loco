import { MoveableObject } from "./moveable-object.class.js";
const imagesPaths = [
  "assets/img/3_enemies_chicken/chicken_normal/1_walk/1_w.png",
  "assets/img/3_enemies_chicken/chicken_normal/1_walk/2_w.png",
  "assets/img/3_enemies_chicken/chicken_normal/1_walk/3_w.png",
];
export class Chicken extends MoveableObject {
  y = 360;
  height = 60;
  width = 60;
  currentImage = 0;
  speed = 0.3 + Math.random() * 0.2;

  constructor() {
    super();
    this.x = 200 + Math.random() * 500;
    this.loadImages(imagesPaths);
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
    let i = this.currentImage % imagesPaths.length;
    let path = imagesPaths[i];
    this.img = this.images[path];
    this.currentImage++;
  }

  jump() {}
}
