class Sprite extends PIXI.Sprite {
    constructor(source) {
        super();

        this.anchor.set(0.5);
        this.interactive = true;
        
        this.texture = source ? PIXI.Texture.from(source) : PIXI.Texture.EMPTY
    }

}