<template>
  <div class="sub-category">
    <div class="container">
      <!-- 面包屑 -->
      <SubBread />
      <!-- 筛选 -->
      <SubFilter @filter-change="changeFilter" />
      <!-- 测试复选框 -->
      <!-- <ThemeCheckbox v-model="isAllCheck">全选</ThemeCheckbox> -->
      <!-- 排序 -->
      <div class="goods-list">
        <SubSort @sort-change="sortChange" />
        <ul>
          <li v-for="goods in goodsList" :key="goods.id">
            <GoodsItem :goods="goods" :to="`/product/${goods.id}`" />
          </li>
        </ul>
        <ThemeInfiniteLoading
          :loading="loading"
          :finished="finished"
          @infinite="getData"
        />
      </div>
    </div>
  </div>
</template>

<script>
import { ref } from '@vue/reactivity'
import SubBread from './components/SubBread.vue'
import SubFilter from './components/SubFilter.vue'
import SubSort from './components/SubSort.vue'
import GoodsItem from './components/GoodsItem.vue'
import { findSubCategoryGoods } from '../../api/category'
import { watch } from '@vue/runtime-core'
import { useRoute } from 'vue-router'
export default {
  name: 'SubCategory',
  components: { SubBread, SubFilter, SubSort, GoodsItem },
  setup() {
    // const isAllCheck = ref(true)
    const route = useRoute()
    const loading = ref(false)
    const finished = ref(false)
    const goodsList = ref([])
    let reqParams = {
      page: 1,
      pageSize: 20
    }
    const getData = () => {
      loading.value = true
      findSubCategoryGoods(reqParams).then(({ result }) => {
        // console.log(result);
        if (result.items.length) {
          goodsList.value.push(...result.items)
          reqParams.page++
        } else {
          finished.value = true
        }
        loading.value = false;
      })
    }
    watch(() => route.params.id, (newVal) => {
      if (newVal && `/category/sub/${newVal}` === route.path) {
        goodsList.value = []
        finished.value = false
        reqParams = {
          page: 1,
          pageSize: 20
        }
      }
    })
    const sortChange = (sortParams) => {
      // console.log(sortParams)
      finished.value = false
      goodsList.value = []
      reqParams = { ...reqParams, ...sortParams }
      reqParams.page = 1
    }
    const changeFilter = (filterParams) => {
      // console.log(filterParams)
      finished.value = false
      goodsList.value = []
      reqParams = { ...reqParams, ...filterParams }
      reqParams.page = 1
    }
    return { loading, finished, getData, goodsList, sortChange, changeFilter }
  }
}
</script>
<style lang="less" scoped>
.goods-list {
  background: #fff;
  padding: 0 25px;
  margin-top: 25px;
  ul {
    display: flex;
    flex-wrap: wrap;
    padding: 0 5px;
    li {
      margin-right: 20px;
      margin-bottom: 20px;
      &:nth-child(5n) {
        margin-right: 0;
      }
    }
  }
}
</style>
