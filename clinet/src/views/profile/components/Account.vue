<template>
  <el-form label-position="top">
    <el-form-item label="用户名">
      <el-input v-model.trim="name" />
    </el-form-item>
    <el-form-item label="性别">
      <el-radio-group v-model="sex">
        <el-radio :label="0">男</el-radio>
        <el-radio :label="1">女</el-radio>
      </el-radio-group>
    </el-form-item>
    <el-form-item label="院系/专业" v-if="(roles || []).includes('student')">
      <major-selector v-model="facultyWithMajor"></major-selector>
    </el-form-item>
    <el-form-item label="联系电话">
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
import { updateUserInfo } from '@/api/user'
import MajorSelector from '@/components/MajorSelector'

export default {
  components: {
    MajorSelector
  },
  data() {
    return {
      name: '',
      sex: 0,
      phone: '',
      facultyWithMajor: null,
      password: ''
    }
  },
  methods: {
    submit() {
      updateUserInfo({
        name: this.name,
        sex: this.sex,
        password: this.password,
        phone: this.phone,
        facultyId: this.facultyWithMajor[0],
        majorId: this.facultyWithMajor[1]
      }).then(() => {
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
    this.sex = this.$store.getters.allUserInfo.sex
    this.facultyWithMajor = [
      this.$store.getters.allUserInfo.facultyId,
      this.$store.getters.allUserInfo.majorId
    ]
  },
  computed: {
    roles: function() {
      return this.$store.getters.roles
    }
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
