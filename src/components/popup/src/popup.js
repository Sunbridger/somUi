
const passiveSupported = require('som-ui/src/utils/passive_supported');

const isBrowser = typeof window === 'object';

// not a good way but works well
if (isBrowser) {
    window.__$somPopups = window.__$somPopups || {};
}

const popupDialog = function (option) {
    if (!isBrowser) {
        return;
    }
    this.uuid = Math.random().toString(36).substring(3, 8);
    this.params = {};
    if (Object.prototype.toString.call(option) === '[object Object]') {
        this.params = {
            hideOnBlur: option.hideOnBlur,
            onOpen: option.onOpen || function () {},
            onClose: option.onClose || function () {},
            showMask: option.showMask,
            maskClass: option.maskClass || '',
            isTransparent: option.isTransparent
        };
    }
    if (!!document.querySelectorAll('.som-popup-mask').length <= 0) {
        this.divMask = document.createElement('a');
        this.divMask.className = 'som-popup-mask';
        this.divMask.dataset.uuid = '';
        this.divMask.href = 'javascript:void(0)';
        document.body.appendChild(this.divMask);
    }
    let div;
    if (!option.container) {
        div = document.createElement('div');
    } else {
        div = option.container;
    }

    div.className += ` som-popup-dialog som-popup-dialog-${this.uuid}`;
    if (!this.params.hideOnBlur) {
        div.className += ' som-popup-mask-disabled';
    }

    this.div = div;

    if (!option.container) {
        document.body.appendChild(div);
    }
    this.container = document.querySelector('.som-popup-dialog-' + this.uuid);
    this.mask = document.querySelector('.som-popup-mask');
    this.mask.dataset.uuid += `,${this.uuid}`;
    this._bindEvents();
    option = null;
    this.containerHandler = () => {
        this.mask && !/show/.test(this.mask.className) && setTimeout(() => {
            !/show/.test(this.mask.className) && (this.mask.style['zIndex'] = -1);
        }, 200);
    };

    this.container && this.container.addEventListener('webkitTransitionEnd', this.containerHandler);
    this.container && this.container.addEventListener('transitionend', this.containerHandler);
};

popupDialog.prototype.onClickMask = function () {
    this.params.hideOnBlur && this.params.onClose();
};

popupDialog.prototype._bindEvents = function () {
    if (this.params.hideOnBlur) {
        this.mask.addEventListener('click', this.onClickMask.bind(this), false);
        this.mask.addEventListener('touchmove', e => e.preventDefault(), passiveSupported ? {passive: false} : false);
    }
};

popupDialog.prototype.show = function () {
    if (this.params.maskClass) this.mask.classList.add(this.params.maskClass);
    if (this.params.showMask) {
        this.mask.classList.add('som-popup-show');
        this.mask.style['zIndex'] = 500;
    }
    if (this.params.isTransparent) {
        this.mask.classList.add('is-transparent');
    } else {
        this.mask.classList.remove('is-transparent');
    }
    this.container.classList.add('som-popup-show');
    this.params.onOpen && this.params.onOpen(this);
    if (isBrowser) {
        window.__$somPopups[this.uuid] = 1;
    }
};

popupDialog.prototype.hide = function (shouldCallback = true) {
    this.container.classList.remove('som-popup-show');
    if (!document.querySelector('.som-popup-dialog.som-popup-show')) {
        this.mask.classList.remove('som-popup-show');
        this.params.maskClass && this.mask.classList.remove(this.params.maskClass);
        setTimeout(() => {
            this.mask && !/show/.test(this.mask.className) && (this.mask.style['zIndex'] = -1);
        }, 400);
    }
    shouldCallback === false && this.params.onClose && this.params.hideOnBlur && this.params.onClose(this);
    this.isShow = false;
    if (isBrowser) {
        delete window.__$somPopups[this.uuid];
    }
};

popupDialog.prototype.destroy = function () {
    this.mask.dataset.uuid = this.mask.dataset.uuid.replace(new RegExp(`,${this.uuid}`, 'g'), '');
    if (!this.mask.dataset.uuid) {
        this.mask.removeEventListener('click', this.onClickMask.bind(this), false);
        this.mask && this.mask.parentNode && this.mask.parentNode.removeChild(this.mask);
    } else {
        this.hide();
    }
    this.container.removeEventListener('webkitTransitionEnd', this.containerHandler);
    this.container.removeEventListener('transitionend', this.containerHandler);
    if (isBrowser) {
        delete window.__$somPopups[this.uuid];
    }
};

export default popupDialog;
