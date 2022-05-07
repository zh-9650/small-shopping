<template>
  <RouterView />
  <!-- <div> 测试持久化
    App {{ $store.state.user.profile.accout }}
    <button @click="$store.commit('user/setUser', { accout: 'zhousg' })">
      点击
    </button>-->
  <!-- 测试token以及登陆跳转 App <button @click="fn">test工具函数</button>
  </div>-->
</template>

<script>
export default {
  setup() {
    /** 测试token及登陆跳转
     function fn() {
      requset('/member/profile', 'get', { a: 10 })
    }
    return { fn } */
  },
};
</script>
