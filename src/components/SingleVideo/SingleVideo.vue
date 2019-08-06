<template>
  <div class="singlevideo_content">
    <div class="singlevideo_div">
      <img src="./image/fanhui.png" alt="协议按钮" @click="liveSharing" class="singlevideo_check">
      <span  class="singlevideo_mode">路演直播</span>
    </div>
    <div class="singlevideo_list">
      <img :src="this.detail.cover" alt="2222">
      <a href="#" class="list_a1">{{this.detail.title}}</a>
      <a href="#" class="list_a2">¥{{this.detail.individual_cost}}</a>
      <span class="list_a3">{{this.amount}}</span>
      <p class="list_a4">* 非VIP会员购买本直播后，{{this.detail.viewing_time}}小时内可无限次观看回看</p>
    </div>
    <div class="singlevideo_lins"></div>
    <div class="Commodity_amount">
        <span class="amount_a1">商品金额</span>
        <span class="amount_a2">
            <span class="a2_un">￥</span>
            <span class="a2_ut">{{this.detail.individual_cost}}</span>
        </span>
    </div>
    <div class="amount_line"></div>
    <div class="Commodity_amount">
        <span class="amount_a3">实付金额</span>
        <span class="amount_a4">
            <span class="a2_un">￥</span>
            <span class="a2_ut">{{this.amount*this.detail.individual_cost}}</span>
        </span>
    </div>
    <div class="amount_lined"></div>  
    <div class="Payment_method">
        <span>支付方式</span>
    </div>
    <button class="singlevideo_weixin" @click="showactive">
      <img src="./image/weixin.png" alt="微信" class="weixin_icon">
      <span class="weixin_p">微信支付</span>
      <span    :class="activeClass == 1 ?'weixin_check':'weixin_checked'" ></span>
    </button>
    <div class="singlevideo_line"></div>
     <button class="singlevideo_weixin" @click="showactives" v-show="this.zfbShow">
      <img src="./image/zhifu.png" alt="微信" class="weixin_icon">
      <span class="weixin_p">支付宝支付</span>
      <span    :class="activeClass == 2 ?'weixin_check':'weixin_checked'"></span>
    </button>
    <div class="singlevideo_buy">
        <div class="buy_content">
          <span class="content_total">总计</span>
          <span class="content_mony">¥{{this.total_cost}}</span>
        </div>
        <input type="button" value="去支付" class="buy_link" @click="singlevideo">
    </div>
  </div>
</template>

<script>
import {mapState} from 'vuex'
  export default {
    data(){
        return {
            activeClass:1,
            amount:1,
            total_cost:0,
            zfbShow:true
        }
    },
    computed: {
      ...mapState(['alipayPayment', 'wechatPayment']),
    detail: {
        get:function () {
            return this.$store.state.detail;
        },
        set:function(){
            this.detail = this.$store.state.detail
        }
    }
    },
    mounted(){
        this.total_cost = this.amount * this.detail.individual_cost
        var ua = navigator.userAgent.toLowerCase();
    　　 var isWeixin = ua.indexOf('micromessenger') != -1;
    　　 this.zfbShow = !isWeixin
    },
    methods: {
        liveSharing(){
            // this.$router.push({  
            //     path:'/liveSharing',
            // })
            this.$router.go(-1)
        },
        singlevideo() {
        const the = this
        let way = this.activeClass
        let type = localStorage.getItem('type');
        let order_sn =''
        if(type === '2'||type === '3'){
          order_sn = localStorage.getItem('order_sndata');
        }else{
          order_sn = this.orderId;
        }
        let os = this.os;
        let return_url = '/VipSuccessful';
        // console.log(type, order_sn, os, way);
        if (way == 1) {
        //   this.$store.dispatch('wechatPayment', {type, order_sn, device_type: os}).then(() => {
        //     let wechat = this.wechatPayment
        //     the.wxInitPay(wechat)
        //   })
            os = '3';
            let a = urlencode('http://zuanshi.fansutech.com/viple');
            function urlencode (str) {  
              str = (str + '').toString();   
              return encodeURIComponent(str).replace(/!/g, '%21').replace(/'/g, '%27').replace(/\(/g, '%28').  
              replace(/\)/g, '%29').replace(/\*/g, '%2A').replace(/%20/g, '+');  
            }
            window.location.href=`https://open.weixin.qq.com/connect/oauth2/authorize?appid=wx594763adaadef6d5&redirect_uri=${a}&response_type=code&scope=snsapi_base&state=123#wechat_redirect`;
        } else if (way == 2) {
          os = '3'
          this.$store.dispatch('alipayPayment', {type, order_sn, device_type: os, return_url}).then(() => {
            let form = this.alipayPayment.key
            const div = document.createElement('div');
            div.innerHTML = form; //此处form就是后台返回接收到的数据
            console.log("div",form);
            document.body.appendChild(div);
            document.forms[0].submit()
            // console.log(data);
          })
        }
        // this.$router.push({
        //   path: '/vipsuccessful',
        // })
      },
        showactive(){
           this.activeClass=1
        },
        showactives(){
           this.activeClass=2
        }
    },
    destroyed () {
    },
}
</script>

