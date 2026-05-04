// scripts/models/asset-loader.class.js

/**
 * Preloads all game images before the game starts.
 */
export class AssetLoader {
  static cache = {};

  /**
   * Loads all images and resolves when every one is ready.
   * @param {string[]} paths
   * @returns {Promise<void>}
   */
  static loadAll(paths) {
    const unique = [...new Set(paths)];
    const promises = unique.map((path) => this.loadOne(path));
    return Promise.all(promises);
  }

  /**
   * Loads a single image into the cache.
   * @param {string} path
   * @returns {Promise<void>}
   */
  static loadOne(path) {
    if (this.cache[path]) return Promise.resolve();
    return new Promise((resolve) => {
      const img = new Image();
      img.onload = () => {
        img
          .decode?.()
          .then(() => {
            this.cache[path] = img;
          })
          .catch(() => {
            this.cache[path] = img;
          }) // ← не падаем, просто берём как есть
          .finally(resolve);
      };
      img.onerror = () => {
        console.warn("❌ Not found:", path);
        resolve();
      };
      img.src = path;
    });
  }
}
