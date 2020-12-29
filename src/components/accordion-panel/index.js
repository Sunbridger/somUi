import AccordionPanel from '../accordion/src/accordion-panel';

/* istanbul ignore next */
AccordionPanel.install = function(Vue) {
    Vue.component(AccordionPanel.name, AccordionPanel);
};

export default AccordionPanel;
