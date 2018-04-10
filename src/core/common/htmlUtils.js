import URL from 'url-parse';
import * as Config from '../../config/Config';

export const generateHtml = (mdData, backgroundColor = "#FFFFFF", userBR = true) => {
    if (!mdData) {
        return "";
    }
    let mdDataCode = mdData.replace(/<code(([\s\S])*?)<\/code>/gi, function (match, capture) {
        if (match) {
            if (match && match.indexOf("\n") !== -1) {
                match = match.replace(/[\n]/g, '\n\r<br>');
            }
            return match;
        } else {
            return match;
        }
    });
    mdDataCode = mdDataCode.replace(/<pre(([\s\S])*?)<\/pre>/gi, function (match, capture) {
        if (match) {
            if (match.indexOf("<code>") < 0) {
                if (match && match.indexOf("\n") !== -1) {
                    match = match.replace(/[\n]/g, '\n\r<br>');
                }
            }
            return match;
        } else {
            return match;
        }
    });

    mdDataCode = mdDataCode.replace(/<pre>(([\s\S])*?)<\/pre>/gi, function (match, capture) {
        if (match && capture) {
            if (match.indexOf("<code>") < 0) {
                let code = `<pre><code>${capture}</code></pre>`;
                if (code.indexOf("\n") !== -1) {
                    code = code.replace(/[\n]/g, '\n\r<br>');
                }
                return code
            }
            return match;
        } else {
            return match;
        }
    });

    let data = mdDataCode.replace(/href="(.*?)"/gi, function (match, capture) {
        if (match && capture) {
            if (capture.indexOf("http://") < 0 && capture.indexOf("https://") < 0 && capture.indexOf("#") !== 0) {
                let fixedUrl = "gsygithub://" + capture;
                let href = `href="${fixedUrl}"`;
                return href;
            }
            return match;
        } else {
            return match;
        }
    });
    return generateCodeHtml(data, false, backgroundColor, Config.actionBlue, userBR);
};


/**
 * style for mdHTml
 */
const generateCodeHtml = (mdHTML, wrap, backgroundColor = '#FFFFFF', actionColor = Config.actionBlue, userBR = true) => {
    let doc = "<html>\n" +
        "<head>\n" +
        "<meta charset=\"utf-8\" />\n" +
        "<title></title>\n" +
        "<meta name=\"viewport\" content=\"width=device-width; initial-scale=1.0; maximum-scale=1.0; user-scalable=0;\"/>" +
        "<link href=\"https:\/\/cdn.bootcss.com/highlight.js/9.12.0/styles/dracula.min.css\" rel=\"stylesheet\">\n" +
        "<script src=\"https:\/\/cdn.bootcss.com/highlight.js/9.12.0/highlight.min.js\"></script>  " +
        "<script>hljs.configure({'useBR': " + userBR + "});hljs.initHighlightingOnLoad();</script> " +
        "<style>" +
        "body{background: " + backgroundColor + ";}" +
        "a {color:" + actionColor + " !important;}" +
        ".highlight pre, pre {" +
        " word-wrap: " + (wrap ? "break-word" : "normal") + "; " +
        " white-space: " + (wrap ? "pre-wrap" : "pre") + "; " +
        "}" +
        "thead, tr {" +
        "background:" + Config.miWhite + ";}" +
        "td, th {" +
        "padding: 5px 10px;" +
        "font-size: 12px;" +
        "direction:hor" +
        "}" +
        ".highlight {overflow: scroll; background: " + Config.webDraculaBackgroundColor + "}" +
        "tr:nth-child(even) {" +
        "background:" + Config.primaryLightColor + ";" +
        "color:" + Config.miWhite + ";" +
        "}" +
        "tr:nth-child(odd) {" +
        "background: " + Config.miWhite + ";" +
        "color:" + Config.primaryLightColor + ";" +
        "}" +
        "th {" +
        "font-size: 14px;" +
        "color:" + Config.miWhite + ";" +
        "background:" + Config.primaryLightColor + ";" +
        "}" +
        "</style>" +
        "</head>\n" +
        "<body>\n" +
        mdHTML +
        "</body>\n" +
        "</html>";
    return doc;
};

