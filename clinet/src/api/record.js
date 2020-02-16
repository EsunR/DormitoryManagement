import request from '@/utils/request'

export function addRecord({ type }) {
  return request({
    url: '/record/addRecord',
    method: 'post',
    data: { type }
  })
}

/**
 *获取用户的记录，传入的 url query 分为以下几个必传参数：
  1. type: 查询的记录类型，可能指为 `getup` `back` `clean`
  2. userId: 查询的用户id
  3. days: 查询的天数
 */
export function getUserRecords({ type, userId, days }) {
  const params = { type, userId, days }
  return request({
    url: '/record/getUserRecords',
    method: 'get',
    params
  })
}
