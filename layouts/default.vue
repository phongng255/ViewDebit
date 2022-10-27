<template>
  <div id="app">
    <Nuxt />
  </div>
</template>

<script>
export default {
  data () {
    return {
      themeKey: 'theme'
    }
  },
  mounted () {
    this.$nextTick(() => {
      this.setTheme('theme-light')
      // let storedTheme;
      // if ((storedTheme = localStorage.getItem(this.themeKey))) {
      //   return this.setTheme(storedTheme);
      // }
    })
  },
  methods: {
    setTheme (theme) {
      document.body.className = document.body.className.replace(/\btheme-[a-z0-9]+\b/g, '')
      document.body.classList.add(theme)
    }
  }
}
</script>
