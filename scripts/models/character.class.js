import { MoveableObject } from "./moveable-object.class.js";

const imagesPaths = [
  "assets/img/2_character_pepe/2_walk/W-21.png",
  "assets/img/2_character_pepe/2_walk/W-22.png",
  "assets/img/2_character_pepe/2_walk/W-23.png",
  "assets/img/2_character_pepe/2_walk/W-24.png",
  "assets/img/2_character_pepe/2_walk/W-25.png",
  "assets/img/2_character_pepe/2_walk/W-26.png",
];
export class Character extends MoveableObject {
  height = 280;
  width = 150;
  y = 155;
  currentImage = 0;

  constructor() {
    super();
    this.loadImages(imagesPaths);
    this.animate();
  }

  animate() {
    this.changeImage();
    setInterval(() => {
      this.changeImage();
    }, 200);
  }

  changeImage() {
    let i = this.currentImage % imagesPaths.length;
    let path = imagesPaths[i];
    this.img = this.images[path];
    this.currentImage++;
  }

  jump() {}
}
