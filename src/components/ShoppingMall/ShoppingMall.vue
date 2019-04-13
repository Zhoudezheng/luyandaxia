<template>
  <div class="shopping">
    <div class="shopping_head">
      <span class="head_title">文创商城</span>
      <div class="head_search" @click="inputmodel"></div>
    </div>
    <div class="shopping_nva">
      <ul class="nva_ul">
        <li v-for="(item) in shops && shops.category" class="nva_li" @click="toClass(item.id,item.name)">
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
      <div class="shopping_list" v-for="(item) in shops && shops.like" :key="item.id" @click="todetail(item.id)">
        <img :src="item.cover" alt="1111" class="list_img">
        <span class="list_a1">{{item.name}}</span>
        <span class="list_a2">￥{{item.price}}</span>
      </div>
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
  import { truncate } from 'fs';
  import searchdata from './SearchData/SearchData.vue'

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
        serchdata:false,
      }
    },
    components: {
      swiper,
      swiperSlide,
      searchdata
    },
    computed: {
      ...mapState(['shops','isVip'])
    },
    mounted() {
      this.getShop()
      // console.log(this.$store.state.shops);
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
        this.$store.dispatch('getShop')
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
        this.$router.push({
          path: '/commoditydetails',
          query:{
            data:{
              id
            }
          }
        })
      }
    }
  }
</script>

<style scoped>
  @import '../../../static/font/font.css';

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
    margin-bottom: 120px;
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

</style>
