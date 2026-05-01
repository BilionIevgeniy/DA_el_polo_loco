import { Character } from "./heroes/character.class.js";
import { Keyboard } from "./keyboard.class.js";
import { SoundManager } from "./sound-manager.class.js";
import { StatusBar } from "./status-bar.class.js";
import { ThrowableObject } from "./heroes/throwable-object.class.js";
import {
  STATUS_BAR_HEALTH,
  STATUS_BAR_COIN,
  STATUS_BAR_BOTTLE,
  STATUS_BAR_BOSS,
} from "./constants.js";

/**
 * Main game controller: owns the canvas, game loop, HUD, and all collision logic.
 */
export class Canvas {
  kamera_x = 0;
  throwCooldown = false; // prevents the player from throwing bottles too often
  throwables = [];
  gameOver = false;
  gameWon = false;

  /**
   * @param {Level} level - The level to play
   */
  constructor(level) {
    this.level = level;
    this.sounds = this.createSounds();
    this.keyboard = new Keyboard();
    this.character = new Character(this);

    this.healthBar = new StatusBar(STATUS_BAR_HEALTH, 10, 10);
    this.coinBar = new StatusBar(STATUS_BAR_COIN, 10, 40);
    this.bottleBar = new StatusBar(STATUS_BAR_BOTTLE, 10, 70);
    this.bossBar = new StatusBar(STATUS_BAR_BOSS, 500, 10, 100);
  }

  /**
   * Creates and registers all game sounds.
   * @returns {SoundManager}
   */
  createSounds() {
    const sm = new SoundManager();
    sm.registerSound("music", "assets/sounds/game/gameStart.mp3", false);
    sm.registerSound("walk", "assets/sounds/character/characterRun.mp3", true);
    sm.registerSound(
      "jump",
      "assets/sounds/character/characterJump.wav",
      false,
    );
    sm.registerSound(
      "damage",
      "assets/sounds/character/characterDamage.mp3",
      false,
    );
    sm.registerSound(
      "dead",
      "assets/sounds/character/characterDead.wav",
      false,
    );
    sm.registerSound(
      "snore",
      "assets/sounds/character/characterSnoring.mp3",
      true,
    );
    sm.registerSound(
      "coin",
      "assets/sounds/collectibles/collectSound.wav",
      false,
    );
    sm.registerSound(
      "bottle",
      "assets/sounds/collectibles/bottleCollectSound.wav",
      false,
    );
    sm.registerSound("break", "assets/sounds/throwable/bottleBreak.mp3", false);
    sm.registerSound(
      "boss",
      "assets/sounds/endboss/endbossApproach.wav",
      false,
    );
    sm.registerSound("cluck", "assets/sounds/chicken/chickenDead.mp3", false);
    return sm;
  }

  /**
   * Initialises the canvas element and starts the game loop.
   */
  init() {
    this.canvas = document.getElementById("myCanvas");
    this.ctx = this.canvas.getContext("2d");
    this.sounds.play("music");
    this.gameLoop();
  }

  /** Main game loop – runs at ~60 fps via requestAnimationFrame. */
  gameLoop() {
    if (this.gameOver || this.gameWon) return;
    this.updateObjectsState();
    this.drawObjects();
    requestAnimationFrame(() => this.gameLoop());
  }

  /** Updates all game logic each frame. */
  updateObjectsState() {
    // this.checkIfObjectThrown();
    this.updateEndbossAnimation();
    this.checkCollisionsWithEnemies();
    // this.checkCollisionsWithCollectibles();
    // this.checkIfObjectThrownableHits();
    // this.removeDeadObjects();
    this.updateStatusBar();
    // this.checkEndConditions();
  }

  /** Renders all game objects to the canvas. */
  drawObjects() {
    const { ctx, canvas } = this;
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.save();
    ctx.translate(this.kamera_x, 0);

    this.level.backgroundObjects.forEach((o) => o.draw(ctx));
    this.level.cloud.forEach((o) => o.draw(ctx));
    // this.level.coins.forEach((o) => o.draw(ctx));
    // this.level.bottles.forEach((o) => o.draw(ctx));
    this.throwables.forEach((o) => o.draw(ctx));
    this.level.enemies.forEach((o) => o.draw(ctx));
    this.character.draw(ctx);

    ctx.restore();
    this.drawStatusBar(ctx);
  }

  /** Draws the fixed HUD (status bars) directly on-screen. */
  drawStatusBar(ctx) {
    this.healthBar.draw(ctx);
    this.coinBar.draw(ctx);
    this.bottleBar.draw(ctx);
    if (this.bossVisible()) this.bossBar.draw(ctx);
  }

