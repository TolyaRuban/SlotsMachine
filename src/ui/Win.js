class Win extends Sprite {
    constructor() {
        super();

        this.view = this.addChild(new Sprite('win'));
        this.visible = false;

    }

    show() {
        this.view.scale.set(10);
        this.view.alpha = 1;
        new Tween(this.view.scale, { x: 1, y: 1 }, 600)
            .easing(TWEEN.Easing.Cubic.In)
            .onStart(() => { this.visible = true })
            .onComplete(() => {
                setTimeout(() => {
                    new Tween(this.view, { alpha: 0 }, 200)
                        .onComplete(() => {
                            this.visible = false;
                            this.emit('endShow');
                        });
                }, 2000)
            })
    }
}