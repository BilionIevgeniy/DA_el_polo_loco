export class MoveableObject {
  x = 100;
  y = 280;
  height = 150;
  width = 100;
  images = {};
  currentImage = 0;

  constructor() {}

  loadImage(path) {
    this.img = new Image();
    this.img.src = path;
  }

  loadImages(pathes) {
    pathes.forEach((path) => {
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
    }, 1000 / 60);
  }

  walkAnimation(images) {
    let i = this.currentImage % images.length;
    let path = images[i];
    this.img = this.images[path];
    this.currentImage++;
  }

  animate(images) {
    setInterval(() => {
      this.walkAnimation(images);
    }, 200);
  }
}
