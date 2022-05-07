<template>
  <div class="top-category">
    <div class="container">
      <!-- 面包屑 -->
      <ThemeBread>
        <ThemeBreadItem to="/">首页</ThemeBreadItem>
        <Transition name="fade">
          <ThemeBreadItem :key="topCategory.id">{{
            topCategory.name
          }}</ThemeBreadItem>
        </Transition>
      </ThemeBread>
      <!-- 轮播图 -->
      <ThemeCarousel
        :sliders="sliders"
        style="height: 500px"
        :autoPlay="true"
      />
      <!-- 所有二级分类 -->
      <div class="sub-list">
        <h3>全部分类</h3>
        <ul>
          <li v-for="sub in topCategory.children" :key="sub.id">
            <a href="javascript:;">
              <img :src="sub.picture" />
              <p>{{ sub.name }}</p>
            </a>
          </li>
        </ul>
      </div>
      <!-- 分类关联商品 -->
      <div class="ref-goods" v-for="item in subList.children" :key="item.id">
        <div class="head">
          <h3>- {{ item.name }} -</h3>
          <p class="tag">温暖柔软，品质之选</p>
          <ThemeMore :path="`/category/sub/${item}`" />
        </div>
        <div class="body">
          <GoodsItem v-for="sub in item.goods" :key="sub.id" :goods="sub" />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { ref } from '@vue/reactivity'
import { useStore } from 'vuex'
import { useRoute } from 'vue-router'
import { computed, watch } from '@vue/runtime-core'
import { findBanner } from '../../api/home'
import GoodsItem from './components/GoodsItem.vue'
import { findTopCategory } from '../../api/category'
export default {
  name: 'TopCategory',
  components: { GoodsItem },
  setup() {
    const sliders = ref([])
    findBanner().then(data => {
      sliders.value = data.result
    })

    const store = useStore()
    const route = useRoute()
    const topCategory = computed(() => {
      let cate = {}
      const item = store.state.category.list.find(item => {
        return item.id === route.params.id
      })
      if (item) cate = item
      return cate
    })

    const subList = ref([])
    const getSubList = () => {
      findTopCategory(route.params.id).then(data => {
        subList.value = data.result
        // console.log(data.result);
      })
    }

    watch(() => route.params.id, (newVal) => {
      if (newVal && `category/${route.params.id}` === route.path) getSubList()
    }, { immediate: true })

    return {
      sliders,
      topCategory,
      subList
    }
  }
}
</script>

<style lang="less" scoped>
@import url("../../assets/style/variables.less");

.fade-enter-active,
.fade-leave-active {
  transition: opacity 1s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
.top-category {
  h3 {
    font-size: 28px;
    color: #666;
    font-weight: normal;
    text-align: center;
    line-height: 100px;
  }
  .sub-list {
    margin-top: 20px;
    background-color: #fff;
    ul {
      display: flex;
      padding: 0 32px;
      flex-wrap: wrap;
      li {
        width: 168px;
        height: 160px;
        a {
          text-align: center;
          display: block;
          font-size: 16px;
          img {
            width: 100px;
            height: 100px;
          }
          p {
            line-height: 40px;
          }
          &:hover {
            color: @themeColor;
          }
        }
      }
    }
  }
  .ref-goods {
    background-color: #fff;
    margin-top: 20px;
    position: relative;
    .head {
      .xtx-more {
        position: absolute;
        top: 20px;
        right: 20px;
      }
      .tag {
        text-align: center;
        color: #999;
        font-size: 20px;
        position: relative;
        top: -20px;
      }
    }
    .body {
      display: flex;
      justify-content: flex-start;
      flex-wrap: wrap;
      padding: 0 65px 30px;
    }
  }
}
</style>
