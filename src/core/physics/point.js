import ParseTiles from "../../utils/parseTiles.js";

class Point {
  constructor(x, y) {
    this.x = x;
    this.y = y;
  }

  move(vector) {
    this.x += vector.x;
    this.y += vector.y;
    return this;
  }

  copy() {
    return new Point(this.x, this.y);
  }

  raw() {
    return [this.x, this.y];
  }

  equals(point) {
    return this.x === point.x && this.y === point.y;
  }

  static of(point, vector) {
    if (!point)
      return null;
    if (!vector)
      return new Point(point.x, point.y);
    return new Point(point.x + vector.x, point.y + vector.y);
  }
}

export default Point;
