export default {
    name: 'sinput',
    props: {
        inputParmes: Object
    },
    render (creatElement) {
        return creatElement(
            'som-input', {
                props: this.propsData
            }
        );
    },
    computed: {
        propsData () {
            let pop = {};
            for (let item in this.inputParmes) {
                if (item.indexOf('on') === -1) {
                    pop[item] = this.inputParmes[item];
                }
            }
            pop.disabled = true;
            return pop;
        },
        events () {
            let event = {};
            for (let item in this.inputParmes) {
                if (item.indexOf('on') === 0) {
                    let it = 'on-' + item.split('on')[1].toLowerCase();
                    event[it] = this.inputParmes[item];
                }
            }
            return event;
        }
    }
};
