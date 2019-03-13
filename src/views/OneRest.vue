<template>
  <div class="menu-con">
      <div class="menu">
        <div class="card rest-card" v-for="item in menu[link]">
          <div class="card-body rest-body">
            <div class="rest-desc">
              <h5 class="card-title rest-card__title">{{ item.name }}</h5>
              <span class="card-text rest-card__ing" v-for="ing in item.ingredients">{{ ing }}   </span>
            </div>
            <div class="rest-button">
              <!--<a href="#" class="btn btn-primary" @click="addToBasket([item, resItem[link].options[0].deliverCost ])">{{ item.price }} zł | +</a>-->
              <a href="#" class="btn btn-primary" @click="addToBasket([item, '6' ])">{{ item.price }} zł | +</a>
            </div>
          </div>
        </div>
      </div>
      <app-basket :id ='link'></app-basket>
  </div>
</template>

<script>
    import * as types from '../store/types';
    import {mapGetters} from 'vuex'
    import {mapActions} from 'vuex'
    import Basket from '../components/Basket.vue'

    export default {
        data(){
            return{
                height: 30,
                id: this.$route.params.id,
                link: this.$route.params.link
            }
        },

        methods: {
            ... mapActions({
                addItemToBasket: types.ACT_ADD_TO_BASKET,
                cleanBasket: types.ACT_CLEAN_BASKET
            }),

//            openBasket(){
//                this.changeBasketAct(this.ifOpenBasket)
//            },

            addToBasket(item,delCost) {
                this.addItemToBasket(item, delCost)
            }
        },
        components: {
            appBasket: Basket
        },
        computed: {
            ...mapGetters({
                resItem: types.GET_REST_LIST,
                menu: types.GET_MENU,
            }),
        },
        created () {
            window.addEventListener('scroll', this.stickHeader);
        },
    }

</script>

<style scoped lang="scss">



</style>