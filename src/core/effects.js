import { filters, Ticker } from "pixi.js";

class Effects {
  constructor(container) {
    this.container = container;
  }

  createEffect(ms) {
    this.colorize(ms);
  }

  colorize(ms) {
    const filter = new filters.ColorMatrixFilter();
    this.container.filters = [filter];

    const ticker = Ticker.shared;

    let count = 0;

    ticker.add(() => {
      console.log("Workgin")
      const { matrix } = filter;
      count += 0.1;
      matrix[1] = Math.sin(count) * 3;
      matrix[2] = Math.cos(count);
      matrix[3] = Math.cos(count) * 1.5;
      matrix[4] = Math.sin(count / 3) * 2;
      matrix[5] = Math.sin(count / 2);
      matrix[6] = Math.sin(count / 4);
    });

    setTimeout(() => {
      console.log("stop");
      ticker.stop();
      ticker.destroy();
      this.container.filters = [];
    }, ms);
  }
}

export default Effects;
