import { Point } from "../core/physics/module.js";

class ParseTiles {
  static parseToTiles(point, tileSize) {
    const numOFTilesX = Math.floor(point.x / tileSize);
    const numOFTilesY = Math.floor(point.y / tileSize);

    return new Point(numOFTilesX, numOFTilesY);
  }

  static parseToPixel(point, tileSize) {
    const pixelX = point.x * tileSize;
    const pixelY = point.y * tileSize;

    return new Point(pixelX, pixelY);
  }
}

export default ParseTiles;
