<template>
  <div class="jumbotron jumbotron-fluid jumbotron-small">
    <div class="hero">
      <router-link to="/restaurants" tag="h1" class="display-4 hero-text">
        <a class="hero-link">Zamów jedzenie online</a>
      </router-link>
    </div>
    <app-header></app-header>
  </div>
</template>

<script>
    import Header from '../components/Header.vue'
    export default {
        data(){
            return {
                height: 60
            }
        },
        components: {
            appHeader: Header,
        },
    }
</script>



<style lang="scss">
  .jumbotron-small {
    height: 30rem;
    position: relative;
  }

</style>