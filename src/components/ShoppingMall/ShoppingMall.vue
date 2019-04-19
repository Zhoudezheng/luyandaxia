<template>
  <div class="shopping">
    <div class="shopping_head">
      <span class="head_title">文创商城</span>
      <div class="head_search" @click="inputmodel"></div>
    </div>
       <div class="page-loadmore-wrapper" :style="{ height: wrapperHeight + 'px' }">
            <mt-loadmore :top-method="loadTop" @top-status-change="handleTopChange"
                         :bottom-method="loadBottom" @bottom-status-change="handleBottomChange"
                         :bottom-all-loaded="allLoaded" :auto-fill="false" ref="loadmore">
                <!-- :auto-fill="true" 时页面加载完毕时 默认执行loadBottom 值为false时 自己写一个加载 -->
                 <div class="shopping_nva">
                    <ul class="nva_ul">
                      <li v-for="item in shops && shops.category" class="nva_li" @click="toClass(item.id,item.name)">
                        <img :src="item.icon" alt="新品推荐">
                        <span>{{item.name}}</span>
                      </li>
                    </ul>
                  </div>
                  <div class="shopping_line"></div>
                  <div class="shopping_more">
                    <div class="more_color"></div>
                    <span class="more_span">新品推荐</span>
                    <span class="more_p" @click="toClass(3,'新品推荐')">更多</span>
                    <img src="./image/gengduo.png" alt="更多" class="more_to">
                  </div>
                  <div class="shopping_lines"></div>
                  <div class="shopping_banner">
                    <swiper :options="swiperOption">
                      <swiper-slide class="banner_content" v-for="(item) in shops && shops.recommend" :key="item.id"  >
                        <img :src="item.cover" class="content_img" @click="todetail(item.id)">
                        <span class="content_span" @click="todetail(item.id)">{{item.name}}</span>
                        <p class="content_p" @click="todetail(item.id)">
                          <span class="p_span">¥</span>
                          <span class="p_sp">{{item.local_price}}</span>
                        </p>
                      </swiper-slide>
                    </swiper>
                  </div>
                  <div class="shopping_lineed"></div>
                  <div class="shopping_more">
                    <div class="more_color"></div>
                    <span class="more_span">猜你喜欢</span>
                  </div>
                  <div class="shopping_footer">
                    <div class="shopping_list" v-for="(item) in likeList" :key="item.id" @click="todetail(item.id)">
                      <img :src="item.cover" alt="1111" class="list_img">
                      <span class="list_a1">{{item.name}}</span>
                      <span class="list_a2">￥{{item.price}}</span>
                    </div>
                  </div>
                 <div slot="top" class="mint-loadmore-top" style="text-align:center">
                    <span v-show="topStatus !== 'loading'" :class="{ 'is-rotate': topStatus === 'drop' }">↓</span>
                    <mt-spinner v-show="topStatus == 'loading'" color="#26a2ff"></mt-spinner>
                 </div>
                 <div v-if="allLoaded" style="text-align:center;" class="data-none">没有更多数据了</div>
                 <div slot="bottom" class="mint-loadmore-bottom">
                    <span v-show="bottomStatus !== 'loading'" :class="{ 'is-rotate': bottomStatus === 'drop' }">↑</span>
                    <span v-show="bottomStatus === 'loading'">
                        <mt-spinner v-show="bottomStatus == 'loading'" color="#26a2ff"></mt-spinner>
                    </span>
                 </div>
            </mt-loadmore>
      </div>
     <!-- 搜索框 -->
    <searchdata v-show="serchdata" @searchlist="listsearch"/>
  </div>
</template>

