const keyPressedHandlerMobile = (cb) => {
  let startX = 0;
  let startY = 0;
                                                                         
  const handleTouchStart = event => {
    const firstTouch = event.touches[0];
    startX = firstTouch.clientX;                                      
    startY = firstTouch.clientY;                                      
  };                                                
                                                                         
  const handleTouchMove = event => {
    const curX = event.touches[0].clientX;                                    
    const curY = event.touches[0].clientY;

    let diffX = curX - startX;
    let diffY = curY - startY;

    if (Math.abs(diffX) > Math.abs(diffY))
      diffX < 0 ? cb("left") : cb("right")
    else 
      diffY < 0 ? cb("up") : cb("down")
};

  document.addEventListener('touchstart', handleTouchStart, false);        
  document.addEventListener('touchmove', handleTouchMove, false);
};

export default keyPressedHandlerMobile;
