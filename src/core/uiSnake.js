import Snake from "./snake.js";
import { Graphics } from "pixi.js";
import Point from "./point.js";
import Vector from "./vector.js";
import ParseTiles from "./utils/parseTiles.js";


class UiSnake extends Snake {
  _bodyUI = [];

  constructor(tileSize, canvasSize, draw) {
    super(new Point(0, 0), tileSize);
    this.tileSize = tileSize;
    this.handleSpawnPosition(canvasSize, tileSize);
    this.createBodyUI();

    draw(this._bodyUI[0]);
  }

  createBodyUI() {
    const circle = new Graphics();
    circle.beginFill(0x0000FF).drawCircle(...this.startPosition.raw(), this.tileSize / 2).endFill();
    this._bodyUI.push(circle);
  }

  updatePosition() {
      this.move();
      const [x, y] = this.head.raw();
      this._bodyUI[0].position.set(x, y);

    const tilePosition = ParseTiles.parseToTiles(this.worldPosition, this.tileSize);
    if (obstacleHandler.isCollide(tilePosition)) {
      this.lost();
    }

    const [x, y] = this.head.raw();
    this._bodyUI[0].position.set(x, y);
  }

  handleSpawnPosition(position, tileSize) {
    this.startPosition = Point.of(position);

    if ((this.startPosition.x / tileSize) % 2 === 0)
      this.startPosition.move(new Vector(-tileSize, 0));
    if((this.startPosition.y / tileSize) % 2 === 0)
      this.startPosition.move(new Vector(0, -tileSize));

    this.startPosition.divide(2);
  }

  get worldPosition() {
    const circleCenter = Point.add(this.startPosition, this.head);
    return Point.subtract(circleCenter, new Point(this.tileSize / 2, this.tileSize / 2));
  }

  get head() {
    return this._body[0];
  }
}

export default UiSnake;
