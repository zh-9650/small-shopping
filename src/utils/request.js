import axios from 'axios'
import store from '../store/index'
import router from '../router/index'

// 创建实列
const instance = axios.create({
  baseURL: 'https://mock.boxuegu.com/mock/1175/',
  timeout: 5000,
})

instance.interceptors.request.use(config => {
  const { profile } = store.state.user
  if (profile.token) {
    // 配置token
    config.headers.Authorization = `Bearer ${profile.token}`
  }
  return config;
}, error => {
  return Promise.reject(error);
});

instance.interceptors.response.use(response => response.data, error => {
  if (error.response.status === 401) {
    // 清空无效用户信息
    store.commit('user/setUser', {})
    // 跳转登陆页面 携带当前路由地址
    // 组件内获取 $router.path $router.fullPath js模块获取 router.currentRoute.vlaue.fullPath (.value原因：router.currentRoute为ref响应式)
    const fullPath = encodeURIComponent(router.currentRoute.value.fullPath)// 转换url编码 防止地址出问题
    router.push('/login?redirectUrl=' + fullPath)
  }
  return Promise.reject(error);
});

export default (url, method, SubmitData) => {
  return instance({
    url,
    method,
    [method.toLowerCase() === 'get' ? 'params' : 'data']: SubmitData
  })
}
