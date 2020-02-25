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
  4. pure：是否获取未补全的数据
 */
export function getUserRecords({ type, userId, days, pure = false }) {
  return request({
    url: '/record/getUserRecords',
    method: 'get',
    params: { type, userId, days, pure }
  })
}

export function getRoomRecords({ type, roomId, days, pure = false }) {
  return request({
    url: '/record/getRoomRecords',
    method: 'get',
    params: { type, roomId, days, pure }
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

/**
 * 获取用户的早起率、早归率、打扫频率，参数如下：
  1. ?userId=[] 用户ID
 */
export function getUserProbability(userId) {
  return request({
    url: '/record/getUserProbability',
    method: 'get',
    params: { userId }
  })
}

/**
 * 获取记录表格数据：
  - type: 获取的记录类型（必选）
  - current: 当前页（可选，默认1）
  - step: 分页间隔（可选，默认10）
  - buildingId （可选）
  - floorId（可选）
  - roomId (可选)
  - userId(可选)
  - startTime: 起始时间（可选）
  - endTime：结束时间（可选）
 */
export function getRecordTableData(
  type,
  {
    current = undefined,
    step = undefined,
    buildingId = undefined,
    floorId = undefined,
    roomId = undefined,
    userId = undefined,
    startTime = undefined,
    endTime = undefined
  }
) {
  return request({
    url: '/record/getRecordTableData',
    method: 'get',
    params: {
      type,
      current,
      step,
      buildingId,
      floorId,
      roomId,
      userId,
      startTime,
      endTime
    }
  })
}
