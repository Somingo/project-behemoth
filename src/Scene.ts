import {Sprite} from "./Sprite";
import {RenderEvent} from "./RenderEvent";
import {UpdateEvent} from "./UpdateEvent";
import {Layer} from "./Layer";
import {ImageSpriteLoader} from "./ImageSprite";

export abstract class Scene implements Sprite {

    layers: Layer[] = [];

    spriteLoader: ImageSpriteLoader = new ImageSpriteLoader();

    abstract spriteList(): string[];

    load = (): Promise<boolean> => this.spriteLoader.loadSprites(this.spriteList());

    render = (event: RenderEvent): void => {
        this.layers.forEach(layer => layer.render(event));
    };

    update = (event: UpdateEvent): void => {
        this.layers.forEach(layer => layer.update(event));
    };

}
