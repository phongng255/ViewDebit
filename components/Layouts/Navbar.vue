<template>
  <header class="mb-3">
    <nav class="navbar-expand navbar-light navbar-top">
      <div class="container-fluid">
        <div class="d-flex justify-content-between">
          <a href="#" class="burger-btn d-block">
            <i class="bi bi-justify fs-3" />
          </a>

          <div class="dropdown">
            <a href="#" data-bs-toggle="dropdown" aria-expanded="false">
              <div class="user-menu d-flex">
                <div class="user-name text-end me-3">
                  <h6 class="mb-0 text-gray-600">{{ $auth.user?.phoneNumber || null }}</h6>
                  <p class="mb-0 text-sm text-gray-600">Admin</p>
                </div>
                <div class="user-img d-flex align-items-center">
                  <div class="avatar avatar-md">
                    <img :src="require(`@/assets/images/faces/default.png`)">
                  </div>
                </div>
              </div>
            </a>
            <ul class="dropdown-menu dropdown-menu-end" aria-labelledby="dropdownMenuButton" style="min-width: 11rem;">
              <li>
                <h6 class="dropdown-header">
                  Xin chào Admin!
                </h6>
              </li>
              <!-- <li>
                <nuxt-link class="dropdown-item" to="/account/change-password">
                  <i class="icon-mid bi bi-key me-2" /> Change password
                </nuxt-link>
              </li>
              <li>
                <hr class="dropdown-divider">
              </li> -->
              <li>
                <a class="dropdown-item" href="#" @click="logout()">
                  <i class="icon-mid bi bi-box-arrow-left me-2" /> Đăng xuất
                </a>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </nav>
  </header>
</template>

<script>
export default {
  mounted () {
    document.querySelector('.burger-btn').addEventListener('click', () => {
      document.getElementById('sidebar').classList.toggle('active')
    })
  },
  methods: {
    logout () {
      this.$auth.logout()
      if (this.$auth.options.redirect.login) {
        this.$router.push(this.$auth.options.redirect.login)
      }
    }
  }
}
</script>
