import Api from './api'
import GitHubTrending from './trending/GitHubTrending'
import Address from './address'
import {generateHtml} from '../common/htmlUtils'
import {getCache, setCache} from '../common/storageUtils'

const getTrendDao = async (page = 0, since, languageType) => {
    let localLanguage = (languageType) ? languageType : "*";
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
    let fullName = userName + "/" + reposName;
    let curBranch = (branch) ? branch : "master";
    let url = Address.readmeFile(userName + '/' + reposName, branch);
    let res = await Api.netFetch(url, 'GET', null, false, {Accept: 'application/vnd.github.html'});
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

export default {
    getTrendDao,
    getRepositoryDetailReadmeHtmlDao
}