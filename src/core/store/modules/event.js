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
                    console.log("gggggggggg", item.actor.display_login)
                    item.actionStr = newItem.actionStr;
                    item.des = newItem.des;
                });
                console.log("Ffffffffffff", page, res.data)
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