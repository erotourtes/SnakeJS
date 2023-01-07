import Snake from "./snake.js";
import { Graphics } from "pixi.js";
import { Point, Vector } from "../core/physics/module.js";
import { ParseTiles } from "../utils/module.js";


class UiSnake extends Snake {
  _bodyUI = [];

  constructor({tileSize, canvasSize, obstacleHandler, draw}) {
    super(new Point(0, 0), tileSize);
    this.tileSize = tileSize;
    this.draw = draw;
    this.obstacleHandler = obstacleHandler;
    this.startPosition = this.handleSpawnPosition(canvasSize, tileSize);
    this.addBodyUI(new Vector(0, 0));
  }

  createBodyUI() {
    const circle = new Graphics();
    circle.beginFill(0x0000FF)
      .drawCircle(
        ...this.startPosition .raw(), 
        this.tileSize / 2)
      .endFill();
    return circle;
  }

  addBodyUI(vector) {
    const bodyUI = this.createBodyUI();
    bodyUI.position.set(...vector.raw());
    this.draw(bodyUI);
    this._bodyUI.push(bodyUI);
  }

  // TODO refactor
  updatePosition() {
    const prevPosition = Point.of(this._body[0]);
    this.move();

    this.eventEmitter.emit("move", 
      this.tilePosition,
      ParseTiles.parseToTiles(this.calcWorldPosition(prevPosition)));

    if(this.obstacleHandler.isFruit(this.tilePosition)) {
      console.log("eat");
      this._body.push(prevPosition);

      this.addBodyUI(new Vector(...prevPosition.raw()));

      this.eventEmitter.emit("eat", this.tilePosition);
    }

    const tilePosition = ParseTiles.parseToTiles(this.worldPosition);
    if (this.obstacleHandler.isCollide(tilePosition)) {
      this.lost();
    }

    for (let i = 0; i < this._bodyUI.length; i++) {
      const [x, y] = this._body[i].raw();
      this._bodyUI[i].position.set(x, y);

      // if (this.head.equals(this._body[i] && i !== 0))
      //   this.lost();
    }
  }

  // TODO refactor
  handleSpawnPosition(mapSize, tileSize) {
    const startPosition = Point.of(mapSize);

    if ((startPosition.x / tileSize) % 2 === 0)
    startPosition.move(new Vector(-tileSize, 0));
    if((startPosition.y / tileSize) % 2 === 0)
    startPosition.move(new Vector(0, -tileSize));

    startPosition.divide(2);

    let tilesPosition = ParseTiles.parseToTiles(startPosition);
    while(!this.obstacleHandler.canCreate(tilesPosition)) {
      startPosition.move(new Vector(tileSize, 0));
      tilesPosition = ParseTiles.parseToTiles(startPosition);
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
    return ParseTiles.parseToTiles(this.worldPosition);
  }

  get head() {
    return this._body[0];
  }
}

export default UiSnake;
