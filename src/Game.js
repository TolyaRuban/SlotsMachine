class Game {
    static container = null;

    //Размер игры (базовый)
    static size = { w: 960, h: 960 };
    static app = null;
    static currentWindow = null;

    static observer = null;
    static liveTime = 0;
    static paused = false;

    static init(container) {
        Game.container = container || document.body;

        let pixiConfig = { transparent: false, backgroundColor: 0x000000 };

        let app = new PIXI.Application(Game.size.w, Game.size.h, pixiConfig);
        document.body.appendChild(app.view);

        app.view.style.position = "absolute";
        app.view.style.left = "0";
        app.view.style.top = "0";

        Game.app = app;
        Game.observer = new PIXI.utils.EventEmitter();

        app.ticker.add(Game.tick);

        if (window.TWEEN) {
            TWEEN.now = () => {
                return Game.liveTime;
            }
        }


        // LOADING TEXTURES
        for (let i = 1; i < 10; i++) {
            PIXI.loader.add(`${i}`, `images/${i}.png`);
        }
        PIXI.loader.add(`bg`, `images/bg.jpg`);
        PIXI.loader.add(`bg2`, `images/bg2.jpg`);
        PIXI.loader.add(`btn_spin`, `images/btn_spin.png`);
        PIXI.loader.add(`btn-bet_active`, `images/btn-bet_active.png`);
        PIXI.loader.add(`btn-bet_inactive`, `images/btn-bet_inactive.png`);
        PIXI.loader.add(`score`, `images/score.png`);
        PIXI.loader.add(`win`, `images/win.png`);
        PIXI.loader.add(`loader-bg`, `images/loader-bg.png`);

        PIXI.loader.load(() => {
            console.log('loader')
            Game.start();
        })

        // Game.onResize();
    }

    static onResize() {
        if (Game.currentWindow) {
            Game.currentWindow.position.set(Game.app.renderer.width / 2, Game.app.renderer.height / 2);
            if (Game.currentWindow.onResize) Game.currentWindow.onResize();
        }
    }

    static showWindow(w) {
        Game.app.stage.addChildAt(w, 0);
        Game.currentWindow = w;

        Game.onResize()
    }

    static start() {
        Game.showWindow(new MainGame());
    }

    static tick() {
        if (Game.paused) return;

        let delta = PIXI.ticker.shared.elapsedMS;
        if (delta > 32) delta = 32;
        Game.liveTime += delta;

        if (window.TWEEN) TWEEN.update(Game.liveTime);
        // if (window.Tween) Tween.update(delta);

        if (Game.currentWindow && Game.currentWindow.tick) {
            Game.currentWindow.tick(delta);
        }

        // Game.emit("tick", delta);
    }
}

window.Game = Game;

