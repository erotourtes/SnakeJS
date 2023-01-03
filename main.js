import Snake from "./src/snake.js";
import Field from "./src/field.js";

const snake = new Snake();
const field = new Field();

const keyMap = {
  KeyW: "up",
  KeyS: "down",
  KeyA: "left",
  KeyD: "right",
};

document.onkeydown = (event) => {
  snake.move(keyMap[event.code]);
};

field.generate();
