import request from '@/utils/request'

export function getFacultyList() {
  return request({
    url: '/faculty/list',
    method: 'get'
  })
}
