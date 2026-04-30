export class DrawableObject {
  imagesByPaths = {};
  currentImage = 0;
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
  lastHitTime = 0;

  /**
   * Loads a single image and assigns it as the current image.
   * @param {string} path - Image path
   */
  loadImageByPath(path) {
    this.img = new Image();
    this.img.src = path;
  }

  /**
   * Preloads multiple images into the imagesByPaths cache.
   * @param {string[]} paths - Array of image paths
   */
  loadImagesByPath(paths) {
    paths.forEach((path) => {
      const img = new Image();
      img.src = path;
      this.imagesByPaths[path] = img;
    });
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
}
