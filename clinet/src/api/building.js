import request from '@/utils/request'

export function getBuildings() {
  return request({
    url: '/building/getBuildings',
    method: 'get'
  })
}

export function getManageBuildings() {
  return request({
    url: '/building/getManageBuildings',
    method: 'get'
  })
}

export function getBuildingInfo(buildingId) {
  return request({
    url: '/building/getBuildingInfo',
    method: 'get',
    params: { buildingId }
  })
}

export function addBuildingWithRoom({ name, floorCount, roomCount }) {
  return request({
    url: '/building/addBuildingWithRoom',
    method: 'post',
    data: { name, floorCount, roomCount }
  })
}

export function delBuilding(id) {
  return request({
    url: '/building/delBuilding',
    method: 'delete',
    params: { id }
  })
}

export function getAdminTableData(buildingId) {
  return request({
    url: '/building/getAdminTableData',
    method: 'get',
    params: { buildingId }
  })
}

export function addAdminToBuilding(adminAccount, buildingId) {
  return request({
    url: '/building/addAdminToBuilding',
    method: 'post',
    data: { adminAccount, buildingId }
  })
}

export function removeBuildingAdmin(adminId, buildingId) {
  return request({
    url: '/building/removeBuildingAdmin',
    method: 'delete',
    params: { adminId, buildingId }
  })
}

export function getCleanerTableData(buildingId) {
  return request({
    url: '/building/getCleanerTableData',
    method: 'get',
    params: { buildingId }
  })
}

export function getBuildingStatistic(buildingId) {
  return request({
    url: '/building/getStatistic',
    method: 'get',
    params: { buildingId }
  })
}
