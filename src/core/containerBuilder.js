import { Application, Container, Graphics, Sprite, Texture, Text } from "pixi.js";

import { Point } from "./physics/module.js";


class ContainerBuilder {
  constructor(tileSize) {
    this.tileSize = tileSize;
    this.createApp();
    this.createGameContainer();
  }

  createApp() {
    this.app = new Application({width: window.innerWidth, height: innerHeight});
    document.body.appendChild(this.app.view);
    this.app.renderer.background.color = 0x00FF40;

    this.app.renderer.view.style.position = "absolute";
    this.app.renderer.view.style.display = "block";
  }

  createGameContainer() {
    this.gameContainer = new Container();
    this.gameContainer.position.set(this._paddingLeft, this._paddingTop);
    this.app.stage.addChild(this.gameContainer);

    this.gameContainer.addChild(this._spriteForGameContainer);

    this._drawLines();
  }

  get gameOverContainer() {
    const container = new Container();
    container.position.set(this._paddingLeft, this._paddingTop);
    container.zIndex = 1;

    container.addChild(this._spriteForGameContainer);

    const text = new Text("Game Over", {
      fontFamily: "Arial",
      fontSize: 36,
      fill: "deeppink",
      stroke: "#ff3300",
      strokeThickness: 4,
    });

    container.addChild(text);

    return container;
  }

  _drawLines() {
    for (let i = 0; i < Math.min(this._gameWidth / this.tileSize); i++) {
      const line = new Graphics();
      line.lineStyle(1, 0x6D545D)
        .moveTo(i * this.tileSize, 0)
        .lineTo(i * this.tileSize, this._gameHeight);
      this.gameContainer.addChild(line);
    }
  }

  get drawFunction() {
    return (el) => this.gameContainer.addChild(el);
  }

  get _spriteForGameContainer() {
    const bg = new Sprite(Texture.WHITE);
    bg.width = this._gameWidth;
    bg.height = this._gameHeight;
    bg.tint = 0xff0000;
    bg.zIndex = -1;

    return bg;
  }

  get _intAppWidth() {
    return this.app.screen.width - this.app.screen.width % this.tileSize;
  }

  get _intAppHeight() {
    return this.app.screen.height - this.app.screen.height % this.tileSize;
  }

  get _gameWidth() {
    return this._intAppWidth * 0.8 - (this._intAppWidth * 0.8) % this.tileSize;
  }

  get _gameHeight() {
    return this._intAppHeight * 0.8 - (this._intAppHeight * 0.8) % this.tileSize;
  }

  get _paddingLeft() {
    return (this.app.screen.width - this._gameWidth) / 2;
  }

  get _paddingTop() {
    return (this.app.screen.height - this._gameHeight) / 2;
  }

  get canvaSize () {
    return new Point(this._gameWidth, this._gameHeight);
  }
}


export default ContainerBuilder;
