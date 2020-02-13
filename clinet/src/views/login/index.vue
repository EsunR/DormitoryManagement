<template>
  <div class="login-container">
    <!-- 登录表单 -->
    <el-form
      ref="loginForm"
      :model="loginForm"
      :rules="loginRules"
      class="login-form"
      autocomplete="on"
      label-position="left"
    >
      <div class="title-container">
        <h3 class="title">高校宿舍可视化系统</h3>
      </div>

      <!-- 学号/职工号 -->
      <el-form-item prop="account">
        <span class="svg-container">
          <svg-icon icon-class="user" />
        </span>
        <el-input
          ref="account"
          v-model="loginForm.account"
          placeholder="学号/职工号"
          name="account"
          type="text"
          tabindex="1"
          autocomplete="on"
        />
      </el-form-item>
      <!-- 学号/职工号 -->

      <!-- 密码 -->
      <el-tooltip
        v-model="capsTooltip"
        content="大写锁定键已开启"
        placement="right"
        manual
      >
        <el-form-item prop="password">
          <span class="svg-container">
            <svg-icon icon-class="password" />
          </span>
          <el-input
            :key="passwordType"
            ref="password"
            v-model="loginForm.password"
            :type="passwordType"
            placeholder="密码"
            name="password"
            tabindex="2"
            autocomplete="on"
            @keyup.native="checkCapslock"
            @blur="capsTooltip = false"
            @keyup.enter.native="handleLogin"
          />
          <span class="show-pwd" @click="showPwd">
            <svg-icon
              :icon-class="passwordType === 'password' ? 'eye' : 'eye-open'"
            />
          </span>
        </el-form-item>
      </el-tooltip>
      <!-- 密码 -->

      <!-- 确认密码 -->
      <el-form-item v-if="registerMode" prop="repassword">
        <span class="svg-container">
          <svg-icon icon-class="user" />
        </span>
        <el-input
          ref="repassword"
          v-model="loginForm.repassword"
          placeholder="确认密码"
          name="repassword"
          type="password"
          tabindex="1"
          autocomplete="on"
        />
      </el-form-item>
      <!-- 确认密码 -->

      <!-- 登录按钮 -->
      <el-button
        v-if="!registerMode"
        :loading="loading"
        type="primary"
        style="width:100%;margin-bottom:30px;"
        @click.native.prevent="handleLogin"
        >登录</el-button
      >
      <!-- 登录按钮 -->

      <!-- 注册按钮 -->
      <el-button
        v-if="registerMode"
        :loading="loading"
        type="primary"
        style="width:100%;margin-bottom:30px;margin-left: 0"
        @click.native.prevent="handleRegister"
        >注册</el-button
      >
      <!-- 注册按钮 -->

      <!-- 切换为注册 -->
      <a class="toggle" @click="registerMode = !registerMode">
        <span v-if="!registerMode">学生注册</span>
        <span v-else>返回登录</span>
      </a>
      <!-- 切换为注册 -->
    </el-form>
    <!-- 登录表单 -->
  </div>
</template>

