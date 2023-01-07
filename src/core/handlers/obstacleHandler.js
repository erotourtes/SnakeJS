import { Point }  from "../physics/module.js";

class ObstacleHandler {
  _values = {
    "empty": 0,
    "obstacle": 1,
    "fruit": 2,
    "snake": 3,
  }

  constructor(field) {
    this.field = field;
    this._updateAvaliableIndexes();
    this.wasUpdated = true;
  }

  isCollide(point) {
    return this.field[point.y][point.x] === 1;
  }

  isFruit(point) {
    return this.field[point.y][point.x] === 2;
  }

  canCreate(point) {
    return this.field[point.y][point.x] === 0;
  }

  updateField(point, prevPoint, name) {
    const [prevX, prevY] = prevPoint.raw();
    this.field[prevY][prevX] = "0";

    const [x, y] = point.raw();
    const value = this._values[name];
    if (name === "snake" && this._canUpdateField(point)) // updating field first and then wathing for collision
      return;
    this.field[y][x] = value;

    // this._updateAvaliableIndexes(); // TODO optimize
  }

  _updateAvaliableIndexes() {
    this._avaliableIndexes = [];

    this.field.forEach((row, y) => {
      row.forEach((cell, x) => {
        if (cell === 0) this._avaliableIndexes.push(new Point(x, y));
      });
    });
  }

  _canUpdateField(point) {
    const value = this.field[point.y][point.x];
    return value !== this._values["empty"];
  }

  get randomPosition() {
    if (this.wasUpdated)
      this._updateAvaliableIndexes();

    const randomIndex= Math.floor(Math.random() * this._avaliableIndexes.length);
    const randomPoint = this._avaliableIndexes[randomIndex];
    return Point.of(randomPoint);
  }
}

export default ObstacleHandler;
