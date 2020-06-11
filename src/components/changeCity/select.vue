<template>
  <!-- select -->
  <div
    :class="[ 'choose-wrap' , disabled ? 'disabled' : '']"
    @click="showWrapper"
    v-document-click="documentClick"
  >
    <div class="choose">
      <span>{{value}}</span>
      <i class="el-icon-caret-bottom"></i>
      <div :class="{
        'mt-content' : true,
        'active' : showWrapperActive
        }">
        <h2>{{title}}</h2>
        <div :class="['wrapper',className]">
          <!-- 省份区域 -->
          <div class="col" v-for="(listData,index) in renderList" :key="index">
            <span
              @click="changeValue(item)"
              :class="{
                      'mt-item':true,
                      'active' : item.name == value
                   }"
              v-for="(item,index) in listData"
              :key="index"
            >
              {{item.name}}
              <!-- 省份信息 -->
            </span>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data () {
    return {}
  },
  props: [
    // 来自 ./province
    'list',
    'title',
    'value',
    'showWrapperActive',
    'disabled',
    'className'
  ],
  computed: {
    renderList () {
      // 通过让select中每一列展示12条数据
      const col = Math.ceil(this.list.length / 12)
      const resultList = []
      for (let i = 0; i < col; i++) {
        // 0,12(1-12) 12,24(13-24) 24,36(25-36)...
        const data = this.list.slice(i * 12, i * 12 + 12) // 每次循环截取12条
        resultList.push(data)
      }
      return resultList
    }
  },
  methods: {
    showWrapper (e) {
      // select点击事件
      e.stopPropagation() // 阻止冒泡
      if (!this.disabled) { // false才能点击
        this.$emit('change_active', true)
      }
    },
    documentClick () {
      // 点击mask区域隐藏select
      this.$emit('change_active', false)// 在./province的select组件使用
    },
    // 切换城市
    changeValue (item) {
      this.$emit('change', item)
    }
  }
}
</script>

<style lang="scss">
@import "@/assets/css/changeCity/select.scss";
</style>
