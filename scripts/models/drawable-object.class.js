import { AssetLoader } from "./asset-loader.class.js";

export class DrawableObject {
  x = 100;
  y = 280;
  height = 150;
  width = 100;
  imagesCacheByPaths = {};
  showBoundingBox = false;
  flipped = false;
  img = null;
  hitbox = {
    offsetX: 0,
    offsetY: 0,
    width: 0,
    height: 0,
  };

  /**
   * Loads a single image and assigns it as the current image.
   * @param {string} path - Image path
   */
  loadImageByPath(path) {
    this.img = new Image();
    this.img.src = path;
  }

  /**
   * Preloads multiple images into the imagesCacheByPaths cache.
   * @param {string[]} paths - Array of image paths
   */
  loadImagesByPath(paths) {
    paths.forEach((path) => {
      this.imagesCacheByPaths[path] =
        AssetLoader.cache[path] ||
        (() => {
          const img = new Image();
          img.src = path;
          return img;
        })();
    });
  }

  /**
   * Draws the object on the canvas context.
   * @param {CanvasRenderingContext2D} ctx
   */
  draw(ctx) {
    if (!this.img) return;
    this.flipped ? this.drawFlipped(ctx) : this.drawNormal(ctx);
    if (this.showBoundingBox) this.drawBoundingBox(ctx);
  }

  /**
   * Draws the image normally.
   * @param {CanvasRenderingContext2D} ctx
   */
  drawNormal(ctx) {
    ctx.drawImage(this.img, this.x, this.y, this.width, this.height);
  }

  /**
   * Draws the image mirrored horizontally.
   * @param {CanvasRenderingContext2D} ctx
   */
  drawFlipped(ctx) {
    ctx.save();
    ctx.translate(this.x + this.width / 2, this.y + this.height / 2);
    ctx.scale(-1, 1);
    ctx.drawImage(
      this.img,
      -this.width / 2,
      -this.height / 2,
      this.width,
      this.height,
    );
    ctx.restore();
  }

  /**
   * Draws the hitbox rectangle for debugging.
   * @param {CanvasRenderingContext2D} ctx
   */
  drawBoundingBox(ctx) {
    const { offsetX, offsetY, width, height } = this.hitbox;
    ctx.strokeStyle = "rgba(255,0,0,0.8)";
    ctx.lineWidth = 2;
    ctx.strokeRect(this.x + offsetX, this.y + offsetY, width, height);
  }
}