<script>
import { register } from '@/api/user'
export default {
  name: 'Login',
  data() {
    const validatePassword = (rule, value, callback) => {
      if (value.length < 6) {
        callback(new Error('密码需要6位以上'))
      } else {
        callback()
      }
    }
    const validatorRepassword = (rule, value, callback) => {
      if (value !== this.loginForm.password && this.registerMode) {
        callback(new Error('两次密码不符合'))
      } else {
        callback()
      }
    }
    return {
      loginForm: {
        account: '',
        password: '',
        repassword: ''
      },
      loginRules: {
        account: [{ required: true, trigger: 'blur' }],
        password: [
          { required: true, trigger: 'blur', validator: validatePassword }
        ],
        repassword: [{ validator: validatorRepassword, trigger: 'blur' }]
      },
      passwordType: 'password',
      registerMode: false,
      capsTooltip: false,
      loading: false,
      redirect: undefined, // redirect 负责获取用户被跳转到登录页面前的页面，可以让用户登录后直接访问到想要访问的页面
      otherQuery: {}
    }
  },
  watch: {
    $route: {
      // 路由重定向
      handler: function(route) {
        const query = route.query
        if (query) {
          this.redirect = query.redirect
          this.otherQuery = this.getOtherQuery(query)
        }
      },
      immediate: true
    }
  },
  mounted() {
    // 表单获取焦点
    if (this.loginForm.account === '') {
      this.$refs.account.focus()
    } else if (this.loginForm.password === '') {
      this.$refs.password.focus()
    }
  },
  methods: {
    // 检查键盘大写锁定键
    checkCapslock(e) {
      const { key } = e
      this.capsTooltip = key && key.length === 1 && key >= 'A' && key <= 'Z'
    },
    showPwd() {
      if (this.passwordType === 'password') {
        this.passwordType = ''
      } else {
        this.passwordType = 'password'
      }
      this.$nextTick(() => {
        this.$refs.password.focus()
      })
    },
    handleLogin() {
      this.$refs.loginForm.validate(valid => {
        if (valid) {
          this.loading = true
          this.$store
            .dispatch('user/login', this.loginForm)
            .then(() => {
              this.$router.push({
                path: this.redirect || '/',
                query: this.otherQuery
              })
              this.loading = false
            })
            .catch(() => {
              this.loading = false
            })
        } else {
          console.log('error submit!!')
          return false
        }
      })
    },
    handleRegister() {
      this.$refs.loginForm.validate(valid => {
        if (valid) {
          this.loading = true
          register({
            account: this.loginForm.account,
            password: this.loginForm.password
          }).then(() => {
            this.$message({ message: '注册成功', type: 'success' })
            this.loading = false
            this.registerMode = false
          })
        } else {
          console.log('error submit!!')
          return false
        }
      })
    },
    getOtherQuery(query) {
      return Object.keys(query).reduce((acc, cur) => {
        if (cur !== 'redirect') {
          acc[cur] = query[cur]
        }
        return acc
      }, {})
    }
  }
}
</script>

<style lang="scss">
$bg: #283443;
$light_gray: #fff;
$cursor: #fff;

@supports (-webkit-mask: none) and (not (cater-color: $cursor)) {
  .login-container .el-input input {
    color: $cursor;
  }
}

/* reset element-ui css */
.login-container {
  .el-input {
    display: inline-block;
    height: 47px;
    width: 85%;

    input {
      background: transparent;
      border: 0px;
      -webkit-appearance: none;
      border-radius: 0px;
      padding: 12px 5px 12px 15px;
      color: $light_gray;
      height: 47px;
      caret-color: $cursor;

      &:-webkit-autofill {
        box-shadow: 0 0 0px 1000px $bg inset !important;
        -webkit-text-fill-color: $cursor !important;
      }
    }
  }

  .el-form-item {
    border: 1px solid rgba(255, 255, 255, 0.1);
    background: rgba(0, 0, 0, 0.1);
    border-radius: 5px;
    color: #454545;
  }
}
</style>

<style lang="scss" scoped>
$bg: #2d3a4b;
$dark_gray: #889aa4;
$light_gray: #eee;

.login-container {
  min-height: 100%;
  width: 100%;
  background-color: $bg;
  overflow: hidden;

  .login-form {
    position: relative;
    width: 520px;
    max-width: 100%;
    padding: 160px 35px 0;
    margin: 0 auto;
    overflow: hidden;
    .toggle {
      width: 100%;
      display: block;
      font-size: 14px;
      text-align: center;
      color: #fff;
      margin-top: -10px;
    }
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

  .title-container {
    position: relative;

    .title {
      font-size: 26px;
      color: $light_gray;
      margin: 0px auto 40px auto;
      text-align: center;
      font-weight: bold;
    }
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

  .thirdparty-button {
    position: absolute;
    right: 0;
    bottom: 6px;
  }

  @media only screen and (max-width: 470px) {
    .thirdparty-button {
      display: none;
    }
  }
}
</style>
