import {getIonFontPath} from './IconConfig'
import * as Config from './Config'


export default {

    // 使用 iconFont 模式的tab title配置
    tabIconFontTitles: [
        {
            title: '动态',
            codePoint: '\ue684'
        },
        {
            title: '推荐',
            codePoint: '\ue818'
        },
        {
            title: '我的',
            codePoint: '\ue6d0',
            //badge: 5
        }
    ],
    tabIconFontStyles: {
        bgColor: '#fbfbfb',
        titleColor: '#666666',
        activeTitleColor: Config.primaryColor,
        activeBgColor: '#fbfbfb',
        isActiveTitleBold: true,
        width: 160,
        height: Config.mainTabBarHeight,
        fontSize: 24,
        textPaddingLeft: 10,
        textPaddingRight: 10,
        iconFontSize: 40,
        iconFontMarginBottom: 8,
        iconFontColor: '#AAAAAA',
        activeIconFontColor: 'black',
        iconFontUrl: getIonFontPath("../")
    }
}