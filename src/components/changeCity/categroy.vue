<template>
  <div class="category">
    <dl class="m-categroy">
      <dt>按拼音首字母选择：</dt>
      <dd v-for="(item,index) in list" :key="index">
        <a :href="'#city-' + item">{{item}}</a>
      </dd>
    </dl>

    <dl
      class="m-categroy-section"
      :id="'city-' + index"
      v-for="(item,index) in cityGroup"
      :key="index"
    >
      <dt>{{index}}</dt>
      <dd>
          <span
            v-for="city in item"
            :key="city.id"
            @click="changeCity(city)"
          >
          {{city.name}}
          </span>
      </dd>
    </dl>
  </div>
</template>

<script>
import api from '@/api/index.js'
export default {
  data () {
    return {
      list: 'ABCDEFGHIJKLMNOBQRSTUVWXYZ'.split(''),
      cityList: [],
      cityGroup: null
    }
  },
  created () {
    api.getCityList().then(res => {
      var obj = {}
      res.data.data.forEach((item, index) => {
        // 数据分组
        if (!obj[item.firstChar.toUpperCase()]) {
          obj[item.firstChar.toUpperCase()] = []
        }
        obj[item.firstChar.toUpperCase()].push(item)
      })
      this.cityGroup = obj
      // console.log(obj.J)//数据以某个属性值，来分成组
    })
  },
  methods: {
    changeCity (item) {
      console.log(item)
      this.$store.dispatch('setPosition', item)// 分发action提交mutations，变更位置信息
      this.$router.push({ name: 'index' })// 跳转
    }
  }
}
</script>

<style lang="scss">
@import "@/assets/css/changecity/categroy.scss";
</style>
