<template>
  <div class="goods-tabs">
    <nav>
      <a
        href="javascript:;"
        :class="{ active: activeName === 'GoodsDetail' }"
        @click="checkTab('GoodsDetail')"
        >商品详情</a
      >
      <a
        href="javascript:;"
        :class="{ active: activeName === 'GoodsComment' }"
        @click="checkTab('GoodsComment')"
        >商品评价<span>{{ goods.commentCount }}</span></a
      >
    </nav>
    <component :is="activeName" />
  </div>
</template>

<script>
import GoodsDetail from './GoodsDetail.vue'
import GoodsComment from './GoodsComment.vue'
import { ref } from '@vue/reactivity'
import { inject } from '@vue/runtime-core'
export default {
  name: 'GoogsTabs',
  components: {
    GoodsComment, GoodsDetail
  },
  setup() {
    const activeName = ref('GoodsDetail')
    const checkTab = (name) => {
      activeName.value = name
    }
    const goods = inject('goods')
    // console.log(goods.value);
    return { activeName, checkTab, goods }
  }
}
</script>

<style scoped lang="less">
@import url("../../../assets/style/variables.less");
.goods-tabs {
  min-height: 600px;
  background: #fff;
  nav {
    height: 70px;
    line-height: 70px;
    display: flex;
    border-bottom: 1px solid #f5f5f5;
    a {
      padding: 0 40px;
      font-size: 18px;
      position: relative;
      > span {
        color: @priceColor;
        font-size: 16px;
        margin-left: 10px;
      }
      &:first-child {
        border-right: 1px solid #f5f5f5;
      }
      &.active {
        &::before {
          content: "";
          position: absolute;
          left: 40px;
          bottom: -1px;
          width: 72px;
          height: 2px;
          background: @themeColor;
        }
      }
    }
  }
}
</style>
