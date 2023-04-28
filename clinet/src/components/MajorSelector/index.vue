<template>
  <div class="major-selector">
    <el-cascader
      :value="value"
      @change="$emit('change', $event)"
      :options="data"
      :props="{
        value: 'id',
        label: 'name',
        children: 'majors'
      }"
    ></el-cascader>
  </div>
</template>

<script>
import { getFacultyList } from '@/api/faculty'

export default {
  model: {
    prop: 'value',
    event: 'change'
  },
  props: {
    value: {
      type: Array,
      default: () => []
    }
  },
  data() {
    return {
      data: []
    }
  },
  methods: {
    fetchFacultyList() {
      getFacultyList().then(res => {
        this.data = res.data
      })
    }
  },
  mounted() {
    this.fetchFacultyList()
  }
}
</script>

<style lang="scss" scoped>
.major-selector {
  width: 100%;
}
</style>
