<template>
  <AppTopNav />
  <AppHeader />
  <AppHeaderSticky />
  <section class="main">
    <RouterView />
  </section>
  <AppFooter />
</template>

<script>
import AppTopNav from '../components/AppTopNav.vue'
import AppHeader from '../components/AppHeader.vue'
import AppFooter from '../components/AppFooter.vue'
import AppHeaderSticky from '../components/AppHeaderSticky.vue'
import { useStore } from 'vuex'
export default {
  name: 'Layout',
  components: {
    AppTopNav,
    AppHeader,
    AppFooter,
    AppHeaderSticky
  },
  setup() {
    const store = useStore()
    store.dispatch('category/getList')
  }
}
</script>
<style lang="less" scoped>
.main {
  margin-bottom: 200px;
}
</style>
