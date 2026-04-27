import { BackgroundObject } from "../models/background.object.class.js";
import { Chicken } from "../models/chicken.class.js";
import { Cloud } from "../models/cloud.class.js";
import { Endboss } from "../models/endboss.class.js";
import { Level } from "../models/level.class.js";
const backgroundObjects = [];
const cloud = [];
for (let i = 0; i < 3; i++) {
  const x = -720 * i;
  const imageNumber = (i % 2) + 1;
  backgroundObjects.push(
    new BackgroundObject("assets/img/5_background/layers/air.png", x, 480),
    new BackgroundObject(
      `assets/img/5_background/layers/3_third_layer/${imageNumber}.png`,
      x,
      400,
    ),
    new BackgroundObject(
      `assets/img/5_background/layers/2_second_layer/${imageNumber}.png`,
      x,
      400,
    ),
    new BackgroundObject(
      `assets/img/5_background/layers/1_first_layer/${imageNumber}.png`,
      x,
      400,
    ),
  );
}
for (let i = 0; i < 3; i++) {
  const x = 720 * i;
  const imageNumber = (i % 2) + 1;
  backgroundObjects.push(
    new BackgroundObject("assets/img/5_background/layers/air.png", x, 480),
    new BackgroundObject(
      `assets/img/5_background/layers/3_third_layer/${imageNumber}.png`,
      x,
      400,
    ),
    new BackgroundObject(
      `assets/img/5_background/layers/2_second_layer/${imageNumber}.png`,
      x,
      400,
    ),
    new BackgroundObject(
      `assets/img/5_background/layers/1_first_layer/${imageNumber}.png`,
      x,
      400,
    ),
  );
  cloud.push(
    new Cloud(50 + Math.random() * 100, 720 * i + Math.random() * 200),
  );
}

export const level1 = new Level(
  [new Chicken(), new Chicken(), new Chicken(), new Endboss()],
  cloud,
  backgroundObjects,
);
