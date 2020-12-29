export default {
    install (Vue, config = {}) {
        if (!Vue.som) {
            Vue.som = {
                config
            };
        } else {
            Vue.som.config = config;
        }

        if (typeof window !== 'undefined') {
            window.SOM_CONFIG = config;
        }

        Vue.mixin({
            created: function () {
                if (this.$som) {
                    this.$som.config = config;
                } else {
                    this.$som = {
                        config
                    };
                }
            }
        });
    }
};
