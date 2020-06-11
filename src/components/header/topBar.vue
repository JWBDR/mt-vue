  <!-- 导航 -->
<template>
  <el-row class="m-header-topbar m-header">
    <el-col :span="10">
      <!-- 切换城市 -->
      <geo />
    </el-col>
    <el-col :span="14">
      <!-- navbar右侧我的订单等 -->
      <m-nav />
    </el-col>
  </el-row>
</template>

<script>
import geo from './geo.vue'
import MNav from './nav.vue'
export default {
  components: {
    geo,
    MNav
  }
}
</script>

<style lang='scss'>
@import "@/assets/css/public/header/topbar.scss";
</style>
