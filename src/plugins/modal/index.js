import mergeOptions from 'som-ui/src/utils/merge-options';
import ModalComponent from 'components/modal';

let $vm;

const plugin = {
    install (vue) {
        const Modal = vue.extend(ModalComponent);

        if (!$vm) {
            $vm = new Modal({
                el: document.createElement('div'),
                propsData: {
                    title: ''
                }
            });
            document.body.appendChild($vm.$el);
        }

        const modal = {
            show (options) {
                if (typeof options === 'object') {
                    mergeOptions($vm, options);
                }
                if (typeof options === 'object' && (options.onShow || options.onHide)) {
                    options.onShow && options.onShow();
                }
                this.$watcher && this.$watcher();
                this.$watcher = $vm.$watch('showValue', (val) => {
                    if (!val && options && options.onHide) {
                        options.onHide();
                    }
                });

                $vm.$off('on-cancel');
                $vm.$off('on-confirm');

                $vm.$on('on-cancel', () => {
                    options && options.onCancel && options.onCancel();
                });
                $vm.$on('on-confirm', (msg) => {
                    options && options.onConfirm && options.onConfirm(msg);
                });
                $vm.showValue = true;
            },
            setInputValue (val) {
                vue.nextTick(() => {
                    setTimeout(() => {
                        $vm.setInputValue(val);
                    }, 10);
                });
            },
            prompt (placeholder, options) {
                this.show(Object.assign({}, options, {
                    placeholder,
                    showInput: true
                }));
            },
            hide () {
                $vm.showValue = false;
            }
        };

        // all Som-UI's plugins are included in this.$som
        if (!vue.$som) {
            vue.$som = {
                modal
            };
        } else {
            vue.$som.modal = modal;
        }

        vue.mixin({
            created: function () {
                this.$som = vue.$som;
            }
        });
    }
};

export default plugin;
export const install = plugin.install;

