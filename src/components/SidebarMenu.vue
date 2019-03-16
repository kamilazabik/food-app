<template>
  <div class="sidebar" >
    <div v-for="(item, index) in this.resItem[param.id].types" :key="index">
        <a class="sidebar-btn">{{item}}</a>
    </div>
  </div>
</template>

<script>
    import * as types from '../store/types';
    import {mapGetters} from 'vuex'

  export default {

      computed: {
          ...mapGetters({
              resItem: types.GET_REST_LIST,
              param: types.GET_PARAM
          }),
      },
      methods: {
          showParam(){

          },
      },
      created(){
          console.log(this.param)
      }
  }
</script>