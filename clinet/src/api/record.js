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
  return request({
    url: '/record/getUserRecords',
    method: 'get',
    params: { type, userId, days }
  })
}

/**
 * 获取一个宿舍的折线图，参数如下：
  1. type: 获取的折线图类型，可选值为 `getup` `back` `clean`
  2. roomId: 获取数据的宿舍id
 */
export function getLineChartData({ type, roomId }) {
  return request({
    url: '/record/getLineChartData',
    method: 'get',
    params: { type, roomId }
  })
}
