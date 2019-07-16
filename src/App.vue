<template>
  <div id="app">
    <router-view/>
    <FootGuide v-show="$route.meta.isShow"/>
  </div>
</template>

<script>
import FootGuide from './components/FootGuide/FootGuide.vue'
export default {
  name: 'App',
  components: { // 局部注册, 只能在当前组件中使用
    FootGuide
  },
  
}
</script>

<style>
 /* @import "common/font/font.css"; */
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  height: 100%;
  /* margin-top: 60px; */
}
</style>
