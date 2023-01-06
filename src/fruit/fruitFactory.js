import { Point } from "../core/physics/module.js";
import { Graphics } from "pixi.js";
import { ParseTiles, EventEmitter } from "../utils/module.js";


class FruitFactory {
  constructor(canvasSize, tileSize, draw, obstacleHandler) {
    this.canvasSize = canvasSize;
    this.tileSize = tileSize;
    this.obstacleHandler = obstacleHandler;
    this.EventEmitter = new EventEmitter();
    this.draw = draw;
  }

  create() {
    const prevPosition = this.position;
    const fruitUi = this.fruitUi();
    this.draw(fruitUi);
    this.EventEmitter.emit("create", this.position, prevPosition, fruitUi);
  }

  fruitUi() {
    const randPoint = this.obstacleHandler.randomPosition;
    this.position = randPoint;
    const pixelPoint = ParseTiles.parseToPixel(randPoint, this.tileSize);
    const [x, y] = pixelPoint.raw();

    const circle = new Graphics();
    circle.beginFill(0xFF0000)
      .drawRect(x, y, this.tileSize, this.tileSize)
      .endFill();

    return circle;
  }

  onCreate(cb) {
    this.EventEmitter.on("create", cb);
  }
}

export default FruitFactory;
