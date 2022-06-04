<template>
  <div class="xtx-city" ref="target">
    <div class="select" :class="{ active: visible }" @click="toggle()">
      <span v-if="!fullLocation" class="placeholder">请选择配送地址 </span>
      <span v-else class="value">{{ fullLocation }}</span>
      <i class="iconfont icon-angle-down"></i>
    </div>
    <div class="option" v-show="visible">
      <div v-if="loading" class="loading"></div>
      <template v-else>
        <span
          @click="changeItem(item)"
          class="ellipsis"
          v-for="item in currList"
          :key="item.code"
          >{{ item.name }}</span
        >
      </template>
    </div>
  </div>
</template>
<script>
import { reactive, ref } from '@vue/reactivity'
import { onClickOutside } from '@vueuse/core'
import axios from 'axios'
import { computed } from '@vue/runtime-core'
export default {
  name: 'ThemeCity',
  props: {
    fullLocation: {
      type: String,
      defualt: ''
    }
  },
  setup(props, { emit }) {
    const visible = ref(false)
    const target = ref(null)
    const cityData = ref([])
    const loading = ref(false)
    const toggle = () => {
      visible.value = visible.value === true ? !visible.value : visible.value = true
      if (visible.value) {
        loading.value = true
        getCityData().then(data => {
          //   console.log(data)
          cityData.value = data
          loading.value = false
        })
        for (const key in changeResult) {
          changeResult[key] = ''
        }
      }
    }
    const currList = computed(() => {
      // 省
      let currList = cityData.value
      // 市
      if (changeResult.provinceCode) {
        currList = currList.find(p => p.code === changeResult.provinceCode).areaList
      }
      // 区
      if (changeResult.cityCode) {
        currList = currList.find(p => p.code === changeResult.cityCode).areaList
      }
      return currList
    })
    onClickOutside(target, () => { visible.value = false })
    // 获取城市数据
    const getCityData = () => {
      return new Promise((resolve, reject) => {
        const url = 'https://yjy-oss-files.oss-cn-zhangjiakou.aliyuncs.com/tuxian/area.json'
        if (window.cityData) {
          resolve(window.cityData)
        } else {
          axios.get(url).then(res => {
            window.cityData = res.data
            resolve(window.cityData)
          })
        }
      })
    }
    const changeResult = reactive({
      provinceCode: '',
      provinceName: '',
      cityCode: '',
      cityName: '',
      countyCode: '',
      countyName: '',
      fullLocation: ''
    })
    const changeItem = (item) => {
      if (item.level === 0) {
        changeResult.provinceCode = item.code
        changeResult.provinceName = item.name
      } else if (item.level === 1) {
        changeResult.cityCode = item.code
        changeResult.cityName = item.name
      } else if (item.level === 2) {
        changeResult.countyCode = item.code
        changeResult.countyName = item.name
        changeResult.fullLocation = `${changeResult.provinceName} ${changeResult.cityName} ${changeResult.countyName}`
        visible.value = false
        emit('change', changeResult)
      }
    }
    return { visible, toggle, target, loading, currList, changeItem }
  }
}
</script>
<style scoped lang="less">
.xtx-city {
  display: inline-block;
  position: relative;
  z-index: 400;
  .select {
    border: 1px solid #e4e4e4;
    height: 30px;
    padding: 0 5px;
    line-height: 28px;
    cursor: pointer;
    &.active {
      background: #fff;
    }
    .placeholder {
      color: #999;
    }
    .value {
      color: #666;
      font-size: 12px;
    }
    i {
      font-size: 12px;
      margin-left: 5px;
    }
  }
  .option {
    width: 542px;
    border: 1px solid #e4e4e4;
    position: absolute;
    left: 0;
    top: 29px;
    background: #fff;
    min-height: 30px;
    line-height: 30px;
    display: flex;
    flex-wrap: wrap;
    padding: 10px;
    > span {
      width: 130px;
      text-align: center;
      cursor: pointer;
      border-radius: 4px;
      padding: 0 3px;
      &:hover {
        background: #f5f5f5;
      }
    }
    .loading {
      height: 290px;
      width: 100%;
      background: url(../../assets/images/loading.gif) no-repeat center;
    }
  }
}
</style>
