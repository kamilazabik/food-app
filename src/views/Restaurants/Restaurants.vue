<template>
  <div class="bg">
    <app-hero-small ></app-hero-small>
    <div class="container-rest">
      <div class="row">
          <div class="col-md-3">
            <app-sidebar></app-sidebar>
            <app-sidebar-menu :params="this.$route.params.link"></app-sidebar-menu>
          </div>
          <div class="col-md-9">
            <router-view></router-view>
          </div>
      </div>
    </div>
  </div>
</template>

<script>
  import {mapGetters} from 'vuex'
  import * as types from '../../store/types';
  import HeroSmall from '../../components/HeroSmall.vue'
  import Header from '../../components/Header.vue'
  import Sidebar from '../../components/Sidebar.vue'
  import SidebarAccount from '../../components/Account/SidebarAccount.vue'
  import SidebarMenu from '../../components/SidebarMenu.vue'

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
          appSidebarMenu: SidebarMenu
      },
  }

</script>

<style scoped>

</style>