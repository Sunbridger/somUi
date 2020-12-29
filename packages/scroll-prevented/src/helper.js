/**
 * 阻止背景滚动
 *
 * @param  Boolean  flag    [是否阻止背景滚动]
 */
const preventBack = (flag) => {
    if (flag) {
        const top = document.documentElement.scrollTop || document.body.scrollTop;
        document.body.style.cssText += `
            position: fixed;
            width: 100vw;
            left: 0;
            top: ${-top}px;
        `;
    } else {
        const top = document.body.style.top;
        document.body.style.cssText += `
            position: static;
        `;
        window.scrollTo(0, Math.abs(parseFloat(top)));
    }
};

export default preventBack;
