class Popup extends Sprite {
    constructor() {
        super();

        this.bg = this.addChild(new Sprite('loader-bg'));
        this.title = this.bg.addChild(new PIXI.Text('PLAYER\nSEARCH', {
            fill: 0xffffff,
            fontSize: 100,
            strokeThickness: 6,
        }));
        this.title.anchor.set(0.5);
        // this.showSearch();

        this.lose = this.addChild(new PIXI.Text('YOU LOSE!', {
            fill: 0xff0000,
            fontSize: 150,
            stroke: '#ff0000',
            strokeThickness: 6,
            align: 'center'
        }));
        this.lose.anchor.set(0.5);
        this.lose.y = -400;

        this.loseTitle = this.bg.addChild(new PIXI.Text('RELOAD\nTHE PAGE', {
            fill: 0xff0000,
            fontSize: 100,
            stroke: '#ff0000',
            strokeThickness: 6,
            align: 'center'
        }));
        this.loseTitle.anchor.set(0.5);
        this.hide();
        this.showSearch()
    }

    hide(){
        this.hideSearch();
        this.hideLose();
        this.bg.visible = false;
        
        if (this.tw)this.tw.stop();
        this.tw = null;
    }

    showSearch() {
        this.bg.y = 0;
        this.bg.visible = true;
        this.title.visible = true;
        this.tw = new Tween(this.bg, { y: 20 }, 400).repeat(Infinity).yoyo(true)
    }

    hideSearch() {
        this.bg.visible = false;
        this.title.visible = false;
    }

    showLose() {
        this.bg.y = 0;
        this.bg.visible = true;
        this.lose.visible = true;
        this.loseTitle.visible = true;
        this.tw = new Tween(this.bg, { y: 20 }, 400).repeat(Infinity).yoyo(true)
    }

    hideLose() {
        this.lose.visible = false;
        this.loseTitle.visible = false;
    }
}