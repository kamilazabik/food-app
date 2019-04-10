<template>
  <div id="signup">
    <div class="signup-form">
      <form @submit.prevent="onSubmitLog" class="form">
        <div class="form-group"  :class="{invalid: $v.email.$error}">
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
        <button type="submit" class="btn btn-primary">Submit</button>
      </form>
    </div>
  </div>

</template>

<script>
    import * as types from '../../store/types';
    import { required, email, minLength  } from 'vuelidate/lib/validators'

    export default {
        data () {
            return {
                email: '',
                password: ''
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
            }
        },
        methods: {
            onSubmitLog () {
                const formData = {
                    email: this.email,
                    password: this.password,
                };
                this.$store.dispatch(types.ACT_LOGIN, {email: formData.email, password: formData.password})
            }
        }
    }
</script>