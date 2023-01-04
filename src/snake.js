import Point from "./point.js";
import Vector from "./vector.js";

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
  _body = [new Point(0, 0)];

  constructor() {
    console.log("Snake created");
  }

  changeDirection(direction) {
    const forbidenDir = this._forbidenDirections[this._currentDirection];
    if(direction === forbidenDir || this._directions[direction] === undefined)
      return;

    this._currentDirection = direction;
    console.log("direction changed", this._currentDirection);
  }

  move() {
    const head = this._body[0];
    const direction = this._directions[this._currentDirection];
    const vector = new Vector(this._speed * direction.x, this._speed * direction.y)
    head.move(vector);
    console.log("moved", this._body);
  }
}

export default Snake;
