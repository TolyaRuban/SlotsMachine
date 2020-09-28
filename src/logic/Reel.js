class Reel extends Sprite {
    constructor(tilesId, index) {
        super();

        this.index = index;
        this.setupTiles = tilesId;


        this.tiles = [];

        this._endTiles = null;

        // this._endTiles = [1,1,1];

        this.distance = 0;
        this.speed = 0.33;
        // this.speed = 0.33 + Math.random()* 0.5 * this.index;

        this.preTiles = 1;
        this.postTiles = 1;
        // this.preTiles = this.setupTiles.length;
        // this.postTiles = this.setupTiles.length;

        this.isRoll = false;
        this.isEndRoll = false;

        for (let i = -this.preTiles; i < this.setupTiles.length + this.postTiles; i++) {
            let config = this.setupTiles[i] ? this.setupTiles[i] : Math.ceil(Math.random() * 9)
            const slot = this.addChild(new Tile(config));
            slot.y = SlotsMachine.yPeriod * i;
            this.tiles.push(slot);
            slot.index = this.tiles.length - 1;
        }


        this.minY = -SlotsMachine.yPeriod * this.preTiles;
        this.maxY = SlotsMachine.yPeriod * (this.tiles.length - 1 - this.postTiles);


        this.onRollUpdate = this.onRollUpdate.bind(this);
        this.resetTilesPosition = this.resetTilesPosition.bind(this);

    }

    rollStart() {
        // console.log('roll')
        let speed = this.speed;
        this.speed = 0;

        this.isRoll = true;

        new Tween(this, { speed: speed }, 800 + this.index * 200)
            .easing(TWEEN.Easing.Back.In)
            // .easing(TWEEN.Easing.Quadratic.Out)
            .onStart(this.resetTilesPosition)


    }

    rollEnd() {
        setTimeout(() => {
            this.isRoll = false;
            this.isEndRoll = true;

            let distance = Math.ceil(this.distance) + 4;
            new Tween(this, { distance: distance }, 2000)
                .onUpdate(this.onRollUpdate)
                .easing(TWEEN.Easing.Back.Out)
                .onComplete(() => {
                    this.distance = 0;
                    this.resetTilesPosition();

                    this.emit('endRoll');
                })
        }, this.index * 500)
    }

    resetTilesPosition() {
        this.tiles.map(el => {
            el._posy = el.y;
            el.loopCounter = 0;
        });
    }

    setEndCombination(arr) {
        this._endTiles = [...arr];
    }

    onRollUpdate() {
        for (let t = 0; t < this.tiles.length; t++) {
            this.tiles[t].y = this.tiles[t]._posy + SlotsMachine.yPeriod * this.distance;
            this.repositionTiles(this.tiles[t]);
        }
    };

    repositionTiles(tile) {
        let triggerToReset = tile.loopCounter;
        let counter = 0
        while (tile.y > this.maxY) {
            tile.y -= (this.maxY - this.minY + SlotsMachine.yPeriod);
            counter++;
        }
        if (triggerToReset !== counter) {
            tile.loopCounter = counter;
            if (this.isEndRoll && this._endTiles && this._endTiles.length) {
                tile.reset(this._endTiles.pop())
            } else {
                tile.reset();
            }
        }
    };

    tick(delta) {
        if (!this.isRoll) return;

        this.distance += this.speed;
        this.onRollUpdate()
    }
}