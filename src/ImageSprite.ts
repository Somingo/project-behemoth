import {Sprite} from "./Sprite";
import {RenderEvent} from "./RenderEvent";
import {UpdateEvent} from "./UpdateEvent";
import {Point, Rectangle} from "./Rectangle";
import {Game} from "./Game";

export class ImageSpriteLoader {
    private images: Map<string, HTMLImageElement> = new Map<string, HTMLImageElement>();
    private imageDescriptors: Map<string, ImageSpriteDescriptor> = new Map<string, ImageSpriteDescriptor>();

    constructor() {
    }

    getDescriptor = (id: string): ImageSpriteDescriptor => <ImageSpriteDescriptor>this.imageDescriptors.get(id);

    loadSpriteWithImage = (sprite: SerializableImageSpriteDescriptor): Promise<boolean> => new Promise<boolean>((resolve, reject) => {
        const image = document.createElement('img');
        image.onload = () => resolve(true);
        image.onerror = () => reject;
        image.src = sprite.imageUrl;
        this.images.set(sprite.imageUrl, image);
        this.imageDescriptors.set(sprite.id, {...sprite, image});
        document.body.appendChild(image);
    });

    loadSprite = (url: string): Promise<boolean> => {
        const images = this.images;
        return new Promise<boolean>((resolve, reject) => {
            const request = new XMLHttpRequest();
            request.responseType = 'json';
            request.onerror = (e) => {
                console.error(e.timeStamp, ' FATAL: failed to load: ' + url);
                reject(e);
            };
            request.onload = (e) => {
                console.info(e.timeStamp, 'File loaded: ' + url);
                const spriteList: SerializableImageSpriteDescriptor[] = request.response;
                Promise.all(spriteList.map(sprite => {
                    const image = images.get(sprite.imageUrl);
                    if (image) {
                        this.imageDescriptors.set(sprite.id, {...sprite, image});
                    } else {
                        return this.loadSpriteWithImage(sprite);
                    }
                })).then(() => resolve(true)).catch((x) => reject(x));
            }
            request.open('GET', url);
            request.send();
        })
    };

    loadSprites = (urlList: string[]): Promise<boolean> => Promise.all(urlList.map(this.loadSprite)).then(() => true);
}

export interface ImageSpriteDescriptor extends SerializableImageSpriteDescriptor {
    image: HTMLImageElement;
}

export interface SerializableImageSpriteDescriptor extends Rectangle {
    id: string;
    imageUrl: string;
    anchorX: number;
    anchorY: number;
}

export class ImageSprite implements Sprite, Point {
    private descriptor: ImageSpriteDescriptor;

    constructor(private id: string, public x: number = 0, public y: number = 0) {
        this.descriptor = Game.getInstance().scene.spriteLoader.getDescriptor(id);
    }

    render = (event: RenderEvent): void => {
    };

    update = (event: UpdateEvent): void => {
    };

}
