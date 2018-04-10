import * as Config from './Config'

export default {
    // 正常模式的tab title配置
    tabTitles: [
        {
            title: '详细信息',
        },
        {
            title: '动态',
        },
        {
            title: '文件',
        },
        {
            title: 'Issue',
        }
    ],
    tabStyles: {
        bgColor: Config.primaryColor,
        titleColor: '#666666',
        activeTitleColor: '#FFFFFF',
        activeBgColor: Config.primaryColor,
        isActiveTitleBold: true,
        iconWidth: 70,
        iconHeight: 70,
        width: 160,
        height: Config.reposDetailTopTabBarHeight,
        fontSize: 24,
        textPaddingLeft: 10,
        textPaddingRight: 10
    },
}