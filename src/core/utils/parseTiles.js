import Point from "../point.js";

class ParseTiles {
  static parseToTiles(point, tileSize) {
    const numOFTilesX = point.x / tileSize;
    const numOFTilesY = point.y / tileSize;

    return new Point(numOFTilesX, numOFTilesY);
  }

  static parseToPixel(point, tileSize) {
    const pixelX = point.x * tileSize;
    const pixelY = point.y * tileSize;

    return new Point(pixelX, pixelY);
  }
}

export default ParseTiles;
