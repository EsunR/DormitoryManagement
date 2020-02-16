import request from '@/utils/request'

export function getRooms(params) {
  return request({
    url: '/room/getRooms',
    method: 'get',
    params
  })
}
