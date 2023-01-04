import { Application, Graphics } from "pixi.js";

import UiSnake from "./uiSnake.js";
import Field from "./field.js";

// const snake = new Snake(0, 0);
// const field = new Field();
//
// const keyMap = {
//   KeyW: "up",
//   KeyS: "down",
//   KeyA: "left",
//   KeyD: "right",
// };
//
// document.onkeydown = (event) => {
//   snake.changeDirection(keyMap[event.code]);
// };
//
// field.generate();

class Game {
  constructor() {
    this.tileSize = 50;
    this.createApp();
    this.createSnake();
  }

  createApp() {
    this.app = new Application({width: window.innerWidth, height: innerHeight});
    document.body.appendChild(this.app.view);
    this.app.renderer.backgroundColor = 0x00FF40;

    this.app.renderer.view.style.position = "absolute";
    this.app.renderer.view.style.display = "block";
  }

  createSnake() {
    this.snake = new UiSnake(0, 0, this.tileSize, this.app.stage.addChild.bind(this.app.stage));

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

function setup() {
  const sprite = new PIXI.Sprite(
    PIXI.Loader.shared.resources["https://picsum.photos/200"].texture
  );
  //This code will run when the loader has finished loading the image
}
