<template>
  <HomePanel title="人气推荐" sub-title="人气爆款 不容错过">
    <div ref="target" style="position: relative; height: 426px">
      <Transition name="fade">
        <ul v-if="hotGoods.length" ref="pannel" class="goods-list">
          <li v-for="item in hotGoods" :key="item.id">
            <RouterLink to="/">
              <img v-lazy="item.picture" alt="" />
              <p class="name">{{ item.title }}</p>
              <p class="desc">{{ item.alt }}</p>
            </RouterLink>
          </li>
        </ul>
        <HomeSkeleton v-else />
      </Transition>
    </div>
  </HomePanel>
</template>

<script>
// import { ref } from '@vue/reactivity'
import { findHot } from '../../../api/home'
import HomePanel from './HomePanel.vue'
import HomeSkeleton from './HomeSkeleton.vue'
import { useLazyData } from '../../../hooks/index'
export default {
  name: 'HomeHot',
  components: { HomePanel, HomeSkeleton },
  setup() {
    // const hotGoods = ref([])
    // const target = ref(null)
    // findHot().then(data => {
    //   hotGoods.value = data.result
    //   //   console.log(data.result)
    // })
    const { result, target } = useLazyData(findHot)
    return { hotGoods: result, target }
  }
}
</script>
<style lang="less" scoped>
@import url("../../../assets/style/mixins.less");
.goods-list {
  display: flex;
  justify-content: space-between;
  height: 426px;
  li {
    width: 306px;
    height: 406px;
    .hoverShadow();
    img {
      width: 306px;
      height: 306px;
    }
    p {
      font-size: 22px;
      padding-top: 12px;
      text-align: center;
    }
    .desc {
      color: #999;
      font-size: 18px;
    }
  }
}
</style>
