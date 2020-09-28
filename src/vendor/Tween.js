
function Tween(targetObj, to, duration, config) {
    const tw = new TWEEN.Tween(targetObj).to(to, duration)
    if(config && config.autoStart === 'false') return tw;

    return tw.start();
}

