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
  energy = 100;
  hitbox = {
    offsetX: 0,
    offsetY: 0,
    width: 0,
    height: 0,
  };
  damage_sound;
  dead_sound;
  lastHitTime = 0;

  constructor() {}

  loadImageByPath(path) {
    this.img = new Image();
    this.img.src = path;
  }

  loadImagesByPath(pathes) {
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

  drawBoundingBox(ctx) {
    const { offsetX, offsetY, width, height } = this.hitbox;
    const { x, y } = this;

    ctx.strokeStyle = "rgba(255, 0, 0, 0.8)";
    ctx.lineWidth = 2;
    ctx.strokeRect(x + offsetX, y + offsetY, width, height);
  }

  flipImage(ctx) {
    const { x, y, width, height, img } = this;

    ctx.save();
    ctx.translate(x + width / 2, y + height / 2);
    ctx.scale(-1, 1);
    ctx.drawImage(img, -width / 2, -height / 2, width, height);
    ctx.restore();
  }

  isColliding(obj1, obj2) {
    const b1 = {
      left: obj1.x + obj1.hitbox.offsetX,
      right: obj1.x + obj1.hitbox.offsetX + obj1.hitbox.width,
      top: obj1.y + obj1.hitbox.offsetY,
      bottom: obj1.y + obj1.hitbox.offsetY + obj1.hitbox.height,
    };

    const b2 = {
      left: obj2.x + obj2.hitbox.offsetX,
      right: obj2.x + obj2.hitbox.offsetX + obj2.hitbox.width,
      top: obj2.y + obj2.hitbox.offsetY,
      bottom: obj2.y + obj2.hitbox.offsetY + obj2.hitbox.height,
    };

    return (
      b1.bottom > b2.top &&
      b1.top < b2.bottom &&
      b1.right > b2.left &&
      b1.left < b2.right
    );
  }

  hit() {
    if (this.energy <= 0) {
      this.energy = 0;
      return;
    }
    this.energy -= 2;
    this.lastHitTime = Date.now();
  }

  isDead() {
    return this.energy <= 0;
  }

  isHurt() {
    let timePassed = Date.now() - this.lastHitTime;
    timePassed = timePassed / 1000;
    return timePassed < 0.1;
  }
}
