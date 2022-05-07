// import ThemesKeleton from './ThemesKeleton.vue'
// import ThemeCarousel from './ThemeCarousel.vue'
// import ThemeMore from './ThemeMore.vue'
// import ThemeBread from './ThemeBread'
// import ThemeBreadItem from './ThemeBreadItem'
const importFn = require.context('./', false, /\.vue$/)
export default {
  install(app) {
    // app.component(ThemesKeleton.name, ThemesKeleton)
    // app.component(ThemeCarousel.name, ThemeCarousel)
    // app.component(ThemeMore.name, ThemeMore)
    // app.component(ThemeBread.name, ThemeBread)
    // app.component(ThemeBreadItem.name, ThemeBreadItem)
    importFn.keys().forEach(key => {
      // 导入组件
      const component = importFn(key).default
      // 注册组件
      app.component(component.name, component)
    })

    defineDirective(app)
  }
}
const defineDirective = (app) => {
  app.directive('lazy', {
    mounted(el, binding) {
      const observe = new IntersectionObserver(([{ isIntersecting }]) => {
        if (isIntersecting) {
          observe.unobserve(el)
          el.src = binding.value
          // console.log(binding.value)
        }
      },
      {
        threshold: 0
      })
      observe.observe(el)
    }
  })
}
