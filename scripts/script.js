import { World } from "./models/world.class.js";

let canvas;
let world;

document.addEventListener("DOMContentLoaded", function () {
  canvas = document.getElementById("myCanvas");
  world = new World(canvas);
});
