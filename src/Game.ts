export class Game {
    private readonly canvas: HTMLCanvasElement;

    constructor(id: string) {
        this.canvas = document.createElement('canvas');
        this.canvas.id = id;
        window.document.body.style.width = '100vw';
        window.document.body.style.height = '100vh';
        window.document.body.style.margin = '0';
        this.onResize();
        window.document.body.appendChild(this.canvas);
        window.addEventListener('resize', () => this.onResize());
    }

    onResize(): void {
        this.canvas.width = window.document.body.clientWidth;
        this.canvas.height = window.document.body.clientHeight;
    }

    get width(): number {
        return this.canvas.width;
    }

    get height(): number {
        return this.canvas.height;
    }
}
