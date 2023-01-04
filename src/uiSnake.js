import Snake from "./snake.js";
import { Graphics } from "pixi.js";


class UiSnake extends Snake {
  constructor(x, y, tileSize, draw) {
    super(x, y);
    this.tileSize = tileSize;
    this.createBody();
    this.drawBody(draw);
  }

  createBody() {
    const circle = new Graphics();
    circle.beginFill(0x0000FF).drawCircle(this.tileSize / 2, this.tileSize / 2, this.tileSize / 2).endFill();
    this._body.push(circle);

  }

  drawBody(add) {
    add(this._body[0]);
  }


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
}

export default UiSnake;
