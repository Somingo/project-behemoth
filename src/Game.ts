import {Scene} from "./Scene";

export class Game {
    private static instance: Game;
    private readonly canvas: HTMLCanvasElement;
    // @ts-ignore
    scene: Scene;
    private isLoading = true;

    constructor(id: string, SceneConstructor: new () => Scene) {
        this.canvas = document.createElement('canvas');
        this.canvas.id = id;
        window.document.body.style.width = '100vw';
        window.document.body.style.height = '100vh';
        window.document.body.style.margin = '0';
        this.onResize();
        window.document.body.appendChild(this.canvas);
        window.addEventListener('resize', () => this.onResize());
        Game.instance = this;
        // this.scene = new SceneConstructor();
        this.loadScene(SceneConstructor);
    }

    loadScene = (SceneConstructor: new () => Scene): void => {
        this.scene = new SceneConstructor();
        this.scene.load().then(() => {
            this.isLoading = false
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
