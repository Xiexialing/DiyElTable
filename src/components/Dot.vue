<template>
  <div class="dot">
    <span class="circle-wrapper">
      <span class="circle" :style="{backgroundColor: color?color:'rgb(25, 190, 107)'}"></span>
      <i class="inside-circle" :style="{backgroundColor: color?color:'rgb(25, 190, 107)'}"></i>
    </span>
    <slot/>
  </div>
</template>

<script>
  export default {
    props: ['color'],
    name: "Dot"
  }
</script>

<style scoped>
  .dot {
    display: flex;
    align-items: center;
  }

  .circle-wrapper{
    position: relative;
    display: inline-block;
    margin-right: 5px;
    height: 14px;
    line-height: 14px;
  }

  .circle {
    display: inline-block;
    width: 14px;
    height: 14px;
    opacity: 0.5;
    border-radius: 50%;
  }

  .inside-circle {
    display: inline-block;
    position: absolute;
    left: 3px;
    top: 3px;
    width: 8px;
    height: 8px;
    opacity: 1;
    border-radius: 50%;
  }
</style>