<script>
  import 'swiper/dist/css/swiper.css' //这里注意具体看使用的版本是否需要引入样式，以及具体位置。
  import {swiper, swiperSlide} from 'vue-awesome-swiper'
  import {mapState} from 'vuex'
  import { reqcommondeta } from '../../api'
  import { truncate, link } from 'fs';
  import searchdata from './SearchData/SearchData.vue'
  import Vue from 'vue'
  import { Loadmore } from 'mint-ui';
  Vue.component(Loadmore.name, Loadmore);
  import { Spinner } from 'mint-ui';
  Vue.component(Spinner.name, Spinner);
  export default {
    data() {
      return {
        swiperOption: {
          loop: false,
          observer: true,//修改swiper自己或子元素时，自动初始化swiper
          observeParents: true,//修改swiper的父元素时，自动初始化swiper
          freeMode: true,
          width: 180,
          freeModeSticky: true,
        },
        examplename: 'Loadmore',
        pageNum: 1,//页码
        list: 0,//数据
        allLoaded: false,//数据是否加载完毕
        bottomStatus: '',//底部上拉加载状态
        wrapperHeight: 0,//容器高度
        topStatus: '',//顶部下拉加载状态
        serchdata:false,
        likeList:[],
        next:null,
      }
    },
    components: {
      swiper,
      swiperSlide,
      searchdata
    },
    computed: {
      ...mapState(['shops','isVip','shopslike'])
    },
    mounted() {
      this.getShop();
      let windowWidth = document.documentElement.clientWidth;//获取屏幕宽度
      if (windowWidth >= 768) {//这里根据自己的实际情况设置容器的高度
          this.wrapperHeight = document.documentElement.clientHeight - 105;
      } else {
          this.wrapperHeight = document.documentElement.clientHeight - 80;
      }
      setTimeout(() => {//页面挂载完毕 模拟数据请求 这里为了方便使用一次性定时器
        var lit = this.$store.state.shopslike.list;
        this.next=this.$store.state.shopslike.next;
        for(let i=0; i<lit.length;i++){
          this.likeList.push(lit[i]);
        }
      }, 1500)
    },
    methods: {
        purchase(){
            this.$router.push({
                path:'/purchaseorder'
            })
        },
        inputmodel(){
           this.serchdata=true
        },
        listsearch(msg){
          this.serchdata=msg;
        },
        getShop(){
        this.$store.dispatch('getShop').then(()=>{
          console.log(this.shops)
        })
        this.$store.dispatch('getShoplike',this.pageNum)
        this.$store.dispatch('getIsVip').then(()=>{
          let vipEnd = this.isVip.vip_end
          let date = (new Date()).getTime()
          let is_vip = 1
          if(vipEnd > date){
            is_vip = 1
          } else {
            is_vip = 0
          }
          localStorage.setItem('ifVip', is_vip);
        })
        },
      // async todetail(index) {
      //   var token = this.$store.state.Authorization;
      //   var det = await reqcommondeta(token, index);
      //   if (det.code === 200) {
      //     this.$store.dispatch('setproduct', det.data)
      //     this.$router.push({
      //       path: '/commoditydetails'
      //     })
      //   }
      // },
       toClass(id,name){
        localStorage.setItem('allList',id);
        localStorage.setItem('allListed',name);
        this.$router.push({
          path:'Classification',
          query:{
            classData:{
              id,
              name
            }
          }
        })
       },
      todetail(id){
        localStorage.setItem('product_id',id)
        this.$router.push({
          path: '/commoditydetails',
          query:{
            data:{
              id
            }
          }
        })
      },
      
      handleBottomChange(status) {
          this.bottomStatus = status;
      },
      loadBottom() {
          this.handleBottomChange("loading");//上拉时 改变状态码
          this.pageNum += 1;
          setTimeout(() => {//上拉加载更多 模拟数据请求这里为了方便使用一次性定时器
              if (this.next) {//最多下拉三次
                  this.$store.dispatch('getShoplike',this.pageNum).then(()=>{
                     this.next=this.shopslike.next;
                     for(let i=0; i<this.shopslike.list.length;i++){
                        this.likeList.push(this.shopslike.list[i]);
                      }
                  })
                  //上拉加载 每次数值加12
              } else {
                  this.allLoaded = true;//模拟数据加载完毕 禁用上拉加载
              }
              this.handleBottomChange("loadingEnd");//数据加载完毕 修改状态码
              this.$refs.loadmore.onBottomLoaded();
          }, 2000);
      },
      handleTopChange(status) {
          this.topStatus = status;
      },
      loadTop() {//下拉刷新 模拟数据请求这里为了方便使用一次性定时器
          this.handleTopChange("loading");//下拉时 改变状态码
          this.pageNum = 1;
          this.allLoaded = false;//下拉刷新时解除上拉加载的禁用
          setTimeout(() => {
              this.$store.dispatch('getShoplike',this.pageNum).then(()=>{
                       this.next=this.shopslike.next;
                       this.likeList=this.shopslike.list;
              })
              //下拉刷新 数据初始化
              this.handleTopChange("loadingEnd")//数据加载完毕 修改状态码
              this.$refs.loadmore.onTopLoaded();
          }, 2000);
      },
    }
  }
</script>

<style scoped>
  @import '../../../static/font/font.css';

