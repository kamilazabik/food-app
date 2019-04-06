<template>
    <div>
      <app-hero></app-hero>
      <app-footer></app-footer>
    </div>
</template>

<script>
// @ is an alias to /src
import Hero from '@/components/Hero.vue'
import Footer from '@/components/Footer.vue'

export default {
  name: 'home',

  components: {
      appHero: Hero,
      appFooter: Footer
  }
}
</script>

<style>


</style>
