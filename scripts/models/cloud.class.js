import { MoveableObject } from "./moveable-object.class.js";

export class Cloud extends MoveableObject {
  constructor(y, x) {
    super();
    this.loadImage("assets/img/5_background/layers/4_clouds/1.png");
    this.y = y;
    this.x = x;
    this.width = 500;
    this.height = 300;
    this.animate();
  }

  animate() {
    setInterval(() => {
      this.x -= 0.15;

      if (this.x < -this.width) {
        this.x = 720;
      }
    }, 0.01);
  }

  jump() {}
}
