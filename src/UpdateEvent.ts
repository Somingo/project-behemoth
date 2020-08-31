import {MouseState} from './mouse/MouseState';
import {KeyboardState} from './keyboard/KeyboardState';

export interface UpdateEvent {
    mouseState: MouseState;
    keyState: KeyboardState;
}
