import LayoutObserver from './layout-observer';

export default {
    name: 'SomTableFooter',

    mixins: [LayoutObserver],

    render() {
        const sums = [];
        this.columns.forEach((column, index) => {
            if (index === 0) {
                sums[index] = this.sumText;
                return;
            }
            const values = this.store.states.data.map(item => Number(item[column.property]));
            const precisions = [];
            let notNumber = true;
            values.forEach((value) => {
                if (!isNaN(value)) {
                    notNumber = false;
                    let decimal = ('' + value).split('.')[1];
                    precisions.push(decimal ? decimal.length : 0);
                }
            });
            const precision = Math.max.apply(null, precisions);
            if (!notNumber) {
                sums[index] = values.reduce((prev, curr) => {
                    const value = Number(curr);
                    if (!isNaN(value)) {
                        return parseFloat((prev + curr).toFixed(precision));
                    } else {
                        return prev;
                    }
                }, 0);
            } else {
                sums[index] = '';
            }
        });

        return (
        <table
          class="som-table__footer"
          cellspacing="0"
          cellpadding="0"
          border="0">
          <colgroup>
            {
              this._l(this.columns, column =>
                <col
                  name={ column.id }
                  width={ column.realWidth || column.width }
                />)
            }
            {
                this.hasGutter ? <col name="gutter" /> : ''
            }
          </colgroup>
          <tbody>
            <tr>
            {
              this._l(this.columns, (column, cellIndex) =>
                <td
                  colspan={ column.colSpan }
                  rowspan={ column.rowSpan }
                  class={ [column.id, column.headerAlign, column.className
                  || '', this.isCellHidden(cellIndex, this.columns) ? 'is-hidden' : '', !column.children ? 'is-leaf' : '', column.labelClassName] }>
                  <div class={ ['cell', column.labelClassName] }>
                  {
                    this.summaryMethod ? this.summaryMethod({ columns: this.columns, data: this.store.states.data })[cellIndex] : sums[cellIndex]
                  }
                  </div>
                </td>
              )
            }
            {
                this.hasGutter ? <th class="gutter"></th> : ''
            }
            </tr>
          </tbody>
        </table>
        );
    },

    props: {
        fixed: String,
        store: {
            required: true
        },
        layout: {
            required: true
        },
        summaryMethod: Function,
        sumText: String,
        border: Boolean,
        defaultSort: {
            type: Object,
            default() {
                return {
                    prop: '',
                    order: ''
                };
            }
        }
    },

    computed: {
        isAllSelected() {
            return this.store.states.isAllSelected;
        },

        columnsCount() {
            return this.store.states.columns.length;
        },

        leftFixedCount() {
            return this.store.states.fixedColumns.length;
        },

        rightFixedCount() {
            return this.store.states.rightFixedColumns.length;
        },

        columns() {
            return this.store.states.columns;
        },
        hasGutter() {
            return !this.fixed && this.tableLayout.gutterWidth && this.tableLayout.scrollY;
        }
    },

    methods: {
        isCellHidden(index, columns) {
            if (this.fixed === true || this.fixed === 'left') {
                return index >= this.leftFixedCount;
            } else if (this.fixed === 'right') {
                let before = 0;
                for (let i = 0; i < index; i++) {
                    before += columns[i].colSpan;
                }
                return before < this.columnsCount - this.rightFixedCount;
            } else {
                return (index < this.leftFixedCount) || (index >= this.columnsCount - this.rightFixedCount);
            }
        }
    }
};
