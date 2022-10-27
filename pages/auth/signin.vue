<template>
  <div id="auth">
    <div class="row h-100">
      <div class="col-lg-5 col-12">
        <div id="auth-left">
          <div class="auth-logo">
            <nuxt-link to="/">
              <img src="~/assets/images/logo/logo.png" alt="Logo">
            </nuxt-link>
          </div>
          <h1 class="auth-title">
            Đăng nhập.
          </h1>
          <p class="auth-subtitle mb-5">
            Log in with your data that you entered during registration.
          </p>

          <!-- Login form -->
          <form @submit.prevent="signin">
            <div class="form-group position-relative has-icon-left mb-4">
              <input v-model="login.phoneNumber" type="text" class="form-control form-control-xl" placeholder="Số điện thoại">
              <div class="form-control-icon">
                <i class="bi bi-person" />
              </div>
            </div>
            <div class="form-group position-relative has-icon-left mb-4">
              <input
                v-model="login.password"
                type="password"
                class="form-control form-control-xl"
                placeholder="Mật khẩu"
              >
              <div class="form-control-icon">
                <i class="bi bi-shield-lock" />
              </div>
            </div>
            <button v-if="!loading" class="btn btn-primary btn-block btn-lg shadow-lg mt-5">
              Đăng nhập
            </button>
            <!-- Loading -->
            <button v-if="loading" class="btn btn-primary btn-block btn-lg shadow-lg mt-5" type="button" disabled>
              <span class="spinner-border spinner-border-sm" role="status" aria-hidden="true" />
              Loading...
            </button>
          </form>
          <!-- <div class="text-center mt-5 text-lg fs-4">
            <p class="text-gray-600">
              Don't have an account?
              <router-link to="/auth/signup" class="font-bold">
                Sign up
              </router-link>.
            </p>
            <p>
              <router-link class="font-bold" to="/auth/forgot-password">
                Forgot password?
              </router-link>.
            </p>
          </div> -->
        </div>
      </div>
      <div class="col-lg-7 d-none d-lg-block">
        <div id="auth-right" />
      </div>
    </div>
  </div>
</template>

<script>
export default {
  layout: 'empty',
  data () {
    return {
      login: {
        phoneNumber: null,
        password: null
      },
      loading: false
    }
  },
  head () {
    return {
      title: 'Đăng nhập'
    }
  },
  async mounted () {
  },
  methods: {
    async signin () {
      this.loading = true
      try {
        await this.$auth.loginWith('local', {
          data: this.login
        })
        this.$toast.success('Đăng nhập thành công!')
      } catch (e) {
        this.$toast.error(e.response.data.message || 'Có lỗi trong khi đăng nhập')
      }
      this.loading = false
    }
  }
}
</script>
