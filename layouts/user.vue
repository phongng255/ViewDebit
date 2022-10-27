<template>
  <div id="app">
    <div id="sidebar" class="active">
      <Sidebar />
    </div>
    <div id="main" class="d-flex flex-column min-vh-100">
      <Navbar />
      <Nuxt />
      <Footer />
    </div>
  </div>
</template>

<script>
import Sidebar from '~/components/Layouts/Sidebar.vue'
import Footer from '~/components/Layouts/Footer.vue'
import Navbar from '~/components/Layouts/Navbar.vue'

export default {
  components: {
    Sidebar,
    Footer,
    Navbar
  }
}
</script>
