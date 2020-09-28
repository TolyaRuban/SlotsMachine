class SlotsMachine extends Sprite {
    constructor(config) {
        super();
        // console.log(config)
        this.matrix = config;

        this.reels = [];

        this.isRoll = false;
        this.timeRolling = null;


        this.bg = this.addChild(new PIXI.Graphics())
            .beginFill(0xffffff)
            .drawRect(0, 0, 600, 600)
            .endFill();

        let mask = this.addChild(new PIXI.Graphics())
            .beginFill(0xffffff)
            .drawRoundedRect(0, 0, 600, 600, 50)
            .endFill();

        this.mask = mask;

        // this.addReels();


    }

    static xPeriod = 200;
    static yPeriod = 200;
    static TIME_TO_ROLL = 3000;

    show() {
        new Tween(this, { alpha: 1 }, 500);
    }

    addReels(arr) {
        if (arr) this.matrix = arr;
        for (let i = 0; i < this.matrix.length; i++) {
            const reel = this.addChild(new Reel(this.matrix[i], i));
            reel.x = SlotsMachine.xPeriod * (i + 0.5);
            reel.y = SlotsMachine.xPeriod * 0.5;

            if (i === this.matrix.length - 1) reel.on('endRoll', this.onEndRoll, this);
            this.reels.push(reel);
        }
    }

    rollStart() {
        this.isRoll = true;
        this.timeRolling = 0;

        this.reels.map(reel => {
            reel.rollStart();
        });
    }

    rollEnd(endSlots) {
        this.isRoll = false;
        // console.log(endSlots)
        this.setEndCombination(endSlots);
        if (this.timeRolling >= SlotsMachine.TIME_TO_ROLL) {
            this.reels.map(el => {
                el.rollEnd();
            });
        } else {
            let time = SlotsMachine.TIME_TO_ROLL - this.timeRolling;
            setTimeout(() => {
                this.reels.map(el => {
                    el.rollEnd();
                });
            }, time)
        }
    }

    onEndRoll() {
        this.emit('endRoll');
    }

    setEndCombination(arr) {
        arr.map((roll, i) => {
            this.reels[i].setEndCombination(roll);
        })
    }

    tick(delta) {
        this.reels.map(reel => {
            reel.tick(delta);
        })
        if (this.isRoll) {
            this.timeRolling += delta;
        }
    }



}