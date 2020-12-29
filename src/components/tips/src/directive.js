export default {
    bind: function (el, { value }) {
        let onClickOutside = value;
        el.handler = function (e) {
            if (el && !el.contains(e.target)) {
                onClickOutside(e);
            }
        };
        document.addEventListener('touchstart', el.handler, true);
    },
    unbind: function (el) {
        document.removeEventListener('touchstart', el.handler, true);
        el.handler = null;
    }
};
