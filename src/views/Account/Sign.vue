<template>
  <div class="bg">
    <app-hero-small :style="{height: this.height + 'rem', margin: 0 + 'px'}"></app-hero-small>
    <div class="container-rest">
      <div class="row">
        <div class="col-md-3">
          <app-sidebar-account v-if="auth"></app-sidebar-account>
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
    import SidebarAccount from '../../components/Account/SidebarAccount.vue'
    import HeroSmall from '../../components/HeroSmall.vue'

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
        },
    }

</script>