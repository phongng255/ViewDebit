<template>
  <div class="d-flex justify-content-center">
    <div class="col-md-6 col-12">
      <div class="card">
        <div class="card-header">
          <h4 class="card-title">
            Change password
          </h4>
        </div>
        <div class="card-body">
          <form class="form form-horizontal" @submit.prevent="updatePassword()">
            <div class="form-body">
              <div class="row">
                <div class="col-md-12">
                  <h6>Password<span class="text-danger"> *</span></h6>
                  <div class="form-group position-relative has-icon-left">
                    <input
                      v-model="password.oldPassword"
                      type="password"
                      class="form-control"
                      placeholder="Password"
                    >
                    <div class="form-control-icon">
                      <i class="bi bi-key"></i>
                    </div>
                    <p class="mt-1">
                      <small class="text-muted">Leave blank if you have registered with a social account.</small>
                    </p>
                  </div>
                </div>

                <div class="col-md-12">
                  <h6>New password<span class="text-danger"> *</span></h6>
                  <div class="form-group position-relative has-icon-left">
                    <input
                      v-model="password.newPassword"
                      type="password"
                      class="form-control"
                      placeholder="New password"
                    >
                    <div class="form-control-icon">
                      <i class="bi bi-key"></i>
                    </div>

                    <!-- Password strength check -->
                    <PasswordStrength :password="password.newPassword" @score="score = $event"></PasswordStrength>
                  </div>
                </div>

                <div class="col-md-12">
                  <h6>Confirm password<span class="text-danger"> *</span></h6>
                  <div class="form-group position-relative has-icon-left">
                    <input
                      v-model="password.confirmPassword"
                      type="password"
                      class="form-control"
                      placeholder="Confirm password"
                    >
                    <div class="form-control-icon">
                      <i class="bi bi-key"></i>
                    </div>
                  </div>
                </div>

                <!-- Loading -->
                <div v-if="loading" class="col-12 d-flex justify-content-end">
                  <button class="btn btn-primary" type="button" disabled>
                    <span class="spinner-border spinner-border-sm" role="status" aria-hidden="true" />
                    Loading...
                  </button>
                </div>

                <div v-else class="col-12 d-flex justify-content-end">
                  <button type="submit" class="btn btn-primary me-1 mb-1" :disabled="isDisable()">
                    Change password
                  </button>
                </div>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  layout: 'user',
  data () {
    return {
      password: {
        oldPassword: '',
        newPassword: '',
        confirmPassword: ''
      },
      score: 0,
      loading: false
    }
  },
  head () {
    return {
      title: 'Change password | DongDev'
    }
  },
  methods: {
    isDisable () {
      if (this.score <= 60 || this.password.confirmPassword.length !== this.password.newPassword.length) {
        return true
      }
      return false
    },
    async updatePassword () {
      this.loading = true
      try {
        if (this.password.newPassword !== this.password.confirmPassword) {
          this.$toast.error('Confirm password does not match')
          this.loading = false
          return
        }
        await this.$callapi.post('/v1/account/change-password', this.password)
        this.$toast.success('Changed password successfully!')
        this.password.oldPassword = ''
        this.password.newPassword = ''
        this.password.confirmPassword = ''
      } catch (e) {
        if (Array.isArray(e.data.message)) {
          e.data.message?.forEach(message => this.$toast.error(message))
        } else {
          this.$toast.error(e.data.message || 'Error while changing password')
        }
      }
      this.loading = false
    }
  }
}
</script>
