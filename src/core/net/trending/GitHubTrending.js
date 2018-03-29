/**
 * 从https://github.com/trending获取数据
 * 项目地址:https://github.com/crazycodeboy/GitHubTrending
 * 博客地址:http://www.devio.org
 * @flow
 */
import TrendingUtil from './TrendingUtil';
import {NETWORK_TIMEOUT} from '../api';
import Api from '../api';

export default class GitHubTrending {
    GitHubTrending() {//Singleton pattern
        if (typeof GitHubTrending.instance === 'object') {
            return GitHubTrending.instance;
        }
        GitHubTrending.instance = this;
    }
    fetchTrending(nativeUrl, since, language) {
        return new Promise((resolve, reject) => {
            const timeoutId = setTimeout(() => {
                resolve({
                    result: false,
                    status: NETWORK_TIMEOUT,
                    message: '超时'
                })
            }, 15000);
            let url = 'trend'
            if (WXEnvironment.platform !== 'Web') {
                url = nativeUrl
            } else {
                if (since) {
                    url = url + `?since=${since}`
                    if (language) {
                        url = url + `&language=${language}`
                    }
                } else if (language) {
                    url = url + `?language=${language}`
                }
            }
            console.log("trend url", url)
            this.fetch(url)
                    .then((response) => {
                        clearTimeout(timeoutId);
                        return response.data
                    }).catch((error) => {
                        clearTimeout(timeoutId);
                        reject({result: false, data: error});
                        console.log(error);
                    }).then((responseData) => {
                    try {
                        resolve({result: true, data: TrendingUtil.htmlToRepo(responseData)});
                    } catch (e) {
                        reject({result: false, data: e});
                    }
                });
            //}
        });
    }

    fetch(path) {
        const stream = weex.requireModule('stream');
        return new Promise((resolve, reject) => {
            stream.fetch({
                method: 'GET',
                url: path,
                headers: {},
            }, (response) => {
                if (response.status == 200) {
                    resolve(response)
                } else {
                    reject(response)
                }
            }, () => {
            })
        })

    }


}
