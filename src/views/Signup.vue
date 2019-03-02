<template>
  <div id="signup">
    <div class="signup-form">
      <form @submit.prevent="onSubmit" class="form">
        <div class="form-group">
          <label for="email">Email address</label>
          <input type="email"
                 class="form-control"
                 id="email"  v-model="email">
        </div>
        <div class="form-group">
          <label for="password">Password</label>
          <input type="password"
                 class="form-control"
                 id="password"
                 v-model="password">
        </div>
        <div class="form-group">
          <label for="confirm-password">Password</label>
          <input type="password"
                 class="form-control"
                 id="confirm-password"
                 v-model="confirmPassword">
        </div>
        <div class="form-check">
          <input type="checkbox" class="form-check-input" id="terms">
          <label class="form-check-label" for="terms">Accept Terms of Use</label>
        </div>
        <button type="submit" class="btn btn-primary">Submit</button>
      </form>
    </div>
  </div>

</template>

<script>
    import axios from '../axios-auth'

  export default {
      data(){
          return {
              email: '',
              password: '',
              confirmPassword: '',
              terms: false
          }
      },
      methods: {
          onSubmit () {
              const formData = {
                  email: this.email,
                  password: this.password,
                  confirmPassword: this.confirmPassword,
                  terms: this.terms
              }
              console.log(formData)
              this.$store.dispatch('signup', formData)
          }
      }
  }


</script>