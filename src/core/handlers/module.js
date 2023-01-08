import ObstacleHandler from './obstacleHandler.js';
import keyPressedHandlerDesktop from './keyPressedHandlerDesktop.js';
import keyPressedHandlerMobile from './keyPressedHandlerMobile.js';
import { isTouchDevice } from "../../utils/module.js"


const keyPressedHandler = isTouchDevice() ? keyPressedHandlerMobile : keyPressedHandlerDesktop;

export { ObstacleHandler, keyPressedHandler };
