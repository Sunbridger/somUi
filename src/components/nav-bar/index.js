import NavBar from './src/main';

/* istanbul ignore next */
NavBar.install = function(Vue) {
    Vue.component(NavBar.name, NavBar);
};

export default NavBar;
