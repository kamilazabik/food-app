<template>
  <div id="signup">
    <div class="signup-form">
      <form @submit.prevent="onSubmitLog" class="form">
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
        <button type="submit" class="btn btn-primary">Submit</button>
      </form>
    </div>
  </div>

</template>

<script>
    import * as types from '../store/types';

    export default {
        data () {
            return {
                email: '',
                password: ''
            }
        },
        methods: {
            onSubmitLog () {
                const formData = {
                    email: this.email,
                    password: this.password,
                }
                console.log(formData)
                this.$store.dispatch(types.ACT_LOGIN, {email: formData.email, password: formData.password})

            }
        }
    }
</script>