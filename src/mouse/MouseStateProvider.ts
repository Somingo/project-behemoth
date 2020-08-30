import {MouseState} from './MouseState';

export class MouseStateProvider {

    static buttons = {
        LEFT: 0,
        RIGHT: 1,
        MIDDLE: 2,
    }

    private static buttonBinary = [1, 2, 4];

    public state: MouseState = {
        x: 0, y: 0,
        hasMouseButtonUpdated: [false, false, false],
        mouseButtonDown: [false, false, false],
        nativeXCoordinate: 0,
        nativeYCoordinate: 0,
    };

    constructor(private element: HTMLCanvasElement) {
        element.addEventListener('mousedown', this.mouseButtonListener);
        element.addEventListener('mousemove', this.mouseMoveListener);
        element.addEventListener('mouseup', this.mouseButtonListener);
    }

    public update = () => {
        this.state.hasMouseButtonUpdated = this.state.hasMouseButtonUpdated.map(() => false);
    }

    private mouseCoordinateHandler = (event: MouseEvent) => {
        this.state.nativeXCoordinate = event.offsetX;
        this.state.nativeYCoordinate = event.offsetY;
    }

    private mouseMoveListener = (event: MouseEvent) => {
        this.mouseCoordinateHandler(event);
    };

    private mouseButtonListener = (event: MouseEvent) => {
        event.preventDefault();
        event.stopPropagation();
        event.stopImmediatePropagation();
        this.mouseCoordinateHandler(event);
        this.state.mouseButtonDown = this.state.mouseButtonDown.map(
            (button, index) => {
                let newButtonState = (MouseStateProvider.buttonBinary[index] & event.buttons) === MouseStateProvider.buttonBinary[index];
                this.state.hasMouseButtonUpdated[index] = button !== newButtonState;
                return newButtonState;
            },
        )
    };

}
