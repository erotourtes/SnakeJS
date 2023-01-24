import { keyPressedHandler } from "../core/handlers/module.js";
import Effects from "../core/effects.js";
import UiSnake from "./uiSnake.js";
import { constants } from "../utils/module.js";


class SnakeBuilder {
  constructor({ start, ticker, containerManager, fruitFactory, rawData }) {
    this.ticker = ticker;

    this.fruitFactory = fruitFactory;
    this.obstacleHandler = rawData.obstacleHandler;
    this.containerManager = containerManager;
    this.rawData = rawData;
    this.start = start;

    this.effects = new Effects(this.containerManager.gameContainer);
  }

  createSnake() {
    this.snake = new UiSnake(this.rawData, this.fruitWinCount);

    this.onLostSnake();
    this.onWinSnake();
    this.onMoveSnake();
    this.onEatSnake(this.fruitFactory);

    keyPressedHandler((direction) => this.snake.changeDirection(direction));

    this.ticker.add(this.snake.id, () => {
      this.snake.updatePosition(this.obstacleHandler);
    });

    return this.snake;
  }

  onEatSnake() {
    this.snake.on("eat", (pos, count, countToWin) => {
      const { name, level } = this.fruitFactory.effect;
      const middleCount = Math.floor(countToWin / 2);

      if (middleCount === count) {
        this.ticker.reduceUpdateLimitBy(2);
        this.effects.colorize(1000, () => this.ticker.resetUpdateRate());
      } else if (name === "invincible") {
        this.obstacleHandler._values["obstacle"] = 2;
        this.effects.lsd(
          1000 * level,
          () => (this.obstacleHandler._values["obstacle"] = 1)
        );
      }

      this.fruitFactory.create();
    });
  }

  onMoveSnake() {
    this.snake.on("move", (pos, prevPos) =>
      this.obstacleHandler.updateField(pos, prevPos, "snake")
    );
  }

  onWinSnake() {
    this.snake.on("win", () => {
      this.ticker.remove(this.snake.id);
      this.effects.clearNow();
      this.containerManager.gameWinScreen(() => this.start());
    });
  }

  onLostSnake() {
    this.snake.on("lost", () => {
      this.ticker.remove(this.snake.id);
      this.effects.clearNow();
      this.containerManager.gameOverScreen(() => this.start());
    });
  }


  get fruitWinCount() {
    const [x, y] = this.rawData.canvasSize.cloneToTiles().raw();
    return Math.ceil((x * y) * constants.FRUIT_TO_FIELD_RATIO) + constants.MIN_FURIT;
  }
}

export default SnakeBuilder;
