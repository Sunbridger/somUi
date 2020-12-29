var passiveSupported = false;

try {
    var options = Object.defineProperty({}, 'passive', {
        get: function () {
            passiveSupported = true;
        }
    });
    window.addEventListener('test', null, options);
} catch (err) {} //eslint-disable-line

module.exports = passiveSupported;