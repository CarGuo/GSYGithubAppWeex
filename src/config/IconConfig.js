const webIconFontPath = 'static/font/iconfont.ttf';
const androidIconFontPath = 'local:///font/iconfont.ttf';
const iosIconFontPath = 'local:///font/iconfont.ttf';

export function getIonFontPath(abs) {
    if (WXEnvironment.platform === 'Web') {
        return abs + webIconFontPath
    } else if (WXEnvironment.platform === 'android') {
        return androidIconFontPath
    } else {
        return iosIconFontPath
    }
}

export function addIconFontSupport(dom, abs) {
    if(dom) {
        dom.addRule('fontFace', {
            'fontFamily': "wxcIconFont",
            'src': `url('${getIonFontPath(abs)}')`
        });
    }
}