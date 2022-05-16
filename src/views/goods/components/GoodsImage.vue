<template>
  <div class="goods-image">
    <!-- 大图 -->
    <div
      class="large"
      :style="[{ backgroundImage: `url(${images[currIndex]})` }, largePosition]"
      v-show="show"
    ></div>
    <!-- 中图 -->
    <div class="middle" ref="target">
      <img :src="images[currIndex]" alt="" />
      <!-- 遮罩 -->
      <div class="layer" v-show="show" :style="layerPosition"></div>
    </div>
    <!-- 小图 -->
    <ul class="small">
      <li
        v-for="(img, i) in images"
        :key="img"
        :class="{ active: i === currIndex }"
      >
        <img @mouseenter="currIndex = i" :src="img" alt="" />
      </li>
    </ul>
  </div>
</template>
<script>
import { reactive, ref, watch } from 'vue'
import { useMouseInElement } from '@vueuse/core'
export default {
  name: 'GoodsImage',
  props: {
    images: {
      type: Array,
      default: () => []
    }
  },
  setup(props) {
    const currIndex = ref(0)
    const show = ref(false)
    // 遮罩坐标
    const layerPosition = reactive({
      top: 0,
      left: 0
    })
    // 大图坐标
    const largePosition = reactive({ backgroundPositionX: 0, backgroundPositionY: 0 })
    const target = ref(null)
    const { elementX, elementY, isOutside } = useMouseInElement(target)
    const position = reactive({
      top: 0,
      left: 0
    })
    watch([elementX, elementY, isOutside], () => {
      // console.log(elementX.value, elementY.value, isOutside.value)
      // console.log(target.value)
      show.value = !isOutside.value
      if (elementX.value < 100) position.left = 0
      else if (elementX.value > 300) position.left = 200
      else position.left = elementX.value - 100

      if (elementY.value < 100) position.top = 0
      else if (elementY.value > 300) position.top = 200
      else position.top = elementY.value - 100
      // 遮罩层定位
      layerPosition.top = position.top + 'px'
      layerPosition.left = position.left + 'px'
      // 大图定位
      largePosition.backgroundPositionX = -2 * position.left + 'px'
      largePosition.backgroundPositionY = -2 * position.top + 'px'
    })
    return { currIndex, show, target, layerPosition, largePosition }
  }
}
</script>
<style scoped lang="less">
@import url("../../../assets/style/variables.less");
.goods-image {
  width: 480px;
  height: 400px;
  position: relative;
  display: flex;
  z-index: 500;
  .large {
    position: absolute;
    top: 0;
    left: 412px;
    width: 400px;
    height: 400px;
    box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
    background-repeat: no-repeat;
    background-size: 800px 800px;
    background-color: #f8f8f8;
  }
  .middle {
    width: 400px;
    height: 400px;
    background: #f5f5f5;
    position: relative;
    cursor: move;
    .layer {
      width: 200px;
      height: 200px;
      background: rgba(0, 0, 0, 0.2);
      left: 0;
      top: 0;
      position: absolute;
    }
  }
  .small {
    width: 80px;
    li {
      width: 68px;
      height: 68px;
      margin-left: 12px;
      margin-bottom: 15px;
      cursor: pointer;
      &:hover,
      &.active {
        border: 2px solid @themeColor;
      }
    }
  }
}
</style>
