<template>
  <div class="menu-container">
      <div class="menu-list">
        <div v-for="(item, index) in resItem[id].menu" :key="index">
          <h2 class="menu-title" :id="index">{{index | capitalize}}</h2>
          <div class="card rest-card" v-for="(it, index) in item" :key="index">
            <div class="card-body rest-body" >
              <div class="rest-desc">
                <h5 class="card-title rest-card__title">{{ it.name }}</h5>
                <span class="card-text rest-card__ing" v-for="(ing, index) in it.ingredients" :key="index">{{ ing }}   </span>
              </div>
              <div class="rest-button">
                <a href="#" class="btn btn-primary" @click="addToBasket([it, resItem[id] ])">{{ it.price }} zł | +</a>
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
    import {mapMutations} from 'vuex'
    import Basket from '../../components/Basket.vue'

    export default {
        data(){
            return{
                height: 30,
                id: this.$route.params.id,
                link: this.$route.params.link,
                params: this.$route.params,
                ids: []
            }
        },

        methods: {
            ... mapMutations({
                addItemToBasket: types.MUTATE_ADD_TO_BASKET,
                cleanBasket: types.MUTATE_CLEAN_BASKET,
                param: types.MUTATE_PARAM
            }),
            getParam(param){
                return this.param(param)
            },

            findId(){
                let ids = [];
                this.resItem.forEach(function (el) {
                    ids.push(el.link)
                });
                this.ids = ids;
                if(typeof this.id === 'undefined'){
                    this.id = this.ids.indexOf(this.params.link);
                    return this.id
                }
            },

            addToBasket(item,delCost) {
                this.addItemToBasket(item, delCost)
                this.$store.commit(types.MUTATE_PARTIAL)
                this.$store.commit(types.MUTATE_TOTAL, [this.partial, this.basket[0].delCost])
            },

        },
        components: {
            appBasket: Basket
        },
        computed: {
            ...mapGetters({
                resItem: types.GET_REST_LIST,
                paramsStore: types.GET_PARAM,
                partial: types.GET_PARTIAL,
                basket: types.GET_BASKET
            }),
        },
        created () {
            window.addEventListener('scroll', this.stickHeader);
            this.findId();
            this.getParam([this.params, this.id])
        },
    }

</script>
