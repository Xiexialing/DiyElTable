<template>
  <el-table
    class="diy-table"
    tooltip-effect="dark"
    :highlight-current-row="singleTable"
    :data="dataSource"
    @selection-change="handleSelectionChange"
    @current-change="handleCurrentChange"
    style="width: 100%">
    <el-table-column
      v-if="multipleTable"
      type="selection"
      width="55">
    </el-table-column>
    <template v-for="column in columns">
      <!--自定义的内容-->
      <el-table-column
        v-if="column.render"
        :label="column.label"
        :width="column.width"
      >
        <template slot-scope="scope">
          <CustomeComp :render="column.render" :rowData="scope.row"/>
        </template>
      </el-table-column>
      <!--操作-->
      <el-table-column
        v-else-if="column.actions"
        :label="column.label"
        :width="column.width"
      >
        <template slot-scope="scope">
          <template v-for="action,i in actionsFilter(column.actions,scope.row)"
                    v-if="actionsFilter(column.actions,scope.row).length<=column.maxActions">
            <el-button
              type="text"
              :disabled="disabledFilter(action, scope.row)"
              @click.prevent="action.action(scope.row)">
              {{action.name}}
            </el-button>
          </template>
          <template v-for="action,i in actionsFilter(column.actions,scope.row)"
                    v-if="actionsFilter(column.actions,scope.row).length>column.maxActions&&i<column.maxActions-1">
            <el-button
              type="text"
              :disabled="disabledFilter(action, scope.row)"
              @click.prevent="action.action(scope.row)">
              {{action.name}}
            </el-button>
          </template>
          <template v-if="actionsFilter(column.actions,scope.row).length>column.maxActions">
            <el-dropdown trigger="click">
              <el-button type="text">
                更多<i class="el-icon-arrow-down el-icon--right"></i>
              </el-button>
              <el-dropdown-menu slot="dropdown">
                <template v-for="action,i in actionsFilter(column.actions,scope.row)">
                  <el-dropdown-item v-if="i>=column.maxActions-1">
                    <el-button
                      type="text"
                      :disabled="disabledFilter(action, scope.row)"
                      @click.prevent="action.action(scope.row)">
                      {{action.name}}
                    </el-button>
                  </el-dropdown-item>
                </template>
              </el-dropdown-menu>
            </el-dropdown>
          </template>
        </template>
      </el-table-column>
      <!--常规的渲染-->
      <el-table-column
        v-else
        :label="column.label"
        :prop="column.prop"
        :width="column.width"
      >
      </el-table-column>
    </template>
  </el-table>
</template>

<script>
  import CustomeComp from './subConponents/CustomeComp';

  export default {
    name: "DiyTable",
    props: {
      dataSource: {             // 表格数据源
        type: Array,
        default: () => []
      },
      columns: {                // 表格的字段展示
        type: Array,
        default: () => []
      },
      multipleTable: {
        type: Boolean,
        default: false
      },
      singleTable: {
        type: Boolean,
        default: false
      }
    },
    methods: {
      actionsFilter(actions, row) {
        return actions.filter((action) => {
          if (action.hide instanceof Function) {
            return !action.hide(row)
          } else {
            return !action.hide
          }
        })
      },
      disabledFilter(action, row) {
        if (action.disabled instanceof Function) {
          return action.disabled(row)
        } else {
          return action.disabled
        }
      },
      handleSelectionChange(selection) {
        this.$emit('selectionChangeEvent', selection)
      },
      handleCurrentChange(selection) {
        this.$emit('currentChangeEvent', selection)
      }
    },
    components: {
      CustomeComp
    }
  }
</script>

<style>
  .diy-table{
    border: 1px solid rgb(235, 238, 245);
    border-bottom: none;
  }
  .el-table td, .el-table th{
    padding: 0 !important;
    line-height: 40px !important;
  }
  .el-table th{
    font-family: Helvetica Neue,Helvetica,PingFang SC,Hiragino Sans GB,Microsoft YaHei,\\5FAE\8F6F\96C5\9ED1,Arial,sans-serif;
    color: #515a6e;
    font-size: 12px;
    background-color: #f8f8f9;
  }

</style>
