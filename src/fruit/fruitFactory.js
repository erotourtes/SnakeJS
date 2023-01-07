import { Point } from "../core/physics/module.js";
import { Graphics } from "pixi.js";
import { EventEmitter } from "../utils/module.js";


class FruitFactory {
  constructor({canvasSize, tileSize, draw, obstacleHandler, remove}) {
    this.canvasSize = canvasSize;
    this.tileSize = tileSize;
    this.obstacleHandler = obstacleHandler;
    this.EventEmitter = new EventEmitter();
    this.draw = draw;
    this.remove = remove;
  }

  create() {
    const prevPosition = Point.of(this.position);
    this.remove(this.fruit);

    const fruitUi = this.fruitUi();
    this.fruit = fruitUi;
    this.draw(fruitUi);

    this.EventEmitter.emit("create", this.position, prevPosition, fruitUi);
  }

  delete(fruitUi) {
    if (fruitUi) {
      this.remove(fruitUi);
      this.fruitUi = null;
    }
  }

  fruitUi() {
    const randPoint = this.obstacleHandler.randomPosition;
    this.position = randPoint;
    const pixelPoint = randPoint.cloneToPixel();
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
