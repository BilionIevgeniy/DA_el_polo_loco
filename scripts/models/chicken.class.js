import { MoveableObject } from "./moveable-object.class.js";

export class Chicken extends MoveableObject {
  constructor() {
    super();
    this.loadImage("assets/img/2_character_pepe/2_walk/W-21.png");
  }

  jump() {}
}
