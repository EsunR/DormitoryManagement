<template>
  <div id="student-guide">
    <div class="guide-title">
      <h1>新用户指南</h1>
      <hr />
      <h4>看起来您是第一是使用该系统，先填写个人信息吧！</h4>
    </div>
    <!-- Form -->
    <el-form class="form" :model="form" ref="form" label-position="top">
      <el-form-item label="学生姓名" prop="name" :required="true">
        <el-input v-model="form.name"></el-input>
      </el-form-item>
      <el-form-item label="性别" prop="sex" :required="true">
        <el-radio-group v-model="form.sex">
          <el-radio :label="0">男</el-radio>
          <el-radio :label="1">女</el-radio>
        </el-radio-group>
      </el-form-item>
      <el-form-item label="院系/专业" prop="facultyWithMajor" :required="true">
        <major-selector v-model="form.facultyWithMajor"></major-selector>
      </el-form-item>
      <el-form-item label="联系电话" prop="phone" :required="true">
        <el-input v-model="form.phone"></el-input>
      </el-form-item>
      <el-form-item label="选择想要入住的宿舍" prop="roomId" :required="true">
        <room-selector v-model="form.roomId"></room-selector>
      </el-form-item>
    </el-form>
    <!-- Form -->
    <div class="btn-wrapper">
      <el-button type="primary" @click="handleSubmitClick">提交信息</el-button>
    </div>
  </div>
</template>

<script>
import RoomSelector from '@/components/RoomSelector/index'
import MajorSelector from '@/components/MajorSelector'
import { updateUserInfo } from '@/api/user'

export default {
  name: 'student-guide',
  components: {
    RoomSelector,
    MajorSelector
  },
  data() {
    return {
      form: {
        name: '',
        sex: 0,
        phone: '',
        roomId: null,
        facultyWithMajor: null
      },
      buildingId: null,
      floorId: null
    }
  },
  methods: {
    handleSubmitClick() {
      this.$refs['form'].validate(valid => {
        if (valid) {
          this.$confirm(
            `${this.form.name}同学，请确认您填写的信息正确无误`,
            '提示',
            {
              confirmButtonText: '确定',
              cancelButtonText: '取消',
              type: 'warning'
            }
          )
            .then(() => {
              this.submitFormData().then(() => {
                this.$message({
                  type: 'success',
                  message: '加入宿舍成功'
                })
              })
            })
            .catch(() => {
              this.$message({
                type: 'info',
                message: '已取消'
              })
            })
        } else {
          console.log('error submit!!')
          return false
        }
      })
    },
    submitFormData() {
      return new Promise((resolve, reject) => {
        updateUserInfo({
          name: this.form.name,
          sex: this.form.sex,
          phone: this.form.phone,
          roomId: this.form.roomId,
          facultyId: this.form.facultyWithMajor[0],
          majorId: this.form.facultyWithMajor[1],
          checkTime: new Date().valueOf()
        })
          .then(() => {
            this.$store.dispatch('user/getInfo')
            resolve()
          })
          .catch(e => {
            reject(e)
          })
      })
    }
  }
}
</script>

<style lang="scss" scoped>
#student-guide {
  padding: 20px;
  background-color: #fff;
  border-radius: 5px;
  margin-top: 40px;
  ::v-deep .form {
    .el-cascader {
      width: 100%;
    }
  }
  .btn-wrapper {
    display: flex;
    flex-direction: row-reverse;
    margin-bottom: 20px;
  }
}
</style>
