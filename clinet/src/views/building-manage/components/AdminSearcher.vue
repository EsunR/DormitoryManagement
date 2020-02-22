<template>
  <el-autocomplete
    class="admin-search"
    popper-class="my-autocomplete"
    v-model="state"
    :fetch-suggestions="querySearch"
    placeholder="输入管理员姓名或账号"
    @select="handleSelect"
  >
    <template slot-scope="{ item }">
      <div class="name">{{ item.name }}</div>
      <span class="account">{{ item.account }}</span>
    </template>
  </el-autocomplete>
</template>

<script>
import { searchAdmin } from '@/api/user'
export default {
  name: 'AdminSearcher',
  model: {
    prop: 'value',
    event: 'selected'
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
  watch: {
    value(newVal) {
      this.state = newVal
    }
  },
  methods: {
    querySearch(queryString, cb) {
      searchAdmin(queryString).then(res => {
        const { admins } = res.data
        cb(admins)
      })
    },
    handleSelect(item) {
      this.state = item.name
      this.$emit('selected', item.account)
    }
  }
}
</script>

<style lang="scss" scoped>
.admin-search {
  width: 100%;
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
