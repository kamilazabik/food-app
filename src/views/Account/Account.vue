<template>
  <div class="account">
    <h1>Wellcome {{name}} </h1>
    <router-view></router-view>


  </div>
</template>

<script>
  import {mapGetters} from 'vuex'
  import {mapActions} from 'vuex'
  import * as types from '../../store/types';

  export default {
      data(){
          return {
              userName: null
          }
      },
      methods: {
          ...mapActions({
              fetchUser: types.ACT_FETCH_USER
          })
      },
      computed: {
          name(){
              console.log(this.user.name);
              return !this.user.name ? false : this.user.name
          },
          ...mapGetters({
              user: types.GET_USER
          }),
      },
      created(){
          console.log(this.userName);
          this.fetchUser()
      },
  }
</script>