import { MoveableObject } from "./moveable-object.class.js";

/**
 * A fixed HUD status bar that displays a percentage as one of six images.
 */
export class StatusBar extends MoveableObject {
  width = 200;
  height = 60;
  percentage = 100;

  /**
   * @param {string[]} imagePaths - Six image paths for 0, 20, 40, 60, 80, 100 %
   * @param {number} x - Screen x position
   * @param {number} y - Screen y position
   * @param {number} [initialPct=100] - Starting percentage
   */
  constructor(imagePaths, x, y, initialPct = 100) {
    super();
    this.imagePaths = imagePaths;
    this.x = x;
    this.y = y;
    this.loadImagesByPath(imagePaths);
    this.setPercentage(initialPct);
  }

  /**
   * Updates the displayed percentage and switches to the correct image.
   * @param {number} pct - Value between 0 and 100
   */
  setPercentage(pct) {
    this.percentage = Math.max(0, Math.min(100, pct));
    this.img = this.imagesByPaths[this.imagePaths[this.resolveImageIndex()]];
  }

  /**
   * Maps a percentage to one of six image indices.
   * @returns {number} Index 0–5
   */
  resolveImageIndex() {
    if (this.percentage === 100) return 5;
    if (this.percentage >= 80)  return 4;
    if (this.percentage >= 60)  return 3;
    if (this.percentage >= 40)  return 2;
    if (this.percentage >= 20)  return 1;
    return 0;
  }

  /**
   * Draws the status bar directly without camera offset.
   * @param {CanvasRenderingContext2D} ctx
   */
  draw(ctx) {
    if (!this.img) return;
    ctx.drawImage(this.img, this.x, this.y, this.width, this.height);
  }
}
