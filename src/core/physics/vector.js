class Vector {
  constructor(x, y) {
    this._x = x;
    this._y = y;
  }

  multiply(value) {
    this._x *= value;
    this._y *= value;
    return this;
  }

  raw() {
    return [this._x, this._y];
  }

  get x() {
    return this._x;
  }

  get y() {
    return this._y;
  }

  static formPoint(point) {
    return new Vector(point.x, point.y);
  }
}

export default Vector;
