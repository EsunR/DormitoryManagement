<template>
  <el-dialog
    class="visitor-create-modal"
    title="新增访客记录"
    :visible="visible"
    @update:visible="$emit('update:visible', $event)"
    width="600px"
  >
    <el-form :model="formData" label-position="top" ref="form">
      <el-form-item label="访问宿舍楼" prop="buildingId" required>
        <el-select v-model="formData.buildingId" placeholder="请选择" clearable>
          <el-option
            v-for="item in buildingsData"
            :key="item.id"
            :label="item.name"
            :value="item.id"
          >
          </el-option>
        </el-select>
      </el-form-item>
      <el-form-item prop="name" label="姓名" required>
        <el-input v-model="formData.name"></el-input>
      </el-form-item>
      <el-form-item prop="phone" label="手机号" required>
        <el-input v-model="formData.phone"></el-input>
      </el-form-item>
      <el-form-item prop="idNumber" label="身份证号" required>
        <el-input v-model="formData.idNumber"></el-input>
      </el-form-item>
      <el-form-item label="性别" prop="sex" required>
        <el-radio-group v-model="formData.sex">
          <el-radio :label="0">男</el-radio>
          <el-radio :label="1">女</el-radio>
        </el-radio-group>
      </el-form-item>
    </el-form>
    <span slot="footer" class="dialog-footer">
      <el-button @click="$emit('update:visible', false)">
        取消
      </el-button>
      <el-button
        :loading="updateLoading"
        type="primary"
        @click="onConfirmClick"
      >
        确定
      </el-button>
    </span>
  </el-dialog>
</template>

<script>
import { getManageBuildings } from '@/api/building'
import { createVisitor } from '@/api/visitor'

export default {
  props: {
    visible: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      formData: {
        name: '',
        phone: '',
        idNumber: '',
        sex: 0,
        buildingId: undefined
      },
      updateLoading: false,
      buildingsData: []
    }
  },
  methods: {
    onConfirmClick() {
      this.$refs.form.validate(valid => {
        if (valid) {
          this.updateLoading = true
          createVisitor({
            ...this.formData,
            buildingId: Number(this.formData.buildingId)
          })
            .then(() => {
              this.$message.success('新增成功')
              this.$emit('update:visible', false)
              this.$emit('create-success')
            })
            .finally(() => {
              this.updateLoading = false
            })
        }
      })
    },
    fetchBuildingsData() {
      getManageBuildings().then(res => {
        this.buildingsData = res.data.buildings
      })
    }
  },
  mounted() {
    this.fetchBuildingsData()
  }
}
</script>

<style lang="scss" scoped></style>
