import request from '@/utils/request'

export function addCleaner({ name, phone, buildingId }) {
  return request({
    url: '/cleaner/addCleaner',
    method: 'post',
    data: { name, phone, buildingId }
  })
}
