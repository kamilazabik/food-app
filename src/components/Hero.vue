<template>
  <div class="jumbotron jumbotron-fluid">
      <div class="hero">
        <router-link to="/restaurants" tag="h1" class="display-4 hero-text">
          <a class="hero-link">Order Your Favourite Dishes Online!</a></router-link>

      </div>
  </div>
</template>

<script>
  export default {
      data(){
          return {
              height: 60
          }
      }
  }
</script>



<style lang="scss">
  .jumbotron {
    background-image: url("../assets/img/asian-chopsticks-cooking-697058.jpg");
    background-size: cover;
    height: 60rem;
    background-position: 100% 60%;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
  }

</style>