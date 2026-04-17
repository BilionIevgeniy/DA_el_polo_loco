import { MoveableObject } from "./moveable-object.class.js";

export class Chicken extends MoveableObject {
  y = 290;
  constructor() {
    super();
    this.loadImage(
      "assets/img/3_enemies_chicken/chicken_normal/1_walk/1_w.png",
    );
    this.x = 200 + Math.random() * 500;
  }

  jump() {}
}
