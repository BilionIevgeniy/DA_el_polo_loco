import { Canvas } from "./models/canvas.class.js";
import { createLevel1 } from "./levels.js/level1.js";
import { AssetLoader } from "./models/asset-loader.class.js";
import { ALL_ASSET_PATHS } from "./models/constants.js";

/** Reference to the running game instance, or null when on the menu. */
let gameInstance = null;

/** Boots the game: creates a fresh level and canvas, then starts the loop. */
function startGame() {
  const level = createLevel1();
  gameInstance = new Canvas(level);
  gameInstance.init();

  document.getElementById("start-screen").classList.add("hidden");
  document.getElementById("end-screen").classList.add("hidden");
  document.getElementById("game-wrapper").classList.remove("hidden");
  document.getElementById("mute-btn").classList.remove("hidden");
  document.getElementById("mobile-controls").classList.remove("hidden");
}

/** Restarts the game without reloading the page. */
function restartGame() {
  if (gameInstance) gameInstance.sounds.stopAll();
  gameInstance = null;
  startGame();
}

/** Returns to the landing page from the end screen. */
function goHome() {
  if (gameInstance) gameInstance.sounds.stopAll();
  gameInstance = null;
  document.getElementById("end-screen").classList.add("hidden");
  document.getElementById("game-wrapper").classList.add("hidden");
  document.getElementById("mute-btn").classList.add("hidden");
  document.getElementById("mobile-controls").classList.add("hidden");
  document.getElementById("start-screen").classList.remove("hidden");
}

/** Toggles all game sounds and updates the mute button icon. */
function toggleMute() {
  if (!gameInstance) return;
  const muted = gameInstance.sounds.toggleMute();
  document.getElementById("mute-btn").textContent = muted ? "🔇" : "🔊";
}

/** Opens or closes the how-to-play dialog. */
function toggleHowToPlay() {
  document.getElementById("how-to-play").classList.toggle("hidden");
}

document.addEventListener("DOMContentLoaded", async () => {
  document.getElementById("loading").classList.remove("hidden");
  await AssetLoader.loadAll(ALL_ASSET_PATHS);
  document.getElementById("loading").classList.add("hidden");
  const startBTN = document.getElementById("start-btn");
  startBTN.disabled = false;
  startBTN.addEventListener("click", startGame);
  document.getElementById("restart-btn").addEventListener("click", restartGame);
  document.getElementById("home-btn").addEventListener("click", goHome);
  document.getElementById("mute-btn").addEventListener("click", toggleMute);
  document
    .getElementById("how-to-play-btn")
    .addEventListener("click", toggleHowToPlay);
  document
    .getElementById("how-to-play-close")
    .addEventListener("click", toggleHowToPlay);
  document.getElementById("how-to-play").addEventListener("click", (e) => {
    if (e.target === e.currentTarget) toggleHowToPlay();
  });

  const muted = localStorage.getItem("elPolloLoco_muted") === "true";
  document.getElementById("mute-btn").textContent = muted ? "🔇" : "🔊";
});
