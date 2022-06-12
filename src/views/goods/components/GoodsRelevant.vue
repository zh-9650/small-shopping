<template>
  <div class="goods-relevant">
    <div class="header">
      <i class="icon"></i>
      <span class="title"> {{ goodsId ? "同类商品推荐" : "猜你喜欢" }}</span>
    </div>
    <ThemeCarousel :sliders="sliders" />
  </div>
</template>
<script>
import { ref } from 'vue'
import { findRelGoods } from '../../../api/goods'
const useRelGoodsData = (id) => {
  findRelGoods(id).then(res => {
    const silders = ref([])
    const size = 4
    const total = Math.ceil((res.result.length / size))
    // console.log(total);
    for (let i = 0; i < total; i++) {
      silders.value.push(res.result.slice(i * size, (i + 1) * size))
    }
    console.log(silders.value);
    return silders
  })
}
export default {
  name: 'GoodsRelevant',
  props: {
    goodsId: {
      type: String,
      defualt: undefined
    }
  },
  setup(props) {
    const silders = useRelGoodsData(props.goodsId)
    return { silders }
  }
}
</script>

<style scoped lang='less'>
@import url("../../../assets/style/variables.less");
.goods-relevant {
  background: #fff;
  min-height: 460px;
  margin-top: 20px;
  .header {
    height: 80px;
    line-height: 80px;
    padding: 0 20px;
    .title {
      font-size: 20px;
      padding-left: 10px;
    }
    .icon {
      width: 16px;
      height: 16px;
      display: inline-block;
      border-top: 4px solid @themeColor;
      border-right: 4px solid @themeColor;
      box-sizing: border-box;
      position: relative;
      transform: rotate(45deg);
      &::before {
        content: "";
        width: 10px;
        height: 10px;
        position: absolute;
        left: 0;
        top: 2px;
        background: lighten(@themeColor, 40%);
      }
    }
  }
}
</style>
