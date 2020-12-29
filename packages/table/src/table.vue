<template>
  <div
    class="som-table"
    :class="{
        'som-table--fit': fit,
        'som-table--striped': stripe,
        'som-table--sticky': sticky,
        'som-table--border': border,
        'som-table--fluid-height': maxHeight,
        'som-table--scrollable-x': layout.scrollX,
        'som-table--scrollable-y': layout.scrollY,
        'som-table--enable-row-hover': !store.states.isComplex,
        'som-table--enable-row-transition': (store.states.data || []).length !== 0 && (store.states.data || []).length < 100
        }"
    @mouseleave="handleMouseLeave($event)"
  >
    <div class="hidden-columns" ref="hiddenColumns">
      <slot></slot>
    </div>
    <div class="som-table__header-wrapper" ref="headerWrapper" v-if="showHeader">
      <table-header
        fixed="false"
        :store="store"
        :layout="layout"
        :border="border"
        :default-sort="defaultSort"
        :is-sort-back="isSortBack"
        :style="{ width: layout.bodyWidth ? layout.bodyWidth + 'px' : '' }"
      ></table-header>
    </div>
    <!-- 表格固定置顶行 -->
    <div
      class="som-table__footer-wrapper top"
      ref="footerTopWrapper"
      v-if="showSummary === 'top'"
      v-show="data && data.length > 0"
    >
      <table-footer
        :store="store"
        :layout="layout"
        :border="border"
        :sum-text="sumText || '合计'"
        :summary-method="summaryMethod"
        :default-sort="defaultSort"
        :style="{ width: layout.bodyWidth ? layout.bodyWidth + 'px' : '' }"
      ></table-footer>
    </div>
    <!-- 表格body -->
    <div
      class="som-table__body-wrapper"
      ref="bodyWrapper"
      :class="[layout.scrollX ? `is-scrolling-${scrollPosition}` : 'is-scrolling-none']"
      :style="[bodyHeight]"
    >
      <table-body
        :context="context"
        :store="store"
        :layout="layout"
        :stripe="stripe"
        :row-style="rowStyle"
        :highlight="highlightCurrentRow"
        :style="{
                    width: bodyWidth
                }"
      ></table-body>
      <div
        v-if="!data || data.length === 0"
        class="som-table__empty-block"
        ref="emptyBlock"
        :style="{
                    width: bodyWidth
                }"
      >
        <slot name="empty">
          <span class="som-table__empty-text">{{ emptyText }}</span>
        </slot>
      </div>

      <div v-if="$slots.append" class="som-table__append-wrapper" ref="appendWrapper">
        <slot name="append"></slot>
      </div>
    </div>
    <!-- 表格footer -->
    <div
      class="som-table__footer-wrapper bottom"
      ref="footerWrapper"
      v-if="(showSummary || showSummary === 'bottom') && showSummary !== 'top'"
      v-show="data && data.length > 0"
    >
      <table-footer
        :store="store"
        :layout="layout"
        :border="border"
        :sum-text="sumText || '合计'"
        :summary-method="summaryMethod"
        :default-sort="defaultSort"
        :style="{ width: layout.bodyWidth ? layout.bodyWidth + 'px' : '' }"
      ></table-footer>
    </div>

    <div
      class="som-table__fixed som-table__fixed-header"
      v-if="fixedColumns.length > 0"
      :style="[
                { width: layout.fixedWidth ? layout.fixedWidth + 'px' : '' },
                fixedHeight
            ]"
    >
      <div class="som-table__fixed-header-wrapper" ref="fixedHeaderWrapper" v-if="showHeader">
        <table-header fixed="left" :border="border" :store="store" :layout="layout"></table-header>
      </div>
    </div>
    <div
      class="som-table__fixed"
      v-if="fixedColumns.length > 0"
      :style="[
                { width: layout.fixedWidth ? layout.fixedWidth + 'px' : '' },
                fixedHeight
            ]"
    >
      <div
        class="som-table__fixed-body-wrapper"
        ref="fixedBodyWrapper"
        :style="[
                { top: layout.headerHeight + (showSummary === 'top' ? layout.footerHeight : 0) + 'px' },
                    fixedBodyHeight
                ]"
      >
        <table-body
          fixed="left"
          :store="store"
          :stripe="stripe"
          :layout="layout"
          :highlight="highlightCurrentRow"
          :row-style="rowStyle"
          :style="{ width: bodyWidth }"
        ></table-body>
      </div>
      <div
        :class="['som-table__fixed-footer-wrapper',{top:showSummary === 'top',bottom:(showSummary && showSummary !== 'top') || showSummary === 'bottom'}]"
        :style="[
            { top: showSummary === 'top' ? layout.headerHeight + 'px' : 'auto' },
        ]"
        ref="fixedFooterWrapper"
        v-if="showSummary"
        v-show="data && data.length > 0"
      >
        <table-footer
          fixed="left"
          :border="border"
          :sum-text="sumText || '合计'"
          :summary-method="summaryMethod"
          :store="store"
          :layout="layout"
          :style="{ width: bodyWidth }"
        ></table-footer>
      </div>
    </div>

    <div
      class="som-table__fixed-right som-table__fixed-header"
      v-if="rightFixedColumns.length > 0"
      :style="[
            { width: layout.rightFixedWidth ? layout.rightFixedWidth + 'px' : '' },
            { right: layout.scrollY ? (border ? layout.gutterWidth : (layout.gutterWidth || 1)) + 'px' : '' },
            fixedHeight
            ]"
    >
      <div class="som-table__fixed-header-wrapper" ref="rightFixedHeaderWrapper" v-if="showHeader">
        <table-header fixed="right" :border="border" :store="store" :layout="layout"></table-header>
      </div>
    </div>
    <div
      class="som-table__fixed-right"
      v-if="rightFixedColumns.length > 0"
      :style="[
            { width: layout.rightFixedWidth ? layout.rightFixedWidth + 'px' : '' },
            { right: layout.scrollY ? (border ? layout.gutterWidth : (layout.gutterWidth || 1)) + 'px' : '' },
            fixedHeight
            ]"
    >
      <div
        class="som-table__fixed-body-wrapper"
        ref="rightFixedBodyWrapper"
        :style="[
                { top: layout.headerHeight + (showSummary === 'top' ? layout.footerHeight : 0) + 'px' },
                fixedBodyHeight
                ]"
      >
        <table-body
          fixed="right"
          :store="store"
          :stripe="stripe"
          :layout="layout"
          :row-style="rowStyle"
          :highlight="highlightCurrentRow"
          :style="{ width: bodyWidth }"
        ></table-body>
      </div>
      <div
        :class="['som-table__fixed-footer-wrapper',{top:showSummary === 'top',bottom:(showSummary && showSummary !== 'top') || showSummary === 'bottom'}]"
        :style="[
            { top: showSummary === 'top' ? layout.headerHeight + 'px' : 'auto' },
        ]"
        ref="rightFixedFooterWrapper"
        v-if="showSummary"
        v-show="data && data.length > 0"
      >
        <table-footer
          fixed="right"
          :border="border"
          :sum-text="sumText || '合计'"
          :summary-method="summaryMethod"
          :store="store"
          :layout="layout"
          :style="{ width: bodyWidth }"
        ></table-footer>
      </div>
    </div>
    <div
      class="som-table__fixed-right-patch"
      v-if="rightFixedColumns.length"
      ref="rightFixedPatch"
      :style="{
                width: layout.scrollY ? layout.gutterWidth + 'px' : '0',
                height: layout.headerHeight + 'px' }"
    ></div>
    <div class="som-table__column-resize-proxy" ref="resizeProxy" v-show="resizeProxyVisible"></div>
  </div>
