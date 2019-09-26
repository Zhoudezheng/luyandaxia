<template>
  <div class="background">
      <div >
       <div class="background_content" >
            <span class="content_span" v-html="this.html"></span>
        </div>
      </div>
  </div>
</template>

<script>
  export default {
    props:['info'],
    data(){
      return{
        html:'',
      }
    },
    mounted(){
      this.html = localStorage.getItem('chanelData');
    },
    methods:{
    }
}
</script>

<style scoped>
@import '../../../../static/font/font.css';
.background_title{
    height: 68px;
    border-bottom: 1px solid #eeeeee;
}
.background_title span{
    float: left;
    margin-top: 29px;
    margin-left: 28px;
    width:112px;
    height:40px;
    font-size:28px;
    font-family:PingFangSC-Medium;
    font-weight:500;
    color:rgba(74,74,74,1);
    line-height:35px;
}
.background_content{
    height: 498px;
    text-align: left;
    border-bottom: 1px solid #eeeeee;
}
.background_content .content_ico{
   width: 694px;
   height: 294px;
   margin-top: 29px;
   margin-left: 28px;
   margin-right: 28px;
}
.background_content .content_span{
    width:694px;
    height:120px;
    font-size:28px;
    font-family:PingFangSC-Regular;
    font-weight:400;
    color:rgba(102,102,102,1);
    line-height:40px;
    display: inline-block;
    margin:28px 28px 28px 28px;
}
</style>