<template>
  <div class="ship_content">
    <div class="ship_div">
        <img src="./image/fanhui.png" alt="协议按钮"  class="ship_check" @click="shipper" >
        <span  class="ship_mode">年费VIP</span>
    </div>
    <div>
        <img src="./image/background.png" alt="背景图片" class="ship_con">
    </div>
    <div class="ship_user">
          <img src="./image/Bitmap.png" class="liveuser_toen">
          <span class="liveuser_span">名字真难</span>
          <span class="liveuser_fensi">有效期：2020-03-01 下午6：08</span>
    </div>
    <div class="equity">
        <img src="./image/equity.png" alt="权益" class="equity_ico">
        <span class="equity_span">权益介绍</span>
    </div>
    <div class="equity_list">
        <span class="list_start">路演大侠全部直播免费看</span>
        <div class="list_end">
            <span class="end_a">每年</span>
            <span class="end_b">超过100</span>
            <span class="end_c">场</span>
        </div>
    </div>
    <div class="equity_list">
        <span class="list_start">黑钻石人文研究院精心打磨</span>
        <div class="list_end">
            <span class="end_a">经历</span>
            <span class="end_b">3000个</span>
            <span class="end_c">小时</span>
        </div>
    </div>
    <div class="equity_list">
        <span class="list_start">线下“侠客行”活动，孵化器参观</span>
        <div class="list_end">
            <span class="end_a"共</span>
            <span class="end_b">2万+</span>
            <span class="end_c">人</span>
        </div>
    </div>
    <div class="equity_list">
        <span class="list_start">获取优质人脉</span>
        <div class="list_end">
            <span class="end_a">共100多个产品</span>
        </div>
    </div>
    <div class="equity_list">
        <span class="list_start">文创商城5折优惠</span>
        <div class="list_end">
            <span class="end_a">共</span>
            <span class="end_b">100多个</span>
            <span class="end_c">产品</span>
        </div>
    </div>
    <div class="equity_list">
        <span class="list_start">投融资对接会门票</span>
        <div class="list_end">
            <span class="end_a">共</span>
            <span class="end_b">3</span>
            <span class="end_c">张</span>
        </div>
    </div>
    <div class="equity_list">
        <span class="list_start">黑钻石官方活动门票</span>
        <div class="list_end">
            <span class="end_a">享受</span>
            <span class="end_b">九折</span>
            <span class="end_c">优惠</span>
        </div>
    </div>
    <div class="equity_list">
        <span class="list_start">黑钻石年度会员</span>
        <div class="list_end">
            <span class="end_a">仅需</span>
            <span class="end_b">198</span>
            <span class="end_c">元</span>
        </div>
    </div>
    <div class="listed"></div>
    <div class="equity_careful">
        <img src="./image/remind.png" alt="提醒" class="careful_ico">
        <span class="careful_span">注意事项</span>
    </div>
    <div class="careful_con">
        <div>1.您将购买的商品为虚拟内容服务，购买后不支持退订、转让、退换，请斟酌确认;</div>
        <div>2.支持完成后，服务将在5分钟后生效；</div>
        <div> 3.续费可以会员期限内续期，不会与当前有效时间重叠；</div>
        <div>4.查阅“会员服务协议”，“苹果手机支付教程”等内容。</div>
    </div>
    <div class="footer_car">
        <img src="./image/buy.png" alt="点击" class="car_p">
        <div class="car_buy">
            <span class="car_fol">购买会员 </span>
            <span class="car_a">￥198.00</span>
        </div>
    </div>
  </div>
</template>

<script>
  export default {
    methods:{
         shipper(){
          this.$router.push({
              path:'/personalcenter'
          })
      },
    }
}
</script>