export const generateCode2HTml = (mdData, backgroundColor = '#FFFFFF', lang = 'java', userBR = true) => {
    let currentData = (mdData && mdData.indexOf("<code>") === -1) ?
        "<body>\n" +
        "<pre class=\"pre\">\n" +
        `<code lang='${lang}'>\n` +
        mdData +
        "</code>\n" +
        "</pre>\n" +
        "</body>\n" :

        "<body>\n" +
        "<pre class=\"pre\">\n" +
        mdData +
        "</pre>\n" +
        "</body>\n";
    return generateHtml(currentData, backgroundColor, userBR)
};


export const formName = (name) => {
    switch (name) {
        case 'sh':
            return 'shell';
        case 'js':
            return 'javascript';
        case 'kt':
            return 'kotlin';
        case 'c':
        case 'cpp':
            return 'cpp';
        case 'md':
            return 'markdown';
        case 'html':
            return 'xml';


    }
    return name
};


export const isImageEnd = (path) => {
    let image = false;
    IMAGE_END.forEach((item) => {
        if (path.indexOf(item) + item.length === path.length) {
            image = true;
        }
    });
    return image

};

const IMAGE_END = [".png", ".jpg", ".jpeg", ".gif", ".svg"];

export const issueJsonToRichJson = (jsonData, textColor = 'white') => {
    function getItemText(item) {
        let text = ""
        if (item.type !== 'text') {
            if (item.children) {
                item.children.forEach((cItem) => {
                    text = text + getItemText(cItem)
                })
            }
            return text
        } else {
            return item.content
        }
    }

    function getItemStyle(item) {

        switch (item.tagName) {
            case 'pre':
                return {backgroundColor: '#AAAAAA', borderRadius: '5px', padding: '5px', color: Config.primaryColor}
            case 'h1':
                return {fontSize: '50px', color: textColor, paddingTop: '5px', paddingBottom:'5px'};
            case 'h2':
                return {fontSize: '45px', color: textColor, paddingTop: '5px', paddingBottom:'5px'};
            case 'h3':
                return {fontSize: '40px', color: textColor, paddingTop: '5px', paddingBottom:'5px'};
            case 'h4':
                return {fontSize: '35px', color: textColor, paddingTop: '5px', paddingBottom:'5px'};
            case 'h5':
                return {fontSize: '30px', color: textColor, paddingTop: '5px', paddingBottom:'5px'};
            case 'p':
                return {fontSize: '30px', color: textColor, paddingTop: '5px', paddingBottom:'5px'};
            case 'br':
                return {paddingTop: '5px', paddingBottom:'5px'};
            default:
                return {color: textColor};
        }

    }

    let dataList = [];
    jsonData.forEach((item) => {
        let result = getItemText(item);
        dataList.push({value: result, type: item.tagName, style: getItemStyle(item)})
    })
    return dataList;
}



export function launchUrl(url, target) {
    if (!url && url.length === 0) return;
    let parseUrl = URL(url);
    let image = false;
    IMAGE_END.forEach((item) => {
        if (url.indexOf(item) + item.length === url.length) {
            image = true;
            if (url.indexOf('https://github.com/') === 0) {
                url = url.replace(new RegExp("/blob/", "gm"), "/raw/");
            }
            //Actions.PhotoPage({uri: url});
        }
    });

    if (image) {
        return
    }

    if (parseUrl && parseUrl.hostname === "github.com" && parseUrl.pathname.length > 0) {
        let pathnames = parseUrl.pathname.split("/");
        if (pathnames.length === 2) {
            //解析人
            let userName = pathnames[1];
            target.jumpWithParams("UserInfoPage", {userName: userName})
        } else if (pathnames.length >= 3) {
            let userName = pathnames[1];
            let repoName = pathnames[2];
            let fullName = userName + "/" + repoName;
            //解析仓库
            if (pathnames.length === 3) {
                target.jumpWithParams("RepositoryDetailPage", {
                    userName: userName,
                    reposName: repoName,
                    title: fullName
                })
            } else {
                target.jumpWithParams("WebPage", {url: url})
            }
        }
    } else {
        target.jumpWithParams("WebPage", {url: url})
    }
}
