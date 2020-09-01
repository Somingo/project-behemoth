import {KeyboardState} from './KeyboardState';

export class KeyboardHandler {

    state: KeyboardState = {
        keyDown: {},
        keyChanged: {},
    };

    constructor() {
        document.addEventListener('keydown', this.keyDownListener);
        document.addEventListener('keyup', this.keyUpListener);
    }

    keyEventHandler = (event: KeyboardEvent): void => {
        this.state.keyChanged[event.keyCode] = true;
        event.preventDefault();
        event.stopPropagation();
        event.stopImmediatePropagation();
    }

    keyDownListener = (event: KeyboardEvent): void => {
        this.state.keyDown[event.keyCode] = true;
        this.keyEventHandler(event);
    }
    keyUpListener = (event: KeyboardEvent): void => {
        this.state.keyDown[event.keyCode] = false;
        this.keyEventHandler(event);
    }
    update = (): void => {
        this.state.keyChanged = {};
    }
}
