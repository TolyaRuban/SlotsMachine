class MainGame extends Sprite {
    constructor() {
        super();

        this.currentUser = null;

        this._userData = null;

        this._spinData = null;

        this.createChildren();

        this.onResize();

        this.getUserData();
    }


    createChildren() {
        this.bg = this.addChild(new Sprite('bg2'));

        let startConf = [
            [3, 3, 1],
            [9, 1, 5],
            [9, 1, 6]
        ]
        this.slotsMachine = this.addChild(new SlotsMachine(startConf));
        this.slotsMachine.on('endRoll', this.updateDataAfterSpin, this);
        this.slotsMachine.alpha = 0;

        this.bets = this.addChild(new Bets());

        this.btnSpin = this.addChild(new ButtonSpin('btn_spin'));
        this.btnSpin.on('pointerdown', this.spinBtnPress, this);

        this.user = this.addChild(new User(this.currentUser));

        this.balance = this.addChild(new Balance());

        this.win = this.addChild(new Win());
        this.win.on('endShow', this.onWinEnd, this);

        // this.ser
        this.popup = this.addChild(new Popup());


    }

    async getUserData(uid) {
        let id = uid || Math.round(Math.random() * 100);
        console.log(id)
        let result = await UTILS.getUserData(id);
        if (!!result.error || !result.balance) return this.getUserData();

        this._userData = { ...result };
        this.bets.toEnable();
        console.log(this._userData)
        this.renewData();

        this.renewSlotMachine();

    }
    async getSpinResult() {
        let result = await UTILS.getSpinResult(this._userData.uid, this.bets.currentBet);
        return result;
    }

    async spinBtnPress() {
        console.log('press')
        if (!this._userData || !this.btnSpin.active) return;

        if (this._userData.balance < this.bets.currentBet) {
            this.bets.showWrong();
            this.balance.showWrong();
            return;
        }

        this.btnSpin.animatePress();
        this._userData.balance -= this.bets.currentBet;
        this.balance.setValue(this._userData.balance);
        
        this._spinData = null;
        this.bets.toDisable();

        this.slotsMachine.rollStart();

        this._spinData = await UTILS.getSpinResult(this._userData.uid, this.bets.currentBet);
        console.log(this._spinData)
        this.slotsMachine.rollEnd(this._spinData.rolls);


    }

    setUserData(data) {
        if (!data) return;
        // console.log(data)
        this._userData = { ...data };
        this.renewData();
    }

    renewData() {
        this.user.update(this._userData.uid);
        this.balance.setValue(this._userData.balance);

        this.bets.setAvailableBets(this._userData.bets);
        this.bets.setCurrentBet(this._userData.last_bet);
        // имитация, что не все ставки доступны
        // this.bets.setAvailableBets([10, 100]);
    }

    updateDataAfterSpin() {
        console.log('update')
        /* Теоретически, тут должно идти обновление данных игрока, а не только баланс
        ибо, скорей всего, должно менятся начение допустимых ставок */
        this._userData.balance = this._spinData.balance;
        this._userData.last_bet = this._spinData.last_bet;

        this.showWin();


    }

    renewSlotMachine() {
        this.slotsMachine.addReels(this._userData.rolls);
        this.slotsMachine.show();
        this.popup.hide();
    }

    showWin() {
        if (!this._spinData || !this._spinData.win) return this.onWinEnd();
        this.win.show()
    }

    onWinEnd() {
        console.log('winReady')
        this.renewData();
        console.log(!this._userData.balance)
        if (!this._userData.balance) {
            this.popup.showLose()
            return;
        }
        this.btnSpin.toActive();
        this.bets.toEnable();
    }


    onResize() {
        const w = LayoutManager.gameWidth;
        const h = LayoutManager.gameHeight;

        this.bg.scale.set(Math.max(w / this.bg.getLocalBounds().width, h / this.bg.getLocalBounds().height));
        this.btnSpin.scale.set(400 / this.btnSpin.getLocalBounds().width);
        this.bets.scale.set(0.3);
        this.balance.scale.set(0.5);

        this.user.position.set(- w / 2 + 10, - h / 2 + 10);
        this.balance.position.set(w / 2 - 160, -h / 2 + 80);

        let shy = 0;
        if (h > w) {
            this.btnSpin.position.set(0, h / 2 - this.btnSpin.height);
            this.bets.scale.set(0.4);
            this.bets.position.set(-w / 2 + 130, h / 2 - 320);

            this.slotsMachine.scale.set(h / w < 1.4 ? 1.1 : 1.3);
            shy = -100;
        } else {
            this.btnSpin.position.set(w / 2 - this.btnSpin.width * 0.5 - 10, h / 2 - this.btnSpin.height / 2 - 20);
            this.bets.scale.set(0.3);
            this.bets.position.set(-w / 2 + 130, h / 2 - 270);

            this.slotsMachine.scale.set(w / h < 1.4 ? 1 : 1.3);
            this.slotsMachine.position.set(
                -this.slotsMachine.bg.width * this.slotsMachine.scale.x / 2,
                -this.slotsMachine.bg.height * this.slotsMachine.scale.x / 2
            );
        }
        this.slotsMachine.position.set(
            -this.slotsMachine.bg.width * this.slotsMachine.scale.x / 2,
            -this.slotsMachine.bg.height * this.slotsMachine.scale.x / 2 + shy
        );
    }

    tick(delta) {
        if (this.slotsMachine) this.slotsMachine.tick(delta)
    }
}

