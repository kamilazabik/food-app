<template>
  <div class="account">
    <h1 v-if="name">Wellcome {{name}} </h1>
    <router-view></router-view>
  </div>
</template>

<script>
  import {mapGetters} from 'vuex'
  import {mapActions} from 'vuex'
  import * as types from '@/store/types';

  export default {
      data(){
          return {
              userName: null
          }
      },
      methods: {
          ...mapActions({
              fetchUser: types.ACT_FETCH_USER
          }),
      },
      computed: {
          name(){
              return !this.user ? localStorage.getItem('name') : this.user.name
          },

          ...mapGetters({
              user: types.GET_USER,
          }),
      },
      created(){
          this.fetchUser()
      },
  }
</script>