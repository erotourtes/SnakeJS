import constants from "../utils/constants.js";

class Ticker {
  gameLoopCbs = new Map();

  constructor(app) {
    this.app = app;
    this.updateLimit = constants.UPDATE_RATE;
  }

  startGameLoop() {
    let updateTimes = 0;
    this.app.ticker.add((delta) => {
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

  add(key, cb) {
    this.gameLoopCbs.set(key, cb);
  }

  remove(key) {
    this.gameLoopCbs.delete(key);
  }
}

export default Ticker;