<style  scoped>
@import '../../../static/font/font.css';
.singlevideo_content{
    background-color: rgba(249, 250, 251, 1);
    height: 1334px;
}
.singlevideo_div{
    height: 88px;
    background-color: #ffffff;
}
.singlevideo_div .singlevideo_check{
    background-size: 16px 28px;
    float: left;
    margin-top: 32px;
    width:14px;
    height:26px;
    margin-left:30px;
}
.singlevideo_div .singlevideo_mode{
    float: left;
    /* width:144px; */
    height:50px;
    font-size:36px;
    font-family:PingFangSC-Medium;
    font-weight:500;
    color:rgba(74,74,74,1);
    line-height:50px;
    margin-top:19px;
    margin-left: 262px;
}

.singlevideo_list{
    height: 245px;
    background-color: #ffffff;
}
.singlevideo_list img{
   float: left;
   width: 172px;
   height:127px;
   margin: 28px 16px 28px 28px ;
}
.singlevideo_list a{
   text-decoration:none;
}
.singlevideo_list .list_a1{
   /* white-space: nowrap;
   overflow: hidden;
   text-overflow: ellipsis; */
   float: left;
   margin: 28px 0 14px 0;
   width:434px;
   /* height:45px; */
   font-size:28px;
   font-family:PingFangSC-Medium;
   font-weight:500;
   color:rgba(74,74,74,1);
   line-height:45px;
    text-align:left
}
.singlevideo_list .list_a2{
   float: left;
   width:434px;
   /* height:68px; */
   font-size:28px;
   font-family:PingFangSC-Regular;
   font-weight:400;
   color:rgba(102,102,102,1);
   line-height:33px;
   text-align:left
}
.singlevideo_list .list_a3{
    float: right;
    margin-right: 33px;
    margin-top: -95px;
    height:33px;
    font-size:24px;
    font-family:PingFangSC-Medium;
    font-weight:500;
    color:rgba(187,187,187,1);
    line-height:33px;
}
.singlevideo_list .list_a4{
    float: left;
    height:33px;
    font-size:24px;
    font-family:PingFangSC-Regular;
    font-weight:400;
    color:rgba(255,0,0,1);
    line-height:33px;
    margin-left: 28px;

}
.Commodity_amount{
    height: 100px;
    background-color: #ffffff;
}
.amount_a1,.amount_a3{
    /* width:112px; */
    height:40px;
    font-size:28px;
    font-family:PingFangSC-Regular;
    font-weight:400;
    color:rgba(102,102,102,1);
    line-height:40px;
    float: left;
    margin-top: 30px;
    margin-left: 28px;
}
.amount_a2{
    height:40px;
    font-family:PingFangSC-Semibold;
    font-weight:600;
    color:rgba(74,74,74,1);
    line-height:28px;
    float: right;
    margin-top: 35px;
    margin-right: 28px;
}
.amount_a4{
    height:40px;
    font-family:PingFangSC-Semibold;
    font-weight:600;
    color:rgba(243, 117, 5, 1);
    line-height:28px;
    float: right;
    margin-top: 35px;
    margin-right: 28px;
}

