import * as Constant from './constant'

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
    return generateCodeHtml(data, false, backgroundColor, Constant.actionBlue, userBR);
};


/**
 * style for mdHTml
 */
const generateCodeHtml = (mdHTML, wrap, backgroundColor = Constant.white, actionColor = Constant.actionBlue, userBR = true) => {
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
        "background:" + Constant.miWhite + ";}" +
        "td, th {" +
        "padding: 5px 10px;" +
        "font-size: 12px;" +
        "direction:hor" +
        "}" +
        ".highlight {overflow: scroll; background: " + Constant.webDraculaBackgroundColor + "}" +
        "tr:nth-child(even) {" +
        "background:" + Constant.primaryLightColor + ";" +
        "color:" + Constant.miWhite + ";" +
        "}" +
        "tr:nth-child(odd) {" +
        "background: " + Constant.miWhite + ";" +
        "color:" + Constant.primaryLightColor + ";" +
        "}" +
        "th {" +
        "font-size: 14px;" +
        "color:" + Constant.miWhite + ";" +
        "background:" + Constant.primaryLightColor + ";" +
        "}" +
        "</style>" +
        "</head>\n" +
        "<body>\n" +
        mdHTML +
        "</body>\n" +
        "</html>";
    return doc;
};

export const generateCode2HTml = (mdData, backgroundColor = Constant.white, lang = 'java', userBR = true) => {
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

