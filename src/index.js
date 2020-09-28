
window.addEventListener("load", domReadyHandler);

function domReadyHandler() {
    window.removeEventListener("load", domReadyHandler);
    runGame();
}

function runGame() {
    if (runGame.launched) return;
    runGame.launched = true;

    Game.init();

    window.addEventListener("resize", LayoutManager.fitLayout);
    setInterval(LayoutManager.fitLayout, 100);

    LayoutManager.fitLayout();
}

