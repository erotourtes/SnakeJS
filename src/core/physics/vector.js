class Vector {
  constructor(x, y) {
    this._x = x;
    this._y = y;
  }

  multiply(value) {
    this._x *= value;
    this._y *= value;
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
}

export default Vector;
