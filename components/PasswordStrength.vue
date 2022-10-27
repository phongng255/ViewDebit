<template>
  <section v-if="strength.progress > 0">
    <div class="progress mt-3 mb-1">
      <div
        class="progress-bar"
        role="progressbar"
        aria-valuemin="0"
        aria-valuemax="100"
        :class="`bg-${strength.color}`"
        :style="`width: ${strength.progress}%`"
        :aria-valuenow="strength.progress"
      >
      </div>
    </div>
    <span :class="`text-${strength.color}`">{{ strength.message }}</span>
  </section>
</template>

<script>
export default {
  props: {
    password: {
      type: String,
      default: null
    }
  },
  data () {
    return {
      strength: {
        progress: 0,
        message: '',
        color: 'bg-danger'
      }
    }
  },
  watch: {
    'password' (val, oldVal) {
      let total = this.scorePassword(val)
      if (!/(.*[a-z].*)/.test(val) && total > 60) {
        total = 59
      }
      if (!/(?=.*[A-Z])/.test(val) && total > 60) {
        total = 59
      }
      if (!/(?=.*\d)/.test(val) && total > 60) {
        total = 59
      }
      if (val.length < 8 && total > 60) {
        total = 59
      }

      this.strength.progress = total
      this.$emit('score', this.strength.progress)
      if (total <= 40) {
        this.strength.color = 'danger'
        this.strength.message = 'Password is too weak'
      } else if (total > 40 && total <= 60) {
        this.strength.color = 'warning'
        this.strength.message = 'Password is medium'
      } else if (total > 60 && total <= 80) {
        this.strength.color = 'info'
        this.strength.message = 'Password is strong'
      } else if (total > 80) {
        this.strength.color = 'success'
        this.strength.message = 'Password is very strong'
      }
    }
  },
  methods: {
    scorePassword (pass) {
      let score = 0
      if (!pass) { return score }

      // award every unique letter until 5 repetitions
      const letters = {}
      for (let i = 0; i < pass.length; i++) {
        letters[pass[i]] = (letters[pass[i]] || 0) + 1
        score += 5.0 / letters[pass[i]]
      }

      // bonus points for mixing it up
      const variations = {
        digits: /\d/.test(pass),
        lower: /[a-z]/.test(pass),
        upper: /[A-Z]/.test(pass),
        nonWords: /\W/.test(pass)
      }

      let variationCount = 0
      for (const check in variations) {
        variationCount += (variations[check] === true) ? 1 : 0
      }
      score += (variationCount - 1) * 10

      return score
    }
  }
}
</script>
