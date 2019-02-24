<template>
  <div class="bg">
    <app-hero :style="{height: this.height + 'rem'}"></app-hero>
    <div class="container">
      <div class="row">

          <div class="col-md-4"></div>
          <div class="col-md-8">
            <router-view></router-view>
          </div>
      </div>
      <router-view name="oneRest"></router-view>
    </div>
  </div>
</template>

<script>
  import Hero from '../components/Hero.vue'

  export default {
      data(){
          return{
              height: 30
          }
      },

      methods: {

      },
      components: {
          appHero: Hero,
      },
  }

</script>

<style scoped>
  .bg {
    background-color: #f8f5f2;
  }
</style>