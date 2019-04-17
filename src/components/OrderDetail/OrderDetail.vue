<template>
  <div class="orderdetail">
    <div class="orderTop">
        <div class="backtrack" @click="backtrack"></div>
        <span class="">订单详情</span>
        <div class="search"></div>
    </div>
    <div class="order_content">
        <div class="content_a">
           <img src="./image/tixing.png" alt="倒计时" class="a_1">
           <span class="a_2" v-if="orderDetailsList.status === 0">等待支付</span>
           <span class="a_2" v-if="orderDetailsList.status === 1">等待发货</span>
           <span class="a_2" v-if="orderDetailsList.status === 2">已发货</span>
           <span class="a_2" v-if="orderDetailsList.status === 3">已完成</span>
           <span class="a_3" v-if="orderDetailsList.status === 0">剩余时间：{{orderDetailsList.end_time}}</span>
        </div>
        <span class="a_4" v-if="orderDetailsList.status === 0">￥{{(Number(orderDetailsList.total_price) + Number(orderDetailsList.freight)).toFixed(2)}}</span>
    </div>
    <div class="order_address">
      <img src="./image/address.png" alt="地址" class="address_ico">
      <div class="address_name">{{orderDetailsList.name}} &nbsp {{orderDetailsList.phone}}</div>
      <div class="address_a">{{orderDetailsList.address}}</div>
    </div>
    <div class="details" v-for="(product) in orderDetailsList.product_list">
        <div class="orderImg">
            <img :src="product.cover" alt="商品图片">
        </div>
        <div class="order">
            <div class="orderDetails">
                <span>{{product.name}}</span>
            </div>
            <div class="oreder_spec" v-show="product.spec">{{product.spec}}</div>
            <div :class="product.spec ? 'price':'priceed'">
                <span> ￥{{product.price}}</span>
                <span>X {{product.num}}</span>
            </div>
        </div>
    </div>
    <div class="order_information">
        <div>订单号：{{orderDetailsList.order_sn}}</div>
        <div>下单时间：{{orderDetailsList.create_at}}</div>
        <div>支付方式：{{pay_type}}</div>
        <div>配送方式：{{orderDetailsList.express_name}}</div>
        <div>联系商家：<a :href="'tel:' + orderDetailsList.shop_phone">{{orderDetailsList.shop_phone}}</a></div>
    </div>
    <div class="shop_totle">
        <div class="shop_pro">
            <span class="pro_a">商品总价</span>
            <span class="pro_b">￥{{orderDetailsList.total_price}}</span>
        </div>
        <div class="shop_pro">
            <span class="pro_a">+运费</span>
            <span class="pro_b">￥{{orderDetailsList.freight}}</span>
        </div>
        <div class="shop_lin"></div>
        <div class="shop_tol">需付款：<span>￥{{(Number(orderDetailsList.total_price) + Number(orderDetailsList.freight)).toFixed(2)}}</span></div>
    </div>
    <div class="order_fixed">
        <div class="fixed_b" v-if="orderDetailsList.status === 0" @click="tobuyshop(orderDetailsList)">去支付</div>
        <div class="fixed_a" v-if="orderDetailsList.status === 0" @click="caclbuyshop(orderDetailsList.id)" >取消订单</div>
        <div class="fixed_b" v-if="orderDetailsList.status === 1" @click="shipment(orderDetailsList.id)">提醒发货</div>
        <div class="fixed_b" v-if="orderDetailsList.status === 2" @click="receipt(orderDetailsList.id)">确定收货</div>
         <div class="fixed_a" v-if="orderDetailsList.status === 3" @click="delbuyshop(orderDetailsList.id)" >删除订单</div>
    </div>
  </div>
