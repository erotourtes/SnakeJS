import Vector from "./vector.js";

class Snake {
  _directions = {
    up: new Vector(0, -1),
    down: new Vector(0, 1),
    left: new Vector(-1, 0),
    right: new Vector(1, 0),
    stoped: new Vector(0, 0)
  };

  _forbidenDirections = {
    up: "down",
    down: "up",
    left: "right",
    right: "left",
  };

  _currentDirection = "stoped";
  _speed = 5;
  _body = [];

  constructor(coordinates) {
    this._body.push(coordinates);
  }

  changeDirection(direction) {
    const forbidenDir = this._forbidenDirections[this._currentDirection];
    if(direction === forbidenDir || this._directions[direction] === undefined)
      return;

    this._currentDirection = direction;
  }

  move() {
    const head = this._body[0];
    const direction = this._directions[this._currentDirection];
    const vector = new Vector(this._speed * direction.x, this._speed * direction.y)
    head.move(vector);
  }
}

export default Snake;
