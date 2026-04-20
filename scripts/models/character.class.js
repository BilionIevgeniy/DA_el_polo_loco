import { MoveableObject } from "./moveable-object.class.js";

export class Character extends MoveableObject {
  height = 280;
  width = 150;
  y = 155;
  constructor() {
    super();
    this.loadImage("assets/img/2_character_pepe/2_walk/W-21.png");
  }

  jump() {}
}
