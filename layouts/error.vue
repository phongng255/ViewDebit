<template>
  <div id="error">
    <div class="error-page container">
      <div class="col-md-8 col-12 offset-md-2">
        <div class="text-center">
          <img class="img-error" :src="errorImage" alt="Not Found" />
          <h1 class="error-title">
            {{ title }}
          </h1>
          <p class="fs-5 text-gray-600">
            {{ message }}
          </p>
          <nuxt-link to="/" class="btn btn-lg btn-outline-primary mt-3">
            Về trang chủ
          </nuxt-link>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    error: {
      default () {
        return {}
      },
      type: Object
    }
  },
  data () {
    return {
      title: null,
      message: null,
      errorImage: null
    }
  },
  head () {
    return {
      title: `${this.error.statusCode} | DongDev`
    }
  },
  mounted () {
    switch (this.error.statusCode) {
      case 403:
        this.title = 'Forbidden'
        this.message = 'Bạn không đủ quyền để xem trang này.'
        this.errorImage = require('~/assets/images/samples/error-403.svg')
        break
      case 404:
        this.title = 'Not Found'
        this.message = 'Trang bạn yêu cầu không tìm thấy.'
        this.errorImage = require('~/assets/images/samples/error-404.svg')
        break
      default:
        this.title = 'System Error'
        this.message = 'Trang web đang gặp lỗi. Vui lòng liên hệ nhà phát triển để biết thêm thông tin.'
        this.errorImage = require('~/assets/images/samples/error-500.svg')
    }
  }
}
</script>
