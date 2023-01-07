import ContainerBuilder from "./containerBuilder.js";
import UiSnake from "../snake/module.js";
import UiField from "../field/module.js";

import { keyPressedHandler, ObstacleHandler } from "./handlers/module.js";

import FruitFactory from "../fruit/fruitFactory.js";
import ParseTiles from "../utils/parseTiles.js";



class Game {
  gameLoopCbs = new Map();

  constructor() {
    this.tileSize = 50;
    ParseTiles.tileSize = this.tileSize;

    this.containerBuilder = new ContainerBuilder(this.tileSize);

    this.createField();
    this.createSnake();
    this.initFruitFactory();
    this.gameLoop();

    this.createFruit();
  }

  createField() {
    this.field = new UiField(this.containerBuilder.canvaSize, this.tileSize, 10);
    this.field.draw(this.containerBuilder.drawFunction);

    this.obstacleHandler = new ObstacleHandler(this.field.field);
  }


  initFruitFactory() {
    this.fruitFactory = new FruitFactory(this.containerBuilder.canvaSize, this.tileSize, this.containerBuilder.drawFunction, this.obstacleHandler, (el) => this.containerBuilder.gameContainer.removeChild(el));

    this.fruitFactory.onCreate((pos, prevPos, fruit) => {
      prevPos = prevPos || pos; 
      this.obstacleHandler.updateField(pos, prevPos, "fruit");
    });
  }

  createFruit() {
    this.fruitFactory.create();
  }

  createSnake() {
    this.snake = new UiSnake(this.tileSize, this.containerBuilder.canvaSize, this.obstacleHandler, this.containerBuilder.drawFunction);

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
