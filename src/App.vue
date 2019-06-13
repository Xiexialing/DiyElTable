<template>
  <div class="app">
    <router-link to="/list">Table二次封装</router-link>
    <router-link to="/tabs">Tabs优化</router-link>
    <div class="line"></div>
    <router-view/>
  </div>
</template>

<script>
  export default {
    name: "App"
  }
</script>

<style scoped>
  .app {
    text-align: center;
  }
  .line{
    margin-top: 60px;
  }
</style>
