import request from "../utils/request"
export const findRelGoods = (id, limit = 16) => {
  return request('/goods/relevant', 'get', { id, limit })
}
export const findHotGoods = ({ id, type, limit = 3 }) => {
  return request('/goods/hot', 'get', { id, type, limit })
}
export const findCommentInfoByGoods = (id) => {
  return request(`https://mock.boxuegu.com/mock/1175/goods/${id}/evaluate`, 'get')
}
export const findCommentListByGoods = (id, params) => {
  return request(
    `https://mock.boxuegu.com/mock/1175/goods/${id}/evaluate/page`,
    "get",
    params
  )
}
