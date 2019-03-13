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
            <p>{{partial}} zł</p>
          </div>
          <div class="basket-row pb-3">
            <p class="basket-text">Delivery costs</p>

            <p v-if="basket.length > 0">{{basket[0].delCost}}zł</p>
            <!--<p v-if="basket.length > 0">{{resItem[id].options[0].deliverCost}} zł</p>-->
            <p v-else>0 zł</p>
          </div>
          <div class="basket-row pb-3">
            <p class="basket-text">Total amount</p>
            <p v-if="basket.length > 0">{{total}} zł</p>
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

    export default {
        data() {
            return {
                height: 30,
//                id: this.$route.params.id,
//                order: [],
                partialCost: 0,
                totalCost: 0,
                sticky: 260,
                basketText: 'Your basket is empty',
                info: 'Please.login'
            }
        },

        methods: {
            ... mapActions({
                addItemToBasket: types.ACT_ADD_TO_BASKET,
                cleanBasket: types.ACT_CLEAN_BASKET,
            }),

            openBasket() {
                this.changeBasketAct(this.ifOpenBasket)
            },

            removeFromBasket(item) {
                this.basket.splice(this.basket.indexOf(item), 1)
            },

            increaseQuantity(item) {
                item.quantity++;
            },

            decreaseQuantity(item) {
                item.quantity--;
                if (item.quantity === 0) {
                    this.removeFromBasket(item)
                }
            },

            stickHeader() {
                if (typeof this.$refs["basketCard"] !== 'undefined' && window.pageYOffset > this.sticky) {
                    this.$refs["basketCard"].classList.add("sticky");
                } else if (typeof this.$refs["basketCard"] !== 'undefined') {
                    this.$refs["basketCard"].classList.remove("sticky");
                }
            },

            addNewOrder() {
                this.$store.dispatch(types.ACT_ADD_ORDER, [this.basket, this.totalCost])
                console.log(this.order)
                this.$store.dispatch(types.ACT_BASKET_TO_DB, this.order);
                this.cleanBasket();
                this.basketText = 'Thank you, your order has been placed! :)'
            }
        },

        computed: {
            ...mapGetters({
                ifOpenBasket: types.GET_BASKET_STATUS,
                ifStickyBasket: types.GET_STICKY_BASKET,
                basket: types.GET_BASKET,
                order: types.GET_ORDER

            }),
            partial() {
                this.partialCost = 0;
                for (var items in this.basket) {
                    var individualItem = this.basket[items];
                    this.partialCost += individualItem.quantity * individualItem.price;
                }
                return this.partialCost
            },

            total() {
                return this.totalCost = this.partial + this.basket[0].delCost
            }
        },
        created() {
            window.addEventListener('scroll', this.stickHeader);
        },
    }
</script>