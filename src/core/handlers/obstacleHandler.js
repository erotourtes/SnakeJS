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
    const [x, y] = point.raw();
    const value = this._values[name];
    this._avaliableIndexes[x][y] = value;

    const [prevX, prevY] = prevPoint.raw();
    this._avaliableIndexes[prevX][prevY] = 0;
  }

  _updateAvaliableIndexes() {
    this._avaliableIndexes = [];

    this.field.forEach((row, y) => {
      row.forEach((cell, x) => {
        if (cell === 0) this._avaliableIndexes.push(new Point(x, y));
      });
    });
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
