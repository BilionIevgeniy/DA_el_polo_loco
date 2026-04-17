import { MoveableObject } from "./moveable-object.class.js";

export class Cloud extends MoveableObject {
  constructor() {
    super();
    this.loadImage("assets/img/5_background/layers/4_clouds/1.png");
    this.x = Math.random() * 500;
    this.y = 50;
    this.width = 500;
    this.height = 300;
  }

  jump() {}
}
