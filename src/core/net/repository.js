import Api from './api'
import GitHubTrending from './trending/GitHubTrending'
import Address from './address'
import {generateHtml} from '../common/htmlUtils'
import * as Config from '../../config/Config'
import {parse} from 'himalaya'
import {issueJsonToRichJson} from '../common/htmlUtils'

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
        let parent = res.data.parent;
        let created_at = resolveLongToTime(res.data.created_at);
        let push_at = resolveLongToTime(res.data.pushed_at);
        let createStr = (res.data.fork === true) ? "forked from " + (parent ? parent.full_name : null) + '\n'
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
    if (res && res.result && res.headers && (res.headers.link || res.headers.Link)) {
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
const getRepositoryIssueDao = async (page = 0, userName, repository, state, sort, direction) => {

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
    if (res && res.result && (res.data && (typeof res.data) === 'object')) {
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


/**
 * issue的详请
 */
const getIssueInfoDao = async (userName, repository, number) => {
    let url = Address.getIssueInfo(userName, repository, number);
    let res = await Api.netFetch(url, 'GET', null, false, {Accept: 'application/vnd.github.html,application/vnd.github.VERSION.raw'});
    if (res && res.result) {
        const json = parse(res.data.body_html)
        console.log("getIssueInfoDao", json)
        res.data.rich_list = issueJsonToRichJson(json)
    }
    return {
        data: res.data,
        result: res.result
    };

};


/**
 * issue的回复列表
 */
const getIssueCommentDao = async (page = 0, userName, repository, number) => {
    let url = Address.getIssueComment(userName, repository, number) + Address.getPageParams("?", page);
    let res = await Api.netFetch(url, 'GET', null, false, {Accept: 'application/vnd.github.html,application/vnd.github.VERSION.raw'});
    if (res && res.result && res.data.length > 0) {
        res.data.forEach((item) => {
            const json = parse(item.body_html)
            item.rich_list = issueJsonToRichJson(json, Config.primaryColor)
        })
    }
    return {
        data: res.data,
        result: res.result
    };
};


/**
 * 用户的仓库
 */
const getUserRepositoryDao = async (userName, page, sort = 'pushed') => {
    let url = Address.userRepos(userName, sort) + Address.getPageParams("&", page);
    let res = await Api.netFetch(url);
    if (res && res.result) {
        res.data.forEach((item) => {
            let ex = {
                repoName: item.name,
                userPic: item.owner.avatar_url,
                userName: item.owner.login,
                type: item.language,
                content: item.description,
                icon1t: item.watchers_count,
                icon2t: item.forks_count,
                icon3t: item.open_issues,
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
 * 获取当前用户所有star仓库
 */
const getStarRepositoryDao = async (userName, page, sort = "created") => {
    let url = Address.userStar(userName, sort) + Address.getPageParams("&", page);
    let res = await await Api.netFetch(url);
    if (res && res.result) {
        res.data.forEach((item) => {
            let ex = {
                repoName: item.name,
                userPic: item.owner.avatar_url,
                userName: item.owner.login,
                type: item.language,
                content: item.description,
                icon1t: item.watchers_count,
                icon2t: item.forks_count,
                icon3t: item.open_issues,
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
 * 获取仓库的fork分支
 */
const getRepositoryForksDao = async (userName, reposName, page) => {
    let url = Address.getReposForks(userName, reposName) + Address.getPageParams("?", page);
    let res = await Api.netFetch(url);
    if (res && res.result) {
        res.data.forEach((item) => {
            let ex = {
                repoName: item.name,
                userPic: item.owner.avatar_url,
                userName: item.owner.login,
                type: item.language,
                content: item.description,
                icon1t: item.watchers_count,
                icon2t: item.forks_count,
                icon3t: item.open_issues,
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
 * 获取当前仓库所有star用户
 */
const getRepositoryStarDao = async (userName, reposName, page) => {
    let url = Address.getReposStar(userName, reposName) + Address.getPageParams("?", page);
    let res = await Api.netFetch(url);
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
 * 获取当前仓库所有订阅用户
 */
const getRepositoryWatcherDao = async (userName, reposName, page) => {
    let url = Address.getReposWatcher(userName, reposName) + Address.getPageParams("?", page);
    let res = await Api.netFetch(url);
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
 * 搜索仓库
 * @param q 搜索关键字
 * @param language 语言
 * @param sort 分类排序，beat match、most star等
 * @param order 倒序或者正序
 * @param type 搜索类型，人或者仓库
 * @param page
 * @param pageSize
 * @returns {Promise.<{result, data}>}
 */
const searchRepositoryDao = async (q, language, sort, order, type, page, pageSize) => {
    if (language) {
        q = q + `%2Blanguage%3A${language}`;
    }
    let url = Address.search(q, sort, order, type, page, pageSize);
    let res = await Api.netFetch(url);
    if (res && res.result && res.data) {
        if (type === 'user') {
            res.data.items.forEach((item) => {
                let ex = {
                    userPic: item.avatar_url,
                    user: item.login,
                }
                item.ex = ex
            })
        } else {
            res.data.items.forEach((item) => {
                let ex = {
                    repoName: item.name,
                    userPic: item.owner.avatar_url,
                    userName: item.owner.login,
                    type: item.language,
                    content: item.description,
                    icon1t: item.watchers_count,
                    icon2t: item.forks_count,
                    icon3t: item.open_issues,
                }
                item.ex = ex
            });
        }
    }
    return {
        data: res.data ? res.data.items : res.data,
        result: res.result
    };
};


/**
 * 获取用户对当前仓库的star、watcher状态
 */
const getRepositoryStatusDao = async (userName, reposName) => {
    let urls = Address.resolveStarRepos(userName, reposName);
    let urlw = Address.resolveWatcherRepos(userName, reposName);
    let ress = await await Api.netFetch(urls);
    let resw = await await Api.netFetch(urlw);
    return {
        data: {star: ress.result, watch: resw.result},
        result: true
    };
};



/**
 * star仓库
 */
const doRepositoryStarDao = async (userName, reposName, star) => {
    let url = Address.resolveStarRepos(userName, reposName);
    let res = await await Api.netFetch(url, star === false ? 'PUT' : 'DELETE');
    return {
        data: res.result,
        result: res.result
    };
};

/**
 * watcher仓库
 */
const doRepositoryWatchDao = async (userName, reposName, watch) => {
    let url = Address.resolveWatcherRepos(userName, reposName);
    let res = await await Api.netFetch(url, watch === false ? 'PUT' : 'DELETE');
    return {
        data: res.result,
        result: res.result
    };
};

/**
 * 创建仓库的fork分支
 */
const createForkDao = async (userName, reposName) => {
    let url = Address.createFork(userName, reposName);
    let res = await Api.netFetch(url, 'POST');
    return {
        data: res.data,
        result: res.result
    };
};

/**
 * 获取当前仓库所有分支
 */
const getBranchesDao = async(userName, reposName) => {
    let url = Address.getbranches(userName, reposName);
    let res = await Api.netFetch(url);
    return {
        data: res.data,
        result: res.result
    };

};


/**
 * 增加issue的回复
 */
const addIssueCommentDao = async (userName, repository, number, comment) => {
    let fullName = userName + "/" + repository;
    let url = Address.addIssueComment(userName, repository, number);
    let res = await Api.netFetch(url, 'POST', {body: comment}, true, {Accept: 'application/vnd.github.VERSION.full+json'});
    return {
        data: res.data,
        result: res.result
    };
};


/**
 * 编辑issue
 */
const editIssueDao = async (userName, repository, number, issue) => {
    let fullName = userName + "/" + repository;
    let url = Address.editIssue(userName, repository, number);
    let res = await Api.netFetch(url, 'PATCH', issue, true, {Accept: 'application/vnd.github.VERSION.full+json'});
    return {
        data: res.data,
        result: res.result
    };
};

/**
 * 锁定issue
 */
const lockIssueDao = async (userName, repository, number, locked) => {
    let fullName = userName + "/" + repository;
    let url = Address.lockIssue(userName, repository, number);
    let res = await Api.netFetch(url, locked ? "DELETE" : 'PUT', {}, true, {Accept: 'application/vnd.github.VERSION.full+json'});
    let objectData = null;
    if (res && res.result) {
        objectData = {
            locked: !locked
        }
    }
    return {
        data: objectData,
        result: res.result
    };
};

/**
 * 创建issue
 */
const createIssueDao = async (userName, repository, issue) => {
    let fullName = userName + "/" + repository;
    let url = Address.createIssue(userName, repository);
    let res = await Api.netFetch(url, 'POST', issue, true, {Accept: 'application/vnd.github.VERSION.full+json'});
    return {
        data: res.data,
        result: res.result
    };
};


/**
 * 编辑issue回复
 */
const editCommentDao = async (userName, repository, number, commentId, comment) => {
    let fullName = userName + "/" + repository;
    let url = Address.editComment(userName, repository, commentId);
    let res = await Api.netFetch(url, 'PATCH', comment, true, {Accept: 'application/vnd.github.VERSION.full+json'});
    return {
        data: res.data,
        result: res.result
    };
};

/**
 * 删除issue回复
 */
const deleteCommentDao = async (userName, repository, number, commentId) => {
    let fullName = userName + "/" + repository;
    let url = Address.editComment(userName, repository, commentId);
    let res = await Api.netFetch(url, 'DELETE', null, true, {Accept: 'application/vnd.github.VERSION.full+json'});
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
    getReposFileDirDao,
    getIssueInfoDao,
    getIssueCommentDao,
    getUserRepositoryDao,
    getStarRepositoryDao,
    getRepositoryForksDao,
    getRepositoryStarDao,
    getRepositoryWatcherDao,
    searchRepositoryDao,
    getRepositoryStatusDao,
    doRepositoryStarDao,
    doRepositoryWatchDao,
    createForkDao,
    getBranchesDao,
    lockIssueDao,
    editIssueDao,
    createIssueDao,
    addIssueCommentDao,
    editCommentDao,
    deleteCommentDao,
}