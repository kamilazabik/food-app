<template>
  <div class="header" ref="header">
    <div class="container-rest">
      <div class="row justify-content-between">
        <div class="col-md-3"></div>
        <div class="col header-col">
          <div class="header-basket" @click="openBasket" ref="headerBasket" :class="{ 'white' : ifOpenBasket == true, 'blue': basket.length > 0}">
            <h3 class="header-basket__name" >Basket</h3>
          </div>

        </div>
      </div>

    </div>

  </div>
</template>

<script>
    import * as types from '../store/types';
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
              ifOpenBasket: types.GET_BASKET_STATUS,
              ifStickyBasket: types.GET_STICKY_BASKET,
              basket: types.GET_BASKET
          }),
      },
      methods: {
          ... mapActions({
                  changeBasketAct: types.ACT_OPEN_BASKET,
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

<style scoped lang="scss">
  .sticky {
    position: fixed;
    top: 0;
    width: 100%;
    background-color: rgba(0,0,0,0.5);
  }

</style>