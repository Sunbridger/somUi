<template>
  <som-accordion @on-change="handleChange" :default-active-key="[0]" class="table-demo-wrap">
    <som-accordion-panel header="基础表格">
      <som-table :data="tableData">
        <som-table-column prop="date" label="日期"></som-table-column>
        <som-table-column prop="name" label="姓名"></som-table-column>
        <som-table-column prop="address" show-overflow-tooltip ellipsis label="地址"></som-table-column>
      </som-table>
    </som-accordion-panel>
    <som-accordion-panel header="带斑马纹表格">
      <som-table :data="tableData" stripe>
        <som-table-column prop="date" label="日期" width="180"></som-table-column>
        <som-table-column prop="name" label="姓名"></som-table-column>
        <som-table-column prop="address" show-overflow-tooltip ellipsis width="180" label="地址"></som-table-column>
      </som-table>
    </som-accordion-panel>
    <som-accordion-panel header="边框表格">
      <som-table :data="tableData" border>
        <som-table-column prop="date" label="日期" width="180"></som-table-column>
        <som-table-column prop="name" label="姓名"></som-table-column>
        <som-table-column prop="address" show-overflow-tooltip ellipsis width="180" label="地址"></som-table-column>
      </som-table>
    </som-accordion-panel>
    <som-accordion-panel header="表头固定">
      <som-table :data="tableData" height="150">
        <som-table-column prop="date" label="日期" width="180"></som-table-column>
        <som-table-column prop="name" label="姓名"></som-table-column>
        <som-table-column prop="address" show-overflow-tooltip ellipsis width="180" label="地址"></som-table-column>
      </som-table>
    </som-accordion-panel>
    <som-accordion-panel header="列固定">
      <som-table :data="tableData">
        <som-table-column prop="date" label="日期" width="180"></som-table-column>
        <som-table-column prop="name" label="姓名"></som-table-column>
        <som-table-column prop="address" show-overflow-tooltip ellipsis width="180" label="地址"></som-table-column>
        <som-table-column fixed="right" label="操作" width="120">
          <template slot-scope="scope">
            <span class="edit-span">查看</span>
            <span class="edit-span">编辑</span>
          </template>
        </som-table-column>
      </som-table>
    </som-accordion-panel>
    <som-accordion-panel header="交互式的列固定">
      <som-table :data="tableData" fixable>
        <som-table-column prop="date" label="日期" width="140" sortable></som-table-column>
        <som-table-column prop="name" label="姓名" width="100"></som-table-column>
        <som-table-column prop="address" show-overflow-tooltip ellipsis width="120" label="地址"></som-table-column>
        <som-table-column label="操作" width="120" fixed="right">
          <template slot-scope="scope">
            <span class="edit-span">查看</span>
            <span class="edit-span">编辑</span>
          </template>
        </som-table-column>
      </som-table>
    </som-accordion-panel>
    <som-accordion-panel header="表头吸顶">
      <div style="height: 300px;overflow:auto;">
        <div style="height: 150px;"></div>
        <som-table :data="tableData" sticky>
          <som-table-column prop="date" label="日期" width="180"></som-table-column>
          <som-table-column prop="name" label="姓名"></som-table-column>
          <som-table-column prop="address" show-overflow-tooltip ellipsis width="180" label="地址"></som-table-column>
        </som-table>
        <div style="height: 150px;"></div>
      </div>
    </som-accordion-panel>
    <som-accordion-panel header="多级表头">
      <som-table :data="tableData" border>
        <som-table-column prop="date" label="日期" width="180"></som-table-column>
        <som-table-column label="信息">
          <som-table-column prop="name" label="姓名"></som-table-column>
          <som-table-column prop="address" show-overflow-tooltip ellipsis width="180" label="地址"></som-table-column>
        </som-table-column>
      </som-table>
    </som-accordion-panel>
    <som-accordion-panel header="多选">
      <som-table :data="tableData">
        <som-table-column type="selection" :indeterminate="true" width="55"></som-table-column>
        <som-table-column prop="date" label="日期" width="180"></som-table-column>
        <som-table-column prop="name" label="姓名"></som-table-column>
        <som-table-column prop="address" show-overflow-tooltip ellipsis width="180" label="地址"></som-table-column>
      </som-table>
    </som-accordion-panel>
    <som-accordion-panel header="展开行">
      <som-table :data="tableData">
        <som-table-column type="expand">
          <template slot-scope="props">
            <p class="expand-demo">{{props.row.address}}</p>
          </template>
        </som-table-column>
        <som-table-column prop="date" label="日期" width="180"></som-table-column>
        <som-table-column prop="name" label="姓名"></som-table-column>
        <som-table-column prop="address" show-overflow-tooltip ellipsis width="180" label="地址"></som-table-column>
      </som-table>
    </som-accordion-panel>
    <som-accordion-panel header="排序">
      <som-table :data="tableData">
        <som-table-column prop="date" label="日期" sortable></som-table-column>
        <som-table-column prop="name" sortable label="姓名"></som-table-column>
        <som-table-column prop="address" show-overflow-tooltip ellipsis sortable label="地址"></som-table-column>
      </som-table>
    </som-accordion-panel>
    <som-accordion-panel header="总计行置顶">
      <som-table :data="tableData" show-summary="top">
        <som-table-column prop="date" label="日期" width="120"></som-table-column>
        <som-table-column prop="fee" label="金额"></som-table-column>
        <som-table-column prop="name" sortable label="姓名" width="120"></som-table-column>
        <som-table-column
          prop="address"
          show-overflow-tooltip
          ellipsis
          sortable
          label="地址"
          width="180"
        ></som-table-column>
      </som-table>
    </som-accordion-panel>
  </som-accordion>
</template>

<script>
export default {
  data() {
    return {
      tableData: [
        {
          date: "2016-05-02",
          name: "王小虎",
          address: "上海市普陀区金沙江路 1518 弄上海市普陀区金沙江路 1518 弄",
          fee: 12
        },
        {
          date: "2016-05-04",
          name: "王小虎",
          address: "上海市普陀区金沙江路 1517 弄",
          fee: 22
        },
        {
          date: "2016-05-01",
          name: "王小虎",
          address: "上海市普陀区金沙江路 1519 弄",
          fee: 12
        },
        {
          date: "2016-05-03",
          name: "王小虎",
          address: "上海市普陀区金沙江路 1516 弄",
          fee: 12
        }
      ]
    };
  },
  methods: {
    handleChange() {}
  }
};
</script>

<style lang="postcss">
.som-table .info-row {
  background: #c9e5f5;
}
.som-table .positive-row {
  background: #e2f0e4;
}
.table-demo-wrap {
  .som-accordion__panel {
    padding: 20px 0;
    background-color: #eee;
  }
  .edit-span {
    color: #0080ff;
    margin-right: 10px;
    cursor: pointer;
  }
}
.expand-demo {
  padding-left: 48px;
}
</style>
