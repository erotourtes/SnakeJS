class Point {
  constructor(x, y) {
    this.x = x;
    this.y = y;
  }

  move(vector) {
    this.x += vector.x;
    this.y += vector.y;
  }
}

export default Point;