  /** @returns {boolean} True when the endboss should show its health bar */
  bossVisible() {
    return this.level.enemies.some(
      (e) => e.hasBeenIntroduced && !e.deathAnimDone,
    );
  }

  /** Checks if the player pressed throw and has bottles. */
  checkIfObjectThrown() {
    if (!this.keyboard.THROW || this.throwCooldown) return;
    if (this.character.bottleCount <= 0) return;
    this.character.bottleCount--;
    const bottle = new ThrowableObject(
      this.character.x + (this.character.flipped ? 0 : 80),
      this.character.y + 120,
      this.character.flipped,
    );
    this.throwables.push(bottle);
    this.sounds.play("break");
    this.throwCooldown = true;
    setTimeout(() => (this.throwCooldown = false), 400);
  }

  /** Passes the player's x position to the endboss AnimatioInterval each frame. */
  updateEndbossAnimation() {
    const boss = this.level.enemies.find(
      (e) => e.hasBeenIntroduced !== undefined,
    );
    if (!boss) return;
    const dist = boss.x - this.character.x;
    if (dist < 600) boss.triggerAlert();
    boss.updateMovement(this.character.x);
  }

  /** Checks all enemy collisions with the character. */
  checkCollisionsWithEnemies() {
    this.level.enemies.forEach((enemy) => {
      if (enemy.isDying) return;
      if (this.character.isColliding(this.character, enemy)) {
        this.handleEnemyCollision(enemy);
      }
    });
  }

  /**
   * Handles a collision between character and an enemy.
   * @param {MoveableObject} enemy
   */
  handleEnemyCollision(enemy) {
    if (this.character.isJumping && this.character.verticalSpeed > 0) {
      const enemyTop = enemy.y + enemy.hitbox.offsetY;
      const charBottom =
        this.character.y +
        this.character.hitbox.offsetY +
        this.character.hitbox.height;
      if (charBottom < enemyTop + 25) {
        enemy.die ? enemy.die() : (enemy.isDying = true);
        this.character.verticalSpeed = -15;
        this.sounds.play("cluck");
        return;
      }
    }
    if (!this.character.isHurt()) this.character.hit();
  }

  /** Checks collisions of all throwables with enemies. */
  checkIfObjectThrownableHits() {
    this.throwables.forEach((bottle) => {
      if (bottle.isSplashing) return;
      this.level.enemies.forEach((enemy) => {
        if (enemy.isDying) return;
        if (bottle.isColliding(bottle, enemy)) {
          bottle.hitEnemy();
          this.sounds.play("break");
          if (enemy.hit) enemy.hit(20);
        }
      });
    });
  }

  /** Checks character collision with coins and bottles. */
  checkCollisionsWithCollectibles() {
    this.level.coins.forEach((coin) => {
      if (coin.collected) return;
      if (this.character.isColliding(this.character, coin)) {
        coin.collect();
        this.character.collectCoin();
      }
    });
    this.level.bottles.forEach((bottle) => {
      if (bottle.collected) return;
      if (this.character.isColliding(this.character, bottle)) {
        bottle.collect();
        this.character.collectBottle();
      }
    });
  }

  /** Removes dead enemies and spent throwables from the level. */
  removeDeadObjects() {
    this.level.enemies = this.level.enemies.filter((e) => !e.deathAnimDone);
    this.throwables = this.throwables.filter((t) => !t.hasHit);
    this.level.coins = this.level.coins.filter((c) => !c.collected);
    this.level.bottles = this.level.bottles.filter((b) => !b.collected);
  }

  /** Syncs all status bars to current game state. */
  updateStatusBar() {
    this.healthBar.setPercentage(this.character.energy);
    this.coinBar.setPercentage(this.character.coins * 10);
    this.bottleBar.setPercentage(this.character.bottleCount * 10);
    const boss = this.level.enemies.find(
      (e) => e.hasBeenIntroduced !== undefined,
    );
    if (boss) this.bossBar.setPercentage(boss.energy);
  }

  /** Checks win and lose conditions and triggers the end screen. */
  checkEndConditions() {
    if (this.character.isDead()) {
      this.gameOver = true;
      setTimeout(() => this.showEndScreen(false), 1500);
    }
    const boss = this.level.enemies.find(
      (e) => e.hasBeenIntroduced !== undefined,
    );
    if (boss && boss.deathAnimDone) {
      this.gameWon = true;
      setTimeout(() => this.showEndScreen(true), 1500);
    }
  }

  /**
   * Shows the win or lose overlay via the UI module.
   * @param {boolean} won
   */
  showEndScreen(won) {
    this.sounds.stopAll();
    document.getElementById("end-screen").classList.remove("hidden");
    document.getElementById("end-title").textContent = won
      ? "You Win! 🏆"
      : "Game Over!";
  }
}
