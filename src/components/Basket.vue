<template>
  <div class="basket" v-if="ifOpenBasket" >
    <div class="card" ref="basketCard" :class="{ 'sticky' : ifStickyBasket == true}">
      <div class="card-body basket-body">
        <div class="basket-row py-3" v-for="(item, index) in basket" :key="index">
          <span class="basket-quantity">{{item.quantity}} x </span>
          <span class="basket-item"> {{item.name}}</span>
          <div class="basket-icons">
            <span class="icon-box" @click="decreaseQuantity(item)"><i class="icon-minus"></i></span>
            <span  class="icon-box" @click="increaseQuantity(item)"><i class="icon-plus"></i></span>
          </div>
          <p>{{item.price}}</p>
          <span class="" @click="removeFromBasket(item)"><i class="icon-trash-empty"></i></span>
        </div>
        <hr>
        <div v-if="basket.length > 0">
          <div class="basket-row pb-3">
            <p class="basket-text">Partial amount</p>
            <p>{{partialCost}} zł</p>
          </div>
          <div class="basket-row pb-3">
            <p class="basket-text">Delivery costs</p>
            <p v-if="basket.length > 0">{{basket[0].delCost}} zł</p>
            <p v-else>0 zł</p>
          </div>
          <div class="basket-row pb-3">
            <p class="basket-text">Total amount</p>
            <p v-if="basket.length > 0" >{{totalCost}} zł</p>
            <p v-if="basket.length > 0" >{{total}}</p>
            <p v-else>0 zł</p>
          </div>
          <a href="#" class="btn btn-primary btn-order" @click="addNewOrder">Order</a>
        </div>
        <div v-else>
          <p>{{ basketText }}</p>
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
        data() {
            return {
                height: 30,
//                id: this.$route.params.id,
//                order: [],
//                partialCost: 0,
//                totalCost: 0,
                sticky: 260,
                basketText: 'Your basket is empty',
                info: 'Please.login'
            }
        },

        methods: {
            ... mapMutations({
                addItemToBasket: types.MUTATE_ADD_TO_BASKET,
                cleanBasket: types.MUTATE_CLEAN_BASKET,
                getTotal: types.MUTATE_TOTAL
            }),


            openBasket() {
                this.changeBasketAct(this.ifOpenBasket)
            },

            removeFromBasket(item) {
                this.basket.splice(this.basket.indexOf(item), 1)
            },

            increaseQuantity(item) {
                item.quantity++;
                this.$store.commit(types.MUTATE_PARTIAL)
            },

            decreaseQuantity(item) {
                item.quantity--;
                if (item.quantity === 0) {
                    this.removeFromBasket(item)
                }
                this.$store.commit(types.MUTATE_PARTIAL)

            },
//            total(payload) {
////                console.log([partial, basket[0].delCost])
//                this.getTotal([this.partial, this.basket[0].delCost])
////                return this.totalCost = this.partial + this.basket[0].delCost
//            },

            stickHeader() {
                if (typeof this.$refs["basketCard"] !== 'undefined' && window.pageYOffset > this.sticky) {
                    this.$refs["basketCard"].classList.add("sticky");
                } else if (typeof this.$refs["basketCard"] !== 'undefined') {
                    this.$refs["basketCard"].classList.remove("sticky");
                }
            },

            addNewOrder() {
                this.$store.commit(types.MUTATE_ADD_ORDER, [this.basket, this.totalCost])
                console.log(this.order);
                this.$store.dispatch(types.ACT_BASKET_TO_DB, this.order);
                this.$store.commit(types.MUTATE_RESET_TOTAL);
                this.cleanBasket();

                if(this.auth){
                    this.basketText = 'Thank you, your order has been placed! :)'
                }else {
                    this.basketText = 'Please sign in first'
                }

            }
        },

        computed: {
            ...mapGetters({
                ifOpenBasket: types.GET_BASKET_STATUS,
                ifStickyBasket: types.GET_STICKY_BASKET,
                basket: types.GET_BASKET,
                order: types.GET_ORDER,
                totalCost: types.GET_TOTAL,
                partialCost: types.GET_PARTIAL,
                isAuthenticated: types.GET_IS_AUTHENTICATED

            }),
            partial() {
                this.$store.commit(types.MUTATE_PARTIAL)
            },

            total() {
                console.log(this.totalCost);
                this.$store.commit(types.MUTATE_TOTAL, [this.partialCost, this.basket[0].delCost])
            },
            auth(){
                return this.isAuthenticated
            }
        },
        created() {
            window.addEventListener('scroll', this.stickHeader);
        },
    }
</script>