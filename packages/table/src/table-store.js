import Vue from 'vue';
import { debounce } from 'throttle-debounce';
import { extend } from 'som-ui/src/utils/util';
import { orderBy, getColumnById, getRowIdentity } from './util';

const sortData = (data, states) => {
    const sortingColumn = states.sortingColumn;
    if (!sortingColumn || typeof sortingColumn.sortable === 'string') {
        return data;
    }

    let dataCopy = [];
    let sortDatas = [];
    let noSortDatas = {};
    dataCopy = extend(dataCopy, data);

    // 遍历数组，得到要排序 和不用排序的数组
    if (states.noSortRows) {
        dataCopy.forEach((value, index) => {
            if (states.noSortRows.indexOf(index + 1) === -1) {
                sortDatas.push(dataCopy[index]);
            } else {
                noSortDatas[index] = dataCopy[index];
            }
        });
    } else {
        sortDatas = dataCopy;
    }

    // 排序要进行排序的数组
    sortDatas = orderBy(sortDatas, states.sortProp, states.sortOrder, sortingColumn.sortMethod);

    // 拼接不用排序的数
    if (states.noSortRows) {
        for (let i of states.noSortRows) {
            sortDatas.splice(i - 1, 0, noSortDatas[i - 1]);
        }
    }

    return sortDatas;
};

const getKeysMap = function (array, rowKey) {
    const arrayMap = {};
    (array || []).forEach((row, index) => {
        arrayMap[getRowIdentity(row, rowKey)] = { row, index };
    });
    return arrayMap;
};

const toggleRowSelection = function (states, row, selected) {
    let changed = false;
    const selection = states.selection;
    const index = selection.indexOf(row);
    if (typeof selected === 'undefined') {
        if (index === -1) {
            selection.push(row);
            changed = true;
        } else {
            selection.splice(index, 1);
            changed = true;
        }
    } else if (selected && index === -1) {
        selection.push(row);
        changed = true;
    } else if (!selected && index > -1) {
        selection.splice(index, 1);
        changed = true;
    }

    return changed;
};

const TableStore = function (table, initialState = {}) {
    if (!table) {
        throw new Error('Table is required.');
    }
    this.table = table;

    this.states = {
        rowKey: null,
        _columns: [],
        originColumns: [],
        columns: [],
        fixedColumns: [],
        rightFixedColumns: [],
        leafColumns: [],
        fixedLeafColumns: [],
        rightFixedLeafColumns: [],
        leafColumnsLength: 0,
        fixedLeafColumnsLength: 0,
        rightFixedLeafColumnsLength: 0,
        isComplex: false,
        _data: null,
        filteredData: null,
        data: null,
        sortingColumn: null,
        sortProp: null,
        sortOrder: null,
        noSortRows: [],
        isAllSelected: false,
        selection: [],
        reserveSelection: false,
        selectable: null,
        currentRow: null,
        hoverRow: null,
        hoverColumn: null,
        filters: {},
        expandRows: [],
        defaultExpandAll: false,
        fixable: false
    };
    for (let prop in initialState) {
        if (initialState.hasOwnProperty(prop) && this.states.hasOwnProperty(prop)) {
            this.states[prop] = initialState[prop];
        }
    }
};

