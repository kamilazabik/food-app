<template>
  <div id="signup">
    <div class="signup-form">
      <form @submit.prevent="onSubmit" class="form">

        <div class="form-group" >
          <label for="name">Name</label>
          <input type="name"
                 class="form-control"
                 id="name"  v-model="name">
        </div>
        <div class="form-group" :class="{invalid: $v.email.$error}">
          <label for="email">Email address</label>
          <input
              class="form-control"
              type="email"
              id="email"
              @blur="$v.email.$touch()"
              v-model.lazy="email">
          <p class="mgt-10" v-if="!$v.email.email">Please provide a valid email address.</p>
        </div>
        <div class="form-group" :class="{invalid: $v.password.$error}">
          <label for="password">Password</label>
          <input type="password"
                 class="form-control"
                 id="password"
                 @blur="$v.password.$touch()"
                 v-model.lazy="password">
          <p class="mgt-10" v-if="!$v.password.minLen">Password should have at least 6 characters</p>

        </div>
        <div class="form-group" :class="{invalid: $v.confirmPassword.$error}">
          <label for="confirm-password">Password</label>
          <input type="password"
                 class="form-control"
                 id="confirm-password"
                 @blur="$v.confirmPassword.$touch()"
                 v-model.lazy="confirmPassword">
          <p class="mgt-10" v-if="!$v.confirmPassword.sameAs">The password does not match</p>
        </div>
        <div class="form-check"  :class="{invalid: $v.terms.$invalid}">
          <input type="checkbox"
                 class="form-check-input"
                 @change="$v.terms.$touch()"
                 id="terms">
          <label class="form-check-label" for="terms">Accept Terms of Use</label>
        </div>
        <button type="submit" class="btn btn-primary" :disabled="$v.$invalid">Submit</button>
      </form>
    </div>
  </div>

</template>

<script>
    import * as types from '@/store/types';
    import { required, email, minLength, sameAs  } from 'vuelidate/lib/validators'

  export default {
      data(){
          return {
              email: '',
              password: '',
              confirmPassword: '',
              name: '',
              terms: false,
              orders: []
          }
      },
      validations: {
          email: {
              required,
              email
          },
          password: {
              required,
              minLen: minLength(6)
          },
          confirmPassword: {
              sameAs: sameAs(vm => {
                  return vm.password
              })
          },
          terms: {
              required
          }
      },
      methods: {
          onSubmit () {
              const formData = {
                  email: this.email,
                  password: this.password,
                  confirmPassword: this.confirmPassword,
                  terms: this.terms,
                  orders: this.orders,
                  name: this.name
              };
              this.$store.dispatch(types.ACT_SIGN_UP, formData)
          }
      }
  }
</script>