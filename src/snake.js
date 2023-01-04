import Point from "./point.js";

class Snake {
  _directions = {
    up: { x: 0, y: -1 },
    down: { x: 0, y: 1 },
    left: { x: -1, y: 0 },
    right: { x: 1, y: 0 },
  };

  _forbidenDirections = {
    up: "down",
    down: "up",
    left: "right",
    right: "left",
  };

  _currentDirection = "left";

  constructor(x, y) {
    console.log("Snake created");
    this.body = [new Point(0, 0)];
    this.x = x;
    this.y = y;
  }

  changeDirection(direction) {
    if(this._forbidenDirections[this._currentDirection] === direction)
      return;

    this._currentDirection = direction;
    console.log("direction changed", this._currentDirection);
  }

  move() {
  }
}

export default Snake;
