<template>
  <div class="successReg-container">
    <img class="logo-img" src="../../assets/images/index_logo.png" alt>
    <el-row :gutter="24">
      <el-col
        :sm="{span:20,offset:2}"
        :md="{span:20,offset:2}"
        :lg="{span:20,offset:2}"
        style="margin-right:0px !important;"
      >
        <div class="successReg-content">
          <div class="content-info">
            <i
              class="el-icon-close"
              style="position:absolute;right:20px;cursor:pointer;"
              @click="closeFindPsd"
            />
            <div class="content-psd">
              <div class="title">找回密码</div>
              <div class="nav">您可以通过邮箱验证码找回密码</div>
              <div style="margin:40px 0;margin-bottom:110px;">
                <!-- <el-steps :active="active" >
                  <el-step title="验证邮箱" />
                  <el-step title="正在处理" />
                  <el-step title="完成" />
                </el-steps>-->
                <div class="step-box">
                  <div v-show="step_one_flag" class="step-box-one">
                    <div class="active-one">1</div>
                    <div class="active-size">验证邮箱</div>
                    <div class="active-line" />
                  </div>
                  <div v-show="!step_one_flag" class="step-box-one">
                    <div class="active-suc">√</div>
                    <div class="step-size">验证邮箱</div>
                    <div class="active-line" />
                  </div>
                  <div v-show="step_two_flag" class="step-box-two step-two">
                    <div class="step-one">2</div>
                    <div class="step-size">正在处理</div>
                    <div class="step-line" />
                  </div>
                  <div v-show="step_twoing_flag" class="step-box-two step-two">
                    <div class="active-one">2</div>
                    <div class="active-size">正在处理</div>
                    <div class="step-line" />
                  </div>
                  <div v-show="step_suctwo_flag" class="step-box-two step-two">
                    <div class="active-suc">√</div>
                    <div class="active-size">正在处理</div>
                    <div class="step-line" />
                  </div>
                  <div v-show="step_three_flag" class="step-box-two">
                    <div class="step-one">3</div>
                    <div class="step-size">完成</div>
                  </div>
                  <div v-show="step_sucthree_flag" class="step-box-two">
                    <div class="active-one">3</div>
                    <div class="active-size">完成</div>
                  </div>
                </div>
              </div>
              <div v-show="step_one_flag">
                <el-form
                  ref="emailForm"
                  class="form_content"
                  :inline="true"
                  :rules="emailForm"
                  :label-position="labelPosition"
                  label-width="150px"
                  :model="formEmail"
                >
                  <div
                    style="font-size:14px;color:#333;font-family: PingFangSC-Regular;margin-bottom:4px;"
                  >服务号</div>
                  <el-form-item prop="userId">
                    <el-input v-model="formEmail.userId" type="text" placeholder="请输入" />
                  </el-form-item>
                  <div
                    style="font-size:14px;color:#333;font-family: PingFangSC-Regular;margin-bottom:4px;"
                  >邮箱</div>
                  <el-form-item prop="email">
                    <el-input v-model="formEmail.email" type="text" placeholder="请输入" />
                  </el-form-item>
                  <div
                    style="font-size:14px;color:#333;font-family: PingFangSC-Regular;margin-bottom:4px;"
                  >验证码</div>
                  <!-- <div class="verify-box emai-verfy"> -->
                  <el-form-item prop="captcha" style="margin-right:0px;display:inline-block;height:46px;display: block;" class="yanzhengma">
                    <!-- <div class="input-img"> -->
                    <el-input
                      v-model="formEmail.captcha"
                      type="text"
                      name="captcha"
                      auto-complete="on"
                      placeholder="输入验证码"
                      style="width:304px;display: inline-block;"
                      @keyup.enter.native="next"
                    />
                    <div style="display:inline-block;height:46px;vertical-align: bottom;" @click="sendCaptcha">
                      <img class="img-box" :src="imgUrl" alt>
                    </div>
                    <!-- </div> -->
                  </el-form-item>
                  <!-- </div> -->
                </el-form>
              </div>
              <div v-show="step_twoing_flag">
                <el-form
                  ref="psdForm"
                  :inline="true"
                  :rules="psdForm"
                  :label-position="labelPosition"
                  label-width="150px"
                  :model="formPsd"
                >
                  <div
                    class="new_psd"
                    style="font-size:14px;color:#333;font-family: PingFangSC-Regular;margin-bottom:4px;"
                  >新密码</div>
                  <div class="newPsd_box">
                    <el-form-item prop="newPsd">
                      <div style="width:100%;position:relative;">
                        <el-input
                          id="newpsds"
                          v-model="formPsd.newPsd"
                          type="text"
                          auto-complete="new-password"
                          placeholder="请输入"
                          style="float:left;height:46px;"
                          @focus="focuspsd"
                          @input="inputUp"
                        />
                        <i v-show="confirmPsdFlag" class="el-icon-view" style="float:right;position:absolute;left:446px;top:10px;" @click="closepsds" />
                        <img v-show="!confirmPsdFlag" src="../../assets/images/eyes.png" style="display:inline-block;width:14px;height:14px;float:right;position:absolute;left:446px;top:10px;" @click="openpsds">
                      </div>
                    </el-form-item>
                  </div>
                  <div
                    style="font-size:14px;color:#333;font-family: PingFangSC-Regular;margin-bottom:4px;"
                  >邮箱验证码</div>
                  <div class="verify-box">
                    <el-form-item prop="validateCode">
                      <div class="input-img">
                        <el-input v-model="formPsd.validateCode" type="text" placeholder="请输入" />
                      </div>
                    </el-form-item>
                  </div>
                </el-form>
              </div>
              <div v-show="step_sucthree_flag">
                <div style="font-size: 24px;color: #3073F8;text-align: center;">新密码设置成功</div>
                <div style="text-align: center;margin-top:24px;margin-bottom:80px;">
                  <img style="width:90px;height:90px;" src="../../assets/images/psdSuc.png">
                </div>
              </div>
              <div class="next-box">
                <span v-show="step_sucthree_flag" style="font-size:14px;color:#999;cursor:pointer;float:left;line-height: 54px;">
                  <span class="second">{{ count }}</span>后自动跳转至登录页面
                </span>
                <el-button v-show="step_sucthree_flag" style="float:right;" type="primary" @click="submit">登录</el-button>
                <span
                  v-show="!step_sucthree_flag"
                  style="font-size:14px;color:#999;cursor:pointer;line-height:46px;float:left;"
                  @click="submit"
                >登录</span>
                <el-button
                  v-show="!step_sucthree_flag"
                  type="primary"
                  class="nextbtn"
                  style="float:right;"
                  @click="next"
                >下一步</el-button>
              </div>
            </div>
          </div>
        </div>
      </el-col>
    </el-row>
  </div>
