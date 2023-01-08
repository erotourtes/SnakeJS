const keyMap = {
  KeyW: "up",
  KeyS: "down",
  KeyA: "left",
  KeyD: "right",
  KeyQ: "stoped",
};

const keyPressedHandlerDesktop = (cb) => {
  document.onkeydown = (event) => {
    cb(keyMap[event.code]);
  };
};

export default keyPressedHandlerDesktop;
