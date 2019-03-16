<template>
  <div id="app">
    <router-view></router-view>
  </div>

</template>


<script>
  import {mapActions} from 'vuex'
  import * as types from './store/types';

  export default {
        methods: {
            ...mapActions({
                tryAutoLogin: types.ACT_TRY_AUTO_LOGIN
            })
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

  @import "./assets/style/main.scss";

</style>
