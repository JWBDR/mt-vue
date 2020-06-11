<template>
  <div class="search-panel">
    <el-row class="m-header-searchbar">
      <el-col :span="3" class="left">
        <!-- 美团logo -->
        <router-link :to="{name:'index'}">
          <img src="http://s0.meituan.net/bs/fe-web-meituan/fa5f0f0/img/logo.png" alt="美团" />
        </router-link>
      </el-col>
      <el-col :span="15" class="center">
        <div class="wrapper">
          <!-- 右侧区域，输入框 -->
          <form>
            <el-input
              v-model="searchWord"
              placeholder="请输入内容,点击展示的是“火锅”的内容哦"
              @focus="focus"
              @blur="blur(2000)"
              @input="input"
              v-on:keyup.enter="submit"
            ></el-input>

            <el-button type="primary" icon="el-icon-search">搜索</el-button>
          </form>
          <dl class="hotPlace" v-if="isHotPlace">
            <!-- focus时的默认列表 -->
            <dt>热门搜索</dt>
            <dd v-for="(item,index) in hotPlaceList.slice(0,5)" :key="index">
              <router-link :to="{name : 'goods',params :{ name:item }}"></router-link>
              <router-link :to="{name : 'goods',params :{ name:item }}">{{item}}</router-link>
            </dd>
          </dl>
          <dl class="searchList" v-if="isSearchList">
            <!-- 搜素时的列表 -->
            <dd v-for="(item,index) in searchList" :key="index">
              <router-link :to="{name : 'goods',params :{ name:item }}">{{item}}</router-link>
            </dd>
          </dl>
        </div>
        <p class="suggest">
          <router-link
            v-for="(item,index) in suggestList"
            :to="{name : 'goods',params :{ name:item }}"
            :key="index"
          >{{item}}</router-link>
        </p>
      </el-col>
    </el-row>
  </div>
</template>

<script>
import api from '@/api/index.js'
export default {
  data () {
    return {
      searchWord: '',
      isFocus: false,
      hotPlaceList: [], // 热词
      searchList: ['火锅', '火锅自助餐', '火锅 重庆'],
      suggestList: []
    }
  },
  created () {
    api.getSearchHotWord().then(res => {
      this.hotPlaceList = res.data.data
      this.suggestList = res.data.data
    })
  },
  computed: {
    isHotPlace () {
      return this.isFocus && !this.searchWord
    },
    isSearchList () {
      return this.isFocus && this.searchWord
    }
  },
  methods: {
    focus () {
      this.isFocus = true
    },
    blur (delay) {//失焦
      const self = this
      setTimeout(() => {
        self.isFocus = false // 200后失焦
      }, delay)
    },
    input () {
      // 过滤热词列表展示
      const value = this.searchWord
      api.getSearchList().then(res => {
        this.searchList = res.data.data.list.filter(item => {
          return item.indexOf(value) > -1 // > -1 存在关键字
        })
      })
    }
  }
}
</script>
