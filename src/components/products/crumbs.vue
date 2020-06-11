<template>
  <!-- 面包屑 -->
  <el-breadcrumb separator-class="el-icon-arrow-right">
    <el-breadcrumb-item>
      <router-link :to="{name:'index'}">{{$store.state.position.name}}美团</router-link>
    </el-breadcrumb-item>
    <el-breadcrumb-item>{{$store.state.position.name}}{{$route.params.name}}</el-breadcrumb-item>
  </el-breadcrumb>
</template>
<script>
export default {}
</script>
<style scoped>
a {
  font-weight: 400;
  color: #606266;
  cursor: text;
}
</style>
