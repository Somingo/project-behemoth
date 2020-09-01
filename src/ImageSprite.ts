import {Sprite} from './Sprite';
import {RenderEvent} from './RenderEvent';
import {UpdateEvent} from './UpdateEvent';
import {Point, Rectangle} from './Rectangle';
import {Game} from './Game';

export class ImageSpriteLoader {
    private images: Map<string, HTMLImageElement> = new Map<string, HTMLImageElement>();
    public readonly imageDescriptors: Map<string, ImageSpriteDescriptor> = new Map<string, ImageSpriteDescriptor>();

    constructor() {
    }

    getDescriptor = (id: string): ImageSpriteDescriptor => <ImageSpriteDescriptor>this.imageDescriptors.get(id);

    loadSpriteWithImage = (sprite: SerializableImageSpriteDescriptor): Promise<boolean> => new Promise<boolean>((resolve, reject) => {
        const image = document.createElement('img');
        image.onload = () => resolve(true);
        image.onerror = () => reject();
        image.src = sprite.imageUrl;
        this.images.set(sprite.imageUrl, image);
        this.imageDescriptors.set(sprite.id, {...sprite, image});
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
                })).then(() => {
                    console.log('All Image loaded.');
                    resolve(true);
                }).catch((x) => reject(x));
            }
            request.open('GET', url);
            request.send();
        })
    };

    loadSprites = (urlList: string[]): Promise<any> => {
        return Promise.all(urlList.map(this.loadSprite));
    };
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

    get dw(): number {
        return this.descriptor.w;
    }

    get dh(): number {
        return this.descriptor.h;
    }

    get dy(): number {
        return this.y - this.descriptor.anchorY;
    }

    get dx(): number {
        return this.x - this.descriptor.anchorX;
    }

    render(event: RenderEvent): void {
        event.context.drawImage(this.descriptor.image, this.descriptor.x, this.descriptor.y, this.descriptor.w, this.descriptor.h, this.dx, this.dy, this.dw, this.dh);
    }

    update(event: UpdateEvent): void {
    }

}
