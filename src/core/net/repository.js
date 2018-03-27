import Api from './api'
import GitHubTrending from './trending/GitHubTrending'
import Address from './address'
import * as Constant from '../common/constant'
import {getCache, setCache} from '../common/storageUtils'

const getTrendDao = async (page = 0, since, languageType) => {
    let localLanguage = (languageType) ? languageType : "*";
    let url = Address.trending(since, languageType);
    let res = await new GitHubTrending().fetchTrending(url);
    return {
        data: res.data,
        result: res.result
    };


};
export default {
    getTrendDao
}