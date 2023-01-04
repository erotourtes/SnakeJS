// import Snake from "./src/snake.js";
// import Field from "./src/field.js";
//
// const snake = new Snake(0, 0);
// const field = new Field();
//
// const keyMap = {
//   KeyW: "up",
//   KeyS: "down",
//   KeyA: "left",
//   KeyD: "right",
// };
//
// document.onkeydown = (event) => {
//   snake.changeDirection(keyMap[event.code]);
// };
//
// field.generate();

import * as PIXI from "pixi.js";

const app = new PIXI.Application({width: 256, height: 256});


//Add the canvas that Pixi automatically created for you to the HTML document
document.body.appendChild(app.view);

app.renderer.backgroundColor = 0x061639;

app.renderer.view.style.position = "absolute";
app.renderer.view.style.display = "block";
app.resizeTo = window;
