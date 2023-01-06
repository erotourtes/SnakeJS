class ObstacleHandler {
  constructor(field) {
    this.field = field;
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
}

export default ObstacleHandler;
