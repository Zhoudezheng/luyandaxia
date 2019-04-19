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
      <div class="title_a5" v-if="is_spec" @click="showspec">
        <span class="a5_a">规格</span>
        <img src="./image/gengduo.png" alt="规格" class="a5_b">
      </div>
    </div>
    <div class="details_footer">
      <div class="footer_warp " @click="goto(1)">
        <img class="cart_img" src="./image/cart.png" alt="cart">
        <div>购物车</div>
      </div>
      <div class="footer_warp" @click="goto(2)">
        <div class="add_cart footer_item" v-if="is_spec" @click="showspec">加入购物车</div>
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
                <router-link :to="{path:'instructions',query:{data:{id:productdata.id}}}" exact>商品评价</router-link>
            </span>	
	   </div class='liveSharing_bottom'>
    <keep-alive> <router-view></router-view> </keep-alive>
    <div v-show="is_specShow" class="specMark">
      <div class="mask_back" @click="showspeced"></div>
      <div class="mask_content">
      <div class="mark_a">
        <img :src="productdata.slider" alt="商品图片" class="a_1">
        <div class="a_son">
          <div class="a_2">{{productdata.name}}</div>
          <div class="a_3">{{productdata.vip_price}}</div>
          <div class="a_4">库存{{productdata.stock}}件</div>
        </div>
      </div>
      <div class="details_mask">
          <div class="mask_data" >
              <div class="detama_a">{{ productdata.spec && productdata.spec[0] && productdata.spec[0].name}}</div>
              <div v-for="(items,index) in productdata.spec && productdata.spec[0] && productdata.spec[0].item.split(',')" 
                   v-bind:class="{colorChange:index==dynamic}"
                   class="detama_b" 
                   @click="tobuyspec(items,index)">{{items}}</div>
          </div>
           <div class="mask_data" >
              <div class="detama_a">{{productdata.spec && productdata.spec[1] && productdata.spec[1].name}}</div>
              <div v-for="(items,index) in productdata.spec && productdata.spec[1] && productdata.spec[1].item.split(',')" 
                   v-bind:class="{ colorChanged:index==dynamicd}"
                   class="detama_b" 
                   @click="tobuyspecd(items,index)">{{items}}</div>
          </div>
         <div class="mast_b">
          <div class="deta_b">购买数量</div>
          <div class="num">
              <div class="num_left" @click="reduce()">
                <span class="num_reduce"></span>
              </div>
              <span class="num_nu">{{num}}</span>
              <div class="num_right" @click="add()">
                <span class="num_add"></span>
              </div>
          </div>
         </div>
      </div>
      <div class="deta_fixed" @click="addshop">确定</div>
     </div>
    </div>
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
        arr:[],
        is_spec:false,
        is_specShow:false,
        is_collection:false,
        dynamic:-1,
        dynamicd:-1,
        num:1,
        secolor:'',
        xlse:'',
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
        this.box = this.$refs.wo;
        this.getList()
        this.box && this.box.addEventListener('scroll', () => {
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
        //this.evaluateList();
        },
    methods: {
      address(){
        this.$router.go(-1)
      },
      showspec(){
        this.is_specShow=true
      },
      showspeced(){
        this.is_specShow=false
        this.dynamic=-1;
        this.num=1;
        this.dynamicd=-1;
      },
      getList() {
        let id = localStorage.getItem('product_id')
        this.$store.dispatch('getDetail', id).then(()=>{
           this.is_collection=this.productdata.is_collection;
           this.list = this.productdata.slider.split(',');
           var spec=this.$store.state.productdata.spec;
            console.log(this.$store.state.productdata);
            if(spec.length>0){
              this.is_spec=true;
            }else{
              this.is_spec=false;
            }
        })
      },
      reduce() {
        if (this.num <= 1) return;
        this.num--
      },
      add() {
        this.num++
      },
      tobuyspec(item,index){
        this.dynamic = index;
        this.secolor=item;
      },
      tobuyspecd(item,index){
        this.dynamicd = index;
        this.xlse=item;
      },
      addshop(){
        let type=1;
        let shopData = this.productdata;
        let id=shopData.id;
        let spec='';
        if(this.secolor){
          spec += `${this.secolor}`
        }
        if(this.xlse){
          spec +=`,${this.xlse}`
        }
        let num =this.num;
        this.$store.dispatch('addshopporderingcart',{type,id,spec,num}).then(()=>{
            Toast('已成功加入购物车');
            this.is_specShow=false;
            this.dynamic=-1;
            this.num=1;
            this.dynamicd=-1;
        })
      },
      goto(index) {
        let shopData = this.productdata;
        if (index == 1) {
          this.$router.push({
            path: '/shoppingcart'
          })
        } else if (index == 2) {
          let type=1;
          let id=shopData.id;
          if(this.is_spec){
             return
          }else{
             Toast('加入成功');
             this.$store.dispatch('addshoppingcart',{type,id})
          }
        } else if (index == 3) {
          let {id,name,cover,price} = shopData
          let num = 1
          let spec='';
          if(this.secolor){
            spec += `${this.secolor}`
          }
          if(this.xlse){
            spec +=`,${this.xlse}`
          }
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
        }
      },
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

<style scoped >
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
  .title_a5{
    margin-top: 20px;
  }
  .title_a5 .a5_a{
    display: inline-block;
    margin-left: 20px;
  }
  .title_a5 .a5_b{
    width: 15px;
    height: 20px;
    float: right;
    margin-top: 10px;
    margin-right: 25px;
  }
  .dete_line{
    margin-top: 20px;
    height: 4px;
    background-color: rgba(187,187,187,1);
  }
.commodity_router{
    height: 78px;
    border-bottom: 1px solid rgba(187,187,187,1);
     margin-bottom: 50px;
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
    background-color: #ffffff;
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

  .details_mask{
    height: 100%;
    background-color: #ffffff;
    margin-bottom: 89px;
  }
  .details_mask .mask_data{
    height: 135px;
  }
  .details_mask .detama_a{
    text-align: left;
    padding-top: 20px;
    margin-left: 20px;
    font-size: 28px;
  }
  .details_mask .detama_b{
    float: left;
    margin-top: 20px;
    margin-right: 10px;
    margin-left: 10px;
    width: 120px;
    height: 50px;
    line-height: 50px;
    background-color: rgb(219, 216, 212);
    color: #000000;
    border-radius: 20px;
  }
  .details_mask .colorChange{
    background-color: #FE9A1C;
    color: #ffffff;
  }
.details_mask .colorChanged{
    background-color: #FE9A1C;
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
  .specMark{
    height: 100%;
    position: fixed;
    left: 0;
    right: 0;
    top: 0;
    z-index: 30;
  }
  .specMark .mask_back{
     background:rgba(0,0,0,1);
     opacity:0.5;
     height:600px;
  }
  .specMark .mark_a{
    width: 100%;
    height: 200px;
    background-color: #ffffff;
    text-align: left;
  }
  .mark_a .a_1{
    width: 150px;
    height: 150px;
    float: left;
    margin-top: 20px;
    margin-left: 20px;
  }
  .mark_a .a_son{
    float: left;
    padding-top: 20px;
  }
  .mark_a .a_2,.a_3,.a_4{
  padding-top: 20px;
   margin-left: 20px;
  }
  .mask_content{
    height: 100%;
  }
  .mast_b{
    margin-top: 40px;
  }
  .deta_b{
    float: left;
    margin-top: 10px;
    margin-left: 20px;
  }
  .num {
    width: 200px;
    position: absolute;
    right: 42px;
  }

  .num_left {
    float: left;
  }

  .num_left .num_reduce {
    margin-top: 10px;
    float: left;
    width: 44px;
    height: 44px;
    background-image: url('./image/reduce.png');
    background-repeat: no-repeat;
    background-position: 18px 10px;
    background-size: 16px 4px;
    border-radius: 2px;
  }

  .num .num_nu {
    display: inline-block;
    width: 76px;
    height: 44px;
    background: rgba(246, 246, 246, 1);
    text-align: center;
    line-height: 44px;
  }

  .num_right {
    float: right;
  }

  .num .num_add {
    display: inline-block;
    width: 44px;
    height: 44px;
    background-image: url('./image/plus.png');
    background-repeat: no-repeat;
    background-position: 16px 11px;
    background-size: 16px 16px;
    border-radius: 2px;
  }
  .deta_fixed{
    position: fixed;
    height: 89px;
    background-color: #FE9A1C;
    color: #ffffff;
    width: 100%;
    z-index: 30;
    left: 0;
    right: 0;
    bottom: 0;
    line-height: 89px;
    font-size: 32px;
  }

</style>
