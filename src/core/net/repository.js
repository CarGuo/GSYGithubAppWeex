import Api from './api'
import GitHubTrending from './trending/GitHubTrending'
import Address from './address'
import {generateHtml} from '../common/htmlUtils'
import {getCache, setCache} from '../common/storageUtils'

import resolveLongToTime from '../common/timeUtils'

const getTrendDao = async (page = 0, since, languageType) => {
    let url = Address.trending(since, languageType);
    let res = await new GitHubTrending().fetchTrending(url, since, languageType);
    return {
        data: res.data,
        result: res.result
    };


};

/**
 * 详情的remde数据Html模式数据
 */
const getRepositoryDetailReadmeHtmlDao = async (userName, reposName, branch) => {
    let url = Address.readmeFile(userName + '/' + reposName, branch);
    let res = await Api.netFetch(url, 'GET', null, false, {Accept: 'application/vnd.github.html'}, 'text');
    if (res && res.result && res.data.length > 0) {
        let curData = generateHtml(res.data);
        return {
            data: curData,
            result: true
        };
    } else {
        return {
            data: "",
            result: false
        };
    }

};


/**
 * 仓库的详情数据
 */
const getRepositoryDetailDao = async (userName, reposName) => {
    let url = Address.getReposDetail(userName, reposName);
    let res = await Api.netFetch(url, 'GET', null, false, {Accept: 'application/vnd.github.mercy-preview+json'});
    if (res && res.result && res.data) {
        let created_at = resolveLongToTime(res.data.created_at);
        let push_at = resolveLongToTime(res.data.pushed_at);
        let createStr = (res.data.fork === true) ? "forked from " + reposName + '\n'
            : "创建于 " + created_at + " ";
        let updateStr = "最后提交于 " + push_at;
        let infoText = createStr + ((push_at) ? updateStr : '');
        res.data.infoText = infoText
        res.data.userName = userName
        res.data.reposName = reposName

        let issueRes = await getRepositoryIssueStatusDao(userName, reposName);
        let netData = res.data;
        try {
            if (issueRes && issueRes.result && issueRes.data) {
                netData.all_issues_count = parseInt(issueRes.data);
                netData.closed_issues_count = netData.all_issues_count - netData.open_issues_count;
            }
        } catch (e) {
            console.log(e)
        }
    }
    return {
        data: res.data,
        result: res.result
    };

};


/**
 * 获取issue总数
 */
const getRepositoryIssueStatusDao = async (userName, repository) => {
    let url = Address.getReposIssue(userName, repository) + "&per_page=1";
    let res = await Api.netFetch(url, 'GET', null, false, {Accept: 'application/vnd.github.html,application/vnd.github.VERSION.raw'});
    if (res && res.result && res.headers && res.headers.link) {
        try {
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
 * 获取仓库的提交列表
 */
const getReposCommitsDao = async (userName, reposName, page) => {
    let url = Address.getReposCommits(userName, reposName) + Address.getPageParams("?", page);
    let res = await Api.netFetch(url);
    res.data.forEach((item) => {
        let ex = {
            actionStr: item.commit.message,
            des: "sha:" + item.sha,
            created_at: item.commit.committer.date,
            display_login: item.commit.committer.name,
        }
        item.ex = ex
    });
    return {
        data: res.data,
        result: res.result
    };


};


/**
 * 获取仓库issue
 * @param page
 * @param userName
 * @param repository
 * @param state issue状态
 * @param sort 排序类型 created updated等
 * @param direction 正序或者倒序
 * @returns {Promise.<void>}
 */
const getRepositoryIssueDao = async(page = 0, userName, repository, state, sort, direction) => {

    let url = Address.getReposIssue(userName, repository, state, sort, direction) + Address.getPageParams("&", page);
    let res = await Api.netFetch(url, 'GET', null, false, {Accept: 'application/vnd.github.html,application/vnd.github.VERSION.raw'});
    res.data.forEach((item) => {
        let ex = {
            userPic: item.user.avatar_url,
            userName: item.user.login,
            content: repository + "- " + item.title,
            time: item.created_at,
            state: item.state,
            number: item.number,
            count: item.comments + "",
        }
        item.ex = ex
    });
    return {
        data: res.data,
        result: res.result
    };
};


/**
 * 搜索仓库issue
 * @param q 搜索关键字
 * @param name 用户名
 * @param reposName 仓库名
 * @param page
 * @param state 问题状态，all open closed
 * @returns {Promise.<{result, data}>}
 */
const searchRepositoryIssueDao = async (q, name, reposName, page = 1, state) => {
    let qu;
    if (!state || state === 'all') {
        qu = q + `+repo%3A${name}%2F${reposName}`;
    } else {
        qu = q + `+repo%3A${name}%2F${reposName}+state%3A${state}`;
    }
    let url = Address.repositoryIssueSearch(qu) + Address.getPageParams("&", page);
    let res = await Api.netFetch(url);
    let data = res.data ? res.data.items : res.data;
    data.forEach((item) => {
        let ex = {
            userPic: item.user.avatar_url,
            userName: item.user.login,
            content: reposName + "- " + item.title,
            time: item.created_at,
            state: item.state,
            number: item.number,
            count: item.comments + "",
        }
        item.ex = ex
    });
    return {
        data: data,
        result: res.result
    };
};

/***
 * 获取仓库的文件列表
 */
const getReposFileDirDao = async (userName, reposName, path = '', branch, type = 'json') => {
    let url = Address.reposDataDir(userName, reposName, path, branch);
    let res = await Api.netFetch(url, 'GET', null, false, {Accept: 'application/vnd.github.html'}, type);
    if (res && res.result && (res.data && (typeof res.data ) === 'object')) {
        let dir = [];
        let file = [];
        res.data.forEach((item) => {
            if (item.type === 'file') {
                file.push(item)
            } else {
                dir.push(item)
            }
        });
        let data = dir.concat(file);
        res.data = data;
    }


    return {
        data: res.data,
        result: res.result
    };
};

export default {
    getTrendDao,
    getRepositoryDetailReadmeHtmlDao,
    getRepositoryDetailDao,
    getReposCommitsDao,
    getRepositoryIssueDao,
    searchRepositoryIssueDao,
    getReposFileDirDao
}