</template>

<script type="text/babel">
import { debounce } from "throttle-debounce";
import {
  addResizeListener,
  removeResizeListener
} from "som-ui/src/utils/resize-event";
import TableStore from "./table-store";
import TableLayout from "./table-layout";
import TableBody from "./table-body";
import TableHeader from "./table-header";
import TableFooter from "./table-footer";
import './table.css';
let tableIdSeed = 1;

export default {
  name: "SomTable",

  props: {
    data: {
      type: Array,
      default: function() {
        return [];
      }
    },

    width: [String, Number],

    height: [String, Number],

    maxHeight: [String, Number],

    fixable: {
      type: Boolean,
      default: false
    },

    fit: {
      type: Boolean,
      default: true
    },

    stripe: Boolean,

    sticky: Boolean,

    border: Boolean,

    rowKey: [String, Function],

    context: {},

    showHeader: {
      type: Boolean,
      default: true
    },

    showSummary: [Boolean, String],

    sumText: String,

    summaryMethod: Function,

    rowStyle: [Object, Function],

    highlightCurrentRow: Boolean,

    currentRowKey: [String, Number],

    emptyText: String,

    expandRowKeys: Array,

    defaultExpandAll: Boolean,

    defaultSort: Object,

    isSortBack: {
      type: Boolean,
      default: true
    },

    isResetScroll: {
      type: Boolean,
      default: true
    },

    noSortRows: Array,

    tooltipEffect: String,

    cross: Boolean
  },

  components: {
    TableHeader,
    TableFooter,
    TableBody
  },

  methods: {
    setCurrentRow(row) {
      this.store.commit("setCurrentRow", row);
    },

    toggleRowSelection(row, selected) {
      this.store.toggleRowSelection(row, selected);
      this.store.updateAllSelected();
    },

    clearSelection() {
      this.store.clearSelection();
    },

    handleMouseLeave() {
      this.store.commit("setHoverRow", null);
      this.store.commit("setHoverColumn", null);
      if (this.hoverState) this.hoverState = null;
    },

    updateScrollY() {
      this.layout.updateScrollY();
    },

    bindEvents() {
      const { headerWrapper, footerWrapper, footerTopWrapper } = this.$refs;
      const refs = this.$refs;
      let self = this;

      this.bodyWrapper.addEventListener("scroll", function() {
        if (headerWrapper) headerWrapper.scrollLeft = this.scrollLeft;
        if (footerWrapper) footerWrapper.scrollLeft = this.scrollLeft;
        if (footerTopWrapper) footerTopWrapper.scrollLeft = this.scrollLeft;
        if (refs.fixedBodyWrapper)
          refs.fixedBodyWrapper.scrollTop = this.scrollTop;
        if (refs.rightFixedBodyWrapper)
          refs.rightFixedBodyWrapper.scrollTop = this.scrollTop;
        const maxScrollLeftPosition = this.scrollWidth - this.offsetWidth - 1;
        const scrollLeft = this.scrollLeft;
        if (scrollLeft >= maxScrollLeftPosition) {
          self.scrollPosition = "right";
        } else if (scrollLeft === 0) {
          self.scrollPosition = "left";
        } else {
          self.scrollPosition = "middle";
        }
      });

      if (this.fit) {
        addResizeListener(this.$el, this.windowResizeListener);
      }
    },
    windowResizeListener() {
      if (!this.$ready) return;
      let shouldUpdateLayout = false;
      const el = this.$el;
      const { width: oldWidth, height: oldHeight } = this.resizeState;

      const width = el.offsetWidth;
      if (oldWidth !== width) {
        shouldUpdateLayout = true;
      }

      const height = el.offsetHeight;
      if ((this.height || this.shouldUpdateHeight) && oldHeight !== height) {
        shouldUpdateLayout = true;
      }

      if (shouldUpdateLayout) {
        this.resizeState.width = width;
        this.resizeState.height = height;
        this.doLayout();
      }
    },

    doLayout() {
      this.layout.update();
      if (this.shouldUpdateHeight) {
        this.layout.updateHeight();
      }
    }
  },

  created() {
    this.tableId = "som-table_" + tableIdSeed + "_";
    this.debouncedLayout = debounce(50, () => this.doLayout());
  },

  computed: {
    bodyWrapper() {
      return this.$refs.bodyWrapper;
    },

    shouldUpdateHeight() {
      return (
        this.height ||
        this.maxHeight ||
        this.fixedColumns.length > 0 ||
        this.rightFixedColumns.length > 0
      );
    },

    selection() {
      return this.store.selection;
    },

    columns() {
      return this.store.states.columns;
    },

    tableData() {
      return this.store.states.data;
    },

    fixedColumns() {
      return this.store.states.fixedColumns;
    },

    rightFixedColumns() {
      return this.store.states.rightFixedColumns;
    },

    bodyHeight() {
      let style = {};
      if (this.height) {
        style = {
          height: this.layout.bodyHeight ? this.layout.bodyHeight + "px" : ""
        };
      } else if (this.maxHeight) {
        style = {
          "max-height":
            (this.showHeader
              ? this.maxHeight -
                this.layout.headerHeight -
                this.layout.footerHeight
              : this.maxHeight - this.layout.footerHeight) + "px"
        };
      }

      return style;
    },

    bodyWidth() {
      let { bodyWidth, scrollY, gutterWidth } = this.layout;
      return bodyWidth ? bodyWidth - (scrollY ? gutterWidth : 0) + "px" : ""; // eslint-disable-line no-mixed-operators
    },

    fixedBodyHeight() {
      let style = {};

      if (this.height) {
        style = {
          height: this.layout.fixedBodyHeight
            ? this.layout.fixedBodyHeight + "px"
            : ""
        };
      } else if (this.maxHeight) {
        let maxHeight = this.layout.scrollX
          ? this.maxHeight - this.layout.gutterWidth
          : this.maxHeight;

        if (this.showHeader) {
          maxHeight -= this.layout.headerHeight;
        }

        style = {
          "max-height": maxHeight + "px"
        };
      }

      return style;
    },

    fixedHeight() {
      let style = {};

      if (this.maxHeight) {
        style = {
          bottom:
            this.layout.scrollX && this.data.length
              ? this.layout.gutterWidth + "px"
              : ""
        };
      } else {
        style = {
          height: this.layout.viewportHeight
            ? this.layout.viewportHeight + "px"
            : ""
        };
      }

      return style;
    }
  },

  watch: {
    height: {
      immediate: true,
      handler(value) {
        this.layout.setHeight(value);
      }
    },

    maxHeight: {
      immediate: true,
      handler(value) {
        this.layout.setMaxHeight(value);
      }
    },

    currentRowKey(newVal) {
      this.store.setCurrentRowKey(newVal);
    },

    data: {
      immediate: true,
      handler(val) {
        let scrollDom;
        if (this.$el)
          scrollDom = this.$el.querySelector(
            ".som-table--scrollable-y .som-table__body-wrapper"
          );
        if (scrollDom && this.isResetScroll) {
          scrollDom.scrollTop = 0;
          scrollDom.scrollLeft = 0;
        }
        this.store.commit("setData", val);
        if (this.$ready) this.doLayout();
      }
    },

    expandRowKeys(newVal) {
      this.store.setExpandRowKeys(newVal);
    }
  },

  destroyed() {
    if (this.windowResizeListener)
      removeResizeListener(this.$el, this.windowResizeListener);
  },

  mounted() {
    this.bindEvents();
    this.store.updateColumns();
    this.doLayout();

    this.resizeState = {
      width: this.$el.offsetWidth,
      height: this.$el.offsetHeight
    };

    // init filters
    this.store.states.columns.forEach(column => {
      if (column.filteredValue && column.filteredValue.length) {
        this.store.commit("filterChange", {
          column,
          values: column.filteredValue,
          silent: true
        });
      }
    });

    this.$ready = true;
  },

  data() {
    const store = new TableStore(this, {
      rowKey: this.rowKey,
      fixable: this.fixable,
      noSortRows: this.noSortRows,
      defaultExpandAll: this.defaultExpandAll
    });
    const layout = new TableLayout({
      store,
      table: this,
      fit: this.fit,
      showHeader: this.showHeader
    });
    return {
      store,
      layout,
      resizeState: {
        width: null,
        height: null
      },
      renderExpanded: null,
      resizeProxyVisible: false,
      scrollPosition: "left"
    };
  }
};
</script>
