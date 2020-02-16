import request from '@/utils/request'

export function getFloors(params) {
  return request({
    url: '/floor/getFloors',
    method: 'get',
    params
  })
}
