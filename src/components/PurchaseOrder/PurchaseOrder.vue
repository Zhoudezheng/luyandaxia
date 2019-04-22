<template>
  <div class="purchase_content">
    <div class="purchase_div">
      <img src="./image/huitui.png" alt="协议按钮" @click="shoppingmall" class="purchase_check">
      <span class="purchase_mode">确定订单</span>
    </div>
    <div class="purchase_address" @click="toadress">
      <img src="./image/address.png" alt="地址" class="address_ico">
      <div class="address_a">{{address.address}}</div>
      <div class="address_name">{{address.name}}  {{address.phone}}</div>
      <img src="./image/doadd.png" alt="编辑地址" class="address_go">
    </div>
    <div class="purchase_lines"></div>
    <div>
      <div class="purchase_list" v-for="(item) in orderDetails.product">
        <img :src="item.cover" alt="2222">
        <span class="list_a1">{{item.name}}</span>
        <span class="list_a2" v-if="item.spec">{{item.spec}}</span>
        <span class="list_a2">¥{{item.price}}</span>
        <span class="list_a3">x {{item.num}}</span>
      </div>
    </div>
    <div class="Commodity_amount">
      <span class="amount_a1">商品总价</span>
      <span class="amount_a2">
            <span class="a2_un">￥</span>
            <span class="a2_ut">{{totalPrice}}</span>
        </span>
    </div>
    <div class="Commodity_amount">
      <span class="amount_a3">运费</span>
      <span class="amount_a4">
            <span class="a2_un">￥</span>
            <span class="a2_ut">{{orderDetails.freight}}</span>
        </span>
    </div>
    <div class="Commodity_amount">
      <span class="amount_a1">订单总价</span>
      <span class="amount_a2">
            <span class="a2_un">￥</span>
            <span class="a5_ut">{{orderDetails.total}}</span>
        </span>
    </div>
    <div class="Commodity_amounted">
      <span class="amount_a1">配送说明</span>
      <input type="tel" class="amount_a2" placeholder="选填" v-model="post" @blur.prevent="inputLoseFocus">
    </div>
    <div class="Commodity_amounted" @click="showorder">
      <span class="amount_a1">发票</span>
      <span class="amount_in">
            <span class="in_a2">{{invoice}}</span>
            <img src="./image/doadd.png" alt="发票" class="in_a">
        </span>
    </div>
    <orderlist v-show="isBuyVideo" @getcacel="getCal" @gettypelist='gettype'></orderlist>
    <div class="purchase_buy">
      <div class="buy_content">
        <span class="content_total">总计</span>
        <span class="content_mony">¥{{orderDetails.total}}</span>
      </div>
      <input type="button" value="去支付" class="buy_link" @click="purchase">
    </div>
  </div>
</template>

<script>
  import OrderList from './OrderList/OrderList.vue';
  import {Base64} from 'js-base64'
  import {mapState} from 'vuex'
  import { Toast } from 'mint-ui';
  export default {
    data() {
      return {
        post: '',
        invoice:'不开发票',
        isBuyVideo: false,
        product_info: [],
        cart_list: [],
        totalPrice: 0,
        address:{}
      }
    },
    components: {
      "orderlist": OrderList
    },
    computed: {
      ...mapState(['orderDetails'])
    },
    mounted() {
      // 获取传过来的参数
      this.getOrderDetails();
      this.invoice=localStorage.getItem('invoice');
    }
    ,
    methods: {
      shoppingmall() {
        this.$router.go(-1)
      },
      toadress(){
        localStorage.setItem('iforder', 'yes');
        this.$router.push({
          path:'/address'
        })
      },
      inputLoseFocus() {
        setTimeout(() => {
          window.scrollTo(0, 0);
        }, 100);
      },
      purchase() {
        let product_info = this.product_info
        let remark = this.post
        let cart_list = this.cart_list;
        var address =this.orderDetails.address.address;
        let address_id = this.orderDetails.address.id
        let share_id = localStorage.getItem('share_id');
        product_info = Base64.encode(JSON.stringify(product_info));
        if(address){
          this.$store.dispatch('createOrder', {remark, cart_list, product_info, address_id,share_id})
          let orderDetail = {
            total: this.orderDetails.total
          }
          localStorage.setItem('orderDetail', JSON.stringify(orderDetail));
          localStorage.setItem('type','1')
          this.$router.push({
            path: '/VipMember',
          })
        }else{
          Toast('请选择地址')
        }
       
      },
      getCal(msg) {
        this.openTouch();
        this.isBuyVideo = msg;//然后将数据赋值给isBuyVideo
      },
      gettype(type) {
        this.openTouch();
        this.invoice = type;//然后将数据赋值给isBuyVideo
      },
      showorder() {
        this.closeTouch();
        this.isBuyVideo = true;
      },
      closeTouch() {
        document.getElementsByTagName("body")[0].addEventListener('touchmove',
          this.handler, {passive: false});//阻止默认事件
      },
      openTouch() {
        document.getElementsByTagName("body")[0].removeEventListener('touchmove',
          this.handler, {passive: false});//打开默认事件
      },
      getOrderDetails() {
        let a=[];
        if(this.$route.query.orderData.data){
          this.$store.dispatch('setorderData',this.$route.query.orderData);
          a=this.$store.state.saveorder
        }else{
          a=this.$store.state.saveorder
        }
        let product_info = a.data;
        this.product_info = product_info;
        this.cart_list = a.cartId;
        this.totalPrice = a.totalPrice;
        product_info = Base64.encode(JSON.stringify(product_info));
        this.$store.dispatch('previewOrder', product_info).then(()=>{
         this.address=this.orderDetails.address;
        })
      },
    },
  }
