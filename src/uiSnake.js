import Snake from "./snake.js";
import { Graphics } from "pixi.js";
import Point from "./point.js";


class UiSnake extends Snake {
  _bodyUI = [];

  constructor(tileSize, canvasSize, draw) {
    super(new Point(0, 0));
    this.tileSize = tileSize;
    this.createBodyUI(canvasSize);
    draw(this._bodyUI[0]);

    this.moveBody();
  }

  createBodyUI(canvasSize) {
    const circle = new Graphics();
    circle.beginFill(0x0000FF).drawCircle(canvasSize.x / 2, canvasSize.y / 2, this.tileSize / 2).endFill();
    this._bodyUI.push(circle);
  }

  moveBody() {
    const keyMap = {
      KeyW: "up",
      KeyS: "down",
      KeyA: "left",
      KeyD: "right",
    };

    document.onkeydown = (event) => {
      this.moveInDirection(keyMap[event.code]);

      const [x, y] = this._body[0].raw();
      this._bodyUI[0].position.set(x, y);
    };

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