</template>

<script>
import $ from 'jquery'
import { validEmail, psdNum } from '@/utils/validate'
import { captcha, sendEmail, resetPassword } from '@/api/auth'
import JSEncrypt from 'jsencrypt'
export default {
  data() {
    const validateEmail = (rule, value, callback) => {
      if (!validEmail(value)) {
        callback(new Error('邮箱格式不正确'))
      } else {
        callback()
      }
    }
    const veriftyConfirm = (rule, value, callback) => {
      if (!value) {
        callback(new Error('输入验证码'))
      } else {
        callback()
      }
    }
    const validatePsd = (rule, value, callback) => {
      if (!psdNum(this.formPsd.newPsd)) {
        callback(new Error('输入不少于8位的字母、数字及特殊符号类型的密码'))
      } else {
        callback()
      }
    }
    return {
      confirmPsdFlag: false,
      step_one_flag: true,
      step_two_flag: true,
      step_three_flag: true,
      step_twoing_flag: false,
      step_suctwo_flag: false,
      step_sucthree_flag: false,
      labelPosition: 'left',
      active: 1,
      index: 1,
      formEmail: {
        userId: '',
        email: '',
        captcha: '',
        key: ''
      },
      emailForm: {
        userId: [{ required: true, message: '输入服务号', trigger: 'blur' }],
        email: [
          {
            required: true,
            message: '输入正确的邮箱格式',
            validator: validateEmail,
            trigger: 'blur'
          }
        ],
        captcha: [
          {
            required: true,
            message: '输入正确的验证码',
            validator: veriftyConfirm,
            trigger: 'blur'
          }
        ]
      },
      formPsd: {
        userId: '',
        newPsd: '',
        validateCode: ''
      },
      psdForm: {
        newPsd: [
          {
            required: true,
            message: '输入不少于8位的字母、数字及特殊符号类型的密码',
            validator: validatePsd,
            trigger: 'blur'
          }
        ],
        validateCode: [
          { required: true, message: '输入邮箱验证码', trigger: 'blur' }
        ]
      },
      count: 3,
      imgUrl: ''
    }
  },
  created() {
    this.sendCaptcha()
  },
  mounted() {
    if (!('placeholder' in document.createElement('input'))) {
      $('input[placeholder],textarea[placeholder]').each(function() {
        var that = $(this)
        var text = that.attr('placeholder')
        if (that.val() === '') {
          that.val(text).addClass('placeholder')
        }
        that.focus(function() {
          if (that.val() === text) {
            that.val('').removeClass('placeholder')
          }
        })
          .blur(function() {
            if (that.val() === '') {
              that.val(text).addClass('placeholder')
            }
          })
          .closest('form').submit(function() {
            if (that.val() === text) {
              that.val('')
            }
          })
      })
    }
  },
  methods: {
    focuspsd() {
      if (!this.confirmPsdFlag && $('#newpsds').val().length !== 0) {
        $('#newpsds').attr('type', 'password')
      } else {
        $('#newpsds').attr('type', 'text')
      }
    },
    inputUp(val) {
      if (val !== '') {
        if (this.confirmPsdFlag) {
          $('#newpsds').attr('type', 'text')
        } else {
          $('#newpsds').attr('type', 'password')
        }
      } else {
        $('#newpsds').attr('type', 'text')
      }
    },
    closepsds() {
      this.confirmPsdFlag = false
      $('#newpsds').attr('type', 'password')
    },
    openpsds() {
      this.confirmPsdFlag = true
      $('#newpsds').attr('type', 'text')
    },
    closeFindPsd() {
      this.$router.push({ path: '/login' })
    },
    getRSApsd(str) {
      const pubKey = `-----BEGIN PUBLIC KEY-----
      MIGfMA0GCSqGSIb3DQEBAQUAA4GNADCBiQKBgQDrbHV0TeLDwupZmsJlIG6xZh1/
      6xBxDVqkbFo0gtJP6Q7k8MinkAAEzUAZu7ZKbNIZ49tWRtU5QjBYg5R2LC843AGZ
      CJi+ox64NVMWFoTOZliPgAKp7E6Ir5c+3FgjjRdYpZbYC5r2GYZcqxew1waasw7B
      jhxmCmeoX3dyQLBKKwIDAQAB
      -----END PUBLIC KEY-----`// ES6 模板字符串 引用 rsa 公钥
      const encryptStr = new JSEncrypt()
      encryptStr.setPublicKey(pubKey) // 设置 加密公钥
      const data = encryptStr.encrypt(str.toString()) // 进行加密
      return data
    },
    next() {
      if (this.step_one_flag === true) {
        this.$refs['emailForm'].validate(valid => {
          if (valid) {
            $('.nextbtn').attr('disabled', 'disabled')
            this.formPsd.userId = this.formEmail.userId // 保存第一步的userId
            sendEmail({
              userId: this.formEmail.userId,
              email: this.formEmail.email,
              captcha: this.formEmail.captcha,
              key: this.formEmail.key
            })
              .then(response => {
                this.step_one_flag = false
                this.step_twoing_flag = true
                this.step_two_flag = false
                this.$message({
                  message: '发送成功',
                  type: 'success',
                  duration: 500
                })
                setTimeout(function() {
                  $('.nextbtn').removeAttr('disabled')
                }, 2000)
                this.step_twoing_flag = true
              })
              .catch(error => {
                console.log(error)
                this.step_one_flag = true
                this.step_two_flag = true
                this.step_three_flag = true
                this.step_twoing_flag = false
                this.step_suctwo_flag = false
                this.step_sucthree_flag = false
                this.sendCaptcha()
                this.formEmail.captcha = ''
                setTimeout(function() {
                  $('.nextbtn').removeAttr('disabled')
                }, 2000)
              })
          }
        })
      } else if (this.step_twoing_flag === true) {
        this.$refs['psdForm'].validate(valid => {
          if (valid) {
            $('.nextbtn').attr('disabled', 'disabled')
            resetPassword({
              userId: this.formPsd.userId,
              validateCode: this.formPsd.validateCode,
              password: this.getRSApsd(this.formPsd.newPsd)
            })
              .then(response => {
                this.$message({
                  message: '设置成功',
                  type: 'success',
                  duration: 500
                })
                this.applicationFlag = false
                this.step_one_flag = false
                this.step_two_flag = false
                this.step_three_flag = false
                this.step_twoing_flag = false
                this.step_suctwo_flag = true
                this.step_sucthree_flag = true
                setTimeout(function() {
                  $('.nextbtn').removeAttr('disabled')
                }, 2000)
                var that = this
                var time = setInterval(function() {
                  that.count--
                  if (that.count <= 0) {
                    clearInterval(time)
                    that.$router.push({ path: '/login' })
                  }
                }, 1000)
              })
              .catch(error => {
                this.applicationFlag = false
                this.step_one_flag = false
                this.step_two_flag = false
                this.step_three_flag = true
                this.step_twoing_flag = true
                this.step_suctwo_flag = false
                this.step_sucthree_flag = false
                console.log(error)
                setTimeout(function() {
                  $('.nextbtn').removeAttr('disabled')
                }, 2000)
              })
          }
        })
      }
    },
    sendCaptcha() {
      captcha()
        .then(response => {
          this.imgUrl = response.data.img.img
          this.formEmail.key = response.data.img.key
        })
        .catch(error => {
          console.log(error)
        })
    },
    submit() {
      this.$router.push({ path: '/login' })
    }
  }
}
</script>

