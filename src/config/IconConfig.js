const webIconFontPath = 'static/font/iconfont.ttf';
const androidIconFontPath = 'local:///font/iconfont.ttf';
const iosIconFontPath = 'local:///font/iconfont.ttf';

export function getIonFontPath(abs) {
    if (WXEnvironment.platform === 'Web') {
        return abs + webIconFontPath
    } else if (WXEnvironment.platform.toLowerCase() === 'android') {
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


export function getImagePath(name, type = '', abs = '../../') {
    if (WXEnvironment.platform === 'Web') {
        return `${abs}static/img/${name}${type}`
    } else if (WXEnvironment.platform === 'android') {
        return `local:///${name}`;
    } else {
        return `local:///${name}${type}`;
    }
}