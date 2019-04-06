<template>
  <div>
    <app-hero-small ></app-hero-small>
    <div class="bg">
      <div class="main-container container">
        <div class="row">
          <div class="sidebar-content">
            <app-sidebar></app-sidebar>
            <app-sidebar-menu :params="this.$route.params.link"></app-sidebar-menu>
          </div>
          <div class="restaurant-content col-md-9">
            <router-view></router-view>
          </div>
        </div>
      </div>
    </div>
    <app-footer></app-footer>
  </div>
</template>

<script>
  import {mapGetters} from 'vuex'
  import * as types from '@/store/types';
  import HeroSmall from '@/components/HeroSmall.vue'
  import Header from '@/components/Header.vue'
  import Sidebar from '@/components/Sidebar.vue'
  import SidebarAccount from '@/components/Account/SidebarAccount.vue'
  import SidebarMenu from '@/components/SidebarMenu.vue'
  import Footer from '@/components/Footer.vue'

  export default {
      data(){
          return{
              params:  this.$route.params.link,
          }
      },
      computed: {
          ...mapGetters({
              isAuthenticated: types.GET_IS_AUTHENTICATED,
          }),

          auth(){
              return this.isAuthenticated
          },
      },

      components: {
          appHeroSmall: HeroSmall,
          appHeader: Header,
          appSidebar: Sidebar,
          appSidebarAccount: SidebarAccount,
          appSidebarMenu: SidebarMenu,
          appFooter: Footer
      },
  }

</script>

<style scoped>

</style>