</template>
<script>
import {mapState} from 'vuex';
import { MessageBox,Toast } from 'mint-ui';
import {delbuyshop, reqshipment} from '../../api'
export default {
    data(){
        return{
           pay_type:''
        }
    },
    computed:{
      ...mapState(['orderDetailsList'])
    },
    mounted(){
       var a=this.$store.state.orderDetailsList.pay_type;
       console.log(this.$store.state.orderDetailsList);
       if(a === 1){
           this.pay_type='微信支付'
       }else if(a===2){
           this.pay_type='支付宝支付'
       }else{
           this.pay_type=''
       }
    },
    methods:{
      backtrack(){
        this.$router.go(-1)
      },
      tobuyshop(item){
        var itemlist= item;
        this.$store.dispatch('setOrderSn',itemlist)
        let orderDetail = {
          total:(Number(itemlist.total_price) + Number(itemlist.freight)).toFixed(2),
        }
        localStorage.setItem('orderDetail', JSON.stringify(orderDetail));
        this.$router.push({
          path: '/VipMember',
        })
      },
      caclbuyshop(item){
        MessageBox.confirm('确定执行此操作?').then(action => {
           delbuyshop(item,'cancel').then((data)=>{
              this.$router.go(-1);
              Toast(data.msg);
           });
        })
      },
      delbuyshop(item){
         MessageBox.confirm('确定执行此操作?').then(action => {
           delbuyshop(item,'delete').then((data)=>{
              this.$router.go(-1);
              Toast(data.msg);
           });
         })
      },
      receipt(item){
         MessageBox.confirm('确定执行此操作?').then(action => {
           delbuyshop(item,'complete').then((data)=>{
            this.$router.push({
                path:'/MyOrders?status=3'
            });
            Toast(data.msg);
           });
         })
      },
      async shipment(id){
          let token = this.$store.state.Authorization;
          let result= await reqshipment(token,id);
          console.log(result)
          if(result.code === 200 ){
              Toast(result.msg)
          }else{
              Toast(result.msg)
          }
      }
    }
}
</script>
<style scoped>
.orderdetail{
    background-color:#eeeeee;
    height: 100%;
}
.orderTop {
    font-size: 36px;
    padding: 0 26px 0 11px;
    color: #fff;
    height: 88px;
    line-height: 88px;
    background-color: #F37505;
    display: flex;
    align-items: center;
    justify-content: space-between;
}
.backtrack {
    width: 44px;
    height: 44px;
    background: url("./image/backtrack.png") no-repeat center;
    background-size: 15px 30px;
    transform: rotate(180deg);
}
.order_content{
    height: 110px;
    background-color: rgb(240, 95, 95)
}
.content_a{
    height: 75px;
}
.content_a .a_1{
    float: left;
    width: 35px;
    height: 35px;
    margin-top:25px;
    margin-left: 20px;
}
.content_a .a_2{
    color: #fff;
    font-size: 28px;
    font-weight: 400;
    float: left;
    margin-left: 20px;
    margin-top: 25px;
    line-height: 35px;
}
.content_a .a_3{
    float: right;
    margin-top: 27px;
    margin-right: 20px;
    color: #fff;
    font-size: 24px;
    font-weight: 400;
    line-height: 35px;
}
.a_4{
    float: right;
    margin-right: 20px;
    color: #fff;
    font-size: 22px;
    font-weight: 400;
}
.order_address{
    background-color: #ffffff;
    height: 168px;
    margin-bottom: 20px;
}
.order_address .address_ico {
    width: 28px;
    height: 33px;
    float: left;
    margin-top: 68px;
    margin-left: 28px;
}
.order_address .address_a {
    float: left;
    height: 45px;
    font-size: 32px;
    font-family: PingFangSC-Medium;
    font-weight: 500;
    color: rgba(74, 74, 74, 1);
    line-height: 45px;
    margin-top: 20px;
    margin-left: 20px;
}
.order_address .address_name {
    float: left;
    width: 70%;
    text-align: left;
    height: 40px;
    font-size: 28px;
    font-family: PingFangSC-Regular;
    font-weight: 400;
    color: rgba(102, 102, 102, 1);
    line-height: 40px;
    margin-top: 30px;
    margin-left: 20px;
}
.details {
    background-color: #ffffff;
    padding: 28px;
    display: flex;
    border-bottom: 1px solid #f9fafb;
}
.details .orderImg {
    display: inline-block;
    width: 120px;
    height: 120px;
    background-color: #F9FAFB;
    border-right: 10px;
}
.details .orderImg > img {
    width: 120px;
    height: 120px;
    border-right: 10px;
}
.details .order {
    flex: 1;
    padding-left: 24px
}
.details .oreder_spec{
    text-align: left;
    margin-top: 25px;
    height: 30px;
}
.details .order .orderDetails {
    display: flex;
    align-items: self-start;
    justify-content: space-between;;
}
.details .order .price {
    display: flex;
    align-items: self-start;
    justify-content: space-between;
    margin-top: 20px;
    font-size: 20px;
}
.details .order .priceed{
    display: flex;
    align-items: self-start;
    justify-content: space-between;
    margin-top: 70px;
    font-size: 20px;
}
.order_information{
    margin-top: 20px;
    background-color: #ffffff;
    text-align: left;
    height: 240px;
    padding-top: 5px
}
.order_information div{
    margin-top: 20px;
    font-size: 24px;
    font-weight: 500;
    color: gray;
    margin-left: 20px;
}
.order_information div a{
    color:rgb(104, 86, 223)
}
.shop_totle{
    margin-top: 20px;
    background-color: #ffffff;
    height: 180px;
}
.shop_totle .shop_pro{
    margin-top: 20px;
    margin-left: 20px;
    padding-top: 25px;
}
.shop_pro .pro_a{
    float: left;
}
.shop_pro .pro_b{
    float:right;
    margin-right: 20px;
}
.shop_totle .shop_lin{
    float: left;
    margin-left: 20px;
    width: 100%;
    height: 2px;
    background: #eeeeee;
    margin-top: 20px;
}
.shop_totle .shop_tol{
    float: right;
    margin-top: 20px;
    margin-right: 20px;
}
.shop_totle .shop_tol span{
    color: #F37505
}
.order_fixed{
    position: fixed;
    left: 0;
    right: 0;
    bottom: 0;
    z-index: 20;
    height: 100px;
    background-color: #ffffff;
}
.order_fixed .fixed_a{
    float: right;
    width: 150px;
    height: 60px;
    margin-top: 20px;
    line-height: 60px;
    border: 3px solid #868080;
    margin-right: 20px;
}
.order_fixed .fixed_b{
    float: right;
    width: 150px;
    height: 60px;
    margin-top: 20px;
    line-height: 60px;
    border: 3px solid #F37505;
    margin-right: 20px;
    color: #F37505
}
</style>
