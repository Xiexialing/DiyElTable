<template>
  <div id="app">
    <DiyTable :dataSource="table.dataSource"
              :columns="table.columns"
              :multipleTable="table.multipleTable"
              :singleTable="table.singleTable"
              @currentChangeEvent="onCurrentChange"
              @selectionChangeEvent="onSelectionChange"/>
    <Edit v-model="isShowEdit" :data="editModalData"/>
    <router-view/>
  </div>
</template>

<script>
  import moment from 'moment';
  import DiyTable from './components/DiyTable';
  import Edit from './appSub/Edit';

  export default {
    name: 'App',
    data() {
      return {
        isShowEdit: false,
        editModalData: {},
        table: {
          singleTable: false,
          multipleTable: true,
          dataSource: [
            {
              createTime: '1560241518401',
              name: '型芯1',
              age: 21,
              status: 0,
              kibana: 'https://www.baidu.com/'
            },
            {
              createTime: '1560241518401',
              name: '型芯2',
              age: 22,
              status: 1,
              path: '/',
              kibana: 'https://www.qq.com/'
            },
            {
              createTime: '1560241518401',
              name: '型芯3',
              age: 23,
              status: 2,
              kibana: 'https://www.aliyun.com/'
            }
          ],
          columns: [
            {
              prop: 'createTime',   //  对应属性名
              label: '日期',        //  表头标签
              render: (createElement, rowData) => {
                let createTime = new Date(parseInt(rowData.createTime));
                createTime = moment(createTime).format('YYYY-MM-DD HH:mm:ss');
                return createElement('div', createTime)
              }
            },
            {
              prop: 'name',
              label: '姓名',
              render: (createElement, rowData) => {
                return createElement('a', {
                  on: {
                    click: () => {
                      this.$router.push('/hello?name=' + rowData.name)
                    }
                  }
                }, rowData.name)
              }
            },
            {
              prop: 'age',
              label: '年龄',
            },
            {
              label: '状态',
              render: (createElement, rowData) => {
                return createElement('Dot', {
                  attrs: {
                    color: this.getStatusColor(rowData.status)
                  }
                }, this.getStatusName(rowData.status))
              }
            },
            {
              label: 'Kibana地址',
              width: 360,
              render: (createElement, rowData) => {
                return createElement('div',
                  {
                    attrs: {
                      class: 'active'
                    }
                  },
                  [
                    createElement('a', {
                        attrs: {
                          target: '_blank',
                          href: rowData.kibana
                        }
                      },
                      [
                        createElement('img', {
                          attrs: {
                            style: "height:12px;margin-right:5px",
                            src: 'https://www.baidu.com/img/baidu_jgylogo3.gif'
                          }
                        }),
                        createElement('span', rowData.kibana)
                      ])
                  ])
              }
            },
            {
              label: '操作',
              maxActions: 3,
              width: 180,
              actions: [
                {
                  name: '编辑',
                  disabled: (row) => {
                    return row.status === 0
                  },
                  hide: (row) => {
                    return row.status === 1
                  },
                  action: (row) => {
                    this.isShowEdit = true
                    this.editModalData = row
                  }
                },
                {
                  name: '删除',
                  disabled: (row) => {
                    return row.status === 1
                  },
                  hide: (row) => {
                    return row.status === 0
                  },
                  action: (row) => {
                    this.beforeDel(row)
                  }
                },
                {
                  name: '同步',
                  hide: (row) => {
                    return row.status === 2
                  },
                  action: (row) => {
                    this.sync(row)
                  }
                },
                {
                  name: '下载',
                  disabled: (row) => {
                    return row.status === 3
                  },
                  action: (row) => {
                    this.download(row)
                  }
                },
                {
                  name: '添加',
                  hide: (row) => {
                    return row.status === 1
                  },
                  disabled: (row) => {
                    return row.status === 2
                  },
                  action: (row) => {
                    this.add(row)
                  }
                }
              ]
            }
          ]
        }
      }
    },
    methods: {
      getStatusColor(status) {
        if (status == 0) {
          return '#ed3f14'
        } else if (status == 1) {
          return '#19be6d'
        } else {
          return '#d1d3d3'
        }
      },
      getStatusName(status) {
        if (status == 0) {
          return '异常'
        } else if (status == 1) {
          return '正常'
        } else {
          return '关机'
        }
      },
      beforeDel(row) {
        this.$confirm(`确认删除${row.name}`, '提示', {
          distinguishCancelAndClose: false,
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          beforeClose: (action, instance, done) => {
            if (action === 'confirm') {
              this.del(row, () => {
                done()
              })
            } else {
              done()
            }
          }
        })
      },
      del(row, cb) {
        this.$message.success(`删除${row.name}成功`)
        if (cb) {
          cb()
        }
      },
      sync(row) {
        this.$message.success(`同步${row.name}成功`);
      },
      download(row) {
        this.$message.success(`下载${row.name}成功`)
      },
      add(row) {
        this.$message.success(`添加${row.name}成功`)
      },
      onSelectionChange(selection) {
        console.log(selection)
      },
      onCurrentChange(selection) {
        console.log(selection)
      }
    },
    components: {
      DiyTable,
      Edit
    }
  }
</script>

<style>
  #app {
    font-family: 'Avenir', Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    text-align: center;
    margin-top: 60px;
  }

  a {
    cursor: pointer;
    text-decoration: none;
    color: #409EFF;
  }
</style>
