import { Point } from "../core/physics/module.js";
import { Graphics } from "pixi.js";
import ParseTiles from "../utils/parseTiles.js";


class Fruit {
  constructor(canvasSize, tileSize, draw, obstacleHandler) {
    this.point = new Point();
    this.canvasSize = canvasSize;
    this.tileSize = tileSize;
    this.obstacleHandler = obstacleHandler;

    draw(this.fruitUi());
  }

  fruitUi() {
    const randPoint = this.obstacleHandler.randomPosition;
    const pixelPoint = ParseTiles.parseToPixel(randPoint, this.tileSize);
    pixelPoint.subtract(-this.tileSize / 2);
    const [x, y] = pixelPoint.raw();

    const circle = new Graphics();
    circle.beginFill(0xFF0000)
      .drawCircle(x, y, this.tileSize / 2)
      .endFill();

    return circle;
  }

}

export default Fruit;
