import { Sprite, Texture } from "pixi.js";
import Field from "./field.js";

class UiField extends Field {
  constructor({canvasSize, tileSize}, obstacleCount) {
    super();
    this.pixelSize = canvasSize;
    this.tileSize = tileSize;

    const parsedSize = canvasSize.cloneToTiles();

    this.generate(parsedSize, obstacleCount);
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
