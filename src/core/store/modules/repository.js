import repository from '../../net/repository'

// initial state
// shape: [{ id, quantity }]
const state = {
    //当前趋势列表
    trend_repos_data_list: [],
    trend_repos_current_size: 0,
};

// getters
const getters = {};

// actions
const actions = {
    getTrend({commit, state}, params) {
        commit('storeTrend', []);
        repository.getTrendDao(0, params.since, params.languageType).then((res) => {
            if (res && res.result) {
                res.data.forEach((item) => {
                    let ex = {
                        repoName: item.reposName,
                        userPic: item.contributors[0],
                        userName: item.name,
                        type: item.language,
                        content: item.description,
                        icon1t: item.starCount,
                        icon2t: item.forkCount,
                        icon3t: item.meta,
                        icon3: ' ',
                    }
                    item.ex = ex
                });
                commit('storeTrend', res.data);
            }
            params.callback && params.callback(res);
        });

    },
};

// mutations
const mutations = {
    storeTrend(state, list) {
        state.trend_repos_data_list = list;
    },
};

export default {
    state,
    getters,
    actions,
    mutations
}