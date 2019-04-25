<template>
  <div class="introduction">
    <div class="recommend_list" v-for="recommend in this.recommends" v-show="isNull == false" @click="goto(recommend)">
         <img :src="recommend.cover" alt="1111">
         <a href="#" class="list_a1">{{recommend.name}}</a>
         <a href="#" class="list_a2">{{recommend.info}}</a>
    </div>
    <div  class="recommend_listed" v-show="isNull == true">
      <img src="./image/nosou.png" alt="信息" class="listed_img">
      <div class="list_div">暂无数据</div>
    </div>
   <div class="recommend_line"></div>
  </div>
</template>

<script>
  import {mapState} from 'vuex'
import { fail } from 'assert';
  export default {
    data(){
      return{
        isNull:true,
      }
    },
    mounted(){
    },
    computed: {
    recommends: {
          get:function () {
              this.isNull = typeof(this.$store.state.detail.recommend) == 'undefined'?true:false
              console.log('leixing',typeof(this.$store.state.detail.recommend))
              return this.$store.state.detail.recommend
          },
          set:function(){
              this.recommends = this.$store.state.detail.recommend
          },
        }
    },
    methods:{
      goto(recommend){
        console.log('type',recommend.type)
        let id = recommend.url
        console.log('id',id)
        if(recommend.type === 1){
          
          this.$router.push(
            {
              path:'/commoditydetails',
              query:{
                data:{
                  id
                }
              }
            }
          )

        }else if(recommend.type === 2)
        {
          this.$router.push(
            {
              path:'/liveSharing',
              query:{
                id:id
              }
            }
          )
          window.location.reload()
        }else if(recommend.type === 3){
          this.$router.push(
            {
              path:'/projectsharing',
              query:{
                id:id
              }
            }
          )
        }else{
          this.$router.push(
            {
              path:'/recommenddetail',
              query:{
                url:recommend.url,
                name:recommend.name
              }
            }
          )
        }
      }
    },
    watch:{
      $route(){
        this.$nextTick(
          this.$router.replace({
          path:this.$route.fullPath
        })
        )
       
        console.log(this.$route.fullPath);
      }
    }
  }
</script>

<style  lscoped>
  @import '../../../../static/font/font.css';
  .introduction{
    position: relative;
  }
  .recommend_list{
    height: 183px;
  }
 .recommend_list img{
   float: left;
   width: 172px !important;
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
 .listed_img{
   width: 300px;
   height: 300px;
 }
</style>