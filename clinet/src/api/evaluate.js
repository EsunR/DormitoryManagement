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
