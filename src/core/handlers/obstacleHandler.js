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
    return this.field[point.y][point.x] === this._values["obstacle"];
  }

  isFruit(point) {
    return this.field[point.y][point.x] === this._values["fruit"];
  }

  canCreate(point) {
    return this.field[point.y][point.x] === this._values["empty"];
  }

  validePoint(point) {
    let [x, y] = point.raw();
    console.log(`Validation: x: ${x}, y: ${y}`);
    if (x < 0) 
      x = this.field[0].length - 1;
    else if (x >= this.field[0].length)
      x = 0;

    if (y < 0)
      y = this.field.length - 1;
    else if (y >= this.field.length)
      y = 0;

    return new Point(x, y);
  }

  updateField(point, prevPoint, name) {
    const [prevX, prevY] = prevPoint.raw();
    this.field[prevY][prevX] = this._values["empty"];

    const [x, y] = point.raw();
    const value = this._values[name];
    if (name === "snake" && this._canUpdateField(point)) // updating field first and then wathing for collision
      return;
    this.field[y][x] = value;
  }

  _updateAvaliableIndexes() {
    this._avaliableIndexes = [];

    this.field.forEach((row, y) => {
      row.forEach((cell, x) => {
        if (cell === this._values["empty"]) this._avaliableIndexes.push(new Point(x, y));
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
