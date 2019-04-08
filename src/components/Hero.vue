<template>
  <div class="jumbotron jumbotron-fluid">
      <div class="hero">
        <router-link to="/restaurants" tag="h1" class="display-4 hero-title">
          <a class="hero-link">Order Your Favourite Dishes Online!</a></router-link>
      </div>
    <app-hero-boxes></app-hero-boxes>

  </div>
</template>

<script>
    import HeroBoxes from '@/components/HeroBoxes.vue'
  export default {
      data(){
          return {
              height: 60
          }
      },

      components: {
          appHeroBoxes: HeroBoxes,
      }
  }
</script>
