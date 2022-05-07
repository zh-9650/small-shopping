<template>
  <div class="sub-category">
    <div class="container">
      <!-- 面包屑 -->
      <SubBread />
      <!-- 筛选 -->
      <SubFilter />
      <!-- 测试复选框 -->
      <ThemeCheckbox v-model="isAllCheck">全选</ThemeCheckbox>
    </div>
  </div>
</template>

<script>
import { ref } from '@vue/reactivity'
import SubBread from './components/SubBread.vue'
import SubFilter from './components/SubFilter.vue'
export default {
  name: 'SubCategory',
  components: { SubBread, SubFilter },
  setup() {
    const isAllCheck = ref(true)
    return { isAllCheck }
  }
}
</script>
