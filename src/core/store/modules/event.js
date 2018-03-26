import event from '../../net/event'
import {getActionAndDes} from '../../common/eventUtils'

// initial state
// shape: [{ id, quantity }]
const state = {
    received_events_data_list: [],
};

// getters
const getters = {};

// actions
const actions = {

    getEventReceived({commit, state}, params) {
        let page = params.page;
        event.getEventReceived(page, params.userInfo).then((res) => {
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
                if (page <= 1) {
                    commit('storeEventReceived', res.data);
                } else {
                    commit('addEventReceived', res.data);
                }
            }
            params.callback && params.callback(res);
        });

    },
};

// mutations
const mutations = {
    storeEventReceived(state, list) {
        state.received_events_data_list = list;
    },
    addEventReceived(state, list) {
        state.received_events_data_list = state.received_events_data_list.concat(list);
    },
};

export default {
    state,
    getters,
    actions,
    mutations
}