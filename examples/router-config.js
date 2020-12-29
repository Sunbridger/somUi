/* eslint import/no-dynamic-require: 0 */

import Vue from 'vue';
import VueRouter from 'vue-router';
import routesMap from './map';

const aliasRoutes = [];
let routes = [];
let tempRoutes = [];
let demoRoutes = [];
const componentMap = {
    docs: require('./components/docs'),
    changelog: require('./components/changelog')
};

Vue.use(VueRouter);

function getComponents (components) {
    if (!components) return;
    components.forEach((component) => {
        if (component.children) return getComponents(component.children);
        if (component.index) {
            tempRoutes.push({
                path: '',
                redirect: component.name
            });
        }
        tempRoutes.push({
            path: component.name,
            meta: {
                customUrl: '/projects/som-ui/www/index.html'
            },
            component: (res) => {
                if (component.componentName) {
                    res(componentMap[component.componentName]);
                } else {
                    require([`./docs/${component.name}.md`], res, () => {
                        require([`./docs/components/${component.name}/index.md`], res, () => {
                            require([`./docs/components/packages/${component.name}/index.md`], res); // eslint-disable-line
                        });
                    });
                }
            }
        });


        // demo
        demoRoutes.push({
            path: `/demo/${component.name}`,
            component: (res) => {
                if (!component.componentName) {
                    require([`./docs/components/${component.name}/index.vue`], res, () => {
                        require([`./docs/components/packages/${component.name}/index.vue`], res);
                    }); // eslint-disable-line
                }
            }
        });
    });
}

routesMap.forEach((route) => {
    tempRoutes = [];
    getComponents(route.children);
    const _routes = {
        path: route.path,
        component: componentMap[route.componentName],
        children: tempRoutes
    };
    routes.push(_routes);
});

routes = routes.concat(demoRoutes);
routes = routes.concat(aliasRoutes);

const router = new VueRouter({
    mode: 'hash',
    routes: routes.concat([
        {
            path: '*',
            redirect: '/components'
        }
    ])
});

function checkType () {
    const ua = navigator.userAgent.toLowerCase();
    if (/iphone|ipad|ipod|android/.test(ua)) {
        return 'mobile';
    } else {
        return 'pc';
    }
}

router.beforeEach((to, from, next) => {
    if (checkType() === 'mobile' && /((?=components|packages).+)\/(?!installation|quickstart|custom-theme)/.test(to.path)) {
        const match = to.path.match(/[components|packages]\/(.*)/);
        const component = match && match[1];
        next(`/demo/${component}`);
    } else {
        next();
    }
});

export default router;
