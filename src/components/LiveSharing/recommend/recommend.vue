<template>
  <div>
    <div class="recommend_list" v-for="recommend in this.recommends">
         <img :src="recommend.cover" alt="1111">
         <a href="#" class="list_a1">{{recommend.name}}</a>
         <a href="#" class="list_a2">{{recommend.info}}</a>
    </div>
   <div class="recommend_line"></div>
      <!-- <div class="recommend_list">
         <img src="./image/canzhao.jpg" alt="2222">
         <a href="#" class="list_a1">黑钻石投融路沙龙演第112期…</a>
         <a href="#" class="list_a2">黑钻石投融路沙龙第112期</a>
    </div>
      <div class="recommend_line1"></div>
     <div class="recommend_list">
         <img src="./image/kishi.jpg" alt="3333">
         <a href="#" class="list_a1">第三期 | 学习是一种生命力</a>
         <a href="#" class="list_a2">第三期 | 学习是一种生命力</a>
    </div>
     <div class="recommend_line2"></div>
     <div class="recommend_list">
         <img src="./image/canzhao.jpg" alt="4444">
         <a href="#" class="list_a1">黑钻石年中总结会述职路演</a>
         <a href="#" class="list_a2">黑钻石年中总结会述职路演</a>
    </div>
      <div class="recommend_list">
         <img src="./image/kishi.jpg" alt="1111">
         <a href="#" class="list_a1">第四期 | 如何让企业在商海…</a>
         <a href="#" class="list_a2">第四期 | 如何让企业在商海中第四期 | 如何让企业在商海中</a>
    </div>
    <div class="recommend_line"></div>
      <div class="recommend_list">
         <img src="./image/kishi.jpg" alt="1111">
         <a href="#" class="list_a1">第四期 | 如何让企业在商海…</a>
         <a href="#" class="list_a2">第四期 | 如何让企业在商海中第四期 | 如何让企业在商海中</a>
    </div>
    <div class="recommend_line"></div> -->
  </div>
</template>

<script>
  export default {
    data(){
      return{
        
      }
    },
    computed: {
    recommends: {
          get:function () {
              return this.$store.state.detail.recommend
          },
          set:function(){
              this.url = this.$store.state.detail.recommend
          },
        }
    },
  }
</script>

<style  lscoped>
  @import '../../../../static/font/font.css';
  .recommend_list{
    height: 183px;
  }
 .recommend_list img{
   float: left;
   width: 172px;
   height:127px;
   margin: 28px 16px 28px 28px ;
 }
 .recommend_list a{
   text-decoration:none;
 }
 .recommend_list .list_a1{
   white-space: nowrap;
   overflow: hidden;
   text-overflow: ellipsis;
   float: left;
   margin: 28px 0 14px 0;
   width:434px;
   height:45px;
   font-size:32px;
   font-family:PingFangSC-Medium;
   font-weight:500;
   color:rgba(74,74,74,1);
   line-height:45px;
    text-align:left
 }
 .recommend_list .list_a2{
   float: left;
   margin: 0  0 28px 0px ;
   width:434px;
   height:68px;
   font-size:24px;
   font-family:PingFangSC-Regular;
   font-weight:400;
   color:rgba(102,102,102,1);
   line-height:33px;
    text-align:left
 }
 .recommend_line,.recommend_line1,.recommend_line2{
   height: 0.8px;
   background-color: #eeeeee
 }
</style>