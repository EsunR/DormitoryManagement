import request from '@/utils/request'

/**
 * 获取评价信息，传入的 url query 分为以下情况：
  1. ?userId=[] 获取创建者创建的评价
  2. ?roomId=[] 获取该房间的评价
 */
export function getEvaluates(params) {
  return request({
    url: '/evaluate/getEvaluates',
    method: 'get',
    params
  })
}

export function addEvaluate({ note, score, roomId }) {
  return request({
    url: '/evaluate/addEvaluate',
    method: 'post',
    data: { note, score, roomId }
  })
}

export function removeEvaluate(evaluateId) {
  return request({
    url: '/evaluate/removeEvaluate',
    method: 'delete',
    params: { evaluateId }
  })
}
