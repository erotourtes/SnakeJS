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

  isEvenX() {
    return this.x % 2 === 0;
  }

  isEvenY() {
    return this.y % 2 === 0;
  }

}

export default Point;
