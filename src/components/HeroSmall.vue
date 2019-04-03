<template>
  <div class="jumbotron jumbotron-fluid jumbotron-small" :style="{height: this.heroHeight + 'px', margin: 0 + 'px'}">
    <div class="container buttons">
      <div class="row">
        <div class="col">
          <ul>
            <li v-if="!auth">
              <router-link tag="button" :to="{name: 'signup'}" class="btn btn-primary btn-sign">Sign up{{heroHeight}}</router-link>
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
    <div class="hero">
      <router-link to="/restaurants" tag="h1" class="display-4 hero-text">
        <a class="hero-link">Order Your Favourite Dishes Online!</a>
      </router-link>
    </div>
    <app-header></app-header>
  </div>
</template>

<script>
    import {mapGetters} from 'vuex'
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
            onLogout(){
                this.$store.dispatch(types.ACT_LOGOUT)
            },
        },
    }
</script>

<style lang="scss">
  /*.jumbotron-small {*/
    /*height: 30rem;*/
    /*position: relative;*/
  /*}*/
  /*.buttons {*/
    /*position: absolute;*/
    /*top: 2rem;*/
    /*background-color: transparent;*/
    /*text-align: right;*/
    /*max-width: 1240px;*/

    /*.row {*/
      /*background-color: transparent;*/
    /*}*/
  /*}*/

  /*.btn-sign {*/
    /*font-size: 1.6rem;*/
    /*padding: 0.6rem 2rem;*/

    /*&:first-child{*/
      /*margin-right: 1rem;*/
    /*}*/
  /*}*/


</style>