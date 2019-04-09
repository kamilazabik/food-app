<template>
  <div>
    <h2 class="py-5">Your personal data:</h2>
    <div class="row">
      <div class="col-md-4">
        <p class="fs-1-6">Name:</p>
      </div>
      <div class="col-md-4">
        <p class="fs-1-6">{{user.name}}</p>
      </div>
    </div>
    <div class="row">
      <div class="col-md-4">
        <p class="fs-1-6">Emal address: </p>
      </div>
      <div class="col-md-4">
        <p class="fs-1-6">{{user.email}}</p>
      </div>
    </div>
  </div>

</template>

<script>
    import {mapGetters} from 'vuex'
    import * as types from '@/store/types';

  export default {
      computed: {
          ...mapGetters({
              user: types.GET_USER,
          }),

      },
      created(){
          this.$store.dispatch(types.ACT_FETCH_USER)
      }
  }
</script>