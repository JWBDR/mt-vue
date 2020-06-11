<template>
  <div class="page-login">
    <div class="login-header">
      <!-- <a class="logo" href="http://www.meituan.com"></a> -->
      <router-link :to="{name:'index'}">
          <img src="http://s0.meituan.net/bs/fe-web-meituan/fa5f0f0/img/logo.png" alt="美团" />
        </router-link>
    </div>
    <!-- 中部开始 -->
    <div class="login-panel">
      <div class="banner">
        <img
          src="http://s0.meituan.net/bs/file/?f=fe-sso-fs:build/page/static/banner/www.jpg"
          width="480"
          height="370"
          alt="美团网"
        />
        
      </div>
      <!-- form -->
      <div class="form">
        <h4 v-if="error" class="tips">{{error}}</h4>
        <!-- 输入为空时显示 -->
        <p>
          <span>账号登录</span>
        </p>
        <el-input
          :class="{error : error && !userName}"
          v-model="userName"
          prefix-icon="profile"
          placeholder="手机号用户名/邮箱"
        ></el-input>
        <el-input
          v-model="password"
          :class="{error : error && !password}"
          prefix-icon="password"
          type="password"
          placeholder="密码"
        ></el-input>
        <div class="foot">
          <a href="#">忘记密码?</a>
        </div>
        <el-button class="btn-login" type="primary" @click="submit">登录</el-button>
        <p class="reg">
          <span>还没有账号？</span>
          <router-link :to="{name : 'register'}">免费注册</router-link>
        </p>
        <!-- btn下方合作伙伴第三方 如QQ登录等样式 -->
        <div class="oauth-wrapper J-oauth-wrapper">
          <h3 class="title-wrapper">
            <span class="title">用合作网站账号登录</span>
          </h3>
          <div class="oauth cf">
            <span
              class="oauth__link oauth__link--qq third-login-btn"
              data-href="/account/connect/tencent"
              target="_blank"
              id="J-third-tencent"
            ></span>
            <span
              class="oauth__link oauth__link--weibo third-login-btn"
              data-href="/account/connect/sina"
              target="_blank"
              id="J-third-sina"
            ></span>
          </div>
          <i id="thirdLoginRiskpartner" data-riskpartner="0"></i>
        </div>
      </div>
      <!-- form -->
    </div>
    <!-- 中部结束 -->
    <footer>
      <ul>
        <li>
          <a href="#">关于美团</a>
        </li>
        <li>
          <a href="#">加入我们</a>
        </li>
        <li>
          <a href="#">商家入驻</a>
        </li>
        <li>
          <a href="#">帮助中心</a>
        </li>
        <li>
          <a href="#">美团手机版</a>
        </li>
      </ul>
      <p>©2020 美团网团购 meituan.com 京ICP证070791号 京公网安备11010502025545号</p>
    </footer>
  </div>
</template>

<script>
import api from '@/api/index.js'

export default {
  data () {
    return {
      userName: '',
      password: '',
      error: ''
    }
  },
  methods: {
    submit () {
      if (!this.userName) {
        this.error = '请输入账号'
        return false
      }
      if (!this.password) {
        this.error = '请输入密码'
        return false
      }
      api
        .login({
          params: {
            userName: this.userName,
            password: this.password
          }
        })
        .then(res => {
          if (res.data.status == 'success') {
            this.$router.push({ name: 'index' })
            this.$store.commit('setUserName', this.userName)
          } else {
            this.error = res.data.msg
          }
        })
    }
  }
}
</script>

<style lang="sass">
@import "@/assets/css/login/index.scss"
</style>
