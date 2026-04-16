let canvas;
let character = new Image();

document.addEventListener("DOMContentLoaded", function () {
  canvas = document.getElementById("myCanvas");
  const ctx = canvas.getContext("2d");
  character.src = "assets/img/2_character_pepe/2_walk/W-21.png";
  character.onload = function () {
    ctx.drawImage(character, 20, 20, 80, 150);
  };

  document.addEventListener("keydown", function (event) {
    if (event.key === "ArrowRight") {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      ctx.drawImage(character, 70, 20, 50, 150);
    }
  });
});
