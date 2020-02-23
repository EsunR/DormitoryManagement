import request from '@/utils/request'

export function register(data) {
  return request({
    url: '/user/register',
    method: 'post',
    data
  })
}

export function login(data) {
  return request({
    url: '/user/login',
    method: 'post',
    data
  })
}

export function getInfo() {
  return request({
    url: '/user/info',
    method: 'get'
  })
}

export function updateInfo({
  name = null,
  phone = null,
  roomId = null,
  checkTime = null,
  password = null
}) {
  const data = { name, phone, roomId, checkTime, password }
  return request({
    url: '/user/updateInfo',
    method: 'post',
    data
  })
}

/**
 * 获取学生用户，传递的 url query 分为以下情况：
  1. 空参数：获取系统内所有的学生用户
  2. ?buildingId=[]: 获取对应宿舍楼的学生用户
  3. ?floorId=[]: 获取对应楼层的学生用户
  4. ?roomId=[]: 获取对应房间的学生用户
 */
export function getStudents(params) {
  return request({
    url: '/user/getStudents',
    method: 'get',
    params
  })
}

export function searchAdmin(keywords) {
  return request({
    url: '/user/searchAdmin',
    method: 'get',
    params: { keywords }
  })
}

export function searchUser(keywords) {
  return request({
    url: '/user/searchUser',
    method: 'get',
    params: { keywords }
  })
}

export function addAdmin({ name, account, phone, password, role }) {
  return request({
    url: '/user/addAdmin',
    method: 'post',
    data: { name, account, phone, password, role }
  })
}

export function getAdminTableData() {
  return request({
    url: '/user/getAdminTableData',
    method: 'get'
  })
}

export function getStudentInfoByIdOrAccount({ type = 'id', value }) {
  console.log('value: ', value)
  return request({
    url: '/user/getStudentInfoByIdOrAccount',
    method: 'get',
    params: { type, value }
  })
}
