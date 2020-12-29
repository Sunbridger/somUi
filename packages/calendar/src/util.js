function zero (n) {
    return n < 10 ? '0' + n : n;
}

function isLeapYear(year) {
    return (year % 400 === 0) || (year % 100 !== 0 && year % 4 === 0);
}

function isShortMonth(month) {
    return [4, 6, 9, 11].indexOf(month) > -1;
}

function getMonthEndDay(year, month) {
    if (isShortMonth(month)) {
        return 30;
    } else if (month === 2) {
        return isLeapYear(year) ? 29 : 28;
    } else {
        return 31;
    }
}

export {
    zero,
    getMonthEndDay
};

