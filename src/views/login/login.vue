<template>
  <div class="login-container">
    <img class="logo-img" src="../../assets/images/index_logo.png" alt>
    <el-row :gutter="24">
      <el-col
        :sm="{span:20,offset:2}"
        :md="{span:20,offset:2}"
        :lg="{span:20,offset:2}"
        style="margin-right:0px !important;padding-right:0 !important;">
        <div class="login-content">
          <img class="content-img" src="../../assets/images/authorizations.png" alt>
          <div class="content-form">
            <el-form
              ref="loginForm"
              :model="loginForm"
              :rules="loginRules"
              class="login-form"
              auto-complete="on"
              label-position="left"
            >
              <h3 class="title">产品授权服务平台</h3>
              <div class="register-num">
                您还没有授权账户?点击这里
                <span style="color:#3073F8;cursor:pointer;" @click="handleRegister()">注册</span>
              </div>
              <div style="margin-bottom:14px;">服务号</div>
              <el-form-item prop="username">
                <div style="width:100%;position:relative;">
                  <label v-show="sevice_num_Flag" for="username" style="position:absolute;line-height:46px;z-index:2;padding-left:10px; cursor:text;color:#cfc8cf;">输入服务号</label>
                  <el-input
                    id="sev_num"
                    v-model="loginForm.username"
                    name="username"
                    type="text"
                    auto-complete="off"
                    placeholder="输入服务号"
                    @focus="focusNum(1)"
                    @blur="blurNum(1)"
                  />
                </div>
              </el-form-item>
              <div style="margin-bottom:14px;">密码</div>
              <el-form-item prop="password">
                <div style="width:100%;position:relative;">
                  <label v-show="psd_Flag" for="password" style="position:absolute;line-height:46px;z-index:2;padding-left:10px; cursor:text;color:#cfc8cf;">输入密码</label>
                  <el-input
                    id="passwords"
                    v-model="loginForm.password"
                    type="password"
                    name="password"
                    auto-complete="off"
                    placeholder="输入密码"
                    @focus="focuspsd()"
                    @blur="blurNum(2)"
                  />
                </div>
              </el-form-item>
              <div style="margin-bottom:14px;">验证码</div>
              <div class="yzm-num">
                <el-form-item prop="captcha" style="width:58% !important;float:left;">
                  <div style="width:100%;position:relative;">
                    <label v-show="captcha_Flag" for="password" style="position:absolute;line-height:46px;z-index:2;padding-left:10px; cursor:text;color:#cfc8cf;">输入验证码</label>
                    <el-input
                      id="captcha_num"
                      v-model="loginForm.captcha"
                      type="text"
                      name="captcha"
                      auto-complete="on"
                      placeholder="输入验证码"
                      @keyup.enter.native="handleLogin()"
                      @focus="focusNum(3)"
                      @blur="blurNum(3)"
                    />
                  </div>
                </el-form-item>
                <div class="yzm-img" @click="sendCaptcha()">
                  <img :src="imgUrl" alt>
                </div>
                <!-- <div style="font-size:13px;color:#999;line-height:48px;cursor:pointer;white-space:nowrap;" @click="sendCaptcha()">换一张</div> -->
              </div>
              <div class="for-login">
                <div class="forget-psd" @click="forgetPsd()">忘记密码</div>
                <el-form-item style="float:right;">
                  <el-button
                    class="sutbtn"
                    size="medium "
                    :loading="loading"
                    type="primary"
                    style="width:100%;padding: 14px 64px;"
                    @click.native.prevent="handleLogin()"
                  >登录</el-button>
                </el-form-item>
              </div>
            </el-form>
          </div>
        </div>
      </el-col>
    </el-row>
  </div>
</template>

<script>
import { captcha } from '@/api/auth'
import $ from 'jquery'

