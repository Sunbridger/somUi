
export const getMinutes = function (minuteStep) {
    let values = [];
    for (let i = 0; i <= 59; i += minuteStep) {
        let now = i < 10 ? '0' + i : i + '';
        values.push(now);
    }
    return values;
};

export const times = function (n, iteratee) {
    let index = -1;
    const result = Array(n);

    while (++index < n) {
        result[index] = iteratee(index);
    }
    return result;
};

export const formatCover = function (n) {
    return n < 10 ? '0' + n : n + '';
};

export const getTrueValue = function (formattedValue) {
    if (!formattedValue) return;
    while (isNaN(parseInt(formattedValue, 10))) {
        formattedValue = formattedValue.slice(1);
    }
    return parseInt(formattedValue, 10);
};

export const isLeapYear = function (year) {
    return (year % 400 === 0) || (year % 100 !== 0 && year % 4 === 0);
};

export const isShortMonth = function(month) {
    return [4, 6, 9, 11].indexOf(month) > -1;
};

export const getMonthEndDay = function(year, month) {
    if (isShortMonth(month)) {
        return 30;
    } else if (month === 2) {
        return isLeapYear(year) ? 29 : 28;
    } else {
        return 31;
    }
};


export const isToday = function (year, month, date) {
    let today = new Date();
    if (today.getFullYear() === parseInt(year) && today.getMonth() + 1 === parseInt(month) && today.getDate() === parseInt(date)) {
        return true;
    }
    return false;
};

export const getWeekLable = function (index) {
    let label = '';
    switch (index) {
        case 0: label = '周日'; break;
        case 1: label = '周一'; break;
        case 2: label = '周二'; break;
        case 3: label = '周三'; break;
        case 4: label = '周四'; break;
        case 5: label = '周五'; break;
        case 6: label = '周六'; break;
    }
    return label;
};

export const getWeek = function (year, month, date) {
    let day = new Date(parseInt(year), parseInt(month) - 1, parseInt(date));
    if (isToday(year, month, date)) return '今天';
    let dayIndex = day.getDay();
    return getWeekLable(dayIndex);
};
