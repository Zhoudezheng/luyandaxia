<template>
  <div :class="!isShow ? 'interaction':''" >
    <div class="interaction_list" v-show="isShow" >
       <div class="liveuser_clone">
          <img src="./image/Bitmap.png" class="liveuser_toen">
          <span class="liveuser_span">顾南衣96</span>
          <img  class='liveuser_vip' src="./image/huiyuan.png" alt="会员">
          <span class="liveuser_fensi">02月13日</span>
       </div>
       <div class="liveuser_remne">    
          <img src="./image/remen.png" alt="remen" class="remen_icon">
          <span class="remen_wenzi">隔壁最动听的事和奈何boss要娶我</span>
       </div>
       <div class="livePinglun_comment">
         <div class="comment_a">
            <span >绿叶海天牛：</span>   <span>好看</span>
         </div>
         <div class="comment_b"> 
           <span>顾南衣96: </span>   <span>超级好看</span>
         </div> 
          <a href="#">查看全部2313条回复 ></a>
       </div>
       <div>
         <div class="comment_icon">
           <img src="./image/xiaoxi .png" alt="pinglun" class="icon_xiaoxi">  
           <span class="icon_shuzi">2313</span>
         </div>
         <div class="comment_zanicon">
           <img src="./image/zan.png" alt="zan" class="icon_zan">  
           <span class="icon_zanshuzi">2313</span>
         </div>
       </div>
    </div>
    <div class="mask" v-show="!isShow">
      <input type="button" class="app_download" value="立即下载" @click="11111">
    </div>
    <div class="interaction_line"></div>
  </div>

</template>

<script>
  export default {
    data(){
      return{
        isShow:false,
      }
    },
    mounted(){
       if(!this.isShow){
         this.stop()
       }
    },
    methods:{
       /***滑动限制***/
      
      stop(){
        // document.body.addEventListener('touchmove', function (e) {
        //       e.preventDefault(); 
        // }, {passive: false}); 
      },
      /***取消滑动限制***/
    },
    //  destroyed () {
    //     document.body.removeEventListener('touchmove',mo, { passive: false });
    // },
  }
</script>

<style scoped>
  @import '../../../../static/font/font.css';
  /* .interaction{
     height:100%;
  } */
  .mask{
    position: fixed;
    left: 0;
    right: 0;
    z-index: 20;
    height: 100%;
    background-color: black;
    opacity: 0.7;
    text-align: center;
    
  }
  .mask .mask_text{
    /* float: left; */
   color: #eeeeee ;
   margin-top: 10%;
   /* margin-left: 290px; */
   font-size: 32px;
  }
  .interaction_list{
    /* 未来遮罩层高度 */
    height:400px;
    /* 开启遮罩层高度 */
    /* height: 375px; */
  }
  .interaction_list .liveuser_clone{
    height: 120px;
  }
  .interaction_list .liveuser_toen{
    float: left;
    width:70px;
    height: 69px;
    border-radius: 50%; 
    margin: 28px 0px 0px 28px;
  }
  .interaction_list .liveuser_span{
    margin: 29px 0 15px 24px;
    float: left;
    /* width:128px; */
    width:110px;
    height:37px;
    font-size:26px;
    /* font-family:PingFangSC-Medium; */
    font-weight:500;
    color:rgba(74,74,74,1);
    line-height:32px;
  }
  .interaction_list .liveuser_vip{
      width:27px;
      height:27px;
      float: left;
      margin-left: 8px;
      margin-top: 32px;
  }
  .interaction_list .liveuser_fensi{
    float: left;
    margin-top: 68px;
    margin-left: -145px;
    height:30px;
    font-size:22px;
    font-family:PingFangSC-Regular;
    font-weight:400;
    color:rgba(102,102,102,1);
    line-height:30px;    
  }
  .liveuser_remne{
     height: 40px;
  }
  .liveuser_remne .remen_icon{
    float: left;
    width: 33px;
    height: 33px;
    margin: 2px 0 0 28px;
  }
  .liveuser_remne .remen_wenzi{
    height:40px;
    font-size:28px;
    font-family:PingFangSC-Medium;
    font-weight:500;
    color:rgba(74,74,74,1);
    line-height:35px;  
    float: left;
    margin-left:13px; 
  }
  .livePinglun_comment{
    margin-top: 16px;
    background-color: #F7F7F7FF;
    padding-top: 28px;
    padding-bottom: 31px;
    padding-left: 24px;
    text-align: left;
    margin-left: 28px;
    margin-right: 28px;
  }
  .livePinglun_comment .comment_a,.comment_b{
   margin-bottom: 20px;
  }
  .livePinglun_comment .comment_a span,.comment_b span{
   height:33px;
   font-size:24px;
   font-family:PingFangSC-Regular;
   font-weight:400;
   color:rgba(102,102,102,1);
   line-height:33px;
  }
  .livePinglun_comment a{
    text-decoration: none;
    height:30px;
    font-size:24px;
    font-family:PingFangSC-Medium;
    font-weight:500;
    color:rgba(246,127,11,1);
    line-height:30px;
  }
  .comment_icon {
    float: left;
    margin-left: 333px;
    margin-top: 30px;
  }
  .comment_icon .icon_xiaoxi{
      width: 28px;
      height: 27px;
      vertical-align:middle;
  }
  .comment_icon .icon_shuzi{
      margin-top: 26px;
      height:30px;
      font-size:22px;
      font-family:PingFangSC-Regular;
      font-weight:400;
      color:rgba(129,129,129,1);
      line-height:30px;
      vertical-align:middle;
  }
  .comment_zanicon{
    float:right;
    margin-right: 120px;
    margin-top: 29px;
  }
  .comment_zanicon .icon_zan{
    width: 25px;
    height: 26px;
    vertical-align:middle;
  }
  .comment_zanicon .icon_zanshuzi{
    width:49px;
    height:30px;
    font-size:22px;
    font-family:PingFangSC-Regular;
    font-weight:400;
    color:rgba(129,129,129,1);
    line-height:30px;
    vertical-align:middle;
  }
  .interaction_line,.interaction_line1,.interaction_line2{
    height: 0.8px;
    background-color: #eeeeee
  }
  .app_download{
    color: #ffffff;
    margin-top: 10%;
    margin-left: 30px;
    margin-right: 10px;
    width: 150px;
    height: 70px;
    border-radius: 45px;
     -webkit-appearance:none  !important;
    appearance:none !important;
    -webkit-tap-highlight-color:rgba(0, 0, 0, 0) !important; /*去除点击高亮的颜色*/
    background-color: rgba(243,117,5,1)
}
</style>