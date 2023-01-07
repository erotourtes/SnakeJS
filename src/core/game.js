import ContainerManager from "./containerManager.js";
import UiSnake from "../snake/module.js";
import UiField from "../field/module.js";

import { keyPressedHandler, ObstacleHandler } from "./handlers/module.js";

import FruitFactory from "../fruit/fruitFactory.js";
import ParseTiles from "../utils/parseTiles.js";



class Game {
  gameLoopCbs = new Map();

  constructor() {
    this.containerBuilder = new ContainerManager(50);
    ParseTiles.tileSize = this.containerBuilder.tileSize;

    this.createField();
    this.createSnake();
    this.initFruitFactory();
    this.gameLoop();

    this.createFruit();
  }

  get rawData() {
    const gameData = {
      obstacleHandler: this.obstacleHandler,
    }

    return Object.assign({}, this.containerBuilder.rawData, gameData);
  }

  createField() {
    this.field = new UiField(this.rawData, 10);
    this.field.draw(this.containerBuilder.drawFunction);

    this.obstacleHandler = new ObstacleHandler(this.field.field);
  }


  initFruitFactory() {
    this.fruitFactory = new FruitFactory(this.rawData);

    this.fruitFactory.onCreate((pos, prevPos, fruit) => {
      prevPos = prevPos || pos; 
      this.obstacleHandler.updateField(pos, prevPos, "fruit");
    }) 
  }

  createFruit() {
    this.fruitFactory.create();
  }

  createSnake() {
    this.snake = new UiSnake(this.rawData);

    const snakeID = Symbol("snake");
    this.snake.onLost(() => {
      this.containerBuilder.app.stage.addChild(this.containerBuilder.gameOverContainer)
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
    this.containerBuilder.app.ticker.add((delta) => {
      seconds += (1 / 60) * delta;
      if(seconds >= 0.2 ){
        this.gameLoopCbs
          .forEach((cb) => cb());

        seconds = 0;
      }
    });
  }
}


export default Game;