TableStore.prototype.mutations = {
    setData(states, data) {
        const dataInstanceChanged = states._data !== data;
        states._data = data;
        states.data = sortData((data || []), states);

        // states.data.forEach((item) => {
        //   if (!item.$extra) {
        //     Object.defineProperty(item, '$extra', {
        //       value: {},
        //       enumerable: false
        //     });
        //   }
        // });

        this.updateCurrentRow();

        if (!states.reserveSelection) {
            if (dataInstanceChanged) {
                this.clearSelection();
            } else {
                this.cleanSelection();
            }
            this.updateAllSelected();
        } else {
            const rowKey = states.rowKey;
            if (rowKey) {
                const selection = states.selection;
                const selectedMap = getKeysMap(selection, rowKey);

                states.data.forEach((row) => {
                    const rowId = getRowIdentity(row, rowKey);
                    const rowInfo = selectedMap[rowId];
                    if (rowInfo) {
                        selection[rowInfo.index] = row;
                    }
                });

                this.updateAllSelected();
            } else {
                console.warn('WARN: rowKey is required when reserve-selection is enabled.');
            }
        }

        const defaultExpandAll = states.defaultExpandAll;
        if (defaultExpandAll) {
            this.states.expandRows = (states.data || []).slice(0);
        }

        Vue.nextTick(() => this.table.updateScrollY());
    },

    changeSortCondition(states) {
        states.data = sortData((states.filteredData || states._data || []), states);

        this.table.$emit('on-sort-change', {
            column: this.states.sortingColumn,
            prop: this.states.sortProp,
            order: this.states.sortOrder
        });

        Vue.nextTick(() => this.table.updateScrollY());
    },

    filterChange(states, options) {
        let { column, values, silent } = options;
        if (values && !Array.isArray(values)) {
            values = [values];
        }

        const prop = column.property;
        const filters = {};

        if (prop) {
            states.filters[column.id] = values;
            filters[column.columnKey || column.id] = values;
        }

        let data = states._data;

        Object.keys(states.filters).forEach((columnId) => {
            const values = states.filters[columnId];
            if (!values || values.length === 0) return;
            const column = getColumnById(this.states, columnId);
            if (column && column.filterMethod) {
                data = data.filter((row) => {
                    return values.some(value => column.filterMethod.call(null, value, row));
                });
            }
        });

        states.filteredData = data;
        states.data = sortData(data, states);

        if (!silent) {
            this.table.$emit('on-filter-change', filters);
        }

        Vue.nextTick(() => this.table.updateScrollY());
    },

    changeColumnFixState(states, columnProperty, columnFixState) {
        let findFlag = false;
        states.columns = states.columns.map((item) => {
            if (findFlag) { return item; }
            findFlag = item.property === columnProperty;
            if (!findFlag && columnFixState !== 'right') {
                item.fixed = true;
            } else if (findFlag) {
                item.fixed = !item.fixed;
            }
            return item;
        });
        // this.scheduleLayout();
        // 此处不实用scheduleLayout 里的debounce方法，因为在debounce的时间间隔里会有dom宽度变化造成的闪烁
        this.updateColumns && this.updateColumns();
        this.table.doLayout();
    },

    insertColumn(states, column, index, parent) {
        let array = states._columns;
        if (parent) {
            array = parent.children;
            if (!array) array = parent.children = [];
        }

        if (typeof index !== 'undefined') {
            array.splice(index, 0, column);
        } else {
            array.push(column);
        }

        if (column.type === 'selection') {
            states.selectable = column.selectable;
            states.reserveSelection = column.reserveSelection;
        }

        this.scheduleLayout();
    },

    removeColumn(states, column) {
        let _columns = states._columns;
        if (_columns) {
            _columns.splice(_columns.indexOf(column), 1);
        }

        this.scheduleLayout();
    },

    setHoverRow(states, row) {
        states.hoverRow = row;
    },

    setHoverColumn(states, column) {
        states.hoverColumn = column;
    },

    setCurrentRow(states, row) {
        const oldCurrentRow = states.currentRow;
        states.currentRow = row;

        if (oldCurrentRow !== row) {
            this.table.$emit('on-current-change', row, oldCurrentRow);
        }
    },

    rowSelectedChanged(states, row) {
        const changed = toggleRowSelection(states, row);
        const selection = states.selection;

        if (changed) {
            const table = this.table;
            table.$emit('on-selection-change', selection);
            table.$emit('on-select', selection, row);
        }

        this.updateAllSelected();
    },

    toggleRowExpanded: function (states, row, expanded) {
        const expandRows = states.expandRows;
        if (typeof expanded !== 'undefined') {
            const index = expandRows.indexOf(row);
            if (expanded) {
                if (index === -1) expandRows.push(row);
            } else if (index !== -1) expandRows.splice(index, 1);
        } else {
            const index = expandRows.indexOf(row);
            if (index === -1) {
                expandRows.push(row);
            } else {
                expandRows.splice(index, 1);
            }
        }
        this.table.$emit('on-expand', row, expandRows.indexOf(row) !== -1);
    },

    toggleAllSelection: debounce(10, function (states) {
        const data = states.data || [];
        const value = !states.isAllSelected;
        const selection = this.states.selection;
        let selectionChanged = false;

        data.forEach((item, index) => {
            if (states.selectable) {
                if (states.selectable.call(null, item, index) && toggleRowSelection(states, item, value)) {
                    selectionChanged = true;
                }
            } else if (toggleRowSelection(states, item, value)) {
                selectionChanged = true;
            }
        });

        const table = this.table;
        if (selectionChanged) {
            table.$emit('on-selection-change', selection);
        }
        table.$emit('on-select-all', selection);
        states.isAllSelected = value;
    })
};

const doFlattenColumns = (columns) => {
    const result = [];
    columns.forEach((column) => {
        if (column.children) {
            result.push(...doFlattenColumns(column.children));
        } else {
            result.push(column);
        }
    });
    return result;
};

TableStore.prototype.updateColumns = function () {
    const states = this.states;
    const _columns = states._columns || [];
    states.fixedColumns = _columns.filter(column => column.fixed === true || column.fixed === 'left');
    states.rightFixedColumns = _columns.filter(column => column.fixed === 'right');

    if (states.fixedColumns.length > 0 && _columns[0] && _columns[0].type === 'selection' && !_columns[0].fixed) {
        _columns[0].fixed = true;
        states.fixedColumns.unshift(_columns[0]);
    }

    const notFixedColumns = _columns.filter(column => !column.fixed);
    states.originColumns = [].concat(states.fixedColumns).concat(notFixedColumns).concat(states.rightFixedColumns);

    const leafColumns = doFlattenColumns(notFixedColumns);
    const fixedLeafColumns = doFlattenColumns(states.fixedColumns);
    const rightFixedLeafColumns = doFlattenColumns(states.rightFixedColumns);

    states.leafColumnsLength = leafColumns.length;
    states.fixedLeafColumnsLength = fixedLeafColumns.length;
    states.rightFixedLeafColumnsLength = rightFixedLeafColumns.length;

    states.columns = [].concat(fixedLeafColumns).concat(leafColumns).concat(rightFixedLeafColumns);
    states.isComplex = states.fixedColumns.length > 0 || states.rightFixedColumns.length > 0;

    // states.originColumns = [].concat(states.fixedColumns).concat(_columns.filter(column => !column.fixed)).concat(states.rightFixedColumns);
    // states.columns = doFlattenColumns(states.originColumns);
    // states.isComplex = states.fixedColumns.length > 0 || states.rightFixedColumns.length > 0;
};

