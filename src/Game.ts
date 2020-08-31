import {Scene} from './Scene';
import {MouseHandler} from './mouse/MouseHandler';
import {KeyboardHandler} from './keyboard/KeyboardHandler';

export class Game {
    private static instance: Game;
    private readonly canvas: HTMLCanvasElement;
    // @ts-ignore
    scene: Scene;
    private isLoading = true;
    private readonly context: CanvasRenderingContext2D | null;
    private mouseHandler:MouseHandler;
    private keyboardHandler:KeyboardHandler = new KeyboardHandler();

    constructor(id: string, SceneConstructor: new () => Scene) {
        this.canvas = document.createElement('canvas');
        this.mouseHandler = new MouseHandler(this.canvas);
        this.canvas.id = id;
        this.context = this.canvas.getContext("2d");
        window.document.body.appendChild(this.canvas);
        window.addEventListener('resize', () => this.onResize());
        Game.instance = this;
        // this.scene = new SceneConstructor();
        this.loadScene(SceneConstructor);
        this.gameCycle(1);
    }

    gameCycle: FrameRequestCallback = (time) => {
        this.onResize();
        if (this.context == null) {
            alert('Unexpected Error: please reload...');
            return;
        }
        if (this.isLoading) {
            this.context.fillStyle = '#000000';
            this.context.fillRect(0, 0, this.width, this.height);
            this.context.font = '50px Arial';
            this.context.fillStyle = '#ffffff';
            this.context.fillText('Loading...', 50, 50);
        }
        if (!this.isLoading) {
            this.scene.update({mouseState:this.mouseHandler.state, keyState: this.keyboardHandler.state});
        }
        this.mouseHandler.update();
        this.keyboardHandler.update();
        if (!this.isLoading) {
            this.scene.render({context: this.context});
        }
        requestAnimationFrame((time) => this.gameCycle(time));
    }

    loadScene = (SceneConstructor: new () => Scene): void => {
        this.scene = new SceneConstructor();
        this.scene.load().then(() => {
            this.isLoading = false;
            console.log('Sprites loaded.');
        });
    };

    onResize = (): void => {
        this.canvas.width = window.document.body.clientWidth-1;
        this.canvas.height = window.document.body.clientHeight-1;
    };

    public static getInstance(): Game {
        return Game.instance;
    }

    get width(): number {
        return this.canvas.width;
    }

    get height(): number {
        return this.canvas.height;
    }
}
