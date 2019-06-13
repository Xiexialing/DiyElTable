<template>
  <el-tabs type="border-card" v-model="activeTabName" @tab-click="onTabClick">
    <template v-for="tab in tabs">
      <el-tab-pane :name="tab.name">
        <span slot="label"><i v-if="tab.iconClass" :class="tab.iconClass"></i> {{tab.label}}</span>
        <component :is="activeTabName===tab.name || caches.indexOf(tab.name)!==-1 ? tab.componentName:''"/>
      </el-tab-pane>
    </template>
  </el-tabs>
</template>

<script>
  import Schedule from './schedule'
  import Role from './role'
  import User from './user'
  import Config from './config'

  export default {
    name: "DiyTabs",
    data() {
      return {
        tabs: [
          {
            name: 'scheduleManage',
            label: '我的行程',
            componentName: 'Schedule',
            iconClass: 'el-icon-date',
          },
          {
            name: 'userManage',
            componentName: 'User',
            label: '用户管理'
          },
          {
            name: 'configManage',
            label: '配置管理',
            componentName: 'Config',
          },
          {
            name: 'roleManage',
            label: '角色管理',
            componentName: 'Role',
          }
        ],
        activeTabName: 'scheduleManage',
        caches: ['scheduleManage']   // 如果tabs切换需要做缓存
      }
    },
    methods: {
      onTabClick(tab) {
        if (this.caches.indexOf(tab.name) === -1) {
          this.caches.push(tab.name)
        }
      }
    },
    components: {
      Schedule,
      Role,
      User,
      Config
    }
  }
</script>

<style scoped>

</style>
