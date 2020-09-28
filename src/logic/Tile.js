class Tile extends Sprite {
    constructor(value) {
        super();

        this.value = value;
        this.loopCounter = 0;

        this.createChildren();
    }

    static WIDTH = SlotsMachine.xPeriod - 20;

    createChildren() {
        this.view = this.addChild(new Sprite(this.value.toString()));
        const max = Math.max(Tile.WIDTH / this.view.getLocalBounds().height, Tile.WIDTH / this.view.getLocalBounds().width);
        this.view.scale.set(max);
    }

    reset(id) {
        this.value = id ? id : Math.ceil(Math.random() * 9);
        this.view.texture = PIXI.Texture.from(this.value.toString());
    }
}