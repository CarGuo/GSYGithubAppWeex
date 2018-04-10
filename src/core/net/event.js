

import Api from './api'
import Address from './address'
import {getActionAndDes} from '../common/eventUtils'

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

const getEvent = async (page = 0, userName) => {
    let url = Address.getEvent(userName) + Address.getPageParams("?", page);
    let res = await Api.netFetch(url);
    if (res && res.result) {
        res.data.forEach((item) => {
            let newItem = getActionAndDes(item);
            let ex = {
                actionStr: newItem.actionStr,
                des: newItem.des,
                created_at: item.created_at,
                display_login: item.actor.display_login,
                avatar_url: item.actor.avatar_url,
            }
            item.ex = ex
        });
    }
    return {
        data: res.data,
        result: res.result
    };

};


const getRepositoryEventDao = async (page = 0, userName, repository) => {

    let url = Address.getReposEvent(userName, repository) + Address.getPageParams("?", page);
    let res = await Api.netFetch(url);
    if (res && res.result) {
        res.data.forEach((item) => {
            let newItem = getActionAndDes(item);
            let ex = {
                actionStr: newItem.actionStr,
                des: newItem.des,
                created_at: item.created_at,
                display_login: item.actor.display_login,
                avatar_url: item.actor.avatar_url,
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
    getEventReceived,
    getEvent,
    getRepositoryEventDao
}