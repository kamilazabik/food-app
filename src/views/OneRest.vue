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
              <a href="#" class="btn btn-primary" @click="addToBasket(item)">{{ item.price }} zł | +</a>
            </div>
          </div>
        </div>
      </div>
      <div class="basket-header">

          <h5 class="card-header" v-if="basket.length > 0">Basket 0</h5>
          <h5 class="card-header" v-else>Basket</h5>

      </div>

      <div class="basket" >
        <div class="card">
          <div class="card-body basket-body" v-if="basket.length > 0">
            <div class="basket-row py-3" v-for="item in basket">
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
            <div class="basket-row pb-3">
              <p class="basket-text">Partial amount</p>
              <p>{{partial}}</p>
            </div>
            <div class="basket-row pb-3">
              <p class="basket-text">Delivery costs</p>
              <p>{{resItem[id].options[0].deliverCost}} zł</p>
            </div>
            <div class="basket-row pb-3">
              <p class="basket-text">Total amount</p>
              <p>{{partial + resItem[id].options[0].deliverCost}}</p>
            </div>
            <a href="#" class="btn btn-primary btn-order">Order</a>
          </div>
        </div>
      </div>

  </div>
</template>

<script>
    import {mapGetters} from 'vuex'
    import Hero from '../components/Hero.vue'

    export default {
        data(){
            return{
                height: 30,
                id: this.$route.params.id,
                basket: []

            }
        },

        methods: {
            addToBasket(item) {
                this.basket.push({
                    name: item.name,
                    price: item.price,
                    delCost: this.resItem[this.id].options[0].deliverCost,
                    quantity: 1
                })
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

        },
        components: {
            appHero: Hero,
        },
        computed: {
            ...mapGetters({
                resItem: 'resItem',
                menu: 'oneResMenu'
            }),
            partial(){
                var totalCost = 0;
                for(var items in this.basket){
                    var individualItem = this.basket[items];
                    totalCost+= individualItem.quantity * individualItem.price;
                }
                return totalCost
            }
        },
    }

</script>

<style scoped lang="scss">
  .menu-con {
    background-color: #f8f5f2;
    display: flex;
    position: relative;
  }

  .menu {
    padding: 3rem 1rem;
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