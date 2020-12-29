import TagGroup from '../tag/src/tag-group';

/* istanbul ignore next */
TagGroup.install = function(Vue) {
    Vue.component(TagGroup.name, TagGroup);
};

export default TagGroup;
