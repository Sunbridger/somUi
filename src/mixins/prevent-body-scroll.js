import dom from 'som-ui/src/utils/dom';

const BODY_CLASS_NAME = 'som-modal-open';
const CONTAINER_CLASS_NAME = 'som-modal-open-for-container';
const SOM_VIEW_BOX_ELEMENT = '#som_view_box_body';

export default {
    methods: {
        // some plugin may be imported before configPlugin, so we cannot get gloal config when component is created
        getLayout () {
            if (typeof window !== 'undefined') {
                if (window.SOM_CONFIG && window.SOM_CONFIG.$layout === 'VIEW_BOX') {
                    return 'VIEW_BOX';
                }
            }
            return '';
        },
        addModalClassName () {
            if (typeof this.shouldPreventScroll === 'function' && this.shouldPreventScroll()) {
                return;
            }
            if (this.getLayout() === 'VIEW_BOX') {
                dom.addClass(document.body, BODY_CLASS_NAME);
                dom.addClass(document.querySelector(SOM_VIEW_BOX_ELEMENT), CONTAINER_CLASS_NAME);
            }
        },
        removeModalClassName () {
            if (this.getLayout() === 'VIEW_BOX') {
                dom.removeClass(document.body, BODY_CLASS_NAME);
                dom.removeClass(document.querySelector(SOM_VIEW_BOX_ELEMENT), CONTAINER_CLASS_NAME);
            }
        }
    },
    beforeDestroy () {
        this.removeModalClassName();
    },
    deactivated () {
        this.removeModalClassName();
    }
};
