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
            re:'',
            orderList: '',
            price:'',
            os: '',
            price: "0.00",
            order_sned:'',
        }
    },
    computed: {
      ...mapState(['weixinid','wechatPayment'])
    },
    mounted(){
        var b= localStorage.getItem('type');
        if( b === '2' || b == '4'){
            this.price= localStorage.getItem('priceed');
        }
        else{
            this.getOrderDetail()
        };
        function getParam(url, name) {
            try {
                var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)");
                var r = url.split('?')[1].match(reg);
                if(r != null) {
                return r[2];
                }
                return "";//如果此处只写return;则返回的是undefined
            } catch(e) {
                return "";//如果此处只写return;则返回的是undefined
            }
        };
        var url=window.location.href;
        var name="code";
        var re=getParam(url,name);
        this.re=re;
        this.getwxappid(re);
    },
    methods: {
        liveSharing(){
            this.$router.push({  
                path:'/liveSharing',
            })
        },
        getwxappid(re){
          this.$store.dispatch('getweixinid',re).then(()=>{
            let type = localStorage.getItem('type');
            var istype='';
            let order_sn ='';
            if(type === '2' || type === '4'){
            istype=true;
            order_sn = localStorage.getItem('order_sndata');
            }else{
            istype=false;
            order_sn = localStorage.getItem('order_sndatatwo');
            }
            let os = '3';
            if(this.orderList && !istype){
                this.$store.dispatch('wechatPayment', {type, order_sn, device_type: os, openid: this.$store.state.weixinid.openid}).then(() => {
                let wechat = this.wechatPayment
                this.wxInitPay(wechat)
                })
            }else if(istype){
                this.$store.dispatch('wechatPayment', {type, order_sn, device_type: os}).then(() => {
                let wechat = this.wechatPayment
                this.wxInitPay(wechat)
                })
            }else{
                this.getshoppOrderData(2).then((data)=>{
                    this.orderList= data.data.order_sn;
                    this.getwxappid(this.re)
                });
            }
          })
        },
        async getshoppOrderData (data) {
            let token =this.$store.state.Authorization;
            var shopping=JSON.parse(localStorage.getItem('createOrderData'));
            var result='';
            result=await  reqCreateOrder(token,shopping.remark,shopping.cart_list,
            shopping.product_info,shopping.address_id,shopping.share_id,shopping.invoice,data);
            if(result.code===200){
              this.order_sned=result.data.order_sn;
            }
            return result;
        },
        wxInitPay(data) {
            alert(data)
          wx.chooseWXPay({
            timestamp: data.timestamp, // 支付签名时间戳，注意微信jssdk中的所有使用timestamp字段均为小写。但最新版的支付后台生成签名使用的timeStamp字段名需大写其中的S字符
            nonceStr: data.noncestr, // 支付签名随机串，不长于 32 位
            package: "prepay_id=" + data.prepayid, // 统一支付接口返回的prepay_id参数值，提交格式如：prepay_id=***）
            signType: 'MD5', // 签名方式，默认为'SHA1'，使用新版支付需传入'MD5'
            paySign: data.sign, // 支付签名
            success: function (res) {
                // 支付成功后的回调函数
                alert('ssss')
            }
        });
        },
        getOrderDetail() {
            let orderDetail = localStorage.getItem('orderDetail')
            orderDetail = JSON.parse(orderDetail)
            this.price = orderDetail.total;
            console.log('order',this.price)
            let os = navigator.userAgent
            let isAndroid = os.indexOf('Android') > -1 || os.indexOf('Adr') > -1
            let isiOS = !!os.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/);
            if (isAndroid) {
            this.os = '1'
            } else if (isiOS) {
            this.os = '2'
            }
       }
    },
    destroyed () {
    },
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