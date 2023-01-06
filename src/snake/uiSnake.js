import Snake from "./snake.js";
import { Graphics } from "pixi.js";
import { Point, Vector } from "../core/physics/module.js";
import { ParseTiles } from "../utils/module.js";


class UiSnake extends Snake {
  _bodyUI = [];

  constructor(tileSize, canvasSize, obstacleHandler, draw) {
    super(new Point(0, 0), tileSize);
    this.tileSize = tileSize;
    this.obstacleHandler = obstacleHandler;
    this.startPosition = this.handleSpawnPosition(canvasSize, tileSize);
    this.createBodyUI();

    draw(this._bodyUI[0]);
  }

  createBodyUI() {
    const circle = new Graphics();
    circle.beginFill(0x0000FF).drawCircle(...this.startPosition.raw(), this.tileSize / 2).endFill();
    this._bodyUI.push(circle);
  }

  updatePosition() {
    const prevPosition = this._body[0];
    this.move();

    this.eventEmitter.emit("move", 
      this.tilePosition,
      ParseTiles.parseToTiles(this.calcWorldPosition(prevPosition), this.tileSize));

    if(this.obstacleHandler.isFruit(this.tilePosition)) {
      console.log("eat");
      this.eventEmitter.emit("eat");
    }

    const tilePosition = ParseTiles.parseToTiles(this.worldPosition, this.tileSize);
    if (this.obstacleHandler.isCollide(tilePosition)) {
      this.lost();
    }

    const [x, y] = this.head.raw();
    this._bodyUI[0].position.set(x, y);
  }

  handleSpawnPosition(mapSize, tileSize) {
    const startPosition = Point.of(mapSize);

    if ((startPosition.x / tileSize) % 2 === 0)
    startPosition.move(new Vector(-tileSize, 0));
    if((startPosition.y / tileSize) % 2 === 0)
    startPosition.move(new Vector(0, -tileSize));

    startPosition.divide(2);

    let tilesPosition = ParseTiles.parseToTiles(startPosition, tileSize);
    while(!this.obstacleHandler.canCreate(tilesPosition)) {
      startPosition.move(new Vector(tileSize, 0));
      tilesPosition = ParseTiles.parseToTiles(startPosition, tileSize);
    }

    return startPosition;
  }

  calcWorldPosition(point) {
    const circleCenter = Point.add(this.startPosition, point);
    return Point.subtract(circleCenter, new Point(this.tileSize / 2, this.tileSize / 2));
  }

  get worldPosition() {
    return this.calcWorldPosition(this.head);
  }

  get tilePosition() {
    return ParseTiles.parseToTiles(this.worldPosition, this.tileSize);
  }

  get head() {
    return this._body[0];
  }
}

export default UiSnake;
