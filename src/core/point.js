class Point {
  constructor(x, y) {
    this.x = x;
    this.y = y;
  }

  move(vector) {
    this.x += vector.x;
    this.y += vector.y;
  }

  raw() {
    return [this.x, this.y];
  }

  divide(number) {
    this.x /= number;
    this.y /= number;
  }

  static subtract(point1, point2) {
    return new Point(point1.x - point2.x, point1.y - point2.y);
  }

  static add(point1, point2) {
    return new Point(point1.x + point2.x, point1.y + point2.y);
  }

  static of(point) {
    return new Point(point.x, point.y);
  }
}

export default Point;
