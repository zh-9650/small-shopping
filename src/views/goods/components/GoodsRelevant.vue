<template>
  <div class="goods-relevant">
    <div class="header">
      <i class="icon"></i>
      <span class="title"> {{ goodsId ? "同类商品推荐" : "猜你喜欢" }}</span>
    </div>
    <ThemeCarousel :sliders="sliders" style="height: 380px" auto-play />
  </div>
</template>
<script>
import { ref } from 'vue'
import { findRelGoods } from '../../../api/goods'
const useRelGoodsData = (id) => {
  const sliders = ref([])
  findRelGoods(id).then(res => {
    const size = 4
    const total = Math.ceil((res.result.length / size))
    // console.log(total);
    for (let i = 0; i < total; i++) {
      sliders.value.push(res.result.slice(i * size, (i + 1) * size))
    }
    // console.log(sliders.value);
  })
  return sliders.value
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
    const sliders = useRelGoodsData(props.goodsId)
    // console.log(sliders);
    return { sliders }
  }
}
</script>

<style scoped lang='less'>
@import url("../../../assets/style/variables.less");
.goods-relevant {
  :deep(.xtx-carousel) {
    height: 380px;
    .carousel {
      &-indicator {
        bottom: 30px;
        span {
          &.active {
            background: @themeColor;
          }
        }
      }
      &-btn {
        top: 110px;
        opacity: 1;
        background: rgba(0, 0, 0, 0);
        color: #ddd;
        i {
          font-size: 30px;
        }
      }
    }
  }
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
