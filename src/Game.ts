import {Scene} from "./Scene";

export class Game {
    private static instance: Game;
    private readonly canvas: HTMLCanvasElement;
    // @ts-ignore
    scene: Scene;
    private isLoading = true;
    private readonly context: CanvasRenderingContext2D | null;

    constructor(id: string, SceneConstructor: new () => Scene) {
        this.canvas = document.createElement('canvas');
        this.canvas.id = id;
        this.context = this.canvas.getContext("2d");
        window.document.body.style.width = '100vw';
        window.document.body.style.height = '100vh';
        window.document.body.style.margin = '0';
        this.onResize();
        window.document.body.appendChild(this.canvas);
        window.addEventListener('resize', () => this.onResize());
        Game.instance = this;
        // this.scene = new SceneConstructor();
        this.loadScene(SceneConstructor);
        this.gameCycle(1);
    }

    gameCycle: FrameRequestCallback = (time) => {
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
            this.scene.update({});
        }
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
        this.canvas.width = window.document.body.clientWidth;
        this.canvas.height = window.document.body.clientHeight;
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
