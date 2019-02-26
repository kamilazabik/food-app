<template>
  <div class="header" ref="header">
    <div class="container">
      <div class="row justify-content-between">
        <div class="col-md-3"></div>
        <div class="col header-col">
          <div class="header-basket" @click="openBasket" ref="headerBasket" :class="{ 'white' : ifOpenBasket == true}">
            <h3 class="header-basket__name" >Basket</h3>
          </div>

        </div>
      </div>

    </div>


  </div>
</template>

<script>
    import {mapGetters} from 'vuex'
    import {mapActions} from 'vuex'
  export default {
      data(){
          return {
            sticky: 260
          }
      },
      computed: {
          ...mapGetters({
              ifOpenBasket: 'checkBasket',
              ifStickyBasket: 'checkStickyBasket'
          }),
      },
      methods: {
          ... mapActions({
                  changeBasketAct: 'changeBasket',
          }),
          openBasket(){
              this.changeBasketAct(this.ifOpenBasket)
          },
          stickHeader () {
              if (window.pageYOffset > this.sticky) {
                  this.$refs["header"].classList.add("sticky");
              } else {
                  this.$refs["header"].classList.remove("sticky");

              }
          }
      },
      created () {
          window.addEventListener('scroll', this.stickHeader);
      },
  }
</script>

<style lang="scss">


</style>