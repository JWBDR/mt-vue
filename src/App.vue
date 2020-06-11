<template>
  <div id="app">
    <router-view/>
  </div>
</template>

<script>
export default {
  name: 'App'
}
</script>
<style>
    /* 调整2.x升3.x后的样式问题 */
  .el-main{
    overflow: unset;
    padding:0;
  }
</style>
