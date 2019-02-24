<template>
    <div>
      <app-hero></app-hero>
    </div>
</template>

<script>
// @ is an alias to /src
import Hero from '@/components/Hero.vue'

export default {
  name: 'home',

  components: {
      appHero: Hero
  }
}
</script>

<style>


</style>