<style lang="scss" scoped>
.successReg-container{
  height: 100%;
  font-family: PingFangSC-Semibold;
  background: url("../../assets/images/home_login.png");
  background-size: 100% 100%;
  .logo-img {
    display: inline-block;
    width: 120px;
    height: 35px;
    margin-top: 3%;
    margin-left: 2.8%;
  }
  .successReg-content {
    .el-input--medium .el-input__inner {
      height: 46px !important;
      line-height: 46px !important;
    }
    width: 630px;
    // height: 560px;
    margin: 0 auto;
    margin-top: 60px;
    background-color: #fff;
    .content-info {
      // width: 100%;
      // height: 100%;
      padding-top: 20px;
      padding-bottom: 20px;
      position: relative;
      font-family: PingFangSC-Semibold;
      .content-psd {
        width: 100%;
        padding: 40px 80px 60px 80px;
        margin: 0 auto;
        .el-input--medium {
          width: 470px;
        }
        .el-form-item__error {
          // padding-top: 20px;
          width: 200px;
          // display: flex;
          text-align: left;
          position: static;
        }
        .newPsd_box{
          .el-form-item__error {
            width: 200px;
            padding-top:50px !important;
          }
        }
        .newPsd_box {
          .el-form-item__error {
            width: 276px !important;
            padding-top:50px !important;
          }
        }
        .title {
          font-size: 24px;
          color: #000000;
          letter-spacing: 0;
          line-height: 24px;
        }
        .nav {
          font-size: 14px;
          color: rgba(0, 0, 0, 0.65);
          letter-spacing: 0;
          margin-top: 10px;
        }
        .input-img {
          //width: 100%;
          //height: 50px;
          // display: flex;
          // justify-content: space-between;
          .img-box {
            width: 90%;
            height: 45px;
            margin-left: 5px;
            border-radius: 5px !important;
            // img{
            //   border-radius: 500px !important;
            // }
          }
        }

        .next-box {
          margin-top: 16px;
          // display: flex;
          // justify-content: space-between;
          .el-button--medium {
            padding: 18px 50px;
            font-size: 16px;
          }
        }
        .step-box {
          // display: flex;
          width: 100%;
          .step-box-one {
            position: relative;
            // display: flex;
            float: left;
            width: 40%;
            .active-line {
              width: 80px;
              height: 1px;
              background: #3073f8;
              margin-top: 16px;
              float: left;
            }
          }
          .active-suc {
            width: 32px;
            height: 32px;
            background-color: #fff;
            border: 1px solid #3073f8;
            color: #3073f8;
            border-radius: 50%;
            text-align: center;
            line-height: 32px;
            float: left;
          }
          .active-one {
            width: 32px;
            height: 32px;
            background-color: #3073f8;
            color: #fff;
            border-radius: 50%;
            text-align: center;
            line-height: 32px;
            float: left;
          }
          .active-size {
            color: #000;
            line-height: 32px;
            margin-left: 6px;
            margin-right: 6px;
            float: left;
          }
          .step-two {
            width: 40%;
          }
          .step-size {
            color: #8f8f8f;
            line-height: 32px;
            margin-left: 6px;
            margin-right: 6px;
            float: left;
          }
          .step-box-two {
            position: relative;
            // display: flex;
            float: left;
            margin-left: 6px;
            .step-one {
              width: 32px;
              height: 32px;
              border: 1px solid #8f8f8f;
              color: #999;
              border-radius: 50%;
              text-align: center;
              line-height: 32px;
              float: left;
            }
            .step-line {
              width: 80px;
              height: 1px;
              background: rgba(0, 0, 0, 0.45);
              margin-top: 16px;
              float: left;
            }
          }
        }
      }
    }
  }
}
</style>
