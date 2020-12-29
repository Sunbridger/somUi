import dom from 'som-ui/src/utils/dom';

class Transition {
    beforeEnter(el) /* istanbul ignore next */ {
        dom.addClass(el, 'accordion-transition');
        if (!el.dataset) el.dataset = {};

        el.dataset.oldPaddingTop = el.style.paddingTop;
        el.dataset.oldPaddingBottom = el.style.paddingBottom;

        el.style.height = '0';
        el.style.paddingTop = 0;
        el.style.paddingBottom = 0;
    }
    enter(el) /* istanbul ignore next */ {
        el.dataset.oldOverflow = el.style.overflow;
        if (el.scrollHeight !== 0) {
            el.style.height = `${el.scrollHeight}px`;
            el.style.paddingTop = el.dataset.oldPaddingTop;
            el.style.paddingBottom = el.dataset.oldPaddingBottom;
        } else {
            el.style.height = '';
            el.style.paddingTop = el.dataset.oldPaddingTop;
            el.style.paddingBottom = el.dataset.oldPaddingBottom;
        }

        el.style.overflow = 'hidden';
    }
    afterEnter(el)  /* istanbul ignore next */ {
        // for safari: remove class then reset height is necessary
        dom.removeClass(el, 'accordion-transition');
        el.style.height = '';
        el.style.overflow = el.dataset.oldOverflow;
    }
    beforeLeave(el) /* istanbul ignore next */ {
        if (!el.dataset) el.dataset = {};
        el.dataset.oldPaddingTop = el.style.paddingTop;
        el.dataset.oldPaddingBottom = el.style.paddingBottom;
        el.dataset.oldOverflow = el.style.overflow;

        el.style.height = `${el.scrollHeight}px`;
        el.style.overflow = 'hidden';
    }
    leave(el) /* istanbul ignore next */ {
        if (el.scrollHeight !== 0) {
            // for safari: add class after set height, or it will jump to zero height suddenly, weired
            dom.addClass(el, 'accordion-transition');
            el.style.height = 0;
            el.style.paddingTop = 0;
            el.style.paddingBottom = 0;
        }
    }
    afterLeave(el) /* istanbul ignore next */ {
        dom.removeClass(el, 'accordion-transition');
        el.style.height = '';
        el.style.overflow = el.dataset.oldOverflow;
        el.style.paddingTop = el.dataset.oldPaddingTop;
        el.style.paddingBottom = el.dataset.oldPaddingBottom;
    }
}

export default {
    name: 'SomAccordionTransition',
    functional: true,
    render(h, { children }) {
        const data = {
            on: new Transition()
        };

        return h('transition', data, children);
    }
};
