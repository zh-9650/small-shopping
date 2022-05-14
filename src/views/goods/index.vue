<template>
  <div class="xtx-goods-page">
    <div class="container">
      <!-- 面包屑 -->
      <ThemeBread>
        <ThemeBreadItem to="/">首页</ThemeBreadItem>
        <ThemeBreadItem :to="`/category/${goods.categories[1].id}`">{{
          goods.categories[1].name
        }}</ThemeBreadItem>
        <ThemeBreadItem :to="`/category/${goods.categories[0].id}`">{{
          goods.categories[0].name
        }}</ThemeBreadItem>
        <ThemeBreadItem>{{ goods.name }}</ThemeBreadItem>
      </ThemeBread>
      <!-- 商品信息 -->
      <div class="goods-info"></div>
      <!-- 商品推荐 -->
      <GoodsRelevant v-if="goods" />
      <!-- 商品详情 -->
      <div class="goods-footer">
        <div class="goods-article">
          <!-- 商品+评价 -->
          <div class="goods-tabs"></div>
          <!-- 注意事项 -->
          <div class="goods-warn"></div>
        </div>
        <!-- 24热榜+专题推荐 -->
        <div class="goods-aside"></div>
      </div>
    </div>
  </div>
</template>

<script>
import { ref } from '@vue/reactivity'
import GoodsRelevant from './components/GoodsRelevant.vue'
import { useRoute } from 'vue-router'
import { findGoods } from '../../api/product.js'
import { watch } from '@vue/runtime-core'
export default {
  name: 'ThemeGoodsPage',
  components: { GoodsRelevant },
  setup() {
    const goods = useGoods()
    return { goods }
  }
}
const useGoods = () => {
  const goods = ref(null)
  const route = useRoute()
  watch(() => route.params.id, (newVal) => {
    if (newVal && `/product/${newVal}` === route.path) {
      findGoods(route.params.id).then(data => {
        goods.value = data.result
        console.log(goods.value)
      })
    }
  }, { immediate: true })
  return goods
}
</script>

<style scoped lang='less'>
.goods-info {
  min-height: 600px;
  background: #fff;
}
.goods-footer {
  display: flex;
  margin-top: 20px;
  .goods-article {
    width: 940px;
    margin-right: 20px;
  }
  .goods-aside {
    width: 280px;
    min-height: 1000px;
  }
}
.goods-tabs {
  min-height: 600px;
  background: #fff;
}
.goods-warn {
  min-height: 600px;
  background: #fff;
  margin-top: 20px;
}
</style>
