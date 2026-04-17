import { Character } from "./models/character.class.js";

let canvas;

document.addEventListener("DOMContentLoaded", function () {
  canvas = document.getElementById("myCanvas");
  const character = new Character();
});
