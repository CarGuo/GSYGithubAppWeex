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
    doLogin({commit, state}, params) {
        user.doLogin(params.username, params.password).then((res) => {
            if (res && res.result) {
                return user.getUserInfoDao();
            } else {
                //登录失败
            }
        }).then((res) => {
            if (res && res.result) {
                commit('storeUserInfo', res.data);
            }
        })
    },
    getUserInfo({commit, state}, userName) {
        user.getUserInfo(userName).then((res) => {
            if (res && res.result) {
                commit('storeUserInfo', res.data);
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