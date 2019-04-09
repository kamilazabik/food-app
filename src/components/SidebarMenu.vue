<template>
  <div >
    <div class="sidebar" :class="{'open': ifOpenSidebar == true, 'sticky': ifStickySidebar == true}" ref="sidebar" v-if="typeof params.id != 'undefined' && $route.path == '/restaurants/' + params.link">
      <div v-for="(item, index) in this.resItem[params.id].types" :key="index">
        <a class="sidebar-btn" :href="'#' +item"  @click.prevent="scrollToIdOnClick($event)">{{item | capitalize}} </a>
      </div>
    </div>
  </div>
</template>

<script>
    import * as types from '../store/types';
    import {mapGetters} from 'vuex'
    import {mapMutations} from 'vuex'

  export default {
      computed: {
          ...mapGetters({
              resItem: types.GET_REST_LIST,
              params: types.GET_PARAM,
              ifOpenSidebar: types.GET_OPEN_SIDEBAR,
              ifStickySidebar: types.GET_STICKY_SIDEBAR
          }),
      },
      methods: {
          ...mapMutations({
              stickSidebar: types.MUTATE_STICKY_SIDEBAR,
              mobileSidebar: types.MUTATE_MOBILE_SIDEBAR
          }),

          stickySidebar() {
              this.stickSidebar()
          },

          getScrollTopByHref(element) {
              const id = element.getAttribute('href');
              return document.querySelector(id).offsetTop;
          },

          scrollTopPosition(to) {
              //  for new browser
              window.scroll({

                top: to,
                behavior: 'smooth',
              });

              // function for old browsers
              this.smoothScroll(0, to);
          },

          scrollToIdOnClick(e) {
//              e.preventDefault();
              const to = this.getScrollTopByHref(e.currentTarget) - 80;
              this.scrollTopPosition(to)
          },

          //function for old browsers
          smoothScroll(endX, endY, duration) {
              const startX = window.scrollX || window.pageXOffset;
              const startY = window.scrollY || window.pageYOffset;
              const distanceX = endX - startX;
              const distanceY = endY - startY;
              const startTime = new Date().getTime();


              duration = typeof duration !== 'undefined' ? duration : 400;

              const easeInOutQuart = (time, from, distance, duration) => {
                  if ((time /= duration / 2) < 1 ) return distance / 2 * time * time * time * time + from;
                  return - distance / 2 * ((time -= 2) * time * time * time - 2) + from;
              };

              const timer = setInterval(() => {
                  const time = new Date().getTime() - startTime;
                  const newX = easeInOutQuart(time, startX, distanceX, duration);
                  const newY = easeInOutQuart(time, startY, distanceY, duration);
                  if ( time >= duration )
                      clearInterval(timer);
                  window.scroll(newX, newY);
              }, 100 / 60);
          },

          manageSidebar(e){
              this.mobileSidebar()
          }
      },
      mounted() {
          window.addEventListener('scroll', this.stickySidebar);
      },
      created() {
          addEventListener('resize', this.manageSidebar);
      }
  }
</script>