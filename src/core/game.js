import ContainerManager from "./containerManager.js";
import Effects from "./effects.js";

import { SnakeBuilder } from "../snake/module.js";
import UiField from "../field/module.js";

import { ObstacleHandler } from "./handlers/module.js";

import FruitFactory from "../fruit/fruitFactory.js";
import { ParseTiles, isTouchDevice, constants } from "../utils/module.js";

class Game {
  gameLoopCbs = new Map();

  constructor() {
    const tileSize = this.getTileSize();
    this.containerManager = new ContainerManager(tileSize);
    ParseTiles.tileSize = tileSize;

    this.updateLimit = constants.UPDATE_RATE;

    this.gameLoop();

  }

  start() {
    this.createField();
    this.initFruitFactory();
    this.snakeBuilder = new SnakeBuilder(this.mechanics);
    this.createSnake();
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
    this.snake = this.snakeBuilder.createSnake();

    this.gameLoopCbs.set(this.snake.id, () => {
      this.snake.updatePosition(this.obstacleHandler);
    });
  }

  gameLoop() {
    let updateTimes = 0;
    this.containerManager.app.ticker.add((delta) => {
      updateTimes +=  delta / constants.PIXI_UPDATE_COUNT;
      if (updateTimes >= this.updateLimit) {
        this.gameLoopCbs.forEach((cb) => cb());

        updateTimes = 0;
      }
    });
  }

  reduceUpdateLimitBy(times) {
    this.updateLimit /= times;
  }

  resetUpdateRate() {
    this.updateLimit = constants.UPDATE_RATE;
  }

  getTileSize() {
    if (isTouchDevice()) return constants.SMALL_SCREEN
    return constants.LARGE_SCREEN;
  }

  get rawData() {
    const gameData = {
      obstacleHandler: this.obstacleHandler,
    };

    return Object.assign({}, this.containerManager.rawData, gameData);
  }

  get mechanics() {
    return { 
      resetUpdateRate: this.resetUpdateRate.bind(this),
      reduceUpdateLimitBy: this.reduceUpdateLimitBy.bind(this),
      gameLoopCbs: this.gameLoopCbs,

      fruitFactory: this.fruitFactory,
      obstacleHandler: this.obstacleHandler,
      containerManager: this.containerManager,
      rawData: this.rawData,
      start: this.start.bind(this),
    };
  }
}

export default Game;
