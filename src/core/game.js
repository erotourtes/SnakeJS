import { Application, Container, Graphics, RenderTexture, Sprite, Texture } from "pixi.js";

import UiSnake from "./uiSnake.js";
import Field from "./field.js";

import Point from "./point.js";
import keyPressedHandler from "./keyPressedHandler.js";


class Game {
  constructor() {
    this.tileSize = 50;
    this.createApp();
    this.fixedContainer();
    this.createSnake();
  }

  createApp() {
    this.app = new Application({width: window.innerWidth, height: innerHeight});
    document.body.appendChild(this.app.view);
    this.app.renderer.background.color = 0x00FF40;

    this.app.renderer.view.style.position = "absolute";
    this.app.renderer.view.style.display = "block";
  }

  fixedContainer() {
    this.gameContainer = new Container();
    this.app.stage.addChild(this.gameContainer);
    const bg = new Sprite(Texture.WHITE);
    this.gameWidth = this.tileSize * 10;
    this.gameHeigth = this.tileSize * 10;
    // this.gameHeigth = this.app.screen.height - this.app.screen.height % this.tileSize;
    bg.width = this.gameWidth;
    bg.height = this.gameHeigth;
    bg.tint = 0xff0000;
    bg.zIndex = -1;
    this.gameContainer.addChild(bg);

    for (let i = 0; i < Math.min(this.gameWidth / this.tileSize); i++) {
      const line = new Graphics();
      line.lineStyle(1, 0x6D545D)
        .moveTo(i * this.tileSize, 0)
        .lineTo(i * this.tileSize, this.gameHeigth);
      this.gameContainer.addChild(line);
    }

    console.log(this.gameContainer.children)

  }

  createSnake() {
    // const canvaSize = new Point(this.gameContainer.width, this.gameContainer.height);
    const canvaSize = new Point(this.gameWidth, this.gameHeigth);
    this.snake = new UiSnake(this.tileSize, canvaSize, (el) => this.gameContainer.addChild(el));

    keyPressedHandler((direction) => this.snake.changeDirection(direction));
    this.gameLoop(() => this.snake.updatePosition());
  }

  gameLoop(cb) {
    let seconds = 0;
    this.app.ticker.add((delta) => {
      seconds += (1 / 60) * delta;
      if(seconds >= 0.2 ){
        cb();
        seconds = 0;
      }
    });
  }
}

export default Game;




// const style = new PIXI.TextStyle({
//   fontFamily: "Arial",
//   fontSize: 36,
//   fill: "deeppink",
//   stroke: "#ff3300",
//   strokeThickness: 4,
// });
// const text = new PIXI.Text("Hello world", style);
// app.stage.addChild(text);

// app.ticker.add((delta) => loop(delta));

// function loop(delta) {
//   const circle = new Graphics();
//   circle
//     .beginFill(0x9966FF)
//     .drawCircle(Math.random() * app.screen.width, 50, 50)
//     .endFill();
//
//   app.stage.addChild(circle);
// }

// const texture = PIXI.Texture.from("https://picsum.photos/200");
// const sprite = new PIXI.Sprite(texture);
// app.stage.addChild(sprite);

// const sprite = PIXI.Sprite.from("https://picsum.photos/200");
// app.stage.addChild(sprite);

// sprite.width = 200;
// sprite.scale.y = 2;

// sprite.position.set(100, 100);
// sprite.rotation = 0.5;
// sprite.anchor.set(0.5, 0.5);
//
// sprite.interactive = true;
//
// sprite.on("pointerdown", () => {
//   sprite.scale.set(1.5);
// });
//
// const container = new PIXI.Container();
// container.addChild(sprite);
//
//
// const sprite2 = PIXI.Sprite.from("https://picsum.photos/200");
//
// container.addChild(sprite2);
//
// app.stage.addChild(container);


// PIXI.Loader.shared
//   .add("https://picsum.photos/200")
//   .load(setup);

// app.loader.shared.add("https://picsum.photos/200").load(setup);

// function setup() {
//   const sprite = new PIXI.Sprite(
//     PIXI.Loader.shared.resources["https://picsum.photos/200"].texture
//   );
  //This code will run when the loader has finished loading the image
// }
