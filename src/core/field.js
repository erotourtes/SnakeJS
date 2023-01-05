class Field {
  generate(size, obstaclesCount) {
    this.size = size;
    this.field = new Array(size.y)
      .fill(null)
      .map(() => new Array(size.x).fill(0));

    this.createObstacles(obstaclesCount);
  }

  createObstacles(count) {
    for (let i = 0; i < count; i++) {
      const x = Math.floor(Math.random() * this.size.x);
      const y = Math.floor(Math.random() * this.size.y);
      this.field[y][x] = 1;
    }
  }
}

export default Field;
