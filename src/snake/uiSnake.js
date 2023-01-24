import Snake from "./snake.js";
import { Graphics } from "pixi.js";
import { Point, Vector } from "../core/physics/module.js";

class UiSnake extends Snake {
  _bodyUI = [];

  constructor({ tileSize, obstacleHandler, draw }, winCount) {
    super(new Point(0, 0), tileSize);
    this.tileSize = tileSize;
    this.draw = draw;
    this.obstacleHandler = obstacleHandler;
    this.startPosition = this.obstacleHandler.randomPosition.cloneToPixel();
    this.fruitWinCount = winCount;

    this.addBodyUI(new Vector(0, 0));
  }

  createBodyUI() {
    const circle = new Graphics();
    circle
      .beginFill(0x5b8c5a)
      .drawRect(...this.startPosition.raw(), this.tileSize, this.tileSize)
      .endFill();
    return circle;
  }

  addBodyUI(vector) {
    const bodyUI = this.createBodyUI();
    bodyUI.position.set(...vector.raw());
    this.draw(bodyUI);
    this._bodyUI.push(bodyUI);
  }

  updatePosition() {
    const prevPosition = Point.of(this._body[0]);
    this.move();

    const prevTilesPos = this.calcWorldPosition(prevPosition).cloneToTiles();
    const tilePos = this.handleOutOfBounds();

    this.eventEmitter.emit("move", tilePos, prevTilesPos);

    this.handleEat(tilePos, prevPosition);
    this.handleWin();
    this.handleCollide(tilePos);

    this.moveAllUi();
  }

  handleOutOfBounds() {
    const tilePos = this.worldPosition.cloneToTiles();
    const valideTilePos = this.obstacleHandler.validePoint(tilePos);
    const validePos = valideTilePos.cloneToPixel();

    this._body[0] = this.clacRelativePosition(validePos);

    return valideTilePos;
  }

  moveAllUi() {
    for (let i = 0; i < this._bodyUI.length; i++) {
      const [x, y] = this._body[i].raw();
      this._bodyUI[i].position.set(x, y);

      if (this.head.equals(this._body[i]) && i !== 0) this.lost();
    }
  }

  handleEat(tilePos, prevPosition) {
    if (this.obstacleHandler.isFruit(tilePos)) {
      this._body.push(prevPosition);

      this.addBodyUI(new Vector(...prevPosition.raw()));

      this.eventEmitter.emit("eat", tilePos, this.size, this.fruitWinCount);
    }
  }

  handleWin() {
    if (this.size === this.fruitWinCount) this.eventEmitter.emit("win");
  }

  handleCollide(tilePos) {
    if (this.obstacleHandler.isCollide(tilePos)) {
      this.lost();
    }
  }

  calcWorldPosition(point) {
    return Point.of(this.startPosition, point);
  }

  get worldPosition() {
    return this.calcWorldPosition(this.head);
  }

  clacRelativePosition(point) {
    const reversed = Vector.fromPoint(this.startPosition).multiply(-1);
    return Point.of(reversed, point);
  }
}

export default UiSnake;
