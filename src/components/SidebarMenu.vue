<template>
  <div>
    <div class="sidebar" v-if="typeof params.id != 'undefined' && $route.path == '/restaurants/' + params.link">
      <div v-for="(item, index) in this.resItem[params.id].types" :key="index">
        <a class="sidebar-btn">{{item}}</a>
      </div>
    </div>
    {{$route.path}}
  </div>
</template>

<script>
    import * as types from '../store/types';
    import {mapGetters} from 'vuex'

  export default {

      computed: {
          ...mapGetters({
              resItem: types.GET_REST_LIST,
              params: types.GET_PARAM
          }),
      },
      methods: {
          showParam(){

          },
      },
      created(){
          console.log(this.params)
      }
  }
</script>