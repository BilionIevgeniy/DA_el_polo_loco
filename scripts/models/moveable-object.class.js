export class MoveableObject {
  x = 100;
  y = 280;
  height = 150;
  width = 100;
  imagesByPaths = {};
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
      this.imagesByPaths[path] = img;
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

  walkAnimation(imagesByPaths) {
    let i = this.currentImage % imagesByPaths.length;
    let path = imagesByPaths[i];
    this.img = this.imagesByPaths[path];
    this.currentImage++;
  }

  animate(imagesByPaths) {
    setInterval(() => {
      this.walkAnimation(imagesByPaths);
    }, 200);
  }
}
