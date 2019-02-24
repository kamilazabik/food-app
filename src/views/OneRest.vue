<template>
  <div class="bg">
          <div class="card rest-card" v-for="item in menu[id]">
            <div class="card-body rest-body">
              <div class="rest-desc">
                <h5 class="card-title rest-card__title">{{ item.name }}</h5>
                <span class="card-text rest-card__ing" v-for="ing in item.ingredients">{{ ing }}   </span>
              </div>
             <div class="rest-button">
               <a href="#" class="btn btn-primary">{{ item.price }} zł | +</a>
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
                id: this.$route.params.id
            }
        },

        methods: {


        },
        components: {
            appHero: Hero,
        },
        computed: {
            ...mapGetters({
                resItem: 'resItem',
                menu: 'oneResMenu'
            })
        },
    }

</script>

<style scoped lang="scss">
  .bg {
    background-color: #f8f5f2;
  }

  .rest{
    &-body {
      display: flex;
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