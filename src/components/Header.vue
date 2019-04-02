<template>
  <div class="header" ref="header" :class="{'sticky': stickyHeader == true }">
    <div class="container-header">
      <div class="row justify-content-center">
        <div :class="{'hidden-left': showNavHeader == false, 'full-width': (showSidebarHeader == false && showBasketHeader == false )} " class="col-4 header-nav-col">
          <div class="header-nav" @click="$router.go(-1)" >
            <div class="header-nav-icon">
              <span class="icon-left-open-2"></span>
            </div>
            <h3 class="header-nav__text mobile-hidden">Back</h3>
          </div>
        </div>
        <div :class="{'hidden-mid': showSidebarHeader == false, 'full-width': (showNavHeader == false && showBasketHeader == false )}" class="col-4 desktop-hidden header-sidebar-col">
          <div class="header-sidebar" @click="openSidebarMenu">
            <span class="icon-menu"></span>
          </div>
        </div>
        <div :class="{'hidden-right': showBasketHeader == false, 'full-width': (showNavHeader == false && showSidebarHeader == false )}" class="col-4 header-basket-col" v-if="comparePath()">
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
            sticky: 270,
            pathAccount: '/account',
            pathOrders: '/account/your-orders',
            pathSignin: '/signin',
            pathSignup: '/signup',
            offset: '0',
//            sidebar: document.getElementsByClassName('sidebar')[0]
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
          }),


          openBasket(){
              this.changeBasketAct(this.offset)
//              this.changeBasketAct(this.offset);
          },
          openSidebarMenu(){
//              let sidebar = document.getElementsByClassName('sidebar')[0]
//              console.log(sidebar);
              this.openSidebar(this.offset);
          },
          stickHeader () {
              this.getStickHeader()

//              let header = this.$refs["header"],
//              pageOffset = window.pageYOffset,
//              max700 = window.matchMedia("(max-width: 700px)");
//
//              if(max700.matches){
//                  if (typeof header !== 'undefined' && pageOffset < this.sticky && pageOffset !== 0 ) {
//                      this.offset = pageOffset;
//                      header.classList.remove("sticky");
//                      header.parentNode.style.height = 270 - pageOffset + 'px';
//
//                      if(header.parentNode.offsetHeight < 50 ){
//                          header.parentNode.style.height = 50 + 'px'
//                      }
//                  } else if(typeof header !== 'undefined' && pageOffset >  220){
//                      header.classList.add("sticky");
//                  }
//
//              }else {
//               if  (pageOffset > this.sticky && typeof header !== 'undefined') {
//                   header.classList.add("sticky");
//                  } else if(pageOffset < this.sticky && typeof header !== 'undefined'){
//                   header.classList.remove("sticky");
//                  }
//              }
          },
          heroHeight() {
              if(typeof this.$refs["header"] !== 'undefined' ){
                  this.$refs["header"].parentNode.style.height = 30 + 'rem';
                  this.$refs["header"].classList.remove('sticky')
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
                return this.totalCost
              }else {
                  this.$store.commit(types.MUTATE_RESET_TOTAL);
              }
          }
      },

      created(){
          addEventListener('resize', () => {
              if (window.innerWidth > 700) {
                  this.heroHeight();
              }else if(this.ifOpenBasket == true){
                  let doc = document.getElementsByTagName('HTML')[0];
                  doc.classList = 'fullscreen'
                  this.$refs["header"].classList.add("sticky");
              }
          })
      },

      mounted () {
              window.addEventListener('scroll', this.stickHeader);
      },
  }
</script>

<style scoped lang="scss">
  .sticky {
    /*position: fixed;*/
    /*top: 0;*/
    /*width: 100%;*/
    /*background-color: rgba(0,0,0,0.5);*/
  }

</style>