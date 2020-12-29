import dom from 'som-ui/src/utils/dom';
import LayoutObserver from './layout-observer';

const { hasClass, addClass, removeClass } = dom;
const getAllColumns = (columns) => {
    const result = [];
    columns.forEach((column) => {
        if (column.children) {
            result.push(column);
            result.push(...getAllColumns(column.children));
        } else {
            result.push(column);
        }
    });
    return result;
};

const convertToRows = (originColumns) => {
    let maxLevel = 1;
    const traverse = (column, parent) => {
        if (parent) {
            column.level = parent.level + 1;
            if (maxLevel < column.level) {
                maxLevel = column.level;
            }
        }
        if (column.children) {
            let colSpan = 0;
            column.children.forEach((subColumn) => {
                traverse(subColumn, column);
                colSpan += subColumn.colSpan;
            });
            column.colSpan = colSpan;
        } else {
            column.colSpan = 1;
        }
    };

    originColumns.forEach((column) => {
        column.level = 1;
        traverse(column);
    });

    const rows = [];
    for (let i = 0; i < maxLevel; i++) {
        rows.push([]);
    }

    const allColumns = getAllColumns(originColumns);

    allColumns.forEach((column) => {
        if (!column.children) {
            column.rowSpan = maxLevel - column.level + 1;// eslint-disable-line no-mixed-operators
        } else {
            column.rowSpan = 1;
        }
        rows[column.level - 1].push(column);
    });

    return rows;
};

