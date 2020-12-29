import Vue from 'vue';

export default {
    bind(el, binding, vnode) {
        console.log(123, binding.arg);
        let viewer = vnode.context.$refs[binding.arg];
        if (viewer) {
            if (viewer[0]) {
                viewer = viewer[0]; // v-for情况下viewer是数组
            }
            if (!viewer.imgElement) viewer.imgElement = [];
            let imgs = el.querySelectorAll('img');
            console.log('el', el);
            console.log('imgs', imgs);
            console.log('viewer', viewer);
            if (imgs.length) {
                let len = viewer.imgElement.length;
                for (let i = 0; i < imgs.length; i++) {
                    viewer.imgElement.push(imgs[i]); // 先把图片放进去
                    imgs[i].onclick = function () {
                        viewer.initImg();
                        viewer.show(len + i);
                    };
                }
            } else {
                let len = viewer.imgElement.length;
                el.onclick = function () {
                    viewer.initImg();
                    viewer.show(len);
                };
                viewer.imgElement.push(el);
            }
        } else {
            // document.body
            if (!document.body.querySelector('.globle-pswp')) { // eslint-disable-line
                let ImgViewer = Vue.extend(require('./main.vue'));
                let imgViewer = new ImgViewer();
                imgViewer.vm = imgViewer.$mount();
                imgViewer.vm.$el.classList.add('globle-pswp');
                let viewerCon = document.createElement('div');
                viewerCon.classList.add('globle-pswp');
                document.body.appendChild(imgViewer.vm.$el);

                document.body.viewerVue = imgViewer.vm;

                document.body.viewerVue.imgElement = [];
                if (binding.value) {
                    let len = document.body.viewerVue.imgElement.length;
                    el.onclick = function () {
                        document.body.viewerVue.show(len);
                    };
                    document.body.viewerVue.imgElement.push({src: binding.value, dataset: {}});
                }

            } else {
                if (!document.body.viewerVue.imgElement) document.body.viewerVue.imgElement = []; // eslint-disable-line
                if (binding.value) {
                    let len = document.body.viewerVue.imgElement.length;
                    el.onclick = function () {
                        document.body.viewerVue.show(len);
                    };
                    document.body.viewerVue.imgElement.push({src: binding.value, dataset: {}});
                }
            }

        }
    }
};
