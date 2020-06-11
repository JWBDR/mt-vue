<template>
  <div>
    <div class="page-register">
      <div class="header">
        <header>
          <router-link :to="{name:'index'}">
            <a href="#" class="site-logo"></a>
          </router-link>
          <div class="login">
            <span>已有帐号&nbsp;&nbsp;</span>
            <router-link :to="{name:'login'}">登录</router-link>
          </div>
        </header>
      </div>
      <!-- header -->
      <div class="content">
        <el-form
          :model="registerForm"
          status-icon
          :rules="rules"
          ref="registerForm"
          label-width="100px"
          class="demo-ruleForm"
        >
          <el-form-item label="用户名" prop="userName">
            <el-input type="text" placeholder="由4-16位的字母、数字、下划线组成" v-model="registerForm.userName" autocomplete="off"></el-input>
          </el-form-item>
          <el-form-item label="密码" prop="password">
            <el-input
              type="password"
              v-model="registerForm.password"
              autocomplete="off"
              @input="input"
              placeholder="由6-16位的字母、数字、下划线组成"
            ></el-input>
          </el-form-item>
          <div class="pw-strength">
            <!-- 密码强度-强中弱 -->
            <div :class="['bar',strengthClass]"></div>
            <div class="letter">
              <span class="week">弱</span>
              <span class="normal">中</span>
              <span class="strong">强</span>
            </div>
          </div>
          <el-form-item label="确认密码" prop="rePassword">
            <el-input type="password" v-model="registerForm.rePassword" autocomplete="off"></el-input>
          </el-form-item>
          <el-form-item>
            <el-button type="primary" @click="submitForm('registerForm')">提交</el-button>
          </el-form-item>
        </el-form>
      </div>
      <!-- form -->
      <footer>
        <p>
          <a href="#"> ©meituan.com  京ICP证070791号  京公网安备11010502025545号</a>
        </p>
      </footer>
      <!-- footer -->
    </div>
  </div>
</template>

<script>
import api from "@/api/index.js";
export default {
  data() {
    // 用户名校验
    var validateUser = (rule, value, callback) => {
      if (value === "") {
        callback(new Error("请输入用户名"));
      } else if (value.length < 4 || value.length > 16) {
        callback(new Error("用户名必须为4-16位的字母数字下划线组成"));
      } else {
        callback();
      }
    };
    // 密码校验
    var validatePass = (rule, value, callback) => {
      if (value === "") {
        callback(new Error("请输入密码"));
      } else if (value.length < 6 || value.length > 16) {
        callback(new Error("密码必须为6-16位的字母数字下划线组成"));
      } else {
        callback();
      }
    };
    // 确认密码校验
    var validatePass2 = (rule, value, callback) => {
      if (value === "") {
        callback(new Error("请再次输入密码"));
      } else if (value !== this.registerForm.password) {
        callback(new Error("两次输入密码不一致!"));
      } else {
        callback();
      }
    };
    return {
      registerForm: {
        userName: "",
        password: "",
        rePassword: "",
        rules: {}
      },
      strengthClass: "", // 强中弱
      rules: {
        // 校验规则
        userName: [{ validator: validateUser, trigger: "blur" }],
        password: [{ validator: validatePass, trigger: "blur" }],
        rePassword: [{ validator: validatePass2, trigger: "blur" }]
      }
    };
  },
  methods: {
    submitForm(formName) {
      // 提交时再次校验表单
      // console.log(this.registerForm.password,this.registerForm.rePassword)
      this.$refs[formName].validate(valid => {
        if (valid) {
          // 所有数据认证成功,后台验证
          api
            .register({
              params: {
                userName: this.registerForm.userName,
                password: this.registerForm.password,
                rePassword: this.registerForm.rePassword
              }
            })
            .then(res => {
              if (res.data.status == "success") {
                alert("注册成功~");
                this.$router.push({ name: "login" });
              } else {
                alert(res.data.msg);
              }
            });
        } else {
          console.log("error submit!!");
          return false;
        }
      });
    },
    input() {
      // password验证；校验数字 字母 下划线
      var regStr = /(\w)+/g;
      var regNum = /(\d)+/g;
      var reg = /_/g;
      var strongth =
        this.registerForm.password.match(reg) &&
        this.registerForm.password.match(regStr) &&
        this.registerForm.password.match(regNum);
      // 根据密码组成模式(数字 || 字母 || 下划线)，给上相应的样式
      if (
        this.registerForm.password.length > 20 ||
        (this.registerForm.password.length > 6 && strongth)
      ) {
        this.strengthClass = "strong";
      } else if (this.registerForm.password.length < 6) {
        this.strengthClass = "week";
      } else if (!this.registerForm.password) {
        this.strengthClass = "";
      } else {
        this.strengthClass = "normal";
      }
    }
  }
};
</script>

<style lang="scss">
@import "@/assets/css/register/index.scss";
</style>
