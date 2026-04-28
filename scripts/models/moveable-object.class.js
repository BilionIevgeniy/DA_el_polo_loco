export class MoveableObject {
  x = 100;
  y = 280;
  height = 150;
  width = 100;
  imagesByPaths = {};
  currentImage = 0;
  isJumping = false;
  jumpImagesPaths = [];
  animationTick = 0;
  animationSpeed = 4;
  showBoundingBox = false;

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

  draw(ctx) {
    if (this.flipped) {
      this.flipImage(ctx);
    } else {
      ctx.drawImage(this.img, this.x, this.y, this.width, this.height);
    }

    this.showBoundingBox && this.drawBoundingBox(ctx);
  }

  drawImage() {
    this.img.onload = () => {
      this.ctx.drawImage(this.img, this.x, this.y, 80, 150);
    };
  }

  drawBoundingBox(ctx) {
    const { x, y, width, height } = this;

    ctx.strokeStyle = "rgba(255, 0, 0, 0.8)";
    ctx.lineWidth = 2;
    ctx.strokeRect(x, y, width, height);
  }

  flipImage(ctx) {
    const { x, y, width, height, img } = this;

    ctx.save();
    ctx.translate(x + width / 2, y + height / 2);
    ctx.scale(-1, 1);
    ctx.drawImage(img, -width / 2, -height / 2, width, height);
    ctx.restore();
  }
}
