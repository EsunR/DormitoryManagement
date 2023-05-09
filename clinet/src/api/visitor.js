import request from '@/utils/request'

export function getVisitorList({ step = undefined, current = undefined }) {
  return request({
    url: '/visitor/list',
    method: 'get',
    params: { step, current }
  })
}

export function createVisitor({
  name = null,
  phone = null,
  idNumber = null,
  sex = null,
  buildingId = null
}) {
  return request({
    url: '/visitor/create',
    method: 'post',
    data: {
      name,
      phone,
      idNumber,
      sex,
      buildingId
    }
  })
}