export default {
    name: 'SomTableHeader',

    mixins: [LayoutObserver],

    render(h) {
        const { originColumns, fixable } = this.store.states;
        const columnRows = convertToRows(originColumns, this.columns);
        return (
            <table
                class="som-table__header"
                cellspacing="0"
                cellpadding="0"
                border="0">
                <colgroup>
                    {
                        this._l(this.columns, (column, cellIndex) =>
                            (!this.isCellHidden(cellIndex, this.columns) || column.fixed === this.fixed || this.fixed === 'false') && <col
                                name={column.id}
                                width={column.realWidth || column.width}
                            />)
                    }
                    {
                        this.hasGutter ? <col name="gutter" /> : ''
                    }
                </colgroup>
                <thead>
                    {
                        this._l(columnRows, (columns, rowIndex) =>
                            <tr>
                                {
                                    this._l(columns, (column, cellIndex) =>
                                        (!this.isCellHidden(cellIndex, columns) || column.fixed === this.fixed || this.fixed === 'false') && <th
                                            colspan={column.colSpan}
                                            rowspan={column.rowSpan}
                                            on-mousemove={$event => this.handleMouseMove($event, column)}
                                            on-mouseout={this.handleMouseOut}
                                            on-mousedown={$event => this.handleMouseDown($event, column)}
                                            on-click={$event => this.handleHeaderClick($event, column)}
                                            class={[column.id, column.order, column.headerAlign, column.className || '',
                                                rowIndex === 0 && this.isCellHidden(cellIndex, columns) ? 'is-hidden' : '',
                                                !column.children ? 'is-leaf' : '',
                                                column.labelClassName,
                                                column.fixed ? 'is-fixed' : '']}>
                                            <div class={['cell',
                                                column.sortable && 'thead-sort',
                                                column.ellipsis && 'ellipsis']}>
                                                {
                                                    column.renderHeader
                                                        // eslint-disable-next-line max-len
                                                        ? column.renderHeader.call(this._renderProxy, h, { column, $index: cellIndex, store: this.store, _self: this.$parent.$vnode.context })
                                                        : column.label
                                                }
                                                {
                                                    column.sortable
                                                        ? <span class="caret-wrapper" on-click={$event => this.handleSortClick($event, column)}>
                                                            <som-icon
                                                                class="sort-caret"
                                                                name="sort-arrow-up"
                                                                on-click={$event => this.handleSortClick($event, column, 'ascending')}
                                                            />
                                                            <som-icon
                                                                class="sort-caret"
                                                                name="sort-arrow-down"
                                                                on-click={$event => this.handleSortClick($event, column, 'descending')}
                                                            />
                                                        </span>
                                                        : ''
                                                }
                                                {
                                                    fixable && (<som-icon name="thumbtack" />)
                                                }
                                            </div>
                                        </th>
                                    )
                                }
                                {
                                    this.hasGutter ? <th class="gutter"></th> : ''
                                }
                            </tr>
                        )
                    }
                </thead>
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
        border: Boolean,
        isSortBack: Boolean,
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
            return (!this.fixed || this.fixed === 'false') && this.tableLayout.gutterWidth && this.tableLayout.scrollY;
        }
    },

    mounted() {
        if (this.defaultSort.prop) {
            const states = this.store.states;
            states.sortProp = this.defaultSort.prop;
            states.sortOrder = this.defaultSort.order || 'ascending';
            this.$nextTick(() => {
                for (let i = 0, length = this.columns.length; i < length; i++) {
                    let column = this.columns[i];
                    if (column.property === states.sortProp) {
                        column.order = states.sortOrder;
                        states.sortingColumn = column;
                        break;
                    }
                }

                if (states.sortingColumn) {
                    this.store.commit('changeSortCondition');
                }
            });
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
        },

        toggleAllSelection() {
            this.store.commit('toggleAllSelection');
        },

        handleHeaderClick(event, column) {
            if (event.target.className.indexOf('som-icon-thumbtack') > -1) {
                this.handleFixClick(event, column);
            } else if (column.sortable) {
                this.handleSortClick(event, column);
            }
            this.$parent.$emit('on-header-click', column, event);
        },

        handleFixClick(e, column) {
            this.store.commit('changeColumnFixState', column.property, column.fixed);
        },

        handleMouseDown(event, column) {
            if (this.$isServer) return;
            if (column.children && column.children.length > 0) return;
            /* istanbul ignore if */
            if (this.draggingColumn && this.border) {
                this.dragging = true;

                this.$parent.resizeProxyVisible = true;

                const table = this.$parent;
                const tableEl = table.$el;
                const tableLeft = tableEl.getBoundingClientRect().left;
                const columnEl = this.$el.querySelector(`th.${column.id}`);
                const columnRect = columnEl.getBoundingClientRect();
                const minLeft = columnRect.left - tableLeft + 30;// eslint-disable-line no-mixed-operators

                addClass(columnEl, 'noclick');

                this.dragState = {
                    startMouseLeft: event.clientX,
                    startLeft: columnRect.right - tableLeft,
                    startColumnLeft: columnRect.left - tableLeft,
                    tableLeft
                };

                const resizeProxy = table.$refs.resizeProxy;
                resizeProxy.style.left = this.dragState.startLeft + 'px';

                document.onselectstart = function () { return false; };
                document.ondragstart = function () { return false; };

                const handleMouseMove = (event) => {
                    const deltaLeft = event.clientX - this.dragState.startMouseLeft;
                    const proxyLeft = this.dragState.startLeft + deltaLeft;

                    resizeProxy.style.left = Math.max(minLeft, proxyLeft) + 'px';
                };

                const handleMouseUp = () => {
                    if (this.dragging) {
                        const {
                            startColumnLeft,
                            startLeft
                        } = this.dragState;
                        const finalLeft = parseInt(resizeProxy.style.left, 10);
                        const columnWidth = finalLeft - startColumnLeft;
                        column.width = column.realWidth = columnWidth;
                        table.$emit('on-header-dragend', column.width, startLeft - startColumnLeft, column, event);

                        this.store.scheduleLayout();

                        document.body.style.cursor = '';
                        this.dragging = false;
                        this.draggingColumn = null;
                        this.dragState = {};

                        table.resizeProxyVisible = false;
                    }

                    document.removeEventListener('mousemove', handleMouseMove);
                    document.removeEventListener('mouseup', handleMouseUp);
                    document.onselectstart = null;
                    document.ondragstart = null;

                    setTimeout(function () {
                        removeClass(columnEl, 'noclick');
                    }, 0);
                };

                document.addEventListener('mousemove', handleMouseMove);
                document.addEventListener('mouseup', handleMouseUp);
            }
        },

        handleMouseMove(event, column) {
            if (column.children && column.children.length > 0) return;
            let target = event.target;
            while (target && target.tagName !== 'TH') {
                target = target.parentNode;
            }

            if (!column || !column.resizable) return;

            if (!this.dragging && this.border) {
                let rect = target.getBoundingClientRect();

                const bodyStyle = document.body.style;
                if (rect.width > 12 && rect.right - event.pageX < 8) {
                    bodyStyle.cursor = 'col-resize';
                    this.draggingColumn = column;
                } else if (!this.dragging) {
                    bodyStyle.cursor = '';
                    this.draggingColumn = null;
                }
            }
        },

        handleMouseOut() {
            if (this.$isServer) return;
            document.body.style.cursor = '';
        },

        toggleOrder(order) {
            if (this.isSortBack) {
                return !order ? 'ascending' : order === 'ascending' ? 'descending' : '';
            }
            return !order ? 'ascending' : order === 'ascending' ? 'descending' : 'ascending';
        },

        handleSortClick(event, column, givenOrder) {
            event.stopPropagation();
            let order = givenOrder || this.toggleOrder(column.order);

            let target = event.target;
            while (target && target.tagName !== 'TH') {
                target = target.parentNode;
            }

            if (target && target.tagName === 'TH') {
                if (hasClass(target, 'noclick')) {
                    removeClass(target, 'noclick');
                    return;
                }
            }

            if (!column.sortable) return;

            const states = this.store.states;
            let sortProp = states.sortProp;
            let sortOrder;
            const sortingColumn = states.sortingColumn;

            if (sortingColumn !== column) {
                if (sortingColumn) {
                    sortingColumn.order = null;
                }
                states.sortingColumn = column;
                sortProp = column.property;
            }

            if (!order) {
                sortOrder = column.order = null;
                states.sortingColumn = null;
                sortProp = null;
            } else {
                sortOrder = column.order = order;
            }

            states.sortProp = sortProp;
            states.sortOrder = sortOrder;

            this.store.commit('changeSortCondition');
        }
    },

    data() {
        return {
            draggingColumn: null,
            dragging: false,
            dragState: {}
        };
    }
};
