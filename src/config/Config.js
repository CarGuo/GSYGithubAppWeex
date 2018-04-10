export const PAGE_SIZE = 30;

export const DEBUG = true;

export const TOKEN_KEY = 'token'
export const USER_NAME_KEY = 'user_name'
export const PW_KEY = 'user_pw'
export const USER_BASIC_CODE = 'user_basic_code'
export const USER_INFO = 'user_info'

export const navigatorbBarHeight = 100
export const mainTabBarHeight = 120
export const reposDetailTopTabBarHeight = 80
export const controlBarHeight = 80

export const primaryColor = '#3c3f41';
export const actionBlue = '#267aff';
export const miWhite = '#ececec';
export const primaryDarkColor = '#121917';
export const primaryLightColor = '#42464b';
export const webDraculaBackgroundColor = '#282a36';

export function getEntryPageStyle(pageHeight) {
    let mainMarginTop = (WXEnvironment.platform.toLowerCase() === 'ios') ? '32px' : '0px'
    let mainHeight = ( WXEnvironment.platform === 'Web') ? '1334px' : ((pageHeight - 32)+ 'px');
    return {height: mainHeight, width: '750px', marginTop: mainMarginTop}
}

export function getContentStyle(pageHeight, tabHeight) {
    return { height: (pageHeight - tabHeight) + 'px' };
}

export function getListBottomEmpty() {
    return (WXEnvironment.platform.toLowerCase() === 'ios') ? '400px' : '200px'
}

export function getListHeight(height = 1234) {
    if(WXEnvironment.platform === 'Web') {
        return height
    }
    return height - 32;
}