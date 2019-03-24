<template>
  <div class="header" ref="header">
    <div class="container-rest">
      <div class="row justify-content-between">
        <div class="col-md-3">
          <div class="header-nav" @click="$router.go(-1)" >
            <div class="header-nav-icon">
              <span class="icon-left-open-2"></span>
            </div>
            <h3 class="header-nav__text">Back</h3>
          </div>
        </div>
        <div class="col header-col" v-if="comparePath()">
          <div class="header-basket" @click="openBasket" ref="headerBasket" :class="{ 'white' : ifOpenBasket == true, 'blue': basket.length > 0}">
            <div class="header-basket-price">
              <h3 class="header-basket__name">Check out</h3>
              <p v-if="resetTotal()">{{totalCost}} zł</p>
            </div>
            <div >
              <span class="icon-basket-1"></span>
              <div class="basket-icon">
                <span class="basket-amount">{{basket.length}}</span>
              </div>
            </div>

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
    import {mapMutations} from 'vuex'

  export default {
      data(){
          return {
            sticky: 260,
            pathAccount: '/account',
            pathOrders: '/account/your-orders',
            pathSignin: '/signin',
            pathSignup: '/signup',
          }
      },
      computed: {
          ...mapGetters({
              ifOpenBasket: types.GET_BASKET_STATUS,
//              ifStickyBasket: types.GET_STICKY_BASKET,
              basket: types.GET_BASKET,
              order: types.GET_ORDER,
              totalCost: types.GET_TOTAL,
              partial:types.GET_PARTIAL
          }),


      },
      methods: {
          ... mapMutations({
                  changeBasketAct: types.MUTATE_OPEN_BASKET,
          }),

          openBasket(){
              this.changeBasketAct(this.ifOpenBasket)
          },

          stickHeader () {
              if (window.pageYOffset > this.sticky && typeof this.$refs["header"] !== 'undefined') {
                  this.$refs["header"].classList.add("sticky");
              } else if(typeof this.$refs["header"] !== 'undefined'){
                  this.$refs["header"].classList.remove("sticky");
              }
          },
          comparePath(){
              if(this.$route.path !== this.pathAccount
                && this.$route.path !== this.pathOrders
                && this.$route.path !== this.pathSignin
                && this.$route.path !== this.pathSignup
              ){
                  return true
              }else  {
                  return false
              }
          },
          resetTotal(){
              if(this.basket.length > 0){
                  console.log(this.totalCost);
                  console.log(this.basket);
                return this.totalCost
              }else {
                  this.$store.commit(types.MUTATE_RESET_TOTAL);
              }
          }
      },

      mounted () {
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