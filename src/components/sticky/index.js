/**
 * Created by hyb on 2017/9/14.
 */
import Sticky from './src/sticky';

Sticky.install = function (Vue) {
    Vue.component(Sticky.name || 'SomSticky', Sticky);
};

export default Sticky;
