export class MoveableObject {
  x = 100;
  y = 280;
  height = 150;
  width = 100;
  imagesByPaths = {};
  currentImage = 0;
  isJumping = false;
  jumpImagesPaths = [];

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

  changeMovementImg(imagesByPaths) {
    let i = this.currentImage % imagesByPaths.length;
    let path = imagesByPaths[i];
    this.img = this.imagesByPaths[path];
    this.currentImage++;
  }

  moveLeft() {
    this.x -= this.speed;
  }

  moveRight() {
    this.flipped = false;
    this.x += this.speed;
    this.canvas.kamera_x -= this.speed;
  }

  moveUp() {
    if (!this.isJumping) {
      this.jump();
    }
  }

  moveDown() {
    // Placeholder so the animate loop can safely handle the down arrow.
  }

  jump() {
    this.isJumping = true;
    this.currentImage = 0;
    this.animationTick = 0;
    this.verticalSpeed = -this.jumpStrength;
    this.changeMovementImg(this.jumpImagesPaths);
  }

  animateMovementLeft() {
    setInterval(() => {
      this.moveLeft();
    }, 1000 / 60);
  }

  animateImageMovement(imagesPaths) {
    setInterval(() => {
      this.changeMovementImg(imagesPaths);
    }, 200);
  }
}
