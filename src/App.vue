<template>
  <div id="app">
    <div class="container-nav">
      <!--<div class="container">-->
        <!--<app-header></app-header>-->
      <!--</div>-->


    </div>
    <router-view></router-view>
    <!--<div id="nav">-->
      <!--<router-link to="/">Home</router-link> |-->
      <!--<router-link to="/about">About</router-link>-->
    <!--</div>-->


  </div>
</template>


<script>

    import Hero from './components/Hero.vue'


    export default {
        components: {
            appHero: Hero
        },
    }
</script>

<style lang="scss">
  html {
    box-sizing: border-box;
    font-size: 62.5%;
  }

</style>