TableStore.prototype.isSelected = function (row) {
    return (this.states.selection || []).indexOf(row) > -1;
};

TableStore.prototype.clearSelection = function () {
    const states = this.states;
    states.isAllSelected = false;
    const oldSelection = states.selection;
    states.selection = [];
    if (oldSelection.length > 0) {
        this.table.$emit('on-selection-change', states.selection);
    }
};

TableStore.prototype.setExpandRowKeys = function (rowKeys) {
    const expandRows = [];
    const data = this.states.data;
    const rowKey = this.states.rowKey;
    if (!rowKey) throw new Error('[Table] prop row-key should not be empty.');
    const keysMap = getKeysMap(data, rowKey);
    rowKeys.forEach((key) => {
        const info = keysMap[key];
        if (info) {
            expandRows.push(info.row);
        }
    });

    this.states.expandRows = expandRows;
};

TableStore.prototype.toggleRowSelection = function (row, selected) {
    const changed = toggleRowSelection(this.states, row, selected);
    if (changed) {
        this.table.$emit('on-selection-change', this.states.selection);
    }
};

TableStore.prototype.cleanSelection = function () {
    const selection = this.states.selection || [];
    const data = this.states.data;
    const rowKey = this.states.rowKey;
    let deleted;
    if (rowKey) {
        deleted = [];
        const selectedMap = getKeysMap(selection, rowKey);
        const dataMap = getKeysMap(data, rowKey);
        for (let key in selectedMap) {
            if (selectedMap.hasOwnProperty(key) && !dataMap[key]) {
                deleted.push(selectedMap[key].row);
            }
        }
    } else {
        deleted = selection.filter((item) => {
            return data.indexOf(item) === -1;
        });
    }

    deleted.forEach((deletedItem) => {
        selection.splice(selection.indexOf(deletedItem), 1);
    });

    if (deleted.length) {
        this.table.$emit('on-selection-change', selection);
    }
};

TableStore.prototype.updateAllSelected = function () {
    const states = this.states;
    const { selection, rowKey, selectable, data } = states;
    if (!data || data.length === 0) {
        states.isAllSelected = false;
        return;
    }

    let selectedMap;
    if (rowKey) {
        selectedMap = getKeysMap(states.selection, rowKey);
    }

    const isSelected = function (row) {
        if (selectedMap) {
            return !!selectedMap[getRowIdentity(row, rowKey)];
        } else {
            return selection.indexOf(row) !== -1;
        }
    };

    let isAllSelected = true;
    let selectedCount = 0;
    for (let i = 0, j = data.length; i < j; i++) {
        const item = data[i];
        if (selectable) {
            const isRowSelectable = selectable.call(null, item, i);
            if (isRowSelectable) {
                if (!isSelected(item)) {
                    isAllSelected = false;
                    break;
                } else {
                    selectedCount++;
                }
            }
        } else if (!isSelected(item)) {
            isAllSelected = false;
            break;
        } else {
            selectedCount++;
        }
    }

    if (selectedCount === 0) isAllSelected = false;

    states.isAllSelected = isAllSelected;
};

TableStore.prototype.scheduleLayout = function () {
    this.updateColumns && this.updateColumns();
    this.table.debouncedLayout();
};

TableStore.prototype.setCurrentRowKey = function (key) {
    const states = this.states;
    const rowKey = states.rowKey;
    if (!rowKey) throw new Error('[Table] row-key should not be empty.');
    const data = states.data || [];
    const keysMap = getKeysMap(data, rowKey);
    const info = keysMap[key];
    if (info) {
        states.currentRow = info.row;
    }
};

TableStore.prototype.updateCurrentRow = function () {
    const states = this.states;
    const table = this.table;
    const data = states.data || [];
    const oldCurrentRow = states.currentRow;

    if (data.indexOf(oldCurrentRow) === -1) {
        states.currentRow = null;

        if (states.currentRow !== oldCurrentRow) {
            table.$emit('on-current-change', null, oldCurrentRow);
        }
    }
};

TableStore.prototype.commit = function (name, ...args) {
    const mutations = this.mutations;
    if (mutations[name]) {
        mutations[name].apply(this, [this.states].concat(args));
    } else {
        throw new Error(`Action not found: ${name}`);
    }
};

export default TableStore;
