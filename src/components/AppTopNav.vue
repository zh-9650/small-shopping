<template>
  <nav class="app-top-nav">
    <div class="container">
      <ul>
        <template v-if="profile.token">
          <li>
            <a href="javascript:;"
              ><i class="iconfont icon-user"></i>{{ profile.accout }}</a
            >
          </li>
          <li><a @click="logout" href="javascript:">退出登录</a></li>
        </template>
        <template v-else>
          <li>
            <a><router-link to="/login">请先登录</router-link></a>
          </li>
          <li><a href="javascript:">免费注册</a></li>
        </template>
        <li><router-link :to="`/member/order`">我的订单</router-link></li>
        <li><a href="javascript:">会员中心</a></li>
        <li><a href="javascript:">帮助中心</a></li>
        <li><a href="javascript:">关于我们</a></li>
        <li>
          <a href="javascript:"></a>
        </li>
      </ul>
    </div>
  </nav>
</template>
<script>
import { useStore } from 'vuex'
import { toRef } from 'vue'

export default {
  name: "AppTopNav",
  setup() {
    const store = useStore()
    const user = store.state.user;
    return { profile: toRef(user, 'profile') }
  }
};
</script>
<style scoped lang="less">
@import url("../assets/style/variables.less");
.app-top-nav {
  background: #333;
  ul {
    display: flex;
    height: 53px;
    justify-content: flex-end;
    align-items: center;
    li {
      a {
        padding: 0 15px;
        color: #cdcdcd;
        line-height: 1;
        display: inline-block;
        i {
          font-size: 14px;
          margin-right: 2px;
        }
        &:hover {
          color: @themeColor;
        }
      }
      ~ li {
        a {
          border-left: 2px solid #666;
        }
      }
    }
  }
}

.app-header-nav {
  width: 820px;
  display: flex;
  justify-content: space-around;
  padding-left: 40px;
  position: relative;
  z-index: 998;

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

      > .layer {
        height: 132px;
        opacity: 1;
      }
    }
  }
}
</style>
