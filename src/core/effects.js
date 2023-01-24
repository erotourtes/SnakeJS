import { filters, Ticker } from "pixi.js";

class Effects {
  timer = null;
  cb = null;
  ticker = null;

  constructor(container) {
    this.container = container;
  }

  clearNow() {
    this.container.filters = [];
    clearTimeout(this.timer);

    this._callBack();

    if (this.ticker) {
      this.ticker.stop();
      this.ticker.destroy();
    }
  }

  lsd(ms, cb) {
    this.clearNow();
    this.cb = cb;

    const filter = new filters.ColorMatrixFilter();
    filter.lsd();
    this.container.filters = [filter];

    this.clear(ms, cb);
  }

  clear(ms) {
    this.timer = setTimeout(() => {
      this.container.filters = [];
      this.timer = null;
      this._callBack();

      if (this.ticker) {
        this.ticker.stop();
        this.ticker.destroy();
      }
    }, ms);
  }

  colorize(ms, cb) {
    this.clearNow();
    this.cb = cb;

    const filter = new filters.ColorMatrixFilter();
    this.container.filters = [filter];

    this.ticker = Ticker.shared;

    let count = 0;

    this.ticker.add(() => {
      const { matrix } = filter;
      count += 0.1;

      const COLOR_OFFSET_START = 1;
      const COLOR_OFFSET_END = 7;
      for (let i = COLOR_OFFSET_START; i < COLOR_OFFSET_END; i++)
        matrix[i] = Math.sin(count);
    });

    this.clear(ms);
  }

  _callBack() {
    if (!this.cb) return;

    this.cb();
    this.cb = null;
  }
}

export default Effects;
