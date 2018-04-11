import {Buffer} from 'buffer'
import Api from './api'
import Address from './address'
import * as Config from '../../config/Config'
import {getCache, setCache, removeCache} from '../common/storageUtils'
import * as ignoreConfig from '../common/ignoreConfig'

/**
 * 初始化用户信息
 */
const initUserInfo = async () => {
    let token = await getCache(Config.TOKEN_KEY);
    let res = await getUserInfoLocal();
    return {
        result: res.result && (token !== null),
        data: res.data
    };

};

/**
 * 获取本地登录用户信息
 */
const getUserInfoLocal = async () => {
    let userText = await getCache(Config.USER_INFO);
    if (userText) {
        let res = JSON.parse(userText);
        return {
            result: true,
            data: res
        }
    } else {
        return {
            result: false
        }
    }
};

/**
 * 获取本地登录用户信息
 */
const cleanUserInfoLocal = async () => {
    await removeCache(Config.USER_INFO);
    return true
};

/**
 * 登录
 */
const doLogin = async (userName, password) => {
    console.log("user " + userName + " pw " + password)
    let base64Str = Buffer(userName + ":" + password).toString('base64');
    await setCache(Config.USER_NAME_KEY, userName);
    await setCache(Config.USER_BASIC_CODE, base64Str);
    let requestParams = {
        scopes: ['user', 'repo', 'gist', 'notifications'],
        note: "admin_script",
        client_id: ignoreConfig.CLIENT_ID,
        client_secret: ignoreConfig.CLIENT_SECRET
    };
    Api.clearAuthorization();
    let res = await Api.netFetch(Address.getAuthorization(), 'POST', requestParams, true);
    if (res && res.result) {
        setCache(Config.PW_KEY, password);
    }
    return res;
};


/**
 * 获取用户详细信息
 */
const getUserInfoDao = async (userName) => {
    let res;
    if (!userName || userName === undefined) {
        res = await Api.netFetch(Address.getMyUserInfo());
    } else {
        res = await Api.netFetch(Address.getUserInfo(userName));
    }
    if (res && res.result) {
        let countRes = await getUserStaredCountNet(res.data.login);
        let starred = "---";
        if (countRes.result) {
            starred = countRes.data;
        }
        let totalInfo = Object.assign({}, res.data, {starred: starred});
        if (!userName || userName === undefined) {
            setCache(Config.USER_INFO, JSON.stringify(totalInfo));
        }
        return {
            result: true,
            data: totalInfo,
        }
    } else {
        return {
            result: false,
            data: res.data
        }
    }
};

/**
 * 在header中提起stared count
 */
const getUserStaredCountNet = async (userName) => {
    let res = await Api.netFetch(Address.userStar(userName) + "&per_page=1");
    if (res && res.result && res.headers && (res.headers.link || res.headers.Link)) {
        try {
            function doWeb() {
                let link = res.headers.link;
                if (link && (typeof link) === 'string') {
                    let indexStart = link.lastIndexOf("page=") + 5;
                    let indexEnd = link.lastIndexOf(">");
                    if (indexStart >= 0 && indexEnd >= 0) {
                        let count = link.substring(indexStart, indexEnd);
                        return {
                            result: true,
                            data: count
                        }
                    }
                }
                return {
                    result: true,
                }
            }

            function doNative() {
                let link = res.headers.Link;
                if (link && (typeof link) === 'string') {
                    let indexStart = link.lastIndexOf("page=") + 5;
                    let indexEnd = link.lastIndexOf(">");
                    if (indexStart >= 0 && indexEnd >= 0) {
                        let count = link.substring(indexStart, indexEnd);
                        return {
                            result: true,
                            data: count
                        }
                    }
                }
                return {
                    result: true,
                }
            }

            try {
                if (WXEnvironment.platform === 'Web') {
                    return doWeb()
                } else {
                    return doNative()
                }
            } catch (e) {
                console.log(e)
            }
        } catch (e) {
            console.log(e)
        }
        return {
            result: false,
        }
    } else {
        return {
            result: false,
        }
    }
};


/**
 * 获取用户粉丝列表
 */
const getFollowerListDao = async (userName, page) => {

    let url = Address.getUserFollower(userName) + Address.getPageParams("?", page);
    let res = await await Api.netFetch(url);
    if (res && res.result) {
        res.data.forEach((item) => {
            let ex = {
                userPic: item.avatar_url,
                user: item.login,
            }
            item.ex = ex
        });
    }
    return {
        data: res.data,
        result: res.result
    };
};

/**
 * 获取用户关注列表
 */
const getFollowedListDao = async (userName, page) => {
    let url = Address.getUserFollow(userName) + Address.getPageParams("?", page);
    let res = await await Api.netFetch(url);
    if (res && res.result) {
        res.data.forEach((item) => {
            let ex = {
                userPic: item.avatar_url,
                user: item.login,
            }
            item.ex = ex
        });
    }
    return {
        data: res.data,
        result: res.result
    };
};


export default {
    doLogin,
    getUserInfoDao,
    initUserInfo,
    getUserInfoLocal,
    getFollowerListDao,
    getFollowedListDao,
    cleanUserInfoLocal,
}
