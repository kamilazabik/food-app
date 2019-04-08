<template>
  <div class="hero-container" >
    <div class="hero-inner ">
      <div class="container buttons">
        <div class="row">
          <div class="col justify-content-end">
            <ul>
              <li v-if="!auth">
                <router-link tag="button" :to="{name: 'signup'}" class="btn btn-primary btn-sign">Sign up</router-link>
              </li>
              <li v-if="!auth">
                <router-link tag="button" :to="{name: 'signin'}" class="btn btn-primary btn-sign">Sign in</router-link>
              </li>
              <li  v-if="auth">
                <router-link tag="button" :to="{name: 'account'}" class="btn btn-primary btn-sign">Account</router-link>
              </li>
              <li v-if="auth">
                <button class="logout btn btn-primary btn-sign" @click="onLogout">Logout</button>
              </li>
            </ul>
          </div>
        </div>
      </div>
      <div class="hero-small">
        <router-link to="/restaurants" tag="h1" class="display-4 hero-small-title">
          <a class="hero-link">Order Your Favourite Dishes Online!</a>
        </router-link>
      </div>
      <app-header></app-header>
    </div>
    <div class=" jumbotron-fluid jumbotron-small" :style="{height: this.heroHeight + '%', margin: 0 + '%'}">
    </div>
  </div>
</template>

<script>
    import {mapGetters} from 'vuex'
    import {mapMutations} from 'vuex'
    import * as types from '../store/types';
    import Header from '../components/Header.vue'

    export default {
        components: {
            appHeader: Header,
        },

        computed: {
            ...mapGetters({
                isAuthenticated: types.GET_IS_AUTHENTICATED,
                heroHeight: types.GET_HERO_HEIGHT
            }),

            auth(){
                return this.isAuthenticated
            },
        },

        methods: {
            ... mapMutations({
                setHeroHeight: types.MUTATE_SET_HERO_START
            }),

            onLogout(){
                this.$store.dispatch(types.ACT_LOGOUT)
            },
        },

        created() {
            this.setHeroHeight()
        }
    }
</script>
