<template>
  <el-dialog
    class="room-info-edit-modal"
    title="修改房间信息"
    :visible="visible"
    @update:visible="$emit('update:visible', $event)"
  >
    <el-form :model="formData" label-position="left" ref="form">
      <el-form-item prop="peopleNum" label="床位数">
        <el-input-number
          v-model="formData.peopleNum"
          :min="currentStudentCount"
          :max="20"
        ></el-input-number>
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
import { updateRoomInfo } from '@/api/room'

export default {
  props: {
    visible: {
      type: Boolean,
      default: false
    },
    roomInfo: {
      type: Object,
      default: () => ({})
    }
  },
  data() {
    return {
      formData: {
        peopleNum: null
      },
      updateLoading: false
    }
  },
  methods: {
    onConfirmClick() {
      this.$refs.form.validate(isValid => {
        if (isValid) {
          this.updateLoading = true
          updateRoomInfo({
            roomId: this.roomInfo.id,
            peopleNum: this.formData.peopleNum
          })
            .then(() => {
              this.$emit('update:visible', false)
              this.$emit('update-success')
            })
            .finally(() => {
              this.updateLoading = false
            })
        }
      })
    }
  },
  computed: {
    // 已入住的学生人数
    currentStudentCount() {
      if (this.roomInfo && this.roomInfo.users instanceof Array) {
        return this.roomInfo.users.length
      }
      return 0
    },
    // 当前可入住的学生人数
    currentPeopleCount() {
      return (this.roomInfo && this.roomInfo.peopleNum) || 0
    }
  },
  watch: {
    currentPeopleCount: {
      immediate: true,
      handler(newVal) {
        this.formData.peopleNum = newVal
      }
    }
  }
}
</script>

<style lang="scss" scoped></style>
