<template>
  <div>
    <div class="sidebar" ref="sidebar" v-if="typeof params.id != 'undefined' && $route.path == '/restaurants/' + params.link">
      <div v-for="(item, index) in this.resItem[params.id].types" :key="index">
        <a class="sidebar-btn" :href="'#' +item">{{item}}</a>
      </div>
    </div>
  </div>
</template>

<script>
    import * as types from '../store/types';
    import {mapGetters} from 'vuex'

  export default {

      data() {
          return {
//              item1: 'burgers',
//              item2: 'fries',
//              item3: 'drinks',
              sticky: 260,
          }
      },
      computed: {
          ...mapGetters({
              resItem: types.GET_REST_LIST,
              params: types.GET_PARAM
          }),
      },
      methods: {
          showParam(){

          },

          stickHeader() {
              console.log(window.pageYOffset)
              if (typeof this.$refs["sidebar"] !== 'undefined' && window.pageYOffset > this.sticky) {
                  this.$refs["sidebar"].classList.add("sticky");
              } else if (typeof this.$refs["sidebar"] !== 'undefined') {
                  this.$refs["sidebar"].classList.remove("sticky");
              }
          },

          getScrollTopByHref(element) {
              const id = element.getAttribute('href');
              console.log(id)
              return document.querySelector(id).offsetTop;

          },

          scrollTopPosition(to) {

              // use this for new browser
              window.scroll({
                top: to,
                behavior: 'smooth',
              });


              // function for old browsers
              this.smoothScroll(0, to);
          },

          scrollToIdOnClick(e) {
              e.preventDefault();
              const to = this.getScrollTopByHref(e.currentTarget) - 80;
              this.scrollTopPosition(to)
          },

          // use this function for old browsers
          smoothScroll(endX, endY, duration) {
          console.log(window.scrollY )
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
          }
    },
     created() {

    },
      mounted() {
          window.addEventListener('scroll', this.stickHeader);
          const menuItems = document.querySelectorAll('.sidebar-btn[href^="#"]');
          console.log(menuItems)
          menuItems.forEach(item => {
              item.addEventListener('click', this.scrollToIdOnClick);
          });
      }
  }
</script>