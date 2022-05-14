<template>
  <!-- 筛选区 -->
  <div class="sub-filter" v-if="filterData">
    <div class="item">
      <div class="head">品牌：</div>
      <div class="body">
        <a
          @click="changeBranad(brand.id)"
          :class="{ active: filterData.selectedBrand === brand.id }"
          href="javascript:void(0)"
          v-for="brand in filterData.brands"
          :key="brand.id"
          >{{ brand.name }}</a
        >
      </div>
    </div>
    <div class="item" v-for="sub in filterData.saleProperties" :key="sub.id">
      <div class="head">{{ sub.name }}：</div>
      <div class="body">
        <a
          @click="changeProp(sub, prop.id)"
          href="javascript:void(0)"
          :class="{ active: sub.selectedProp === prop.id }"
          v-for="prop in sub.properties"
          :key="prop.id"
          >{{ prop.name }}</a
        >
      </div>
    </div>
  </div>
</template>
<script>
import { ref, watch } from '@vue/runtime-core'
import { useRoute } from 'vue-router'
// import { useStore } from 'vuex'
import { findSubCategoryFilter } from '../../../api/category'
export default {
  name: 'SubFilter',
  setup(props, { emit }) {
    const route = useRoute()
    const filterData = ref(null)
    // const stroe = useStore()
    watch(() => route.params.id, (newVal) => {
      if (newVal && `/category/sub/${newVal}` === route.path) {
        findSubCategoryFilter(route.params.id).then(data => {
          data.result.brands.unshift({ id: null, name: '全部' })
          data.result.selectedBrand = null
          // console.log(data.result);
          filterData.value = data.result
          data.result.saleProperties.forEach(p => {
            p.selectedProp = null
            p.properties.unshift({ id: null, name: '全部' })
          })
        })
      }
    }, { immediate: true })
    const getFilterParams = () => {
      const obj = { brand: null, attrs: [] }
      obj.brand = filterData.value.selectedBrand
      filterData.value.saleProperties.forEach(item => {
        if (item.selectedProp) {
          const prop = item.properties.find(p => item.selectedProp === p.id)
          obj.attrs.push({ groupName: item.name, propertyName: prop.name })
        }
      })
      if (obj.attrs.length === 0) obj.attrs = null
      return obj
    }
    const changeBranad = (brandId) => {
      if (filterData.value.selectedBrand === brandId) return
      filterData.value.selectedBrand = brandId
      emit('filter-change', getFilterParams())
    }
    const changeProp = (sub, propId) => {
      if (sub.selectedProp === propId) return
      sub.selectedProp = propId
      emit('filter-change', getFilterParams())
    }
    return { filterData, changeBranad, changeProp }
  }
}
</script>
<style scoped lang='less'>
@import url("../../../assets/style/variables.less");
// 筛选区
.sub-filter {
  background: #fff;
  padding: 25px;
  .item {
    display: flex;
    line-height: 40px;
    .head {
      width: 80px;
      color: #999;
    }
    .body {
      flex: 1;
      a {
        margin-right: 36px;
        transition: all 0.3s;
        display: inline-block;
        &.active,
        &:hover {
          color: @themeColor;
        }
      }
    }
  }
}
</style>
