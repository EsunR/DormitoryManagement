import request from '@/utils/request'

export function getBuildings() {
  return request({
    url: '/building/getBuildings',
    method: 'get'
  })
}