</script>

<style scoped>
  @import '../../../static/font/font.css';

  .purchase_content {
    background-color: rgba(249, 250, 251, 1);
    height: 1334px;
  }

  .purchase_div {
    height: 88px;
    background: rgba(255, 121, 19, 1);
  }

  .purchase_div .purchase_check {
    background-size: 16px 28px;
    float: left;
    margin-top: 32px;
    width: 14px;
    height: 26px;
    margin-left: 30px;
  }

  .purchase_div .purchase_mode {
    float: left;
    width: 144px;
    height: 50px;
    font-size: 36px;
    font-family: PingFangSC-Medium;
    font-weight: 500;
    color: rgba(255, 255, 255, 1);
    line-height: 50px;
    margin-top: 19px;
    margin-left: 262px;
  }

  .purchase_address {
    height: 170px;
    background: rgba(255, 255, 255, 1);
    position: relative;
  }

  .purchase_address .address_ico {
    width: 28px;
    height: 33px;
    float: left;
    margin-top: 68px;
    margin-left: 28px;
  }

  .purchase_address .address_a {
    float: left;
    height: 45px;
    font-size: 32px;
    font-family: PingFangSC-Medium;
    font-weight: 500;
    color: rgba(74, 74, 74, 1);
    line-height: 45px;
    margin-top: 35px;
    margin-left: 33px;
  }

  .purchase_address .address_name {
    float: left;
    width: 90%;
    text-align: left;
    padding-left: 56px;
    height: 40px;
    font-size: 28px;
    font-family: PingFangSC-Regular;
    font-weight: 400;
    color: rgba(102, 102, 102, 1);
    line-height: 40px;
    margin-top: 16px;
    margin-left: 33px;
  }

  .purchase_address .address_go {
    width: 12px;
    height: 21px;
    position: absolute;
    right: 30px;
    top: 80px;
    /*float: right;*/
    /*margin-right: 28px;*/
  }

  .purchase_lines {
    height: 16px;
  }

  .purchase_list {
    height: 190px;
    background-color: #ffffff;
    border-bottom: 1px solid #eeeeee;
  }

  .purchase_list img {
    float: left;
    width: 172px;
    height: 127px;
    margin: 28px 16px 28px 28px;
  }

  .purchase_list a {
    text-decoration: none;
  }

  .purchase_list .list_a1 {
    /* white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis; */
    float: left;
    margin: 28px 0 14px 0;
    width: 434px;
    /* height:45px; */
    font-size: 28px;
    font-family: PingFangSC-Medium;
    font-weight: 500;
    color: rgba(74, 74, 74, 1);
    line-height: 45px;
    text-align: left
  }

  .purchase_list .list_a2 {
    float: left;
    width: 434px;
    /* height:68px; */
    font-size: 28px;
    font-family: PingFangSC-Regular;
    font-weight: 400;
    color: rgba(102, 102, 102, 1);
    line-height: 33px;
    text-align: left
  }

  .purchase_list .list_a3 {
    width: 100px;
    height: 33px;
    position: relative;
    right: 10px;
    top: 20px;
    font-size: 24px;
    font-family: PingFangSC-Medium;
    font-weight: 500;
    color: rgba(187, 187, 187, 1);
    line-height: 33px;
  }

  .purchase_list .list_a4 {
    float: left;
    height: 33px;
    font-size: 24px;
    font-family: PingFangSC-Regular;
    font-weight: 400;
    color: rgba(255, 0, 0, 1);
    line-height: 33px;
    margin-left: 28px;

  }

  .Commodity_amount {
    height: 100px;
    background-color: #ffffff;
  }

  .Commodity_amounted {
    margin-top: 16px;
    height: 100px;
    background-color: #ffffff;
  }

  .amount_a1, .amount_a3 {
    height: 40px;
    font-size: 28px;
    font-family: PingFangSC-Regular;
    font-weight: 400;
    color: rgba(102, 102, 102, 1);
    line-height: 40px;
    float: left;
    margin-top: 30px;
    margin-left: 28px;
  }

  .amount_a2 {
    height: 40px;
    font-family: PingFangSC-Semibold;
    font-weight: 600;
    color: rgba(74, 74, 74, 1);
    line-height: 28px;
    float: right;
    margin-top: 35px;
    margin-right: 28px;
  }

  .amount_in {
    font-family: PingFangSC-Semibold;
    font-weight: 600;
    color: rgba(74, 74, 74, 1);
    line-height: 28px;
    float: right;
    margin-top: 35px;
    margin-right: 22px;
  }

  .amount_in .in_a2 {
    text-align: right;
    width: 400px;
    margin-right: 28px;
  }

  .amount_in .in_a {
    width: 12px;
    height: 21px;
  }

  .Commodity_amounted .amount_a2 {
    height: 40px;
    text-align: right;
    width: 400px;
    margin-top: 30px;
    margin-right: 28px;
  }

  .amount_a4 {
    height: 40px;
    font-family: PingFangSC-Semibold;
    font-weight: 600;

    color: rgba(74, 74, 74, 1);
    line-height: 28px;
    float: right;
    margin-top: 35px;
    margin-right: 28px;
  }

  .a2_un {
    font-size: 20px;
  }

  .a2_ut {
    font-size: 28px;
  }

  .a5_ut {
    color: rgba(243, 117, 5, 1);
  }

  input:focus, textarea:focus {
    outline: none;
  }

  input::-webkit-input-placeholder, textarea::-webkit-input-placeholder {
    height: 40px;
    font-size: 28px;
    font-family: PingFangSC-Regular;
    font-weight: 400;
    color: rgba(187, 187, 187, 1);
    line-height: 40px;
  }

  input:-moz-placeholder, textarea:-moz-placeholder {
    height: 40px;
    font-size: 28px;
    font-family: PingFangSC-Regular;
    font-weight: 400;
    color: rgba(187, 187, 187, 1);
    line-height: 40px;
  }

  input::-moz-placeholder, textarea::-moz-placeholder {
    height: 40px;
    font-size: 28px;
    font-family: PingFangSC-Regular;
    font-weight: 400;
    color: rgba(187, 187, 187, 1);
    line-height: 40px;
  }

  input:-ms-input-placeholder, textarea:-ms-input-placeholder {
    height: 40px;
    font-size: 28px;
    font-family: PingFangSC-Regular;
    font-weight: 400;
    color: rgba(187, 187, 187, 1);
    line-height: 40px;
  }

  .purchase_buy {
    position: fixed;
    height: 103px;
    left: 0;
    right: 0;
    bottom: 0
  }

  .purchase_buy .buy_content {
    float: left;
    width: 500px;
    height: 100px;
    background: rgba(255, 255, 255, 1);
    text-align: left
  }

  .purchase_buy .buy_content .content_total {
    float: left;
    width: 56px;
    height: 40px;
    font-size: 28px;
    font-family: PingFangSC-Regular;
    font-weight: 400;
    color: rgba(102, 102, 102, 1);
    line-height: 40px;
    margin-top: 31px;
    margin-left: 28px;
  }

  .purchase_buy .buy_content .content_mony {
    float: left;
    width: 111px;
    height: 45px;
    font-size: 28px;
    font-family: PingFangSC-Semibold;
    font-weight: 600;
    color: rgba(255, 126, 0, 1);
    line-height: 28px;
    margin-top: 36px;
    margin-left: 30px;
  }

  .purchase_buy .buy_link {
    width: 250px;
    height: 98px;
    background: linear-gradient(90deg, rgba(255, 161, 44, 1) 0%, rgba(255, 121, 19, 1) 100%);
    font-size: 36px;
    font-family: PingFangSC-Medium;
    font-weight: 500;
    color: rgba(255, 255, 255, 1);
    line-height: 50px;
  }
</style>
