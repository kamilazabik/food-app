<template>
  <div class="bg">
    <app-hero-small :style="{height: this.height + 'rem', margin: 0 + 'px'}"></app-hero-small>
    <div class="main-container container">
      <div class="row">
        <div class="sidebar-content">
          <app-sidebar-account v-if="auth"></app-sidebar-account>
        </div>
        <div class="col-md-9 account-container">
          <router-view></router-view>
        </div>
      </div>
    </div>
    <app-footer></app-footer>
  </div>
</template>

<script>
    import {mapGetters} from 'vuex'
    import * as types from '@/store/types';
    import SidebarAccount from '@/components/Account/SidebarAccount.vue'
    import HeroSmall from '@/components/HeroSmall.vue'
    import Footer from '@/components/Footer.vue'

    export default {
        data(){
            return{
                height: 30,
            }
        },
        computed: {
            ...mapGetters({
                isAuthenticated: types.GET_IS_AUTHENTICATED
            }),

            auth(){
                return this.isAuthenticated
            }
        },

        components: {
            appSidebarAccount: SidebarAccount,
            appHeroSmall: HeroSmall,
            appFooter: Footer
        },
    }

</script>