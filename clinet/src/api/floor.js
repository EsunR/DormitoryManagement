import request from '@/utils/request'

export function getFloors(params) {
  return request({
    url: '/floor/getFloors',
    method: 'get',
    params
  })
}

export function getFloorsDetail(buildingId) {
  return request({
    url: '/floor/getFloorsDetail',
    method: 'get',
    params: { buildingId }
  })
}

export function addCleanerToFloor(floorId, cleanerId) {
  return request({
    url: '/floor/addCleanerToFloor',
    method: 'post',
    data: { floorId, cleanerId }
  })
}
