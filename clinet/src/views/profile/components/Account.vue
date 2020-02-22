<template>
  <el-form>
    <el-form-item label="用户名">
      <el-input v-model.trim="name" />
    </el-form-item>
    <el-form-item label="手机号">
      <el-input v-model.trim="phone" />
    </el-form-item>
    <el-form-item label="新密码">
      <el-input v-model.trim="password" />
    </el-form-item>
    <el-form-item>
      <div class="btn-wrapper">
        <el-button type="primary" @click="submit">更新</el-button>
        <div class="tips">记录留空默认为不更改</div>
      </div>
    </el-form-item>
  </el-form>
</template>

<script>
import { updateInfo } from '@/api/user'
export default {
  data() {
    return {
      name: '',
      phone: '',
      password: ''
    }
  },
  methods: {
    submit() {
      let formData = {
        name: this.name,
        password: this.password,
        phone: this.phone
      }
      updateInfo(formData).then(() => {
        this.$message({
          type: 'success',
          message: '修改成功!'
        })
        this.$store.dispatch('user/getInfo').then(() => {
          location.reload()
        })
      })
    }
  },
  mounted() {
    this.name = this.$store.getters.allUserInfo.name
    this.phone = this.$store.getters.allUserInfo.phone
  }
}
</script>

<style lang="scss" scoped>
.btn-wrapper {
  display: flex;
  .tips {
    margin-left: 20px;
    color: rgba($color: #000000, $alpha: 0.5);
  }
}
</style>
