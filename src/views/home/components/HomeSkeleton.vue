<template>
  <div class="home-skeleton">
    <div class="item" v-for="i in 4" :key="i" :style="{ backgroundColor: bg }">
      <ThemeSkeleton bg="#e4e4e4" width="306px" height="306px" animated />
      <ThemeSkeleton bg="#e4e4e4" width="160px" height="24px" animated />
      <ThemeSkeleton bg="#e4e4e4" width="120px" height="24px" animated />
    </div>
  </div>
</template>

<script>
export default {
  name: 'HomeSkeleton',
  props: {
    bg: {
      type: String,
      default: '#fff'
    }
  }
}
</script>
<style scoped lang='less'>
.fade {
  &-leave {
    &-active {
      position: absolute;
      width: 100%;
      transition: opacity 0.5s 0.2s;
      z-index: 1;
    }
    &-to {
      opacity: 0;
    }
  }
}
.home-skeleton {
  width: 1240px;
  height: 406px;
  display: flex;
  justify-content: space-between;
  .item {
    width: 306px;
    .theme-skeleton ~ .theme-skeleton {
      display: block;
      margin: 16px auto 0;
    }
  }
}
</style>
