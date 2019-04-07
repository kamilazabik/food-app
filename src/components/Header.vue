<template>
  <div class="header" ref="header" :class="{'sticky': stickyHeader == true }">
    <div class="header-container container">
      <div class="row mobile-center">
        <div :class="{'hidden-left': showNavHeader == false, 'full-width': (showSidebarHeader == false && showBasketHeader == false )} " class="header-nav-col">
          <div class="header-nav" @click="$router.go(-1)" >
            <div class="header-nav-icon">
              <span class="icon-left-open-2"></span>
            </div>
            <h3 class="header-nav__text mobile-hidden">Back</h3>
          </div>
        </div>
        <div :class="{'hidden-mid': showSidebarHeader == false, 'full-width': (showNavHeader == false && showBasketHeader == false )}" class="desktop-hidden header-sidebar-col">
          <div class="header-sidebar" @click="openSidebarMenu">
            <span class="icon-menu"></span>
          </div>
        </div>
        <div :class="{'hidden-right': showBasketHeader == false, 'full-width': (showNavHeader == false && showSidebarHeader == false )}" class="header-basket-col" v-if="comparePath()">
          <div class="header-basket" @click="openBasket" ref="headerBasket" :class="{ 'white' : ifOpenBasket == true , 'blue': basket.length > 0 && ifOpenBasket !== true}">
            <div class="header-basket-price">
              <h3 class="header-basket__name mobile-hidden">Check out</h3>
              <p class="header-basket__price" v-if="resetTotal()">{{totalCost}} zł</p>
            </div>
            <div >
              <span class="icon-basket-1"></span>
              <div class="header-basket-icon">
                <span class="header-basket-amount">{{basket.length}}</span>
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
            pathAccount: '/account',
            pathOrders: '/account/your-orders',
            pathSignin: '/signin',
            pathSignup: '/signup',
            pathPersonalData: '/account/personal-data',
            offset: '100',
          }
      },
      computed: {
          ...mapGetters({
              ifOpenBasket: types.GET_BASKET_STATUS,
              basket: types.GET_BASKET,
              order: types.GET_ORDER,
              totalCost: types.GET_TOTAL,
              partial:types.GET_PARTIAL,
              showNavHeader: types.GET_SHOW_NAV_HEADER,
              showBasketHeader: types.GET_SHOW_BASKET_HEADER,
              showSidebarHeader: types.GET_SHOW_SIDEBAR_HEADER,
              stickyHeader: types.GET_STICKY_HEADER,
          }),

      },
      methods: {
          ... mapMutations({
//                  changeBasketAct: types.MUTATE_OPEN_BASKET,
              closeBasket: types.MUTATE_CLOSE_BASKET,
              getStickHeader: types.MUTATE_STICKY_HEADER

          }),
          ... mapActions({
              changeBasketAct: types.ACT_OPEN_BASKET,
              openSidebar: types.ACT_OPEN_SIDEBAR,
              resizeHero: types.ACT_RESIZE_HERO,
          }),

          openBasket(){
              this.changeBasketAct(200)
          },
          openSidebarMenu(){
              this.openSidebar(this.offset);
          },
          stickHeader () {
              this.getStickHeader()
          },

          setHeroSize(hero){
              this.resizeHero(hero)
          },

          comparePath(){
              if(this.$route.path !== this.pathAccount
                && this.$route.path !== this.pathOrders
                && this.$route.path !== this.pathSignin
                && this.$route.path !== this.pathSignup
                && this.$route.path !== this.pathPersonalData
              ){
                  return true
              }else  {
                  return false
              }
          },
          resetTotal(){
              if(this.basket.length > 0){
                return this.totalCost
              }else {
                  this.$store.commit(types.MUTATE_RESET_TOTAL);
              }
          }
      },

      created(){
          addEventListener('resize', () => {
              this.setHeroSize()
          })
      },

      mounted () {
              window.addEventListener('scroll', this.stickHeader);

      },
  }
</script>

<style scoped lang="scss">

</style>