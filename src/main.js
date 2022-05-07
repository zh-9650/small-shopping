import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import ThemesKeleton from './components/library/index'

// 初始化样式
import 'normalize.css'
// 引入公共样式
import './assets/style/common.less'

createApp(App).use(store).use(router).use(ThemesKeleton).mount('#app')
