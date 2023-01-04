import Snake from "./snake.js";
import { Graphics } from "pixi.js";


class UiSnake extends Snake {
  _bodyUI = [];

  constructor(tileSize, draw) {
    super();
    this.tileSize = tileSize;
    this.createBodyUI();
    draw(this._bodyUI[0]);

    this.moveBody();
  }

  createBodyUI() {
    const circle = new Graphics();
    circle.beginFill(0x0000FF).drawCircle(this.tileSize / 2, this.tileSize / 2, this.tileSize / 2).endFill();
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
      this.changeDirection(keyMap[event.code]);
      this.move();
      this._bodyUI[0].x = this._body[0].x * this.tileSize;
      this._bodyUI[0].y = this._body[0].y * this.tileSize;
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
