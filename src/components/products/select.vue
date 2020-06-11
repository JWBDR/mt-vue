<template>
  <div class="m-product-select">
    <dl class="tab">
      <dt>
        {{name}}
        <i class="el-icon-caret-bottom"></i>
      </dt>
      <dd>
        <!-- 下拉列表 -->
        <div class="mask">
          <dt class="select-title">{{name}}</dt>
          <span v-for="(item,index) in list" :key="index">{{item.name}}</span>
        </div>
        <!-- 下拉列表 -->
      </dd>
    </dl>
  </div>
</template>

<script>
export default {
  props: ["name", "list"]
};
</script>

<style>
.m-product-select dt,
dd,span {
  cursor: pointer;
}
span:hover{
  color: #41B883;
}
.tab dt:hover{
  color: #fbc700;
}
</style>
