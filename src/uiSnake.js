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
  }

  createBodyUI(canvasSize) {
    const circle = new Graphics();
    circle.beginFill(0x0000FF).drawCircle(canvasSize.x / 2, canvasSize.y / 2, this.tileSize / 2).endFill();
    this._bodyUI.push(circle);
  }

  updatePosition() {
      this.move();
      const [x, y] = this._body[0].raw();
      this._bodyUI[0].position.set(x, y);
  }
}

export default UiSnake;
