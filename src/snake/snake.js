import Vector from "../core/physics/vector.js";
import { EventEmitter } from "../utils/module.js";

class Snake {
  _directions = {
    up: new Vector(0, -1),
    down: new Vector(0, 1),
    left: new Vector(-1, 0),
    right: new Vector(1, 0),
    stoped: new Vector(0, 0),
  };

  _forbidenDirections = {
    up: "down",
    down: "up",
    left: "right",
    right: "left",
  };

  _events = {
    lost: "lost",
    move: "move",
    eat: "eat",
    win: "win",
  };

  _currentDirection = "stoped";
  _body = [];

  constructor(coordinates, speed) {
    this._body.push(coordinates);
    this._speed = speed;
    this.alive = true;
    this.eventEmitter = new EventEmitter();
    this.id = Symbol("snake");
  }

  changeDirection(direction) {
    const forbidenDir = this._forbidenDirections[this._currentDirection];
    if (
      direction === forbidenDir ||
      this._directions[direction] === undefined ||
      !this.canChangeDirection
    )
      return;

    this._currentDirection = direction;
    this.canChangeDirection = false;
  }

  move() {
    const direction = this._directions[this._currentDirection];
    const vector = new Vector(
      this._speed * direction.x,
      this._speed * direction.y
    );
    this.moveAll(vector);
    this.canChangeDirection = true;
  }

  moveAll(vector) {
    let prevPosition = this.head.copy();
    this.head.move(vector);

    for (let i = 1; i < this._body.length; i++) {
      const temp = this._body[i].copy();
      this._body[i] = prevPosition;
      prevPosition = temp;
    }
  }

  get head() {
    return this._body[0];
  }

  on(eventName, cb) {
    const event = this._events[eventName];
    if (event)
      this.eventEmitter.on(eventName, cb);
  }

  lost() {
    this.alive = false;
    this.eventEmitter.emit("lost");
  }

  win() {
    this.alive = false;
    this.eventEmitter.emit("win");
  }

  get head() {
    return this._body[0];
  }

  get size() {
    return this._body.length;
  }
}

export default Snake;
