import Vector from "../core/physics/vector.js";
import { EventEmitter } from "../utils/module.js";

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
  _body = [];

  constructor(coordinates, speed) {
    this._body.push(coordinates);
    this._speed = speed;
    this.alive = true;
    this.eventEmitter = new EventEmitter();

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

  onLost(cb) {
    this.eventEmitter.on("lost", cb);
  }

  onMove(cb) {
    this.eventEmitter.on("move", cb);
  }

  onEat(cb) {
    this.eventEmitter.on("eat", cb);
  }

  lost() {
    this.alive = false;
    this.eventEmitter.emit("lost");
  }
}

export default Snake;
