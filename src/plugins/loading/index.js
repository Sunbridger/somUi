import mergeOptions from 'som-ui/src/utils/merge-options';
import LoadingComponent from 'components/loading';

let $vm;
let watcher;
let delayTime = null;
const plugin = {
    install (vue) {
        const Loading = vue.extend(LoadingComponent);

        if (!$vm) {
            $vm = new Loading({
                el: document.createElement('div')
            });
            document.body.appendChild($vm.$el);
        }

        const loading = {
            show (options = {}) {
                // destroy watcher
                watcher && watcher();

                if (typeof options === 'string') {
                    $vm.text = options;
                } else if (typeof options === 'object') {
                    mergeOptions($vm, options);
                }

                if (typeof options === 'object' && options.onShow || options.onHide) { // eslint-disable-line
                    watcher = $vm.$watch('show', (val) => {
                        val && options.onShow && options.onShow($vm);
                        val === false && options.onHide && options.onHide($vm);
                    });
                }
                delayTime && clearTimeout(delayTime);
                delayTime = setTimeout(() => {
                    $vm.show = true;
                }, options.delay || 0);
            },
            hide () {
                if (delayTime) {
                    clearTimeout(delayTime);
                    delayTime = null;
                }
                $vm.show = false;
            }
        };

        // all som's plugins are included in this.$som
        if (!vue.$som) {
            vue.$som = {
                loading
            };
        } else {
            vue.$som.loading = loading;
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

