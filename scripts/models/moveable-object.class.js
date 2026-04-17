export class MoveableObject {
  x = 0;
  y = 0;
  img;

  constructor() {}

  loadImage(path) {
    this.img = new Image();
    this.img.src = path;
  }

  drawImage() {
    this.img.onload = () => {
      this.ctx.drawImage(this.img, this.x, this.y, 80, 150);
    };
  }

  moveLeft() {}

  moveRight() {}

  moveUp() {
    this.y -= this.speed;
  }

  moveDown() {
    this.y += this.speed;
  }
}
