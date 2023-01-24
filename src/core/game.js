import ContainerManager from "./containerManager.js";
import Effects from "./effects.js";

import UiSnake from "../snake/module.js";
import UiField from "../field/module.js";

import { keyPressedHandler, ObstacleHandler } from "./handlers/module.js";

import FruitFactory from "../fruit/fruitFactory.js";
import { ParseTiles, isTouchDevice } from "../utils/module.js";

class Game {
  gameLoopCbs = new Map();

  constructor() {
    const tileSize = this.calcTileSize();
    this.containerManager = new ContainerManager(tileSize);
    ParseTiles.tileSize = tileSize;

    this.gameLoop();

    this.effects = new Effects(this.containerManager.gameContainer);
  }

  start() {
    this.createField();
    this.createSnake();
    this.initFruitFactory();
  }

  createField() {
    this.field = new UiField(this.rawData, 10);
    this.field.draw(this.containerManager.drawFunction);

    this.obstacleHandler = new ObstacleHandler(this.field.field);
  }

  initFruitFactory() {
    this.fruitFactory = new FruitFactory(this.rawData);

    this.fruitFactory.onCreate((pos, prevPos) => {
      prevPos = prevPos || pos;
      this.obstacleHandler.updateField(pos, prevPos, "fruit");
    });

    this.createFruit();
  }

  createFruit() {
    this.fruitFactory.create();
  }

  createSnake() {
    this.snake = new UiSnake(this.rawData, this.fruitWinCount);

    const snakeID = Symbol("snake");

    this.onLostSnake(snakeID);
    this.onWinSnake(snakeID);
    this.onMoveSnake();
    this.onEatSnake();

    keyPressedHandler((direction) => this.snake.changeDirection(direction));

    this.gameLoopCbs.set(snakeID, () => {
      this.snake.updatePosition(this.obstacleHandler);
    });
  }

  onEatSnake() {
    this.snake.onEat((pos, count, countToWin) => {
      const { name, level } = this.fruitFactory.effect;
      const middleCount = Math.floor(countToWin / 2);

      if (middleCount === count) {
        this.reduceUpdateRate();
        this.effects.colorize(1000, () => this.resetUpdateRate());
      } else if (name === "invincible") {
        this.obstacleHandler._values["obstacle"] = 2;
        this.effects.lsd(
          1000 * level,
          () => (this.obstacleHandler._values["obstacle"] = 1)
        );
      }

      this.createFruit();
    });
  }

  onMoveSnake() {
    this.snake.onMove((pos, prevPos) =>
      this.obstacleHandler.updateField(pos, prevPos, "snake")
    );
  }

  onWinSnake(snakeID) {
    this.snake.onWin(() => {
      this.gameLoopCbs.delete(snakeID);
      this.effects.clearNow();
      this.containerManager.gameWinScreen(() => this.start());
    });
  }

  onLostSnake(snakeID) {
    this.snake.onLost(() => {
      this.gameLoopCbs.delete(snakeID);
      this.effects.clearNow();
      this.containerManager.gameOverScreen(() => this.start());
    });
  }

  gameLoop() {
    let seconds = 0;
    this.containerManager.app.ticker.add((delta) => {
      seconds += (1 / 60) * delta;
      if (seconds >= this.updateRate) {
        this.gameLoopCbs.forEach((cb) => cb());

        seconds = 0;
      }
    });
  }

  updateRate = 0.2;

  reduceUpdateRate() {
    this.updateRate /= 2;
  }

  resetUpdateRate() {
    this.updateRate = 0.2;
  }

  calcTileSize() {
    if (isTouchDevice()) return 32;
    return 64;
  }

  get fruitWinCount() {
    const [x, y] = this.rawData.canvasSize.cloneToTiles().raw();
    return Math.ceil((x * y) / 15) + 3;
  }

  get rawData() {
    const gameData = {
      obstacleHandler: this.obstacleHandler,
    };

    return Object.assign({}, this.containerManager.rawData, gameData);
  }
}

export default Game;
