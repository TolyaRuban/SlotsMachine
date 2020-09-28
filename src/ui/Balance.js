class Balance extends Sprite {
    constructor(value) {
        super();

        this.wrap = this.addChild(new Sprite());

        this.bg = this.wrap.addChild(new Sprite('score'));
        this.bg.scale.set(1, 0.7);

        this.value = value || 1000;

        this.score = this.wrap.addChild(new PIXI.Text(this.value, {
            fontSize: 200,
            fill: 0xfaff00,
            stroke: '#90f',
            strokeThickness: 10
        }));
        this.score.anchor.set(0.5);
    }

    setValue(value) {
        if (!value && value !== 0) return;
        let newValue = value;
        new Tween(this, { value: newValue }, 500)
            .onUpdate(() => { this.updateValue() })
        // this.value = value;
        // this.updateValue();
    }

    updateValue() {
        let value = Math.round(this.value)
        this.score.text = value;
    }

    showWrong() {
        new Tween(this.wrap, { x: [-10, 0, 10, 0] }, 100).repeat(3)
    }
}