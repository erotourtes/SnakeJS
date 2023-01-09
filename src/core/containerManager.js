import {
  Application,
  Container,
  Graphics,
  Sprite,
  Texture,
  Text,
} from "pixi.js";

import { Point } from "./physics/module.js";
import { isTouchDevice } from "../utils/module.js";

class ContainerManager {
  constructor(tileSize) {
    this.tileSize = tileSize;
    this.createApp();
    this.createGameContainer();
  }

  createApp() {
    this.app = new Application({
      width: window.innerWidth,
      height: innerHeight,
    });
    document.body.appendChild(this.app.view);
    this.app.renderer.background.color = 0x202c39;

    this.app.renderer.view.style.position = "absolute";
    this.app.renderer.view.style.display = "block";
  }

  createGameContainer() {
    this.gameContainer = new Container();
    this.gameContainer.position.set(this._paddingLeft, this._paddingTop);
    this.app.stage.addChild(this.gameContainer);

    this.gameContainer.addChild(this._spriteForGameContainer);

    // this._drawLines();
  }

  clearGameContainer() {
    this.gameContainer.removeChildren();
    this.gameContainer.addChild(this._spriteForGameContainer);
  }

  get rawData() {
    return {
      draw: this.drawFunction,
      remove: this.removeFunction,
      canvasSize: this.canvaSize,
      tileSize: this.tileSize,
    };
  }

  gameOverScreen(cb) {
    this.app.stage.addChild(this.containerWithText("Game Over", 0x202c39, cb));
  }

  gameWinScreen(cb) {
    this.app.stage.addChild(this.containerWithText("You Win", 0x283845, cb));
  }

  containerWithText(text, color, onClick) {
    const container = new Container();
    container.position.set(this._paddingLeft, this._paddingTop);
    container.zIndex = 1;

    container.addChild(this._spriteForGameContainer);

    container.interactive = true;

    const onButtonUp = () => {
      this.app.stage.removeChild(container);
      this.clearGameContainer();
      onClick();
    };

    container
      .on("mouseup", onButtonUp)
      .on("mouseupoutside", onButtonUp)
      .on("touchend", onButtonUp)
      .on("touchendoutside", onButtonUp);

    const textUi = new Text(text, {
      fontFamily: "Arial",
      fontSize: 72,
      fill: color,
      stroke: color,
      strokeThickness: 4,
    });

    const centerX = this._gameWidth / 2 - textUi.width / 2;
    const centerY = this._gameHeight / 2 - textUi.height / 2;
    textUi.position.set(centerX, centerY);

    if (textUi.width > this._gameWidth) {
      textUi.style.fontSize = 36;
      textUi.position.set(centerX + textUi.width / 2, centerY);
    }

    container.addChild(textUi);

    return container;
  }

  _drawLines() {
    for (let i = 0; i < Math.min(this._gameWidth / this.tileSize); i++) {
      const line = new Graphics();
      line
        .lineStyle(1, 0x6d545d)
        .moveTo(i * this.tileSize, 0)
        .lineTo(i * this.tileSize, this._gameHeight);
      this.gameContainer.addChild(line);
    }
  }

  get drawFunction() {
    return (el) => this.gameContainer.addChild(el);
  }

  get removeFunction() {
    return (el) => this.gameContainer.removeChild(el);
  }

  get _spriteForGameContainer() {
    const bg = new Sprite(Texture.WHITE);
    bg.width = this._gameWidth;
    bg.height = this._gameHeight;
    bg.tint = 0xd36135;
    bg.zIndex = -1;

    return bg;
  }

  get _intAppWidth() {
    return this.app.screen.width - (this.app.screen.width % this.tileSize);
  }

  get _intAppHeight() {
    return this.app.screen.height - (this.app.screen.height % this.tileSize);
  }

  get _gameWidth() {
    if (isTouchDevice()) return this._intAppWidth;
    return (
      this._intAppWidth * 0.8 - ((this._intAppWidth * 0.8) % this.tileSize)
    );
  }

  get _gameHeight() {
    if (isTouchDevice()) return this._intAppHeight;
    return (
      this._intAppHeight * 0.8 - ((this._intAppHeight * 0.8) % this.tileSize)
    );
  }

  get _paddingLeft() {
    return (this.app.screen.width - this._gameWidth) / 2;
  }

  get _paddingTop() {
    return (this.app.screen.height - this._gameHeight) / 2;
  }

  get canvaSize() {
    return new Point(this._gameWidth, this._gameHeight);
  }
}

export default ContainerManager;
