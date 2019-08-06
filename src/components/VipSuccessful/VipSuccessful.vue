<template>
  <div class="success_content">
    <div class="success_head">
        <span class="head_content">支付成功</span>
    </div>
    <div class="success_line"></div>
    <div class="success_content">
       <img src="./image/successful.png" alt="支付成功" class="content_icon">
       <span class="content_p">支付方式：微信支付</span>
       <span class="content_span">支付金额：{{price}}</span>
    </div>
    <div class="vip_buy">
    <input type="button" value="确定" class="buy_button">
    </div>
  </div>
</template>

<script>
  import {mapState} from 'vuex'
  import {reqCreateOrder,getweixincode} from '../../api'
  import wx from "weixin-js-sdk";
  export default {
    data(){
        return {
            price: "0.00",
        }
    },
    computed: {
    },
    mounted(){
        var b= localStorage.getItem('type');
        if( b === '2' || b == '4'){
            this.price= localStorage.getItem('priceed');
        }
        else{
            this.getOrderDetail()
        };
    },
    methods: {
        getOrderDetail() {
            let orderDetail = localStorage.getItem('orderDetail')
            orderDetail = JSON.parse(orderDetail)
            this.price = orderDetail.total;
            let os = navigator.userAgent
            let isAndroid = os.indexOf('Android') > -1 || os.indexOf('Adr') > -1
            let isiOS = !!os.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/);
            if (isAndroid) {
            this.os = '1'
            } else if (isiOS) {
            this.os = '2'
            }
       }
    }
}
</script>

<style  scoped>
@import '../../../static/font/font.css';
.success_head{
    height: 88px;
    text-align: center;
    padding-top:20px;
}
.success_head .head_content{
    width:144px;
    height:50px;
    font-size:36px;
    font-family:PingFangSC-Medium;
    font-weight:500;
    color:rgba(74,74,74,1);
    line-height:50px;
}
.success_line{
    height: 2px;
    background-color: #eeeeee;
}
.success_content .content_icon{
     float: left;
     width: 131px;
     height: 118px;
     margin-top: 99px;
     margin-left: 167px;
}
.success_content .content_p{
    float: left;
    margin-top: 106px;
    margin-left: 34px;
    width:252px;
    height:40px;
    font-size:28px;
    font-family:PingFangSC-Regular;
    font-weight:400;
    color:rgba(102,102,102,1);
    line-height:40px;
}
.success_content .content_span{
    float: left;
    margin-left: 34px;
    margin-top: 24px;
    width:249px;
    height:40px;
    font-size:28px;
    font-family:PingFangSC-Regular;
    font-weight:400;
    color:rgba(102,102,102,1);
    line-height:40px;
}
.vip_buy{
    height: 160px;
    margin-top: 292px;
}
.vip_buy .buy_button{
    width:694px;
    height:88px;
    background:linear-gradient(90deg,rgba(254,154,28,1) 0%,rgba(243,117,5,1) 100%);
    border-radius:59px;
    margin-top: 94px;
    font-size:36px;
    font-family:PingFangSC-Medium;
    font-weight:500;
    color:rgba(255,255,255,1);
    line-height:50px;
}
</style>