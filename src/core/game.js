import ContainerManager from "./containerManager.js";

import { SnakeBuilder } from "../snake/module.js";
import UiField from "../field/module.js";

import { ObstacleHandler } from "./handlers/module.js";

import FruitFactory from "../fruit/fruitFactory.js";
import { ParseTiles, isTouchDevice, constants } from "../utils/module.js";

import Ticker from "./ticker.js";

class Game {

  constructor() {
    const tileSize = this.getTileSize();
    this.containerManager = new ContainerManager(tileSize);
    ParseTiles.tileSize = tileSize;

    this.updateLimit = constants.UPDATE_RATE;

    this.ticker = new Ticker(this.containerManager.app);
    this.ticker.startGameLoop();
  }

  start() {
    this.createField();
    this.initFruitFactory();
    this.createSnake();
  }

  createField() {
    this.field = new UiField(this.rawData, constants.OBSTACLES);
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
    this.snake = new SnakeBuilder(this.mechanics).createSnake();
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
      ticker: this.ticker,
      fruitFactory: this.fruitFactory,
      containerManager: this.containerManager,
      rawData: this.rawData,
      start: this.start.bind(this),
    };
  }
}

export default Game;
