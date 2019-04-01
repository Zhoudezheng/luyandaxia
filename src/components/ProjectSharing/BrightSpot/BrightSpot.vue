<template>
  <div class="brightspot">
      <div>
        <div class="brightspot_title">
            <span>公司简介</span>
        </div>
        <div class="brightspot_content">
            <img src="./image/kishi.jpg" alt="案例" class="content_ico">
            <span class="content_span">利尔环境检测服务有限公司成立于2007年，是面向社会提供公正性技术服务的第三方检测、评价、咨询服务机构。是天津市人力资源和社会保障局认定的第一批…</span>
        </div>
      </div>
       <div>
        <div class="brightspot_title">
            <span>战略规划</span>
        </div>
        <div class="brightspot_content">
            <img src="./image/kishi.jpg" alt="案例" class="content_ico">
            <span class="content_span">公司拥有先进的检测设备和优秀的技术团队，固定独立的检测实验室，检测、评价专业管理规范，坚持以严谨</span>
        </div>
      </div>
  </div>
</template>

<script>
  export default {

}
</script>

<style scoped>
@import '../../../../static/font/font.css';
.brightspot_title{
    height: 68px;
    border-bottom: 1px solid #eeeeee;
}
.brightspot_title span{
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
.brightspot_content{
    height: 498px;
    text-align: left;
    border-bottom: 1px solid #eeeeee;
}
.brightspot_content .content_ico{
   width: 694px;
   height: 294px;
   margin-top: 29px;
   margin-left: 28px;
   margin-right: 28px;
}
.brightspot_content .content_span{
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