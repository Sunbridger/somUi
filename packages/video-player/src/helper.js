const Promise = require('es6-promise').Promise;
/**
 * @param {String} value
 */
const toHttps = function(value) {
    if (/^http:\/\/*/.test(value)) {
        return value.replace('http://', 'https://');
    }
    return value;
};
/**
 * 获取图片尺寸
 */
const getImgSize = function(src) {
    src = toHttps(src);
    let i = new Image();
    i.src = src;
    return new Promise((resolve) => {
        let timer = setInterval(() => {
            if (i.complete) {
                clearInterval(timer);
                resolve({
                    width: i.width,
                    height: i.height
                });
            }
        }, 50);
    });
};

const inApp = (function() {
    if (window.Tower) {
        return !!window.Tower.app;
    }
    return false;
})();

export default {
    getImgSize,
    toHttps,
    inApp
};
