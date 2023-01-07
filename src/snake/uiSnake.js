import Snake from "./snake.js";
import { Graphics } from "pixi.js";
import { Point, Vector } from "../core/physics/module.js";


class UiSnake extends Snake {
  _bodyUI = [];

  constructor({tileSize, obstacleHandler, draw}) {
    super(new Point(0, 0), tileSize);
    this.tileSize = tileSize;
    this.draw = draw;
    this.obstacleHandler = obstacleHandler;
    this.startPosition = this.obstacleHandler.randomPosition.cloneToPixel();
;
    this.addBodyUI(new Vector(0, 0));
  }

  createBodyUI() {
    const circle = new Graphics();
    circle.beginFill(0x0000FF)
      .drawRect(
        ...this.startPosition .raw(), 
        this.tileSize, this.tileSize)
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

    const tilePos = this.worldPosition.cloneToTiles();

    this.eventEmitter.emit("move", 
      tilePos,
      this.calcWorldPosition(prevPosition).cloneToTiles());

    if(this.obstacleHandler.isFruit(tilePos)) {
      console.log("eat");
      this._body.push(prevPosition);

      this.addBodyUI(new Vector(...prevPosition.raw()));

      this.eventEmitter.emit("eat", tilePos);
    }

    if (this.obstacleHandler.isCollide(tilePos)) {
      this.lost();
    }

    for (let i = 0; i < this._bodyUI.length; i++) {
      const [x, y] = this._body[i].raw();
      this._bodyUI[i].position.set(x, y);

      // if (this.head.equals(this._body[i] && i !== 0))
      //   this.lost();
    }
  }

  calcWorldPosition(point) {
    return Point.of(this.startPosition, point);
  }

  get worldPosition() {
    return this.calcWorldPosition(this.head);
  }

  get head() {
    return this._body[0];
  }
}

export default UiSnake;
