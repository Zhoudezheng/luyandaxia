<template>
  <div class="success_content">
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
             this.getlistdata();
          })
        },
        getlistdata(){
            let type = localStorage.getItem('type');
            var istype='';
            let order_sn ='';
            if(type === '2' || type === '3'){
                istype=true;
                order_sn = localStorage.getItem('order_sndata');
            }else{
                istype=false;
                order_sn = this.order_sned;
            }
            let os = '3';
            if(this.orderList && !istype){
                this.$store.dispatch('wechatPayment', {type, order_sn, device_type: os, openid: this.$store.state.weixinid.openid}).then(() => {
                let wechat = this.wechatPayment
                wx.config({
                    debug: false, // 开启调试模式,调用的所有api的返回值会在客户端alert出来，若要查看传入的参数，可以在pc端打开，参数信息会通过log打出，仅在pc端时才会打印。
                    appId: wechat.appId, // 必填，公众号的唯一标识
                    timestamp: wechat.timestamp, // 必填，生成签名的时间戳
                    nonceStr: wechat.nonceStr, // 必填，生成签名的随机串
                    signature: wechat.paySign, // 必填，签名
                    jsApiList: [] // 必填，需要使用的JS接口列表
                })
                this.wxInitPay(wechat)
                })
            }else if(istype){
                this.$store.dispatch('wechatPayment', {type, order_sn, device_type: os,openid: this.$store.state.weixinid.openid}).then(() => {
                let wechat = this.wechatPayment
                wx.config({
                    debug: false, // 开启调试模式,调用的所有api的返回值会在客户端alert出来，若要查看传入的参数，可以在pc端打开，参数信息会通过log打出，仅在pc端时才会打印。
                    appId: wechat.appId, // 必填，公众号的唯一标识
                    timestamp: wechat.timestamp, // 必填，生成签名的时间戳
                    nonceStr: wechat.nonceStr, // 必填，生成签名的随机串
                    signature: wechat.paySign, // 必填，签名
                    jsApiList: [] // 必填，需要使用的JS接口列表
                })
                this.wxInitPay(wechat)
                })
            }else{
                this.getshoppOrderData(2).then((data)=>{
                    this.orderList= data.data.order_sn;
                });
            }
        },
        async getshoppOrderData (data) {
            let token =this.$store.state.Authorization;
            var shopping=JSON.parse(localStorage.getItem('createOrderData'));
            var result='';
            result=await  reqCreateOrder(token,shopping.remark,shopping.cart_list,
            shopping.product_info,shopping.address_id,shopping.share_id,shopping.invoice,data);
            if(result.code===200){
              this.order_sned=result.data.order_sn;
              this.getlistdata()
            }
            return result;
        },
        wxInitPay(data) {
          wx.ready(function () {
            wx.chooseWXPay({
                timestamp: data.timestamp, // 支付签名时间戳，注意微信jssdk中的所有使用timestamp字段均为小写。但最新版的支付后台生成签名使用的timeStamp字段名需大写其中的S字符
                nonceStr: data.nonceStr, // 支付签名随机串，不长于 32 位
                package: data.package, // 统一支付接口返回的prepay_id参数值，提交格式如：prepay_id=***）
                signType: data.signType, // 签名方式，默认为'SHA1'，使用新版支付需传入'MD5'
                paySign: data.paySign, // 支付签名
                success: function (res) {
                    alert('成功')
                    this.$router.push('/vipsuccessful')
                },
                fail: function (res) {
                    alert('失败:'+JSON.stringify(res))
                    this.$router.go(-1)
                },
                cancel: function (res) {
                     toast("已取消支付！");
                     alert('取消')
                     this.$router.go(-1)
                }
          });
         })
        },
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
    },
    destroyed () {
    },
}
</script>

<style  scoped>
</style>