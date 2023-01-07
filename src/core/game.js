import { Application, Container, Graphics, Sprite, Texture, Text } from "pixi.js";

import UiSnake from "../snake/module.js";
import UiField from "../field/module.js";

import { Point } from "./physics/module.js";
import { keyPressedHandler, ObstacleHandler } from "./handlers/module.js";

import FruitFactory from "../fruit/fruitFactory.js";


class Game {
  gameLoopCbs = new Map();

  constructor() {
    this.tileSize = 50;
    this.createApp();
    this.createGameContainer();
    this.createField();
    this.createSnake();
    this.initFruitFactory();
    this.gameLoop();

    this.createFruit();
  }

  createField() {
    this.field = new UiField(this.canvaSize, this.tileSize, 10);
    this.field.draw(this._drawFunction);

    this.obstacleHandler = new ObstacleHandler(this.field.field);
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

  _drawLines() {
    for (let i = 0; i < Math.min(this._gameWidth / this.tileSize); i++) {
      const line = new Graphics();
      line.lineStyle(1, 0x6D545D)
        .moveTo(i * this.tileSize, 0)
        .lineTo(i * this.tileSize, this._gameHeight);
      this.gameContainer.addChild(line);
    }
  }

  initFruitFactory() {
    this.fruitFactory = new FruitFactory(this.canvaSize, this.tileSize, this._drawFunction, this.obstacleHandler, (el) => this.gameContainer.removeChild(el));

    this.fruitFactory.onCreate((pos, prevPos, fruit) => {
      prevPos = prevPos || pos; 
      this.obstacleHandler.updateField(pos, prevPos, "fruit");
    });
  }

  createFruit() {
    this.fruitFactory.create();
  }

  createSnake() {
    this.snake = new UiSnake(this.tileSize, this.canvaSize, this.obstacleHandler, this._drawFunction);

    const snakeID = Symbol("snake");
    this.snake.onLost(() => {
      this.app.stage.addChild(this.gameOverContainer)
      this.gameLoopCbs.delete(snakeID);
    });

    this.snake.onMove((pos, prevPos) => {
      console.log(pos, prevPos);
      this.obstacleHandler.updateField(pos, prevPos, "snake");
    });

    this.snake.onEat(() => {
      this.createFruit();
    });

    keyPressedHandler((direction) => this.snake.changeDirection(direction));

    this.gameLoopCbs.set(snakeID, () => {
      this.snake.updatePosition(this.obstacleHandler)
    });
  }

  gameLoop() {
    let seconds = 0;
    this.app.ticker.add((delta) => {
      seconds += (1 / 60) * delta;
      if(seconds >= 0.2 ){
        this.gameLoopCbs
          .forEach((cb) => cb());

        seconds = 0;
      }
    });
  }


  get _drawFunction() {
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

  get canvaSize () {
    return new Point(this._gameWidth, this._gameHeight);
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
}

export default Game;
