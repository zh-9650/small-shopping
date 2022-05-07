<template>
  <div class="home-entry">
    <!-- 首页入口 -->
    <div class="container">
      <!-- 左侧分类 -->
      <HomeCategory />
      <!-- 轮播 -->
      <HomeBanner />
    </div>
  </div>
  <!-- 新鲜好物 -->
  <HomeNew />
  <!-- 人气推荐 -->
  <HomeHot />
  <!-- 品牌 -->
  <HomeBrand />
  <!-- 商品模块 -->
  <HomeProduct />
  <!-- 最新专题 -->
  <HomeSpecial />
</template>

<script>
import HomeCategory from "./components/HomeCategory.vue"
import HomeBanner from './components/HomeBanner.vue'
import HomeNew from './components/HomeNew.vue'
import HomeHot from './components/HomeHot.vue'
import HomeBrand from './components/HomeBrand.vue'
import HomeProduct from './components/HomeProduct.vue'
import HomeSpecial from './components/HomeSpecial.vue'
export default {
  name: 'HomePage',
  components: { HomeCategory, HomeBanner, HomeNew, HomeHot, HomeBrand, HomeProduct, HomeSpecial }
}
</script>
<style lang="less" scoped>
</style>
