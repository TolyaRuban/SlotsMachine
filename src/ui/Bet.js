class Bet extends Sprite {
    constructor(value) {
        super();

        this.value = value;

        this.enable = true;
        this.selected = false;

        this.active = this.addChild(new Sprite('btn-bet_active'));
        this.inactive = this.addChild(new Sprite('btn-bet_inactive'));
        this.inactive.y = -28;

        const h = 226
        this.shine = this.addChildAt(new PIXI.Graphics(), 0)
            .beginFill(0x00ff00)
            .drawRoundedRect(-this.active.width / 2, -h / 2, this.active.width, h, 50)
            .endFill()
        this.shine.y = -28
        this.shine.scale.set(1.04);

        this.text = this.addChild(new PIXI.Text(value, {
            fill: 0xffffff,
            fontSize: 250,
            strokeThickness: 10
        }));
        this.text.anchor.set(0.5, 0.5);
        this.text.position.set(0, -25);

        this.on('pointerdown', this.handleClick, this);

        this.turnOn();
        this.onUnselect();
    }

    handleClick(){
        if(!this.enable) return;
        this.emit('select', this);
    }

    onSelect() {
        this.selected = true;
        this.shine.visible = true;
    }

    onUnselect() {
        this.selected = false;
        this.shine.visible = false;
    }

    turnOn() {
        this.active.visible = true;
        this.inactive.visible = false;

        this.enable = true;
    }
    turnOff() {
        this.active.visible = false;
        this.inactive.visible = true;

        this.enable = false;
    }


}