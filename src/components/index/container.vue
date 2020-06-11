<template>
  <div class="m-istyle">
    <!-- 中部"有格调"和"很优惠"区域,dl数据在父组件page/index.vue中，dd数据本组件请求 -->
    <dl @mouseover="over" :class="nav.class">
      <dt>{{nav.title}}</dt>
      <dd
        v-for="(item,index) in nav.list"
        :key="index"
        :class="{active :  kind == item.tab}"
        :data-type="item.tab"
      >{{item.text}}</dd>
    </dl>

    <ul class="ibody">
      <li v-for="(item,index) in resultsData[kind]" :key="index">
        <el-card :body-style="{ padding: '0px' }" shadow="never">
          <img :src="item.image" class="image" />
          <div class="cbody">
            <div class="title" :title="item.title">{{item.title}}</div>
            <div class="sub-title" :title="item.sub_title">{{item.subTitle}}</div>
            <div class="price-info">
              <span class="current-price-wrapper">
                <span class="price-symbol numfont">￥</span>
                <span class="current-price numfont">{{item.price}}</span>
              </span>
              <!-- <span class="old-price">门市价{{item.price}}</span> -->
              <span class="sold bottom-right-info">{{item.address}}</span>
            </div>
            <!-- 抢光了 -->
            <!-- <div class="price-info" v-else-if="!item.rentNum">
              <span class="current-price-wrapper">
                <span class="price-symbol numfont">￥</span>
                <span class="current-price numfont">抢光啦</span>
              </span>
            </div>
            <div class="price-info" v-else>
              <span class="current-price-wrapper">
                <span class="price-symbol numfont">￥</span>
                <span class="current-price numfont">{{item.price_info.avg_price}}</span>
                <span class="units">/{{item.price_info.units}}均</span>
              </span>
            </div> -->
          </div>
        </el-card>
      </li>

      <!-- <li></li>
      <li></li>
      <li></li> -->
    </ul>
    <!-- 中部"有格调"区域 -->
  </div>
</template>

<script>
import api from '../../api/index.js'
export default {
  data () {
    return {
      kind: 'all',
      resultsData: {}
    }
  },
  props: ['nav'], // 来自page/index.vue
  created () {
    api.getResultProducts().then(res => {
      this.resultsData = res.data.data
      // console.log(this.resultsData)
    })
  },
  methods: {
    over (e) {
      // console.log(e.target.getAttribute('data-type'))
      const dom = e.target
      const tagName = dom.tagName.toLowerCase()
      // console.log(tagName)
      if (tagName != 'dd') {
        return false
      }
      this.kind = dom.getAttribute('data-type')
      // 动态获取数据 ajax请求
    }
  }
}
</script>

<style lang='scss'>
@import "@/assets/css/index/artistic.scss";
</style>
