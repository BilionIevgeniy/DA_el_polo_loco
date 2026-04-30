import { BackgroundObject } from "../models/background-object.class.js";
import { Chicken } from "../models/chicken.class.js";
// import { SmallChicken } from "../models/small-chicken.class.js";
import { Cloud } from "../models/cloud.class.js";
// import { Coin } from "../models/coin.class.js";
// import { Bottle } from "../models/bottle.class.js";
import { Endboss } from "../models/endboss.class.js";
import { Level } from "../models/level.class.js";

/** @returns {BackgroundObject[]} Complete parallax background for the level */
function buildBackground() {
  const objects = [];
  for (let i = -2; i < 5; i++) {
    const x = 720 * i;
    const num = (Math.abs(i) % 2) + 1;
    objects.push(
      new BackgroundObject("assets/img/5_background/layers/air.png", x, 480),
      new BackgroundObject(
        `assets/img/5_background/layers/3_third_layer/${num}.png`,
        x,
        400,
      ),
      new BackgroundObject(
        `assets/img/5_background/layers/2_second_layer/${num}.png`,
        x,
        400,
      ),
      new BackgroundObject(
        `assets/img/5_background/layers/1_first_layer/${num}.png`,
        x,
        400,
      ),
    );
  }
  return objects;
}

/** @returns {Cloud[]} Scattered clouds across the level */
function buildClouds() {
  return Array.from(
    { length: 8 },
    (_, i) =>
      new Cloud(50 + Math.random() * 80, 200 + 600 * i + Math.random() * 200),
  );
}

// /** @returns {Coin[]} Coins placed at various world positions */
// function buildCoins() {
//   const positions = [
//     [300, 280],
//     [500, 260],
//     [750, 300],
//     [1000, 270],
//     [1300, 290],
//     [1600, 260],
//     [1900, 300],
//     [2200, 280],
//     [2500, 270],
//     [2800, 290],
//   ];
//   return positions.map(([x, y]) => new Coin(x, y));
// }

// /** @returns {Bottle[]} Bottles placed on the ground throughout the level */
// function buildBottles() {
//   const positions = [
//     [400, 360],
//     [800, 360],
//     [1200, 360],
//     [1700, 360],
//     [2100, 360],
//     [2600, 360],
//   ];
//   return positions.map(([x, y]) => new Bottle(x, y));
// }

/** @returns {Level} A fully populated Level 1 instance */
export function createLevel1() {
  return new Level(
    [
      new Chicken(),
      new Chicken(),
      new Chicken(),
      // new SmallChicken(),
      // new SmallChicken(),
      new Endboss(),
    ],
    buildClouds(),
    buildBackground(),
    // buildCoins(),
    // buildBottles(),
  );
}
