<template>
  <div class="page-product">
    <el-row class="m-crumbs">
      <crumbs /><!-- 面包屑 -->
    </el-row>

    <el-row>
      <el-col :span="19">
        <el-row>
            <categroy /><!-- 分类 -->
        </el-row>
        <el-row>
            <!-- 列表展示 -->
            <list/>
        </el-row>
      </el-col>
      <el-col :span="5">
          <r-content/>
      </el-col>
    </el-row>
  </div>
</template>

<script>
import crumbs from '@/components/products/crumbs.vue'
import Categroy from '@/components/products/categroy.vue'
import List from '@/components/products/list.vue'
import RContent from '@/components/products/rightContent.vue'

export default {
  components: {
    crumbs,
    Categroy,
    List,
    RContent
  }
}
</script>

<style lang="scss">
@import "@/assets/css/products/index.scss";
</style>