.a2_un{
    font-size: 20px;
}
.a2_ut{
    font-size: 28px;
}
.amount_line{
    height: 2px;
    background-color: #eeeeee;
}
.amount_lined{
    height: 16px;
    background-color: #eeeeee;
}
.Payment_method{
    height: 68px;
    background-color: #ffffff;
}
.Payment_method span{
    float: left;
    margin-top: 23px;
    margin-left: 28px;
    width:128px;
    height:45px;
    font-size:32px;
    font-family:PingFangSC-Medium;
    font-weight:500;
    color:rgba(74,74,74,1);
    line-height:45px;
}
.singlevideo_head .singlevideo_mony{
    margin-top: 70px;
    height: 90px;
}
.singlevideo_head .singlevideo_mony .mony_a{
    height:90px;
    font-size:32px;
    font-family:PingFangSC-Semibold;
    font-weight:600;
    color:rgba(255,255,255,1);
    line-height:45px;
}
.singlevideo_head .singlevideo_mony .mony_b{
    height:90px;
    font-size:64px;
    font-family:PingFangSC-Semibold;
    font-weight:600;
    color:rgba(255,255,255,1);
    line-height:45px;
}
.singlevideo_head .singlevideo_Member{
    height:33px;
    font-size:24px;
    font-family:PingFangSC-Medium;
    font-weight:500;
    color:rgba(255,255,255,1);
    line-height:33px;
}
.singlevideo_lins{
    height: 15px;
    background-color: #eeeeee
}
.singlevideo_weixin{
    height: 120px;
    width: 100%;
    background-color: #ffffff;
    margin: 0;
    padding: 0;
    border: 1px solid transparent; 
    outline: none; 
}
.singlevideo_weixin .weixin_icon{
    float: left;
    margin-top: 30px;
    margin-left: 28px;
    width: 44px;
    height: 40px;
}
.singlevideo_weixin .weixin_p{
    float: left;
    margin-top: 30px;
    margin-left: 24px;
    height:40px;
    font-size:28px;
    font-family:PingFangSC-Regular;
    font-weight:400;
    color:rgba(102,102,102,1);
    line-height:40px;
}
.singlevideo_weixin .weixin_check{
    background-image: url('./image/kexuan.png');
    width: 36px;
    height: 36px;
    background-size: 36px 36px;
    border-radius: 50%;
    float: right;
    margin-top: 30px;
    margin-right: 28px;
}
.singlevideo_line{
    height: 2px;
    background-color: #eeeeee
}
.singlevideo_weixin .weixin_checked{
     background-image: url('./image/bukexuan.png');
    width: 36px;
    height: 36px;
    background-size: 36px 36px;
    border-radius: 50%;
    float: right;
    margin-top: 40px;
    margin-right: 28px;
}
.singlevideo_buy{
  position: fixed;
  height: 103px;
  left: 0;
  right: 0;
  bottom: 0
}
.singlevideo_buy .buy_content{
  float: left;
  width:500px;
  height:100px;
  background:rgba(255,255,255,1);
  text-align: left
}
.singlevideo_buy .buy_content .content_total{
  float: left;
  width:56px;
  height:40px;
  font-size:28px;
  font-family:PingFangSC-Regular;
  font-weight:400;
  color:rgba(102,102,102,1);
  line-height:40px;
  margin-top: 31px;
  margin-left: 28px;
}
.singlevideo_buy .buy_content .content_mony{
  float: left;
  width:111px;
  height:45px;
  font-size:28px;
  font-family:PingFangSC-Semibold;
  font-weight:600;
  color:rgba(255,126,0,1);
  line-height:28px;
  margin-top: 36px;
  margin-left: 30px;
}
.singlevideo_buy .buy_link{
  width:250px;
  height:98px;
  background:linear-gradient(90deg,rgba(255,161,44,1) 0%,rgba(255,121,19,1) 100%);
  font-size:36px;
  font-family:PingFangSC-Medium;
  font-weight:500;
  color:rgba(255,255,255,1);
  line-height:50px;
}
</style>