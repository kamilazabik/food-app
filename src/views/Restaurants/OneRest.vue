<template>
  <div class="menu-con">
      <div class="menu">
        <div v-for="(item, index) in resItem[id].menu" :key="index">
          <div class="card rest-card" v-for="(it, index) in item" >
            <div class="card-body rest-body" >
              <div class="rest-desc">
                <h5 class="card-title rest-card__title">{{ it.name }}</h5>
                <span class="card-text rest-card__ing" v-for="(ing, index) in it.ingredients" :key="index">{{ ing }}   </span>
              </div>
              <div class="rest-button">
                <a href="#" class="btn btn-primary" @click="addToBasket([it, resItem[id] ])">{{ it.price }} zł | +</a>
                <!--<div class="item">{{itemid}}</div>-->
              </div>
            </div>
          </div>
        </div>
      </div>
      <app-basket :id ='link'></app-basket>
  </div>
</template>

<script>
    import * as types from '../../store/types';
    import {mapGetters} from 'vuex'
    import {mapActions} from 'vuex'
    import Basket from '../../components/Basket.vue'

    export default {
//        props: ["itemid"],
        data(){
            return{
                height: 30,
                id: this.$route.params.id,
                link: this.$route.params.link,
                params: this.$route.params
            }
        },

        methods: {
            ... mapActions({
                addItemToBasket: types.ACT_ADD_TO_BASKET,
                cleanBasket: types.ACT_CLEAN_BASKET,
                param: types.ACT_PARAM
            }),
            getParam(param){
                return this.param(param)
            },
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
            }),
        },
        created () {
            window.addEventListener('scroll', this.stickHeader);
              this.getParam(this.params)

        },
    }

</script>

<style scoped lang="scss">



</style>