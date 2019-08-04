<template>
  <div class="success_content">
    <div class="success_head">
        <span class="head_content">支付成功</span>
    </div>
    <div class="success_line"></div>
    <div class="success_content">
       <img src="./image/successful.png" alt="支付成功" class="content_icon">
       <span class="content_p">支付方式：微信支付</span>
       <span class="content_span">支付金额：¥653.80</span>
    </div>
    <div class="vip_buy">
    <input type="button" value="确定" class="buy_button">
    </div>
  </div>
</template>

<script>
  import {mapState} from 'vuex'
  export default {
    data(){
        return {
        }
    },
    computed: {
      ...mapState(['weixinid','wechatPayment'])
    },
    mounted(){
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
                //   alert(this.$store.state.weixinid.openid)
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
                the.wxInitPay(wechat)
                })
            }else if(istype){
                this.$store.dispatch('wechatPayment', {type, order_sn, device_type: os, openid: this.$store.state.weixinid.openid}).then(() => {
                let wechat = this.wechatPayment
                the.wxInitPay(wechat)
                })
            }
          })
        },
        wxInitPay(data) {
              alert(data)    
            if (typeof WeixinJSBridge == "undefined"){  
                if( document.addEventListener ){  
                    document.addEventListener('WeixinJSBridgeReady', this.onBridgeReady(data), false);  
                }else if (document.attachEvent){  
                    document.attachEvent('WeixinJSBridgeReady', this.onBridgeReady(data));   
                    document.attachEvent('onWeixinJSBridgeReady', this.onBridgeReady(data));  
                }  
            }else{  
                this.onBridgeReady(data);  
            }   
        },
        onBridgeReady(data){
           WeixinJSBridge.invoke(  
               'getBrandWCPayRequest', {  
                   "appId" : data.appid,     //公众号名称，由商户传入       
                   "timeStamp": data.timestamp,         //时间戳，自1970年以来的秒数       
                   "nonceStr" : data.noncestr, //随机串       
                   "package" : "prepay_id=" + data.prepayid,       
                   "signType" : 'MD5',         //微信签名方式:       
                   "paySign" : data.sign,    //微信签名   
               },  
                 
               function(res){   
                   alert(res)    
                   if(res.err_msg == "get_brand_wcpay_request:ok" ) {  
                       alert("支付成功");  
                   }     // 使用以上方式判断前端返回,微信团队郑重提示：res.err_msg将在用户支付成功后返回    ok，但并不保证它绝对可靠。   
               }  
           );   
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