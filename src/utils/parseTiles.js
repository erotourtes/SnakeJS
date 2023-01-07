import { Point } from "../core/physics/module.js";

class ParseTiles {
  static tileSize;

  static parseToTiles(point) {
    const numOFTilesX = Math.floor(point.x / ParseTiles.tileSize);
    const numOFTilesY = Math.floor(point.y / ParseTiles.tileSize);

    return new Point(numOFTilesX, numOFTilesY);
  }

  static parseToPixel(point) {
    const pixelX = point.x * ParseTiles.tileSize;
    const pixelY = point.y * ParseTiles.tileSize;

    return new Point(pixelX, pixelY);
  }

  set tileSize(tileSize) {
    ParseTiles.tileSize = tileSize;
  }
}

export default ParseTiles;
