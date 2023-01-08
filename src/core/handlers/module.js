import ObstacleHandler from './obstacleHandler.js';
import keyPressedHandlerDesktop from './keyPressedHandlerDesktop.js';
import keyPressedHandlerMobile from './keyPressedHandlerMobile.js';

const isTouchDevice = ('ontouchstart' in window) ||
     (navigator.maxTouchPoints > 0) ||
     (navigator.msMaxTouchPoints > 0)

const keyPressedHandler = isTouchDevice ? keyPressedHandlerMobile : keyPressedHandlerDesktop;

export { ObstacleHandler, keyPressedHandler };
