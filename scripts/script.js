import { Keyboard } from "./models/keyboard.class.js";
import { World } from "./models/world.class.js";

let canvas;
let world;
let keyboard;

document.addEventListener("DOMContentLoaded", function () {
  canvas = document.getElementById("myCanvas");
  world = new World(canvas);
  keyboard = new Keyboard();
});
