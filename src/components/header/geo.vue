<template>
  <div class='m-geo'>
      <div class="position ">
          <i class="el-icon-location"/>
            {{$store.state.position.name}}<!-- 城市名 -->
          <router-link class="changeCity" :to='{name:"changeCity"}'>
              切换城市
          </router-link>
          <!-- [门头沟区大厂回族自治县廊坊] -->
          [
          <a href="#" v-for="(item,index) in nearCity" :key="index">
              &nbsp;{{item.name}}&nbsp;
          </a>
          ]

      </div>
      <div class="m-user"
      v-if="!$store.state.userName"
      >
          <router-link class="login" :to="{name : 'login'}">
              立即登录
          </router-link>
          <router-link class="register" :to="{name : 'register'}">
              注册
          </router-link>

      </div>
      <div v-else class="m-user" >
          <p>&nbsp;&nbsp;&nbsp;欢迎回来~&nbsp;{{$store.state.userName ? $store.state.userName : '你好'}}</p>
      </div>
      <div class="position"  v-if="$store.state.userName">
          <router-link class="changeCity" :to='{name:"login"}'>
              切换账号
          </router-link>
      </div>

  </div>
</template>

<script>
import api from '@/api/index.js'
export default {
  data () {
    return {
      nearCity: []
    }
  },
  watch: {
    '$store.state.position': function () {
      // 监听位置变化
      this.nearCity = this.$store.state.position.nearCity
    }
  },
  created () {
    api.getCurPosition().then(res => {
      this.$store.dispatch('setPosition', res.data.data)
      this.nearCity = res.data.data.nearCity
    })
  },
  methods: {
  }
}
</script>

<style>

</style>
