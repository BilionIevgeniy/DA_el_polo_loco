export class MoveableObject {
  x = 120;
  y = 280;
  height = 150;
  width = 100;
  img;
  images = [];

  constructor() {}

  loadImage(path) {
    this.img = new Image();
    this.img.src = path;
  }

  loadImages(arr) {
    arr.forEach((path) => {
      let img = new Image();
      img.src = path;
      this.images[path] = img;
    });
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
