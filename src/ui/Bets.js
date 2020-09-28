class Bets extends Sprite {
    constructor() {
        super();

        this.config = [10, 20, 50, 100];

        this.currentBet = null;

        this.bets = [];
        this.availableBets = [];

        this.enable = false;

        this.wrap = this.addChild(new Sprite());
        this.config.map(el => {
            this.addButton(el);
        });

        this.resize();

    }

    setAvailableBets(bets) {
        this.availableBets = this.bets.filter(el => {
            if (bets.some(bet => bet === el.value)) {
                el.turnOn();
                return true;
            } else {
                el.turnOff();
                return false;
            }
        });
    }

    setCurrentBet(value) {
        this.bets.map(el => {
            if (el.value === value) this.onSelect(el);
        });
    }

    addButton(value) {
        let bet = this.wrap.addChild(new Bet(value));
        bet.on('select', this.onSelect, this);

        this.bets.push(bet);
    }

    onSelect(bet) {
        if (!this.enable) return;
        this.bets.map(el => {
            if (el !== bet) return el.onUnselect();
            el.onSelect();
            this.currentBet = el.value;
        });
    }

    toEnable() {
        this.enable = true;
    }

    toDisable() {
        this.enable = false;
    }

    showWrong() {
        new Tween(this.wrap, { x: [-10, 0, 10, 0] }, 100).repeat(3)
    }

    resize() {
        this.bets.map((el, i) => {
            el.y = i * 230
        });
    }
}