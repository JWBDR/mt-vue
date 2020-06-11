<template>
  <div class="m-products-list">
    <ul>
      <!-- 导航:智能排序 -->
      <li
        v-for="item in nav"
        :key="item.key"
        :class="{
            's-nav-active' : item.active
        }"
      >{{item.name}}</li>
    </ul>
    <el-row>
      <!-- 来自item组件:展示好吃的们😀 -->
      <item v-for="(item,index) in produceList"
      :key="index"
      :meta="item"
      />
    </el-row>
  </div>
</template>

<script>
import api from '../../api/index.js'
import Item from './item'
export default {
  components: {
    Item
  },
  created () {
    api.getProductsList().then(res => {
      // console.log(res.data.data)
      this.produceList = res.data.data
    })
  },
  data () {
    return {
      nav: [
        {
          // key为了评分、人气等
          key: 's-default',
          name: '智能排序',
          active: true
        },
        {
          key: 's-price',
          name: '价格最低',
          active: false
        },
        {
          key: 's-sale',
          name: '人气最高',
          active: false
        },
        {
          key: 's-comment',
          name: '评价最高',
          active: false
        }
      ],
      produceList: []
    }
  }

}
</script>

<style>
</style>
