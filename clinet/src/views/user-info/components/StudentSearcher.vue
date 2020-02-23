<template>
  <el-autocomplete
    class="student-search"
    popper-class="my-autocomplete"
    v-model="state"
    :fetch-suggestions="querySearch"
    placeholder="输入学生姓名或学号"
    @select="handleSelect"
    @input="handleInput"
  >
    <template slot-scope="{ item }">
      <div class="name">{{ item.name }}</div>
      <span class="account">{{ item.account }}</span>
    </template>
  </el-autocomplete>
</template>

<script>
import { searchUser } from '@/api/user'
export default {
  name: 'AdminSearcher',
  model: {
    prop: 'value',
    event: 'input'
  },
  data() {
    return {
      admins: [],
      state: ''
    }
  },
  props: {
    value: {
      type: String,
      default: ''
    }
  },
  methods: {
    querySearch(queryString, cb) {
      searchUser(queryString).then(res => {
        const { students } = res.data
        cb(students)
      })
    },
    handleSelect(item) {
      // 当用户选中时，会将 state 内容设置为 undefined，然后触发 handleSelect 事件
      this.state = item.account
      this.$emit('input', this.state)
    },
    handleInput(val) {
      this.$emit('input', val)
    }
  }
}
</script>

<style lang="scss" scoped>
.student-search {
  width: 100%;
  margin-right: 20px;
}
.my-autocomplete {
  li {
    line-height: normal;
    padding: 7px;

    .name {
      text-overflow: ellipsis;
      overflow: hidden;
    }
    .account {
      font-size: 12px;
      color: #b4b4b4;
    }

    .highlighted .account {
      color: #ddd;
    }
  }
}
</style>
