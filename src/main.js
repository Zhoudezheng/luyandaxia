// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import store from './store'
import router from './router'
import 'lib-flexible'
import Mint from 'mint-ui'
import 'mint-ui/lib/style.css'
import VueVideoPlayer from 'vue-video-player'
import proxy from 'http-proxy-middleware'
import 'video.js/dist/video-js.css';
import 'vue-video-player/src/custom-theme.css';
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

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>',
  store
})
