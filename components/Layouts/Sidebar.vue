<template>
  <div class="sidebar-wrapper active">
    <div class="sidebar-header">
      <div class="d-flex justify-content-between">
        <div class="logo">
          <nuxt-link to="/">
            <img src="~/assets/images/logo/logo.png" alt="Logo">
          </nuxt-link>
        </div>
        <div class="theme-toggle d-flex gap-2 align-items-center mt-2">
          <i class="bi bi-cloud-sun d-flex align-items-center fs-6" />
          <div class="form-check form-switch d-flex justify-content-center fs-6">
            <input id="toggle-dark" class="form-check-input me-0" type="checkbox">
            <label class="form-check-label" />
          </div>
          <i class="bi bi-moon-stars d-flex align-items-center fs-6" />
        </div>
        <div class="sidebar-toggler x">
          <a href="#" class="sidebar-hide d-xl-none d-block">
            <i class="bi bi-x bi-middle" />
          </a>
        </div>
      </div>
    </div>

    <div class="sidebar-menu">
      <ul class="menu">
        <template v-for="item in sidebars">
          <li v-if="item.isTitle" :key="item.name" class="sidebar-title">
            {{ item.name }}
          </li>
          <li
            v-else
            :key="item.url"
            class="sidebar-item"
            :class="{
              'active': isActive(item.url) || subIsActive(item),
              'has-sub': isHasSub(item),
            }"
          >
            <template v-if="isHasSub(item)">
              <a class="sidebar-link">
                <i :class="`bi bi-${item.icon}`"></i>
                <span>{{ item.name }}</span>
              </a>

              <ul class="submenu" :class="{ active: subIsActive(item) }">
                <li
                  v-for="sub in item.submenu"
                  :key="sub.key"
                  class="submenu-item"
                  :class="{ active: isActive(sub.url) }"
                >
                  <nuxt-link :to="sub.url">
                    {{ sub.name }}
                  </nuxt-link>
                </li>
              </ul>
            </template>

            <template v-else>
              <nuxt-link class="sidebar-link align-middle" :to="item.url">
                <i :class="`bi bi-${item.icon}`" />
                <span>{{ item.name }}</span>
              </nuxt-link>
            </template>
          </li>
        </template>
      </ul>
    </div>

    <button class="sidebar-toggler btn x">
      <i data-feather="x" />
    </button>
  </div>
</template>

<script>
export default {
  props: {
    adminlayout: {
      default: false,
      type: Boolean
    }
  },
  data () {
    return {
      themeKey: 'theme',
      sidebars: []
    }
  },
  mounted () {
    /* Menu handle */
    this.sidebars = this.$store.state.userSidebars

    /* Theme */
    const toggler = document.getElementById('toggle-dark')

    toggler.addEventListener('input', (e) => {
      this.setTheme(e.target.checked ? 'theme-dark' : 'theme-light')
    })

    this.$nextTick(() => {
      // If the user manually set a theme, we'll load that
      let storedTheme
      if ((storedTheme = localStorage.getItem(this.themeKey))) {
        return this.setTheme(storedTheme)
      }

      // Detect if the user set his preferred color scheme to dark
      if (!window.matchMedia) {
        return
      }

      // Media query to detect dark preference
      const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)')

      // Register change listener
      mediaQuery.addEventListener('change', e =>
        this.setTheme(e.matches ? 'theme-dark' : 'theme-light', true)
      )

      return this.setTheme(mediaQuery.matches ? 'theme-dark' : 'theme-light', true)
    })

    /* slide bar */
    this.$nextTick(() => {
      const sidebarItems = document.querySelectorAll('.sidebar-item.has-sub')
      for (let i = 0; i < sidebarItems.length; i++) {
        const sidebarItem = sidebarItems[i]
        sidebarItem.querySelector('.sidebar-link').addEventListener('click', function (e) {
          e.preventDefault()
          const submenu = sidebarItem.querySelector('.submenu')
          if (submenu.style.display === '') {
            if (submenu.classList.contains('active')) {
              submenu.style.display = 'none'
            } else {
              submenu.style.display = 'block'
            }
          } else if (submenu.style.display !== 'none') {
            submenu.style.display = 'none'
          } else {
            submenu.style.display = 'block'
          }
        })
      }
    })

    if (window.innerWidth < 1200) {
      document.getElementById('sidebar').classList.remove('active')
    }
    this.$nextTick(() => {
      if (window.innerWidth < 1200) {
        document.getElementById('sidebar').classList.remove('active')
      }
    })
    window.addEventListener('resize', (event) => {
      if (window.innerWidth < 1200) {
        document.getElementById('sidebar').classList.remove('active')
      } else {
        document.getElementById('sidebar').classList.add('active')
      }
    })

    document.querySelector('.x').addEventListener('click', () => {
      document.getElementById('sidebar').classList.remove('active')
    })
  },
  methods: {
    hasRole (roles) {
      return roles.some(role => this.$auth.user.roles?.includes(role))
    },

    /* Set theme */
    setTheme (theme, dontPersist = false) {
      const toggler = document.getElementById('toggle-dark')
      document.body.className = document.body.className.replace(/\btheme-[a-z0-9]+\b/g, '')
      document.body.classList.add(theme)
      toggler.checked = theme === 'theme-dark'

      if (!dontPersist) {
        localStorage.setItem(this.themeKey, theme)
      }
    },

    /* Menu generator */
    subIsActive (item) {
      const paths = Array.isArray(item.submenu) ? item.submenu : []
      return paths.some((path) => {
        return this.$route.path.indexOf(path.url) === 0
      })
    },

    isActive (url) {
      if (this.$route.path === url) {
        return true
      }
      return false
    },

    isHasSub (item) {
      if (Object.prototype.hasOwnProperty.call(item, 'submenu')) {
        if (item.submenu.length > 0) {
          return true
        }
      }
      return false
    }
  }
}
</script>
