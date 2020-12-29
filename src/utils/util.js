import OSSImage from '@souche-ui/oss-image';

const hasOwnProperty = Object.prototype.hasOwnProperty;

function oneOf (value, validList) {
    for (let i = 0; i < validList.length; i += 1) {
        if (value === validList[i]) {
            return true;
        }
    }
    return false;
}

function hasOwn(obj, key) {
    return hasOwnProperty.call(obj, key);
}

function isObj (x) {
    const type = typeof x;
    return x !== null && (type === 'object' || type === 'function');
}

function extend(to, _from) {
    for (let key in _from) {
        if (hasOwn(_from, key)) {
            to[key] = _from[key];
        }
    }
    return to;
}

function toObject(arr) {
    var res = {};
    for (let i = 0; i < arr.length; i++) {
        if (arr[i]) {
            extend(res, arr[i]);
        }
    }
    return res;
}

function cleanStyle(styles = {}) {
    for (let i in styles) {
        if (typeof styles[i] === 'undefined') {
            delete styles[i];
        }
    }
    return styles;
}

// scrollTop animation
function scrollTop(el, from = 0, to, duration = 500) {
    if (!window.requestAnimationFrame) {
        window.requestAnimationFrame = (
            window.webkitRequestAnimationFrame
            || window.mozRequestAnimationFrame
            || window.msRequestAnimationFrame
            || function (callback) {
                return window.setTimeout(callback, 1000 / 60);
            }
        );
    }
    const difference = Math.abs(from - to);
    const _step = Math.ceil((difference / duration) * 50);

    function scroll(start, end, step) {
        if (start === end) return;

        let d = (start + step > end) ? end : start + step;
        if (start > end) {
            d = (start - step < end) ? end : start - step;
        }

        if (el === window) {
            window.scrollTo(d, d);
        } else {
            el.scrollTop = d;
        }
        window.requestAnimationFrame(() => scroll(d, end, step));
    }
    scroll(from, to, _step);
}

function getParentProp(self, name) {
    if (self.$parent && self.$parent[name]) {
        return self.$parent[name];
    }
    if (self.$parent && self.$parent.$parent && self.$parent.$parent[name]) {
        return self.$parent.$parent[name];
    }
}

function format(date, fmt = 'YYYY-MM-DD HH:mm:ss') {
    var o = {
        'M+': date.getMonth() + 1,
        'D+': date.getDate(),
        'h+': date.getHours() % 12 === 0 ? 12 : date.getHours() % 12,
        'H+': date.getHours(),
        'm+': date.getMinutes(),
        's+': date.getSeconds(),
        'q+': Math.floor((date.getMonth() + 3) / 3),
        'S': date.getMilliseconds()
    };
    var week = {
        '0': '\u65e5',
        '1': '\u4e00',
        '2': '\u4e8c',
        '3': '\u4e09',
        '4': '\u56db',
        '5': '\u4e94',
        '6': '\u516d'
    };
    if (/(Y+)/.test(fmt)) {
        fmt = fmt.replace(RegExp.$1, (date.getFullYear() + '').substr(4 - RegExp.$1.length));
    }
    if (/(E+)/.test(fmt)) {
        fmt = fmt.replace(RegExp.$1, ((RegExp.$1.length > 1) ? (RegExp.$1.length > 2 ? '\u661f\u671f' : '\u5468') : '') + week[date.getDay() + '']);
    }
    for (var k in o) {
        if (new RegExp('(' + k + ')').test(fmt)) {
            fmt = fmt.replace(RegExp.$1, (RegExp.$1.length === 1) ? (o[k]) : (('00' + o[k]).substr(('' + o[k]).length)));
        }
    }
    return fmt;
}

// 处理图片
function imagesufix (img, option = []) {
    let action = [{
        action: 'interlace', // 渐进显示
        value: 1
    },
    {
        action: 'quality', // 图片质量
        Q: 75
    },
    {
        action: 'sharpen', // 图片锐化
        value: 100
    },
    {
        action: 'auto-orient', // 自动旋转
        value: 1
    }];

    action = action.concat(option);
    return OSSImage(img, action);
}

// 滚动动画
function scroll(el, from = 0, to, duration = 500, direction = 'top') {
    if (!window.requestAnimationFrame) {
        window.requestAnimationFrame = (
            window.webkitRequestAnimationFrame
            || window.mozRequestAnimationFrame
            || window.msRequestAnimationFrame
            || function (callback) {
                return window.setTimeout(callback, 1000 / 60);
            }
        );
    }
    const difference = Math.abs(from - to);
    const _step = Math.ceil((difference / duration) * 50);

    function scroll(start, end, step) {
        if (start === end) return;

        let d = (start + step > end) ? end : start + step;
        if (start > end) {
            d = (start - step < end) ? end : start - step;
        }

        if (el === window) {
            window.scrollTo(d, d);
        } else {
            if (direction === 'left') { //eslint-disable-line
                el.scrollLeft = d;
            } else {
                el.scrollTop = d;
            }
        }
        window.requestAnimationFrame(() => scroll(d, end, step));
    }
    scroll(from, to, _step);
}

export {
    oneOf,
    isObj,
    extend,
    hasOwn,
    toObject,
    cleanStyle,
    getParentProp,
    format,
    scrollTop,
    imagesufix,
    scroll
};
