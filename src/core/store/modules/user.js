import user from '../../net/user'

// initial state
// shape: [{ id, quantity }]
const state = {
    userInfo: {},
    checkoutStatus: null
};

// getters
const getters = {};

// actions
const actions = {

    initUserInfo({commit, state}, callback) {
        user.initUserInfo().then((res) => {
            if (res && res.result) {
                commit('storeUserInfo', res.data);
            }
            callback && callback(res);
        });

    },
    doLogin({commit, state}, params) {
        user.doLogin(params.username, params.password)
            .then((res) => {
                if (res && res.result) {
                    return user.getUserInfoDao();
                } else {
                    //登录失败
                }
            })
            .then((res) => {
                if (res && res.result) {
                    commit('storeUserInfo', res.data);
                }
                params.resultCallback && params.resultCallback(res);
            })
    },
    getUserInfo({commit, state}, userName) {
        user.getUserInfo(userName).then((res) => {
            if (res && res.result) {
                //todo 其他用户的应该不用保存在state
            }
        });
    },
};

// mutations
const mutations = {
    storeUserInfo(state, userInfo) {
        state.userInfo = userInfo;
    },

};

export default {
    state,
    getters,
    actions,
    mutations
}