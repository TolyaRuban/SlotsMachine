class ButtonSpin extends Sprite {
    constructor(texture) {
        super(texture);

        this.active = true;

        let text = this.addChild(new PIXI.Text('SPIN', {
            fill: 0x52A6E7,
            fontSize: 150,
            strokeThickness: 10

        }));
        text.anchor.set(0.5);

    }

    animatePress() {
        this.toInactive();

        let sc = this.scale.x - 0.1;
        new Tween(this.scale, { x: sc, y: sc }, 100)
            .repeat(1)
            .yoyo(true)
    }

    toActive() {
        this.active = true;
    }

    toInactive() {
        this.active = false;
    }
}

