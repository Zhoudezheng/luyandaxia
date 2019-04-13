<template>
  <div class="shopping" ref="wo">
    <div class="address_div" id='head_flexed' :class=" headFixed === true ? 'head_Fixed' :''">
            <img src="./image/fanhui.png" alt="回退"  class="address_check" @click="address">
            <!-- <img src="./image/shoucang_down.png" alt="收藏" class="collection" > -->
              <span  :class="is_collection ? 'liveSharing_nvastart':'liveSharing_nvastart_down'" @click="shoucang"></span>
    </div>
    <div class="shopping_banner">
      <swiper :options="swiperOption" v-if="showSwiper">
      <!-- slides -->
        <swiper-slide v-for="item of list" :key="item.id">
          <img class="banner_content" :src="item">
        </swiper-slide>
      <!-- Optional controls -->
        <div class="swiper-pagination" slot="pagination"></div>
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
        <div class="a4_a">
          <span> 快递:¥{{productdata.freight}}</span>
        </div>
        <div class="a4_b">
          <span>月售{{productdata.sale_num}}件</span> 
        </div>
        <div class="a4_c">
          <span>库存{{productdata.stock}}件</span>
        </div>
      </div>
    </div>
    <div class="details_footer">
      <div class="footer_warp " @click="goto(1)">
        <img class="cart_img" src="./image/cart.png" alt="cart">
        <div>购物车</div>
      </div>
      <div class="footer_warp" @click="goto(2)">
        <div class="add_cart footer_item">加入购物车</div>
      </div>
      <div class="footer_warp" @click="goto(3)">
        <div class="promptly footer_item">立即购买</div>
      </div>
    </div>
    <div class="dete_line"></div>
    <div class="commodity_router" id='nav_flexed' :class=" nvaBarFixed === true ? 'nva_Fixed' :''" >
			<span class="liveSharing_roterone">
                <router-link to='commodity' exact>商品详情</router-link>
            </span>
			<span class="liveSharing_rotertwo">
                <router-link to='evaluation'  exact>购买须知</router-link>
            </span>
			<span class="liveSharing_roterthree">
                <router-link to='instructions'  exact>商品评价</router-link>
            </span>	
	</div>
    <keep-alive> <router-view></router-view> </keep-alive>
  </div>
</template>

<script>
  import 'swiper/dist/css/swiper.css' //这里注意具体看使用的版本是否需要引入样式，以及具体位置。
  import {swiper, swiperSlide} from 'vue-awesome-swiper'
  import {mapState} from 'vuex'
  import {reqShoucang,reqInstruction,reqShopdetail} from '../../api'
  import { Toast } from 'mint-ui';
  export default {
    data() {
      return {
        // productdata:'',
        nvaBarFixed:false,
        headFixed:false,
        list:[],
        is_collection:false,
        swiperOption1: {
          pagination: {
            el: '.swiper-pagination'
          },
          observer: true,
          autoplay: true,
          loop: true
        },
        swiperOption2: {
          pagination: {
            el: '.swiper-pagination'
          },
          observer: true,
          autoplay: true,
          loop: false
        }
      }
    },
    components: {
      swiper,
      swiperSlide
    },
    computed: {
      ...mapState(['shops', 'productdata','isVip']),
      swiperOption(){
        var len = this.list.length
        if(len == 1){
          return this.swiperOption2
        }else{
          return this.swiperOption1
        }
      },
      showSwiper() {
        var len = this.list.length
        return len
      }
    },
    mounted(){
        // this.productdata=this.productdata;
        // this.is_collection=this.$store.state.productdata.is_collection;
        // this.list = this.productdata.slider.split(',');
        this.box = this.$refs.wo;
        this.getList()
        this.box.addEventListener('scroll', () => {
        var offsetTop = document.querySelector('#nav_flexed').offsetTop;
          if (this.$refs.wo.scrollTop > offsetTop) {
                 this.nvaBarFixed = true
          } 
           if(   this.$refs.wo.scrollTop -120< offsetTop) {
                 this.nvaBarFixed = false
          }
          if(this.$refs.wo.scrollTop>20){
               this.headFixed=true
          }else{
             this.headFixed=false
          }
        },true)
        this.evaluateList();
    },
    methods: {
      address(){
        this.$router.go(-1)
      },
      getList() {
        let id = this.$route.query.data.id
        this.$store.dispatch('getDetail', id).then(()=>{
           this.is_collection=this.productdata.is_collection;
        this.list = this.productdata.slider.split(',');
        })
      },
      goto(index) {
        let shopData = this.productdata;
        console.log(shopData);
        if (index == 1) {
          this.$router.push({
            path: '/shoppingcart'
          })
        } else if (index == 2) {
          let type=1;
          let id=shopData.id;
          this.$store.dispatch('addshoppingcart',{type,id})
        } else if (index == 3) {
          let {id,name,cover,price,spec} = shopData
          let num = 1
          let product_id = shopData.id
          let totalPrice = 0
         let ifVip = localStorage.getItem('ifVip');
          if(ifVip == 0){
            totalPrice = shopData.price
          } else {
            totalPrice = shopData.vip_price
          }
          this.$router.push({
            path: '/purchaseorder',
            query:{
              orderData:{
                data:[
                  {
                    id,
                    name,
                    cover,
                    price,
                    spec,
                    num,
                    product_id,
                  }
                ],
                totalPrice
              }
            }
          })
        }},
      async shoucang(){
              var result = await reqShoucang(this.$store.state.Authorization,"4",this.productdata.id)

            if (result.code === 200) {
                Toast(result.msg);
                this.is_collection = !this.is_collection
            }
      },
      evaluateList(){
          // var instruclist=reqInstruction(this.$store.state.Authorization,this.productdata.id);
          // var commoditylist =reqShopdetail(this.$store.state.Authorization,this.productdata.id);
          // this.$store.dispatch('reqShopdetailed',this.productdata.id)
     
    },
    }
  }
