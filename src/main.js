// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import store from './store'
import router from './router'
import Axios from 'axios'
import 'lib-flexible'
import Mint from 'mint-ui'
import 'mint-ui/lib/style.css'
import VueVideoPlayer from 'vue-video-player'
import proxy from 'http-proxy-middleware'
import 'video.js/dist/video-js.css';
import 'vue-video-player/src/custom-theme.css';
import VueAwesomeSwiper from 'vue-awesome-swiper'
import 'swiper/dist/css/swiper.css'

Vue.use(VueAwesomeSwiper, /* { default global options } */)
Vue.use('/api',proxy({
  target:'http://47.93.41.61',
  changeOrigin:true
}));
Vue.use(VueVideoPlayer);
Vue.use(Mint)
Vue.config.productionTip = false

window.onresize = setHtmlFontSize;
function setHtmlFontSize(){
    const htmlWidth = document.documentElement.clientWidth || document.body.clientWidth;
    const htmlDom = document.getElementsByTagName('html')[0];
    htmlDom.style.fontSize = htmlWidth / 10 + 'px';
};
setHtmlFontSize();
router.beforeEach((to, from, next) => {
  if (to.path === '/login') {
    next();
  } else {
    let token = localStorage.getItem('Authorization');
    if (token === 'null' || token === '') {
      next('/login');
    } else {
      next();
    }
  }
});
/* eslint-disable no-new */
Axios.defaults.headers.common['Authentication-Token'] = store.state.token;
// 添加请求拦截器
Axios.interceptors.request.use(config => {
  // 在发送请求之前做些什么
  //判断是否存在token，如果存在将每个页面header都添加token
  if(store.state.token){
    config.headers.common['Authentication-Token']=store.state.token
  } 
  return config;
  }, error => {
  // 对请求错误做些什么
  return Promise.reject(error);
  });
   
  // http response 拦截器
  Axios.interceptors.response.use(
      response => {
      
      return response;
      },
      error => {
      
      if (error.response) {
      switch (error.response.status) {
      case 401:
      this.$store.dispatch('del_token');
      router.replace({
      path: '/login',
      query: {redirect: router.currentRoute.fullPath}//登录成功后跳入浏览的当前页面
      })
      }
      }
  return Promise.reject(error.response.data)
  });
  

new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>',
  store
})
