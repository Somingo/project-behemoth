import {Sprite} from './Sprite';
import {RenderEvent} from './RenderEvent';
import {UpdateEvent} from './UpdateEvent';
import {Layer} from './Layer';
import {ImageSpriteLoader} from './ImageSprite';
import {Game} from './Game';

export abstract class Scene implements Sprite {

    layers: Layer[] = [];

    spriteLoader: ImageSpriteLoader = new ImageSpriteLoader();

    abstract spriteList(): string[];

    abstract init(): void;

    load(): Promise<any> {
        return this.spriteLoader.loadSprites(this.spriteList()).then(x => {
            this.init();
            return x
        });
    };

    render(event: RenderEvent): void {
        event.context.fillRect(0, 0, Game.getInstance().width, Game.getInstance().height);
        this.layers.forEach(layer => layer.render(event));
    };

    update(event: UpdateEvent): void {
        this.layers.forEach(layer => layer.update(event));
    };

}