</script>

<style scoped>
  @import '../../../static/font/font.css';
  .shopping{
      height: 100%;
      overflow-x: hidden;
}
  .address_div{
    position: fixed;
    left: 0;
    right: 0;
    top: 0;
    height: 91px;
    z-index: 20;
}
.address_div .address_check{
    background-size: 16px 28px;
    float: left;
    margin-top: 32px;
    width:16px;
    height:30px;
    margin-left:30px;
}
.address_div .collection{
   background-size: 16px 28px;
    float: right;
    margin-top: 32px;
    width:40px;
    height:40px;
    margin-right:40px;
} 
.address_div .liveSharing_nvastart{
    float:right;
    /* display: inline-block; */
    margin-top: 32px;
    width:40px;
    height:40px;
    margin-right:40px;
    background-image: url('./image/shoucang.png');
    background-size: 40px 40px;
    outline: none
}
 .address_div .liveSharing_nvastart_down{
    float:right;
    /* display: inline-block; */
    margin-top: 32px;
    width:40px;
    height:40px;
    margin-right:40px;
    background-image: url('./image/shoucang_down.png');
    background-size: 40px 40px;
    outline: none
}
.address_div .address_mode{
    float: left;
    width:144px;
    height:50px;
    font-size:36px;
    font-family:PingFangSC-Medium;
    font-weight:500;
    color:rgba(255,255,255,1);
    line-height:50px;
    margin-top:19px;
    margin-left: 262px;
}
.head_Fixed{
  background-color: #ffffff;
}

  .shopping_banner {
    height: 500px;
  }

  .swiper-container {
    overflow: inherit;
  }

  .shopping_banner .banner_content {
    width: 100%;
    height: 500px;
    background: rgba(255, 255, 255, 1);
    box-shadow: 0px 0px 10px 0px rgba(172, 166, 178, 0.1);
  }

  .shopping_banner .banner_head {
    height: 347px;
  }

  .shopping_banner .banner_content .content_img {
    width: 100%;
    height: 500px;
  }
  .deta_title{
      margin-top: 40px;
      text-align: left;
  }

  .deta_title .title_a1 {
    margin-left: 20px;
    height: 33px;
    font-size: 32px;
    font-family: PingFangSC-Regular;
    font-weight: 600;
    color: #000000;
    line-height: 33px;
  }

  .deta_title .title_a2 {
    margin-left: 20px;
    margin-top: 15px;
    height: 33px;
    font-size: 28px;
    font-family: PingFangSC-Regular;
    font-weight: 500;
    color: red;
    line-height: 33px;
  }

  .deta_title .title_a3 {
    margin-left: 20px;
    margin-top: 15px;
  }

  .title_a3 .a3_a {
    height: 33px;
    font-size: 28px;
    font-family: PingFangSC-Regular;
    font-weight: 500;
    color: orange;
    line-height: 33px;
  }

  .title_a3 .a3_b {
    display: inline-block;
    margin-left: 50px;
    height: 33px;
    font-size: 28px;
    font-family: PingFangSC-Regular;
    font-weight: 400;
    color: rgba(102, 102, 102, 1);
    line-height: 33px;
    text-decoration: line-through;
  }

  .deta_title .title_a4 {
    color: rgba(102, 102, 102, 1);
    margin-top: 15px;
  }
  .deta_title .title_a4 div{
    /* display: flex;

  .deta_title .title_a4 span {
    display: flex;
    flex: 1;
    align-items: center;
    justify-content: space-between; */
    display: inline-block;
    width: 32.5%;
  }
  .deta_title .title_a4 .a4_a span{
    display: inline-block;
    margin-left: 20px;
  }
  .deta_title .title_a4 .a4_b{
    text-align: center;
  }
  .deta_title .title_a4 .a4_c{
    text-align: right;
  }
   .deta_title .title_a4 .a4_c span{
    display: inline-block;
    margin-right: 20px;
  }
  .dete_line{
    margin-top: 20px;
    height: 4px;
    background-color: rgba(187,187,187,1);
  }
.commodity_router{
    height: 78px;
    border-bottom: 1px solid rgba(187,187,187,1);
}
.commodity_router .liveSharing_roterone,.liveSharing_rotertwo,.liveSharing_roterthree {
    float: left;
    margin: 19px 2px 19px 100px;
    font-size:28px;
    font-family:PingFangSC-Regular;
    font-weight:600;
    line-height:40px;
}
.nva_Fixed{
    position:fixed;
    top:91px;
    z-index:20;
    overflow-y: scroll;
    width: 100%;
    -webkit-overflow-scrolling: touch;
    overflow: auto;
    background-color: #ffffff
}
.router-link-active{
     width:64px;
     height:45px;
     font-size:32px;
     font-family:PingFangSC-Medium;
     font-weight:500;
     color:rgba(243,117,5,1);
     line-height:45px;
}

  .details_footer {
    display: flex;
    position: fixed;
    left: 0;
    right: 0;
    bottom: 0;
  }

  .footer_warp {
    flex: 1;
    height: 100px;
    text-align: center;
  }

  .footer_item {
    width: 160px;
    height: 60px;
    line-height: 60px;
    margin-top: 20px;
    margin-left: 40px;
    color: #ffffff;
  }

  .add_cart {
    background-color: #FE9A1C;
  }

  .promptly {
    background-color: #C00D18;
  }

  .cart_img {
    width: 40px;
    height: 40px;
    margin-top: 20px;
  }
</style>