export default {
  name: 'Login',
  components: {},
  data() {
    const validateEmail = (rule, value, callback) => {
      if (value === undefined) {
        value = ''
        if (value.length < 8) {
          callback(new Error('请输入服务号'))
        }
      } else {
        callback()
      }
    }
    const validatePass = (rule, value, callback) => {
      if (value.length < 4) {
        callback(new Error('请输入密码'))
      } else {
        callback()
      }
    }
    const validateCaptcha = (rule, value, callback) => {
      if (!value) {
        callback(new Error('请输入验证码'))
      } else {
        callback()
      }
    }
    return {
      sevice_num_Flag: false,
      psd_Flag: false,
      captcha_Flag: false,
      loginForm: {
        username: '',
        password: '',
        captcha: '',
        key: ''
      },
      loginRules: {
        username: [
          { required: true, trigger: 'blur', validator: validateEmail }
        ],
        password: [
          { required: true, trigger: 'blur', validator: validatePass }
        ],
        captcha: [
          { required: true, trigger: 'blur', validator: validateCaptcha }
        ]
      },
      loading: false,
      pwdType: 'password',
      redirect: undefined,
      imgUrl: '',
      key: ''
    }
  },
  mounted() {
    if (navigator.userAgent.indexOf('MSIE 9.0') > 0) {
      if ($('#sev_num').val() === undefined || $('#sev_num').val() === '') {
        this.sevice_num_Flag = true
      }
      if ($('#passwords').val() === undefined || $('#passwords').val() === '') {
        this.psd_Flag = true
      }
      if ($('#captcha_num').val() === undefined || $('#captcha_num').val() === '') {
        this.captcha_Flag = true
      }
    }
  },
  created() {
    this.sendCaptcha()
    if (window.localStorage.user_id !== '') {
      this.loginForm.username = window.localStorage.user_id
    }
    window.localStorage.setItem('roleType','user')
  },
  methods:{
    focusNum(num) {
      if (num === 1) {
        this.sevice_num_Flag = false
      } else if (num === 3) {
        this.captcha_Flag = false
      }
    },
    blurNum(num) {
      if (num === 1) {
        if ($('#sev_num').val().length === 0) {
          if (navigator.userAgent.indexOf('MSIE 9.0') > 0) {
            this.sevice_num_Flag = true
          }
        }
      } else if (num === 2) {
        if ($('#passwords').val().length === 0) {
          if (navigator.userAgent.indexOf('MSIE 9.0') > 0) {
            this.psd_Flag = true
          }
        }
      } else if (num === 3) {
        if ($('#captcha_num').val().length === 0) {
          if (navigator.userAgent.indexOf('MSIE 9.0') > 0) {
            this.captcha_Flag = true
          }
        }
      }
    },
    focuspsd() {
      this.psd_Flag = false
    },
    handleLogin() {
      console.log(222)
      this.$refs.loginForm.validate(valid => {
        if (valid) {
          this.loading = true
          this.$store
            .dispatch('user/login', this.loginForm)
            .then(response => {
              console.log(1111)
              this.$router.push({path: '/agency/assetsInfo'})
              this.loading = false
            })
            .catch(error => {
              console.log(error)
              this.loading = false
              this.sendCaptcha()
              this.loginForm.captcha = ''
            })
        } else {
          console.log('登录失败')
          return false
        }
      })
    },
    handleRegister() {
      this.$router.push({ path: '/agency/assetsInfo' })
    },
    sendCaptcha() {
      captcha()
        .then(response => {
          this.imgUrl = response.data.img.img
          this.loginForm.key = response.data.img.key
        })
        .catch(error => {
          console.log(error)
        })
    },
    forgetPsd() {
      this.$router.push({ path: '/findPsd' })
    }
  }
}
</script>
<style rel="stylesheet/scss" lang="scss">
$bg: #2d3a4b;
$light_gray: #eee;

/* reset element-ui css */
.login-container {
  color: #333;
  .el-input {
    display: inline-block;
    height: 47px;
    width: 85%;
    input {
      background: #f2f3f8;
      border: 0px;
      -webkit-appearance: none;
      border-radius: 0px;
      padding: 12px 5px 12px 15px;
      color: #333;
      height: 47px;
      &:-webkit-autofill {
        -webkit-box-shadow: 0 0 0px 1000px $bg inset !important;
        -webkit-text-fill-color: #fff !important;
      }
    }
  }
  .el-form-item {
    border: 1px solid rgba(255, 255, 255, 0.1);
    background: #f2f3f8;
    border-radius: 5px;
    color: #454545;
  }
}
</style>
<style rel="stylesheet/scss" lang="scss" scoped>
$dark_gray: #889aa4;
$light_gray: #eee;
.login-container {
  height: 100%;
  // width: 100%;
  background: url("../../assets/images/home_login.png");
  background-size: 100% 100%;
  .el-input__inner
  ::-ms-clear, ::-ms-reveal{
      display: none;
  }
  .el-input--medium >>> .el-input__inner{
    line-height:24px !important;
  }
  .el-input--medium >>> .el-input__inner::placeholder{
    line-height:24px !important;
    color:#cfc8cf;
  }
  .logo-img {
    display: inline-block;
    width: 120px;
    height: 35px;
    margin-top: 3%;
    margin-left: 2.8%;
  }
  .login-content {
    width: 1008px;
    max-width: 100%;
    // height: 70%;
    // display: flex;
    padding: 35px 35px 15px 35px;
    margin: 40px auto;
    .content-img {
      display: inline-block;
      height: 550px;
      width: 46%;
      float: left;
    }
  }
  .content-form {
    width: 54%;
    height: 550px;
    background-color: #fff;
    float: right;
    .login-form {
      width: 520px;
      max-width: 100%;
      padding: 20px 35px 15px 35px;
      margin: 6px auto;
    }
    .tips {
      font-size: 14px;
      color: #fff;
      margin-bottom: 10px;
      span {
        &:first-of-type {
          margin-right: 16px;
        }
      }
    }
    .svg-container {
      padding: 6px 5px 6px 15px;
      color: $dark_gray;
      vertical-align: middle;
      width: 30px;
      display: inline-block;
    }
    .title {
      font-size: 24px;
      font-weight: bold;
      color: #333;
      letter-spacing: 0;
      line-height: 24px;
      font-family: PingFangSC-Semibold;
    }
    .register-num {
      color: #666;
      font-size: 14px;
      margin-bottom: 50px;
      font-family: PingFangSC-Semibold;
    }
    .show-pwd {
      position: absolute;
      right: 10px;
      top: 7px;
      font-size: 16px;
      color: $dark_gray;
      cursor: pointer;
      user-select: none;
    }
    .set-language {
      color: #fff;
      position: absolute;
      top: 40px;
      right: 35px;
    }
    .for-login {
      // display: flex;
      // justify-content: space-between;
      width:100%;
      display: inline-block;
      .forget-psd {
        float: left;
        color: #999;
        line-height: 4;
        font-size: 14px;
        cursor: pointer;
      }
    }
    .yzm-num {
      display: flex;
      justify-content: space-between;
      .yzm-img {
        width:38%;
        height: 47px;
        float: right;
        cursor: pointer;
        // margin-left: 20px !important;
        img {
          border-radius: 5px;
        }
      }
    }
  }
}
</style>
