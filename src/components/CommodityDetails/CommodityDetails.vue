<template>
  <div class="shopping">
    <div class="shopping_banner">
      <swiper :options="swiperOption">
        <swiper-slide class="banner_content" v-for="(item) in shops && shops.recommend" :key="item.id" >
          <img :src="item.cover" class="content_img">
        </swiper-slide>
      </swiper>
    </div>
    <div class="deta_title">
       <div class="title_a1">{{productdata.name}}</div>
       <div class="title_a2">VIP会员价:¥{{productdata.vip_price}}</div>
       <div class="title_a3">
           <span class="a3_a">¥{{productdata.local_price}}</span>
           <span class="a3_b">¥{{productdata.price}}</span>
       </div>
       <div class="title_a4">
           <span class="a4_a">快递:¥{{productdata.freight}}</span>
           <span class="a4_b">月售{{productdata.sale_num}}件</span>
           <span class="a4_c">库存{{productdata.stock}}件</span>
       </div>
    </div>
  </div>
</template>

<script>
  import 'swiper/dist/css/swiper.css' //这里注意具体看使用的版本是否需要引入样式，以及具体位置。
  import {swiper, swiperSlide} from 'vue-awesome-swiper'
  import {mapState} from 'vuex'

  export default {
    data() {
      return {
        productdata:'',
        swiperOption: {
          loop:true,
          observer: true,//修改swiper自己或子元素时，自动初始化swiper
          observeParents: true,//修改swiper的父元素时，自动初始化swiper
        },
      }
    },
    components: {
      swiper,
      swiperSlide
    },
    computed: {
      ...mapState(['shops'])
    },
    mounted(){
        this.productdata=this.$store.state.productdata.detail
        console.log(this.productdata)
    },
    methods: {
    }
  }
</script>

<style scoped>
  @import '../../../static/font/font.css';
  .shopping_banner {
    height: 403px;
  }
  .swiper-container {
    overflow: inherit;
  }
  .shopping_banner .banner_content {
    width: 100%;
    height: 347px;
    background: rgba(255, 255, 255, 1);
    box-shadow: 0px 0px 10px 0px rgba(172, 166, 178, 0.1);
  }
  .shopping_banner .banner_head {
    height: 347px;
  }
  .shopping_banner .banner_content .content_img {
    width: 100%;
    height: 450px;
  }
  .deta_title{
      margin-top: 80px;
      text-align: left;
  }
  .deta_title .title_a1{
    margin-left:20px;
    height: 33px;
    font-size: 32px;
    font-family: PingFangSC-Regular;
    font-weight: 600;
    color: #000000;
    line-height: 33px;
  }
  .deta_title .title_a2{
    margin-left: 20px;
    margin-top: 15px;
    height: 33px;
    font-size: 28px;
    font-family: PingFangSC-Regular;
    font-weight: 500;
    color: red;
    line-height: 33px;
  }
  .deta_title .title_a3{
    margin-left: 20px;
    margin-top: 15px;
  }
  .title_a3 .a3_a{
     height: 33px;
    font-size: 28px;
    font-family: PingFangSC-Regular;
    font-weight: 500;
    color: orange;
    line-height: 33px;
  }
  .title_a3 .a3_b{
    display: inline-block;
    margin-left: 50px;
    height: 33px;
    font-size: 28px;
    font-family: PingFangSC-Regular;
    font-weight: 400;
    color: rgba(102, 102, 102, 1);
    line-height: 33px;
    text-decoration:line-through;
  }
  .deta_title .title_a4{
    color: rgba(102, 102, 102, 1);
    margin-left: 20px;
    margin-top: 15px;
    display: flex;
  }
  .deta_title .title_a4 span{
    display: flex;
    flex: 1;
    text-align: center;
    align-items: center;
    justify-content: space-between
  }
</style>
