import { Sprite, Texture } from "pixi.js";
import Field from "./field.js";
import Point from "./point.js";

class UiField extends Field {

  constructor(size, tileSize) {
    super();
    this.size = size;
    this.tileSize = tileSize;

    this.generate(this.parsedSize, 10);
  }

  get parsedSize() {
    return new Point(this.numOFTilesX, this.numOFTilesY);
  }

  get numOFTilesX() {
    return this.size.x / this.tileSize;
  }

  get numOFTilesY() {
    return this.size.y / this.tileSize;
  }


  draw(draw) {
    this.field.forEach((row, y) => {
      row.forEach((cell, x) => {
        const cellSprite = new Sprite(Texture.WHITE);
        cellSprite.width = this.tileSize;
        cellSprite.height = this.tileSize;
        cellSprite.position.set(x * this.tileSize, y * this.tileSize);
        cellSprite.tint = cell === 1 ? 0x000000 : 0xffffff;
        draw(cellSprite);
      });
    });
  }
}

export default UiField;
