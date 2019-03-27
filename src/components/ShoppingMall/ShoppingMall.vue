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
    <input type="button" value="3秒后返回视频继续观看" class="buy_button">
    </div>
    <p class="success_goback">
        <a href="#" @click="goback">返回到我的VIP</a>
    </p>
  </div>
</template>

<script>
  export default {
    data(){
        return {
        }
    },
    mounted(){
    },
    methods: {
        liveSharing(){
            this.$router.push({  
                path:'/liveSharing',
            })
        },
        goback(){
             this.$router.push({  
                path:'/liveSharing',
            })
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
.success_goback{
    width:523px;
    height:40px;
    font-size:28px;
    font-family:PingFangSC-Medium;
    font-weight:500;
    color:rgba(155,155,155,1);
    line-height:40px;
    margin-top: 50px;
    margin-left: 120px;

}
</style>