const keyMap = {
  KeyW: "up",
  KeyS: "down",
  KeyA: "left",
  KeyD: "right",
  KeyQ: "stoped",
};

const keyPressedHandler = (cb) => {
  document.onkeydown = (event) => {
    cb(keyMap[event.code]);
  };
};

export default keyPressedHandler;
