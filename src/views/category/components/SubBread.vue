<template>
  <ThemeBread>
    <ThemeBreadItem to="/">首页</ThemeBreadItem>
    <ThemeBreadItem v-if="category.top">{{ category.top.name }}</ThemeBreadItem>
    <Transition name="fade-f">
      <ThemeBreadItem v-if="category.sub" :key="category.sub.id">{{
        category.sub.name
      }}</ThemeBreadItem>
    </Transition>
  </ThemeBread>
</template>

<script>
import { computed } from '@vue/runtime-core';
import { useRoute } from 'vue-router';
import { useStore } from 'vuex'
export default {
  name: 'SubBread',
  setup() {
    const store = useStore()
    const route = useRoute()
    const category = computed(() => {
      const cate = {}
      store.state.category.list.forEach(top => {
        const sub = top.children.find(sub => { return sub.id === route.params.id })
        if (sub) {
          cate.top = { id: top.id, name: top.name }
          cate.sub = { id: sub.id, name: sub.name }
        }
      });
      return cate
    })
    return { category }
  }

}
</script>

<style lang="less" scoped>
.fade-f-enter-active,
.fade-f-leave-active {
  transition: opacity 1s ease;
}

.fade-f-enter-from,
.fade-f-leave-to {
  opacity: 0;
}
</style>
