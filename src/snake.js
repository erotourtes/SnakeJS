import Point from "./point.js";

class Snake {
  _directions = {
    up: { x: 0, y: -1 },
    down: { x: 0, y: 1 },
    left: { x: -1, y: 0 },
    right: { x: 1, y: 0 },
  };

  currentDirection = "left";

  constructor() {
    console.log("Snake created");
    this.body = [new Point(0, 0)];
  }

  move(direction) {
    direction = direction || this.currentDirection;
    const dir = this._directions[direction];
    this.body[0].move(dir);
  }
}

export default Snake;
