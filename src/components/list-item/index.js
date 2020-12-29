import ListItem from '../list/src/list-item';

/* istanbul ignore next */
ListItem.install = function(Vue) {
    Vue.component(ListItem.name, ListItem);
};

export default ListItem;
