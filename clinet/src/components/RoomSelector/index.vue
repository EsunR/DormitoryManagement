<template>
  <div class="room-selector">
    <el-cascader
      v-model="selected"
      :show-all-levels="true"
      :props="{
        lazy: true,
        lazyLoad: lazyLoadFunc,
        value: 'id',
        label: 'label'
      }"
      @change="handleSelectorChange"
    ></el-cascader>
  </div>
</template>

<script>
import { getBuildings } from '@/api/building'
import { getFloors } from '@/api/floor'
import { getRooms } from '@/api/room'
export default {
  name: 'RoomSelector',
  model: {
    prop: 'value',
    event: 'select'
  },
  data() {
    return {
      selected: []
    }
  },
  props: ['value'],
  methods: {
    lazyLoadFunc(node, resolve) {
      const { level } = node
      switch (level) {
        case 0:
          getBuildings().then(res => {
            const { buildings } = res.data
            buildings.forEach(item => {
              item.label = item.name
              item.leaf = false
            })
            resolve(buildings)
          })
          break
        case 1:
          this.buildingId = node.value
          getFloors({ buildingId: this.buildingId }).then(res => {
            const { floors } = res.data
            floors.forEach(item => {
              item.label = item.layer + '层'
              item.leaf = false
            })
            resolve(floors)
          })
          break
        case 2:
          this.floorId = node.value
          getRooms({ floorId: this.floorId }).then(res => {
            const { rooms } = res.data
            rooms.forEach(item => {
              item.label = item.number
              item.disabled = item.isFull || item.status === 0
              item.leaf = true
            })
            resolve(rooms)
          })
          break
      }
    },
    handleSelectorChange(value) {
      // roomId roomPath
      this.$emit('select', value[value.length - 1], value)
    }
  }
}
</script>

<style lang="scss" scoped></style>
