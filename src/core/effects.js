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
      matrix[1] = Math.sin(count) * 3;
      matrix[2] = Math.cos(count);
      matrix[3] = Math.cos(count) * 1.5;
      matrix[4] = Math.sin(count / 3) * 2;
      matrix[5] = Math.sin(count / 2);
      matrix[6] = Math.sin(count / 4);
    });

    this.timer = setTimeout(() => {
      this.ticker.stop();
      this.ticker.destroy();

      this.container.filters = [];

      this._callBack();
    }, ms);
  }

  _callBack() {
    if (!this.cb) return;

    this.cb();
    this.cb = null;
  }
}

export default Effects;
