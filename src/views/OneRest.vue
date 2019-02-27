<template>
  <div class="menu-con">
      <div class="menu">
        <div class="card rest-card" v-for="item in menu[id]">
          <div class="card-body rest-body">
            <div class="rest-desc">
              <h5 class="card-title rest-card__title">{{ item.name }}</h5>
              <span class="card-text rest-card__ing" v-for="ing in item.ingredients">{{ ing }}   </span>
            </div>
            <div class="rest-button">
              {{resItem[id].options[0].deliverCost }}
              <a href="#" class="btn btn-primary" @click="addToBasket([item, resItem[id].options[0].deliverCost ])">{{ item.price }} zł | +</a>
            </div>
          </div>
        </div>
      </div>


      <!--<div class="basket-header">-->

          <!--<h5 class="card-header" v-if="basket.length > 0">Basket 0</h5>-->
          <!--<h5 class="card-header" v-else>Basket</h5>-->

      <!--</div>-->

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
                <p v-if="basket.length > 0">{{resItem[id].options[0].deliverCost}} zł</p>
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
  </div>
</template>

<script>
    import {mapGetters} from 'vuex'
    import {mapActions} from 'vuex'
    import Hero from '../components/Hero.vue'
    import {dbOrdersRef } from '../firebaseConfig'

    export default {
        data(){
            return{
                height: 30,
                id: this.$route.params.id,
                order: [],
                partialCost: 0,
                totalCost: 0,
                sticky: 260,
                basketText: 'Your basket is empty',



            }
        },

        methods: {
            ... mapActions({
                addItemToBasket: 'addToBasket',
                cleanBasket: 'cleanBasket',
            }),

            openBasket(){
                this.changeBasketAct(this.ifOpenBasket)
            },

            addToBasket(item,delCost) {
                this.addItemToBasket(item, delCost)
            },
            removeFromBasket(item){
                this.basket.splice(this.basket.indexOf(item), 1)
            },
            increaseQuantity(item) {
                item.quantity++;
            },
            decreaseQuantity(item) {
                item.quantity--;
                if(item.quantity === 0){
                    this.removeFromBasket(item)
                }
            },
            addNewOrder(){
                this.order.push({

                })
            },
            stickHeader () {
                if (typeof this.$refs["basketCard"] !== 'undefined' && window.pageYOffset > this.sticky ) {
                    this.$refs["basketCard"].classList.add("sticky");
                } else if (typeof this.$refs["basketCard"] !== 'undefined' ){
                    this.$refs["basketCard"].classList.remove("sticky");
                }
            },
            addNewOrder(){
                console.log(this.basket);
                dbOrdersRef.push(this.basket);
                this.cleanBasket();
                this.basketText = 'Thank you, your order has been placed! :)'
            }


        },
        components: {
            appHero: Hero,
        },
        computed: {
            ...mapGetters({
                resItem: 'resItem',
                menu: 'oneResMenu',
                ifOpenBasket: 'checkBasket',
                ifStickyBasket: 'checkStickyBasket',
                basket: 'pushBasket'
            }),
            partial(){
                this.partialCost = 0;
                for(var items in this.basket){
                    var individualItem = this.basket[items];
                    this.partialCost += individualItem.quantity * individualItem.price;
                }
                return this.partialCost
            },
            total(){
                return this.totalCost = this.partial + this.basket[0].delCost
            }
        },
        created () {
            window.addEventListener('scroll', this.stickHeader);
        },
    }

</script>

<style scoped lang="scss">
  .menu-con {
    /*background-color: #ffffff;*/
    display: flex;
    position: relative;
  }

  .menu {
    padding: 3rem 1rem;
    max-width: 100%;
    background-color: #f8f5f2;
  }

  .rest{
    &-body {
      display: flex;
      padding: 0;
    }

    &-desc {
      width: 80%;
    }

    &-button {
      width: 20%;
      text-align: right;


      a {
        font-size: 1.8rem;
      }

    }

    &-card {
      margin: 1rem 0;
      padding: 3rem 2rem;

      &__title {
        margin: 8px 0 16px;
        color: #0a3847;
        font-size: 1.8rem;
        line-height: 2rem;
        font-weight: 600;
        text-align: left;
      }

      &__ing {
        font-size: 1.5rem;
      }
    }
  }


</style>