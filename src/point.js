class Point {
  constructor(x, y) {
    this.x = x;
    this.y = y;
  }

  move(coordinates) {
    this.x += coordinates.x;
    this.y += coordinates.y;
  }
}

export default Point;