<style  scoped>
@import '../../../static/font/font.css';
.ship_content {
  background:rgba(249,249,249,1);
}
.ship_content .ship_div{
    height: 88px;
    background:rgba(255,255,255,1);
}
.ship_div .ship_check{
    background-size: 16px 28px;
    width: 16px;
    height: 28px;
    float: left;
    margin-top: 30px;
    margin-left: 28px;
}
.ship_div .ship_mode{
    float: left;
    height:50px;
    font-size:36px;
    font-family:PingFangSC-Medium;
    font-weight:500;
    color:rgba(74,74,74,1);
    line-height:50px;
    margin-top:19px;
    margin-left: 267px;
}
.ship_con{
    height: 265px;
}
.ship_user{
    height: 156px;
    margin-top: 16px;
    background:rgba(255,255,255,1);
}
.ship_user .liveuser_toen{
    float: left;
    width:100px;
    height: 100px;
    border-radius: 50%; 
    margin-top: 27px;
    margin-left: 52px;
}
.ship_user .liveuser_span{
    margin: 28px 0 15px 24px;
    float: left;
    /* width:128px; */
    height:45px;
    font-size:32px;
    font-family:PingFangSC-Medium;
    font-weight:500;
    color:rgba(74,74,74,1);
    line-height:45px;
}
.ship_user .liveuser_fensi{
    float: left;
    margin-top: 88px;
    margin-left: -135px;
    height: 40px;     
    font-size:28px;
    font-family:PingFangSC-Regular;
    font-weight:500;
    color:rgba(187,187,187,1);
    line-height:40px;
}
.equity{
    margin-top: 16px;
    height: 68px;
    background:rgba(255,255,255,1);
}
.equity .equity_ico{
    float: left;
    width: 28px;
    height: 25px;
    margin-top: 33px;
    margin-left: 27px;
}
.equity .equity_span{
    height:45px;
    font-size:32px;
    font-family:PingFangSC-Medium;
    font-weight:500;
    color:rgba(74,74,74,1);
    line-height:45px;
    float: left;
    margin-top: 23px;
    margin-left: 10px;
}
.equity_list{
    height:68px;
    background:rgba(255,255,255,1);
}
.equity_list .list_start{
    float: left;
    margin-top: 28px;
    margin-left: 28px;
    height:40px;
    font-size:28px;
    font-family:PingFangSC-Medium;
    font-weight:500;
    color:rgba(74,74,74,1);
    line-height:40px;
}
.equity_list .list_end{
    text-align: left;
    float:right;
    margin-top: 28px;
    margin-right: 40px;
    width: 240px;
    height:40px;
    font-size:28px;
    font-family:PingFangSC-Regular;
    font-weight:400;
    color:rgba(74,74,74,1);
    line-height:40px;
}
.equity_list .list_end .end_b{
    color: rgba(243, 117, 5, 1);
}
.listed{
    height: 20px;
    background:rgba(255,255,255,1);
}
.equity_careful{
    margin-top: 16px;
    height: 68px;
}
.equity_careful .careful_ico{
    float: left;
    width: 19px;
    height: 25px;
    margin-top: 36px;
    margin-left: 27px;
}
.equity_careful .careful_span{
    width:112px;
    height:40px;
    font-size:28px;
    font-family:PingFangSC-Medium;
    font-weight:500;
    color:rgba(74,74,74,1);
    line-height:40px;
    float: left;
    margin-top: 32px;
    margin-left: 10px;
}
.careful_con{
    width:694px;
    height:166px;
    font-size:24px;
    font-family:PingFangSC-Regular;
    font-weight:400;
    color:rgba(102,102,102,1);
    line-height:33px;
    margin-top: 24px;
    margin-left: 29px;
    margin-right: 27px;
    text-align: left;
    margin-bottom: 165px;
}
.footer_car{
    position: fixed;
    left: 0;
    right: 0;
    bottom: 0;
    height: 160px;
    margin-top: 86px;
}
.footer_car .car_p{
    height: 160px;
}
.footer_car .car_buy{
    position: absolute;
    top:63px;
    left: 240px;
    height:50px;
    font-size:36px;
    font-family:PingFangSC-Medium;
    font-weight:500;
    color:rgba(255,255,255,1);
    line-height:50px;
}
.footer_car .car_buy .car_a{
    font-size:28px;
}

</style>