<template>
  <div class="goods-hot">
    <h3>{{ title }}</h3>
    <div>
      <GoodsItem v-for="item in goodsList" :goods="item" :key="item.id" />
    </div>
  </div>
</template>
<script>
import { computed, ref } from '@vue/runtime-core'
import { findHotGoods } from '../../../api/goods'
import GoodsItem from '../../category/components/GoodsItem.vue'
export default {
  name: 'GoodsHot',
  props: {
    type: {
      type: Number,
      default: 1
    },
    goodsId: {
      type: String,
      defualt: undefined
    }
  },
  components: {
    GoodsItem
  },
  setup(props) {
    const titleObj = { 1: '24小时热销榜', 2: '周热销榜', 3: '总热销榜' }
    const goodsList = ref([])
    // console.log(props.type);
    const title = computed(() => {
      return titleObj[props.type]
    })
    findHotGoods(props.goodsId, props.type).then(res => {
      //   console.log(res.result);
      goodsList.value = res.result
    })
    return { title, goodsList }
  }

}
</script>
<style scoped lang="less">
@import url("../../../assets/style/variables.less");
.goods-hot {
  h3 {
    height: 70px;
    background: @helpColor;
    color: #fff;
    font-size: 18px;
    line-height: 70px;
    padding-left: 25px;
    margin-bottom: 10px;
    font-weight: normal;
  }
  ::v-deep .goods-item {
    background: #fff;
    width: 100%;
    margin-bottom: 10px;
    img {
      width: 200px;
      height: 200px;
    }
    p {
      margin: 0 10px;
    }
    &:hover {
      transform: none;
      box-shadow: none;
    }
  }
}
</style>
