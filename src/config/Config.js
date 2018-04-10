
export const navigatorbBarHeight = 100

export const mainTabBarHeight = 120

export const reposDetailTopTabBarHeight = 80

export const controlBarHeight = 80

export function getEntryPageStyle(pageHeight) {
    let mainMarginTop = (WXEnvironment.platform.toLowerCase() === 'ios') ? '32px' : '0px'
    let mainHeight = ( WXEnvironment.platform === 'Web') ? '1334px' : ((pageHeight - 32)+ 'px');
    return {height: mainHeight, width: '750px',backgroundColor: 'white', marginTop: mainMarginTop}
}

export function getContentStyle(pageHeight, tabHeight) {
    return { height: (pageHeight - tabHeight) + 'px' };
}