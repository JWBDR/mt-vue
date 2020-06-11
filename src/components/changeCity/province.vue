<template>
  <div>
    <span class="name">按省份选择：</span>
    <!-- select -->
    <m-select
      :list="provinceList"
      title="省份"
      :value="province"
      :showWrapperActive="provinceActive"
      @change_active="changeProvinceActive"
      @change="changeProvince"
      className="province"
    />
    <m-select
      :list="cityList"
      title="城市"
      :value="city"
      :disabled="cityDisabled"
      :showWrapperActive="cityActive"
      @change_active="changeCityActive"
      @change="changeCity"
      className="city"
    />
    <!--  search -->
    <span>直接搜索：</span>
    <el-select
      v-model="searchWord"
      filterable
      remote
      reserve-keyword
      placeholder="请输入关键词"
      :remote-method="remoteMethod"
      :loading="loading"
    >
      <el-option v-for="item in searchList"
      :key="item"
      :label="item"
      :value="item"></el-option>
    </el-select>
  </div>
</template>

<script>
import api from '@/api/index.js'
import MSelect from './select.vue'
export default {
  created () {
    api.getProvinceList().then(res => {
      this.provinceList = res.data.data.map(item => {
        item.name = item.provinceName
        return item// 过滤一下数据，取出name
      })
    })
  },
  data () {
    return {
      cityDisabled: true,
      provinceList: [], // 对应list
      province: '省份', // 对应value
      cityList: [],
      city: '城市', // 对应value
      // 把子组件自定义指定(对应事件)条件绑父身上
      cityActive: false,
      provinceActive: false,
      searchList: [], // 搜索列表
      searchWord: '',
      loading: false // loading效果flag，ajax请求时再true，请求到再false；
    }
  },
  components: {
    MSelect
  },
  methods: {
    changeProvinceActive (flag) { // 切换展示province的flag
      this.provinceActive = flag
      if (flag) {
        this.cityActive = false
      }
    },
    changeCityActive (flag) { // 切换展示city的flag
      this.cityActive = flag
      if (flag) {
        this.provinceActive = false
      }
    },
    // 点选切换省份/城市
    changeProvince (item) { // 变更省份
      this.province = item.name
      this.cityDisabled = false// 重置flag，省份展示之后，才能点开城市
      this.cityList = item.cityInfoList
    },
    changeCity (item) { // 变更城市
      this.city = item.name
      this.$store.dispatch('setPosition', item)// 分发actions(提交mutations，变更状态)，切换login旁的地理位置信息
      // geo.vue组件中修改城市位置
      this.$router.push({ name: 'index' })// 切换城市后路由跳转/index
    },
    remoteMethod (val) { // 远程搜索,val发给后台
      // console.log(val);
      // 请求
      api.getProvinceList().then(res => {
        // console.log(this.provinceList)
        res.data.data.filter(item => {
          // return item.provinceName.indexOf(value) > -1; //> -1 存在关键字
          return item.provinceName.indexOf(val) > -1 ? this.searchList.push(item.provinceName) : ''
        })
      })
    }
  }
}
</script>

<style lang="scss">
@import "@/assets/css/changeCity/iselect.scss";
</style>
