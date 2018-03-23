

import Api from './api'
import Address from './address'
import * as Constant from '../common/constant'
import {getCache, setCache} from '../common/storageUtils'

const getEventReceived = async(page = 0, userInfo) => {
    if (!userInfo || !userInfo.login) {
        return;
    }
    let url = Address.getEventReceived(userInfo.login) + Address.getPageParams("?", page);
    let res = await Api.netFetch(url);
    return {
        data: res.data,
        result: res.result
    };
};

export default {
    getEventReceived
}