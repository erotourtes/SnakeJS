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
  _speed = 1;
  _body = [];

  constructor(x, y) {
    console.log("Snake created");
    this.body = [new Point(x, y)];
 }

  changeDirection(direction) {
    const forbidenDir = this._forbidenDirections[this._currentDirection];
    if(direction === forbidenDir || this._directions[direction] === undefined)
      return;

    this._currentDirection = direction;
    console.log("direction changed", this._currentDirection);
  }

  move() {
  }
}

export default Snake;
