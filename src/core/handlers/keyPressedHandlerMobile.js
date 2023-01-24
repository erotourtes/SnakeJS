const keyPressedHandlerMobile = (cb) => {
  let startX = 0;
  let startY = 0;

  const handleTouchStart = (event) => {
    const firstTouch = event.touches[0];
    startX = firstTouch.clientX;
    startY = firstTouch.clientY;
  };

  const handleTouchMove = (event) => {
    const curX = event.touches[0].clientX;
    const curY = event.touches[0].clientY;

    let diffX = curX - startX;
    let diffY = curY - startY;

    const movedToSides = Math.abs(diffX) > Math.abs(diffY);
    if (movedToSides) {
      if (diffX < 0) cb("left");
      else cb("right");
    } else {
      if (diffY < 0) cb("up");
      else cb("down");
    }
  };

  document.addEventListener("touchstart", handleTouchStart, false);
  document.addEventListener("touchmove", handleTouchMove, false);
};

export default keyPressedHandlerMobile;
