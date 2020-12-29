import objectAssign from 'object-assign';
import mergeOptions from 'som-ui/src/utils/merge-options';
import ToastComponent from 'components/toast';

let $vm;
let watcher;

const plugin = {
    install (vue, pluginOptions = {}) {
        const Toast = vue.extend(ToastComponent);

        if (!$vm) {
            $vm = new Toast({
                el: document.createElement('div')
            });
            document.body.appendChild($vm.$el);
        }

        const defaults = {};
        for (let i in $vm.$options.props) {
            if (i !== 'value') {
                defaults[i] = $vm.$options.props[i].default;
            }
        }

        const toast = {
            show (options = {}) {
                // destroy watcher
                watcher && watcher();
                if (typeof options === 'string') {
                    mergeOptions($vm, objectAssign({}, pluginOptions, {text: options}));
                } else if (typeof options === 'object') {
                    mergeOptions($vm, objectAssign({}, pluginOptions, options));
                }
                if (typeof options === 'object' && options.onShow || options.onHide) { // eslint-disable-line
                    watcher = $vm.$watch('show', (val) => {
                        val && options.onShow && options.onShow($vm);
                        val === false && options.onHide && options.onHide($vm);
                    });
                }
                $vm.show = true;
            },
            text (text, position = 'default') {
                this.show({
                    type: '',
                    position,
                    text
                });
            },
            hide () {
                $vm.show = false;
            }
        };

        // all som-ui's plugins are included in this.$som
        if (!vue.$som) {
            vue.$som = {
                toast
            };
        } else {
            vue.$som.toast = toast;
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

