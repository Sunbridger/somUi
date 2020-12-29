import Vue from 'vue';
import dom from 'som-ui/src/utils/dom';
import { debounce } from 'throttle-debounce';
import ToastPlugin from 'som-ui/src/plugins/toast';
import { getCell, getColumnByCell, getRowIdentity } from './util';
import LayoutObserver from './layout-observer';

const { hasClass, addClass, removeClass } = dom;
Vue.use(ToastPlugin);

export default {
    mixins: [LayoutObserver],

    props: {
        store: {
            required: true
        },
        stripe: Boolean,
        context: {},
        layout: {
            required: true
        },
        rowStyle: [Object, Function],
        fixed: String,
        highlight: Boolean
    },

    render(h) {
        const columnsHidden = this.columns.map((column, index) => this.isColumnHidden(index));
        return (
            <table
                class="som-table__body"
                cellspacing="0"
                cellpadding="0"
                border="0">
                <colgroup>
                    {
                        this._l(this.columns, column => <col name={column.id} />)
                    }
                </colgroup>
                <tbody>
                    {
                        this._l(this.data, (row, $index) =>
                            [
                                <tr
                                    style={this.rowStyle ? this.getRowStyle(row, $index) : null}
                                    key={this.table.rowKey ? this.getKeyOfRow(row, $index) : $index}
                                    on-dblclick={$event => this.handleDoubleClick($event, row)}
                                    on-click={$event => this.handleClick($event, row)}
                                    on-contextmenu={$event => this.handleContextMenu($event, row)}
                                    on-mouseenter={() => this.handleMouseEnter($index)}
                                    on-mouseleave={() => this.handleMouseLeave()}
                                    class={[this.getRowClass(row, $index)]}>
                                    {
                                        this._l(this.columns, (column, cellIndex) =>
                                            <td
                                                class={[
                                                    column.id,
                                                    column.align,
                                                    column.className || '',
                                                    columnsHidden[cellIndex] ? 'is-hidden' : '',
                                                    column.fixed ? 'is-fixed' : '']}
                                                on-click={$event => this.handleCellClick($event, row, cellIndex)}
                                            >
                                                {
                                                    column.renderCell.call(
                                                        this._renderProxy,
                                                        h,
                                                        {
                                                            row,
                                                            column,
                                                            $index,
                                                            store: this.store,
                                                            _self: this.context || this.table.$vnode.context
                                                        },
                                                        columnsHidden[cellIndex]
                                                    )
                                                }
                                            </td>
                                        )
                                    }
                                </tr>,
                                this.store.states.expandRows.indexOf(row) > -1 ? (
                                    <tr>
                                        <td colspan={this.columns.length} class="som-table__expanded-cell">
                                            {this.table.renderExpanded ? this.table.renderExpanded(h, { row, $index, store: this.store }) : ''}
                                        </td>
                                    </tr>
                                ) : ''
                            ]
                        ).concat(
                            this._self.$parent.$slots.append
                        )
                        // .concat(
                        //     <som-tips effect={this.table.tooltipEffect} placement="top" ref="tooltip" content={this.tooltipContent}></som-tips>
                        // )
                    }
                </tbody>
            </table>
        );
    },

    watch: {
        'store.states.hoverRow'(newVal, oldVal) {
            if (!this.store.states.isComplex) return;
            const el = this.$el;
            if (!el) return;
            const rows = el.querySelectorAll('tbody > tr.som-table__row');
            const oldRow = rows[oldVal];
            const newRow = rows[newVal];
            if (oldRow) {
                removeClass(oldRow, 'hover-row');
            }
            if (newRow) {
                addClass(newRow, 'hover-row');
            }
        },
        'store.states.hoverColumn'(newVal, oldVal) {
            if (!this.store.table.cross) return;
            const el = this.$el;
            if (!el) return;
            const oldRow = oldVal ? el.querySelectorAll('tbody > tr.som-table__row > td:nth-child(' + oldVal + ')') : null;
            const newRow = newVal ? el.querySelectorAll('tbody > tr.som-table__row > td:nth-child(' + newVal + ')') : null;
            if (oldRow) {
                for (let item of oldRow) {
                    removeClass(item, 'hover-column');
                }
            }
            if (newRow) {
                for (let item of newRow) {
                    addClass(item, 'hover-column');
                }
            }
        },
        'store.states.currentRow'(newVal, oldVal) {
            if (!this.highlight) return;
            const el = this.$el;
            if (!el) return;
            const data = this.store.states.data;
            const rows = el.querySelectorAll('tbody > tr.som-table__row');
            const oldRow = rows[data.indexOf(oldVal)];
            const newRow = rows[data.indexOf(newVal)];
            if (oldRow) {
                removeClass(oldRow, 'current-row');
            } else if (rows) {
                [].forEach.call(rows, row => removeClass(row, 'current-row'));
            }
            if (newRow) {
                addClass(newRow, 'current-row');
            }
        }
    },

    computed: {
        table() {
            return this.$parent;
        },

        data() {
            return this.store.states.data;
        },

        columnsCount() {
            return this.store.states.columns.length;
        },

        leftFixedLeafCount() {
            return this.store.states.fixedLeafColumnsLength;
        },

        rightFixedLeafCount() {
            return this.store.states.rightFixedLeafColumnsLength;
        },

        leftFixedCount() {
            return this.store.states.fixedColumns.length;
        },

        rightFixedCount() {
            return this.store.states.rightFixedColumns.length;
        },

        columns() {
            return this.store.states.columns;
        }
    },

    data() {
        return {
            tooltipContent: ''
        };
    },

    created() {
        this.activateTooltip = debounce(50, tooltip => tooltip.handleShowPopper());
    },

    methods: {
        getKeyOfRow(row, index) {
            const rowKey = this.table.rowKey;
            if (rowKey) {
                return getRowIdentity(row, rowKey);
            }
            return index;
        },

        isColumnHidden(index) {
            if (this.fixed === true || this.fixed === 'left') {
                return index >= this.leftFixedLeafCount;
            } else if (this.fixed === 'right') {
                return index < this.columnsCount - this.rightFixedLeafCount;
            } else {
                return (index < this.leftFixedLeafCount) || (index >= this.columnsCount - this.rightFixedLeafCount);
            }
        },

        getRowStyle(row, index) {
            const rowStyle = this.rowStyle;
            if (typeof rowStyle === 'function') {
                return rowStyle.call(null, row, index);
            }
            return rowStyle;
        },

        getRowClass(row, index) {
            const classes = ['som-table__row'];

            if (this.stripe && index % 2 === 1) {
                classes.push('som-table__row--striped');
            }

            return classes.join(' ');
        },

        handleCellClick(event, row, cellIndex) {
            this.store.commit('setHoverColumn', cellIndex + 1);
            const table = this.table;
            const cell = getCell(event);
            if (cell) {
                const column = getColumnByCell(table, cell);
                const hoverState = table.hoverState = { cell, column, row };
                table.$emit('on-cell-click', hoverState.row, hoverState.column, hoverState.cell, event);
            }
            // 判断是否text-overflow, 如果是就显示tooltip
            const cellChild = event.target;
            if (hasClass(cellChild, 'som-tooltip') && cellChild.scrollHeight > cellChild.offsetHeight) {
                this.tooltipContent = cell.innerText;
                this.$som.toast.show({ text: this.tooltipContent, position: 'middle' });
            }
        },


        handleMouseEnter(index) {
            this.store.commit('setHoverRow', index);
        },

        handleMouseLeave() {
            this.store.commit('setHoverRow', null);
        },

        handleContextMenu(event, row) {
            this.handleEvent(event, row, 'contextmenu');
        },

        handleDoubleClick(event, row) {
            this.handleEvent(event, row, 'dblclick');
        },

        handleClick(event, row) {
            this.store.commit('setCurrentRow', row);
            this.handleEvent(event, row, 'click');
        },

        handleEvent(event, row, name) {
            const table = this.table;
            const cell = getCell(event);
            let column;
            if (cell) {
                column = getColumnByCell(table, cell);
                if (column) {
                    table.$emit(`on-cell-${name}`, row, column, cell, event);
                }
            }
            table.$emit(`on-row-${name}`, row, event, column);
        },

        handleExpandClick(row) {
            this.store.commit('toggleRowExpanded', row);
        }
    }
};
