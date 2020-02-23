import request from '@/utils/request'

export function addCleaner({ name, phone, buildingId }) {
  return request({
    url: '/cleaner/addCleaner',
    method: 'post',
    data: { name, phone, buildingId }
  })
}

export function delCleaner(cleanerId) {
  return request({
    url: '/cleaner/delCleaner',
    method: 'delete',
    params: { cleanerId }
  })
}
