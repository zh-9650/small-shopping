import request from '../utils/request'

// 获取所有分类
export const findAllCategory = () => {
  return request('/home/category/head', 'get')
}
export const findTopCategory = (id) => {
  return request('/category', 'get', { id })
}
export const findSubCategoryFilter = (id) => {
  return request('/category/sub/filter', 'get', { id })
}
export const findSubCategoryGoods = (params) => {
  return request('/category/goods/temporary', 'post', params)
}
