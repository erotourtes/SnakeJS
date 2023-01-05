import Point from "../point.js";

class ParseTiles {
  static parse(point, tileSize) {
    const numOFTilesX = point.x / tileSize;
    const numOFTilesY = point.y / tileSize;

    return new Point(numOFTilesX, numOFTilesY);
  }
}

export default ParseTiles;
