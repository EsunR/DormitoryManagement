<template>
  <div id="BuildingAddForm" class="main-card">
    <el-form class="form" :inline="true" ref="form" :model="formData">
      <el-form-item label="宿舍楼名" required prop="name">
        <el-input v-model.trim="formData.name" placeholder="请输入"></el-input>
      </el-form-item>
      <el-form-item label="楼层数" required prop="floorCount">
        <el-input-number
          v-model="formData.floorCount"
          :min="1"
          :max="9"
        ></el-input-number>
      </el-form-item>
      <el-form-item label="每层楼房间数" required prop="roomCount">
        <el-input-number
          v-model="formData.roomCount"
          :min="1"
          :max="99"
        ></el-input-number>
      </el-form-item>
    </el-form>
    <div class="btn-wrapper">
      <el-button type="danger" @click="clean">清空</el-button>
      <el-button type="primary" @click="onSubmit">创建</el-button>
    </div>
  </div>
</template>

<script>
import { addBuildingWithRoom } from '@/api/building'
export default {
  name: 'BuildingAddForm',
  data() {
    return {
      formData: {
        name: '',
        floorCount: 1,
        roomCount: 1
      }
    }
  },
  methods: {
    onSubmit() {
      if (this.formData.name) {
        this.$confirm(`确认要添加 ${this.formData.name} 宿舍吗`, '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        })
          .then(() => {
            addBuildingWithRoom(this.formData).then(() => {
              this.$message({ type: 'success', message: '添加成功！' })
              this.clean()
              this.$emit('submitSuccess')
            })
          })
          .catch(() => {
            this.$message({
              type: 'info',
              message: '已取消'
            })
          })
      } else {
        this.$message({ type: 'error', message: '请填写宿舍楼名' })
      }
    },
    clean() {
      this.formData.name = ''
      this.formData.floorCount = 1
      this.formData.roomCount = 1
    }
  }
}
</script>

<style lang="scss" scoped>
#BuildingAddForm {
  display: flex;
  justify-content: space-between;
  align-items: center;
  .form {
    margin-bottom: -20px;
  }
}
</style>
