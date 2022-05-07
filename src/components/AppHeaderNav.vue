<template>
  <ul class="app-header-navs">
    <li class="home"><RouterLink to="/">首页</RouterLink></li>
    <li
      v-for="items in list"
      :key="items.id"
      @mousemove="show(items)"
      @mouseleave="hide(items)"
    >
      <router-link :to="`/category/${items.id}`" @click="hide(items)">{{
        items.name
      }}</router-link>
      <div class="layer" :class="{ open: items.open }">
        <ul>
          <li v-for="sub in items.children" :key="sub.id">
            <router-link :to="`/category/sub/${sub.id}`" @click="hide(items)">
              <img :src="sub.picture" />
              <p>{{ sub.name }}</p>
            </router-link>
          </li>
        </ul>
      </div>
    </li>
  </ul>
</template>

<script>
import { computed } from 'vue'
import { useStore } from 'vuex'
export default {
  setup() {
    const store = useStore()
    const list = computed(() => {
      return store.state.category.list
    })
    const show = (item) => {
      store.commit('category/show', item.id)
      // console.log(item.open)
    }
    const hide = (item) => {
      store.commit('category/hide', item.id)
      // console.log(item.open)
    }
    return { list, show, hide }
  }
}
</script>

<style scoped lang="less">
@import url("../assets/style/variables.less");
.app-header-navs {
  position: relative;
  width: 820px;
  display: flex;
  justify-content: space-around;
  padding-left: 40px;
  > li {
    margin-right: 40px;
    width: 38px;
    text-align: center;
    > a {
      font-size: 16px;
      line-height: 32px;
      height: 32px;
      display: inline-block;
    }
    &:hover {
      > a {
        color: @themeColor;
        border-bottom: 1px solid @themeColor;
      }
      > .open {
        height: 132px;
        opacity: 1;
      }
    }
  }
}
.layer {
  & .open {
    height: 132px;
    opacity: 1;
  }
  width: 1240px;
  background-color: #fff;
  position: absolute;
  left: -200px;
  top: 56px;
  height: 0;
  overflow: hidden;
  opacity: 0;
  box-shadow: 0 0 5px #ccc;
  transition: all 0.2s 0.1s;
  z-index: 999;
  ul {
    display: flex;
    flex-wrap: wrap;
    padding: 0 70px;
    align-items: center;
    height: 132px;
    li {
      width: 110px;
      text-align: center;
      img {
        width: 60px;
        height: 60px;
      }
      p {
        padding-top: 10px;
      }
      &:hover {
        p {
          color: @themeColor;
        }
      }
    }
  }
}
</style>
