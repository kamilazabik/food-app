<template>
  <div id="app" :class="{'fullscreen': fullScreen == true}">
    <router-view></router-view>
  </div>

</template>


<script>
  import {mapActions} from 'vuex'
  import {mapGetters} from 'vuex'
  import * as types from './store/types';

  export default {
        methods: {
            ...mapActions({
                tryAutoLogin: types.ACT_TRY_AUTO_LOGIN
            })
        },
      computed: {
          ...mapGetters({
              fullScreen: types.GET_FULL_SCREEN
          }),

      },
      created(){
          this.tryAutoLogin()
      }
}

</script>

<style lang="scss">
  html {
    box-sizing: border-box;
    font-size: 62.5%;
  }

  /*@import "./assets/style/main.scss";*/

</style>
