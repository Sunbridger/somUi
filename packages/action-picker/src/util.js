/* eslint-disable import/prefer-default-export*/
export function findIndex(arr, key, item) {
    let index;
    arr.forEach((it, i) => {
        if (it[key] === item[key]) {
            index = i;
        }
    });
    index = (typeof index === 'number') ? index : -1;
    return index;
}
/* eslint-enable import/prefer-default-export*/
