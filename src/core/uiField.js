import { Sprite, Texture } from "pixi.js";
import Field from "./field.js";
import ParseTiles from "./utils/parseTiles.js";

class UiField extends Field {
  constructor(size, tileSize) {
    super();
    this.size = size;
    this.tileSize = tileSize;

    const parsedSize = ParseTiles.parse(size, tileSize);

    this.generate(parsedSize, 10);
  }

  draw(draw) {
    this.field.forEach((row, y) => {
      row.forEach((cell, x) => {
        const cellSprite = this.createSprite({ x, y, cell });
        draw(cellSprite);
      });
    });
  }

  createSprite({ x, y, cell}) {
    const cellSprite = new Sprite(Texture.WHITE);
    cellSprite.width = this.tileSize;
    cellSprite.height = this.tileSize;
    cellSprite.position.set(x * this.tileSize, y * this.tileSize);
    cellSprite.tint = cell === 1 ? 0x000000 : 0xffffff;
    return cellSprite;
  }
}

export default UiField;
