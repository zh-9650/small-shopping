<template>
  <div class="home-new">
    <HomePanel title="新鲜好物" subTitle="新鲜出炉，好物共享">
      <template #right><ThemeMore path="/" /></template>
      <!-- 默认插槽 -->
      <div ref="target" style="position: relative; height: 426px">
        <Transition name="fade">
          <ul v-if="goods.length" ref="pannel" class="goods-list">
            <li v-for="item in goods" :key="item.id">
              <RouterLink :to="`/product/${item.id}`">
                <img v-lazy="item.picture" alt="" />
                <p class="name ellipsis">{{ item.name }}</p>
                <p class="price">&yen;{{ item.price }}</p>
              </RouterLink>
            </li>
          </ul>
          <HomeSkeleton v-else />
        </Transition>
      </div>
    </HomePanel>
  </div>
</template>

<script>
// import { ref } from '@vue/reactivity'
import { findNew } from '../../../api/home'
import HomePanel from './HomePanel.vue'
import HomeSkeleton from './HomeSkeleton.vue'
import { useLazyData } from '../../../hooks/index'
export default {
  name: 'HomeNew',
  components: {
    HomePanel,
    HomeSkeleton
  },
  setup() {
    // const goods = ref([])
    // findNew().then((data) => {
    //   goods.value = data.result
    //   console.log(data.result)
    // })
    // const target = ref(null)
    const { result, target } = useLazyData(findNew)
    return { goods: result, target }
  }
}
</script>

<style lang="less" scoped>
@import url("../../../assets/style/variables.less");
@import url("../../../assets/style/mixins.less");
.goods-list {
  display: flex;
  justify-content: space-between;
  height: 406px;
  li {
    width: 306px;
    height: 406px;
    background: #f0f9f4;
    .hoverShadow();
    img {
      width: 306px;
      height: 306px;
    }
    p {
      font-size: 22px;
      padding: 12px 30px 0 30px;
      text-align: center;
    }
    .price {
      color: @priceColor;
    }
  }
}
</style>
