<template>
  <el-dialog
    class="user-info-edit-modal"
    title="调剂宿舍"
    :visible="visible"
    @update:visible="$emit('update:visible', $event)"
  >
    <el-form :model="formData" label-position="top" ref="form">
      <el-form-item prop="roomId" label="宿舍">
        <room-selector v-model="formData.roomId"></room-selector>
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
import { updateUserInfo } from '@/api/user'
import RoomSelector from '@/components/RoomSelector/index.vue'

export default {
  props: {
    visible: {
      type: Boolean,
      default: false
    },
    userInfo: {
      type: Object,
      default: () => ({})
    }
  },
  components: {
    RoomSelector
  },
  data() {
    return {
      formData: {
        roomId: null
      },
      updateLoading: false
    }
  },
  methods: {
    onConfirmClick() {
      this.$refs.form.validate(isValid => {
        if (isValid) {
          this.updateLoading = true
          updateUserInfo({
            userId: this.userInfo.id,
            roomId: this.formData.roomId
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