.page-loadmore-wrapper {
        overflow: scroll;
        z-index: 100;
}
  .shopping_head {
    height: 91px;
    text-align: center;
    background-color: rgba(243, 117, 5, 1);
  }

  .shopping_head .head_tou {
    height: 60px;
    width: 60px;
    float: left;
    margin-top: 57px;
    margin-left: 28px;
  }

  .shopping_head .head_hui {
    float: left;
    width: 31px;
    height: 31px;
    margin-top: 87px;
    margin-left: -18px;
  }

  .shopping_head .head_title {
    /*float: left;*/
    /*margin-top: 58px;*/
    /*margin-left: 214px;*/
    line-height: 91px;
    width: 144px;
    height: 50px;
    font-size: 36px;
    font-family: PingFangSC-Medium;
    font-weight: 500;
    color: rgba(255, 255, 255, 1);
    /*line-height: 50px;*/
  }

  .shopping_head .head_car {
    background-image: url('./image/gouwu.png');
    width: 40px;
    height: 40px;
    background-size: 40px 40px;
    float: left;
    margin-top: 63px;
    margin-left: 156px;
  }

  .shopping_head .head_search {
    background: url('./image/sousuo.png') no-repeat;
    width: 33px;
    height: 33px;
    background-size: 33px 33px;
    float: right;
    margin-top: 32px;
    margin-right: 31px;
  }

  .shopping_nva {
    height: 186px;
  }

  .shopping_nva .nva_ul {
    height: 98px;
    margin-top: 23px;
  }

  .shopping_nva .nva_ul .nva_li {
    float: left;
    list-style: none;
  }

  .shopping_nva .nva_ul .nva_li img {
    float: left;
    margin-top: 34px;
    margin-left: 60px;
    width: 60px;
    height: 60px;
  }

  .shopping_nva .nva_ul .nva_li span {
    float: left;
    width: 96px;
    margin-top: 105px;
    margin-left: -76px;
    height: 33px;
    font-size: 24px;
    font-family: PingFangSC-Regular;
    font-weight: 400;
    color: rgba(102, 102, 102, 1);
    line-height: 33px;
  }

  .shopping_line {
    height: 8px;
    background-color: #eeeeee
  }

  .shopping_more {
    height: 73px;
  }

  .shopping_more .more_color {
    float: left;
    margin-top: 32px;
    margin-left: 28px;
    width: 42px;
    height: 42px;
    background: linear-gradient(285deg, rgba(255, 181, 0, 0) 0%, rgba(255, 126, 0, 1) 100%);
    border-radius: 25px;
  }

  .shopping_more .more_span {
    height: 45px;
    font-size: 32px;
    font-family: PingFangSC-Semibold;
    font-weight: 600;
    color: rgba(74, 74, 74, 1);
    line-height: 45px;
    float: left;
    margin-top: 30px;
    margin-left: -22px;
  }

  .shopping_more .more_p {
    width: 48px;
    height: 33px;
    font-size: 24px;
    font-family: PingFangSC-Medium;
    font-weight: 500;
    color: rgba(74, 74, 74, 1);
    line-height: 33px;
    float: left;
    margin-top: 45px;
    margin-left: 480px;
  }

  .shopping_more .more_to {
    width: 15px;
    height: 21px;
    float: right;
    margin-top: 50px;
    margin-right: 10px;

  }

  .shopping_banner {
    height: 403px;
  }

  .swiper-container {
    overflow: inherit;
  }

  .shopping_banner .banner_content {
    /* float: left; */
    margin-top: 28px;
    margin-left: 28px;
    width: 305px;
    height: 347px;
    background: rgba(255, 255, 255, 1);
    box-shadow: 0px 0px 10px 0px rgba(172, 166, 178, 0.1);
    border-radius: 12px;
    border: 1px solid rgba(240, 240, 240, 1);
  }

  .shopping_banner .banner_head {
    height: 347px;
    /* overflow: hidden; */
  }

  .shopping_banner .banner_content .content_img {
    width: 305px;
    height: 211px;
  }

  .shopping_banner .banner_content .content_span {
    float: left;
    margin-top: 24px;
    margin-left: 24px;
    width: 252px;
    height: 40px;
    text-align: left;
    font-size: 28px;
    font-family: PingFangSC-Medium;
    font-weight: 500;
    color: rgba(74, 74, 74, 1);
    line-height: 40px;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
  }

  .shopping_banner .banner_content .content_p {
    float: left;
    margin-top: 8px;
    margin-left: 26px;
    height: 40px;
    font-size: 20px;
    font-family: PingFangSC-Semibold;
    font-weight: 600;
    color: rgba(255, 126, 0, 1);
    line-height: 28px;
  }

  .p_sp {
    font-size: 28px;
  }

  .shopping_lineed {
    height: 16px;
    background-color: #eeeeee;
  }

  .shopping_footer {
    margin-bottom: 90px;
  }

  .shopping_list {
    height: 183px;
    border-bottom: 1px solid #eee;
    margin-top: 10px;
  }

  .shopping .shopping_list .list_img {
    float: left;
    width: 170px;
    height: 127px;
    margin: 28px 28px 0 28px;
  }

  .shopping_list a {
    text-decoration: none;
  }

  .shopping_list .list_a1 {
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
    float: left;
    margin: 28px 0 14px 0;
    width: 434px;
    height: 45px;
    font-size: 32px;
    font-family: PingFangSC-Medium;
    font-weight: 500;
    color: rgba(74, 74, 74, 1);
    line-height: 45px;
    text-align: left
  }

  .shopping_list .list_a2 {
    float: left;
    margin: 0 0 28px 0px;
    width: 434px;
    height: 68px;
    font-size: 24px;
    font-family: PingFangSC-Regular;
    font-weight: 400;
    color: rgba(102, 102, 102, 1);
    line-height: 33px;
    text-align: left
  }
  .mint-loadmore-bottom,.mint-loadmore-top,.center{
    margin-left: 350px;
  }
  .data-none{
    margin-bottom: 40px;
  }
</style>
