<template>
  <div class="goods-sku">
    <dl v-for="item in goods.specs" :key="item.id">
      <dt>{{ item.name }}</dt>
      <dd>
        <template v-for="val in item.values" :key="val.name">
          <img
            @click="changeSku(item.values, val)"
            v-if="val.picture"
            :src="val.picture"
            alt=""
            :title="val.name"
            :class="{ selected: val.selected, disabled: val.disabled }"
          />
          <span
            :class="{ selected: val.selected }"
            @click="changeSku(item.values, val)"
            v-else
            >{{ val.name }}</span
          >
        </template>
      </dd>
    </dl>
  </div>
</template>
<script>
import getPowerSet from '../../../vender/power-set'
const pathMap = {}
const spliter = '☆'
const getPathMap = (skus) => {
  skus.forEach(sku => {
    if (sku.inventory > 0) {
      const valueArr = sku.specs.map(val => val.valueName)
      // console.log(valueArr)
      const powerSet = getPowerSet(valueArr)
      // console.log(pathMap)
      powerSet.forEach(arr => {
        const key = arr.join(spliter)
        if (pathMap[key]) {
          pathMap[key].push(sku.id)
        } else {
          pathMap[key] = [sku.id]
        }
      })
    }
  })
  return pathMap
}
const getSelectedArr = (specs) => {
  const arr = []
  specs.forEach(item => {
    const arrVal = item.values.find(val => val.selected)
    arr.push(arrVal ? arrVal.name : undefined)
  })
  return arr
}
const updateDisabledStatus = (specs, pathMap) => {
  specs.forEach((item, i) => {
    const selectedArr = getSelectedArr(specs)
    item.values.forEach((val) => {
      if (selectedArr[i] === val.name) return false
      selectedArr[i] = val.name
      // console.log(selectedArr)
      const key = selectedArr.filter(v => v).join(spliter)
      // console.log(key)
      val.disabled = !pathMap[key]
    })
  });
}
// 初始化选中状态
const initSelectedStatus = (goods, skuId) => {
  const sku = goods.skus.find(sku => sku.id === skuId)
  if (sku) {
    goods.specs.forEach((spec, i) => {
      const value = sku.specs[i].valueName
      spec.values.forEach(val => {
        val.selected = val.name === value
      })
    })
  }
}
export default {
  name: 'GoodsSku',
  props: {
    goods: {
      type: Object,
      default: () => { }
    },
    skuId: {
      type: String,
      default: ''
    }
  },
  setup(props, { emit }) {
    const pathMap = getPathMap(props.goods.skus)
    // console.log(pathMap)
    initSelectedStatus(props.goods, props.skuId)
    updateDisabledStatus(props.goods.specs, pathMap)
    const changeSku = (item, val) => {
      if (val.disabled) return
      if (val.selected) {
        val.selected = !val.selected
      } else {
        item.forEach(element => {
          element.selected = false
          val.selected = true
        });
      }
      updateDisabledStatus(props.goods.specs, pathMap)
      // 触发change事件将sku数据传递出去
      const selectedArr = getSelectedArr(props.goods.specs).filter(v => v)
      if (selectedArr.length === props.goods.specs.length) {
        const skuIds = pathMap[selectedArr.join(spliter)]
        const sku = props.goods.skus.find(sku => sku.id === skuIds[0])
        // 传递
        emit('change', {
          skuId: sku.id,
          price: sku.price,
          oldPrice: sku.oldPrice,
          inventory: sku.inventory,
          specsText: sku.specs.reduce((p, n) => `${p} ${n.name}：${n.valueName}`, '').replace(' ', '')
        })
      } else {
        emit('change', {})
      }
    }

    return { changeSku }
  }
}
</script>
<style scoped lang="less">
@import url("../../../assets/style/mixins.less");
@import url("../../../assets/style/variables.less");
.sku-state-mixin () {
  border: 1px solid #e4e4e4;
  margin-right: 10px;
  cursor: pointer;
  &.selected {
    border-color: @themeColor;
  }
  &.disabled {
    opacity: 0.6;
    border-style: dashed;
    cursor: not-allowed;
  }
}
.goods-sku {
  padding-left: 10px;
  padding-top: 20px;
  dl {
    display: flex;
    padding-bottom: 20px;
    align-items: center;
    dt {
      width: 50px;
      color: #999;
    }
    dd {
      flex: 1;
      color: #666;
      > img {
        width: 50px;
        height: 50px;
        .sku-state-mixin ();
      }
      > span {
        display: inline-block;
        height: 30px;
        line-height: 28px;
        padding: 0 20px;
        .sku-state-mixin ();
      }
    }
  }
}
</style>
