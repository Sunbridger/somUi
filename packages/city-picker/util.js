//如果data已经在selectedArr中出现，则删除该数据；如果未出现过，则push进数组；
// 用于实现，选中及取消选中效果；
export function toggleSelected (selectedArr, data) {
    const arr = [];
    selectedArr = selectedArr || [];
    let repeat = false;
    selectedArr.forEach((v) => {
        if (v.code !== data.code) {
            arr.push(v);
        } else {
            repeat = true;
        }
    });
    !repeat && arr.push(data);
    return arr;
}

export function stringifyQuery (obj) {
    return Object.keys(obj).map(function (k) {
        return `${k}=${encodeURIComponent(obj[k])}`;
    }).join('&');
}
