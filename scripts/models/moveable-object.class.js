export class MoveableObject {
  x = 120;
  y = 280;
  height = 150;
  width = 100;
  images = {};

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

  moveLeft() {
    setInterval(() => {
      this.x -= this.speed;
      if (this.x < -this.width) {
        this.x = 720;
      }
    }, 1000 / 60);
  }

  walkAnimation(images) {
    let i = this.currentImage % images.length;
    let path = images[i];
    this.img = this.images[path];
    this.currentImage++;
  }

  animate(images) {
    this.moveLeft();
    setInterval(() => {
      this.walkAnimation(images);
    }, 200);
  }
}
