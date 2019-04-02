<template>
  <div>
    <div class="introduction_title" v-html="this.html"></div>
    <!-- <div class="introduction_title">

      <div class="title_group">路演兵法-第63期：斯玛特教育集团路演</div>
      <div class="title_time">直播时间：2017-08-15 14:00-16:00 星期五</div>
      <div class="title_address">地址：北京市朝阳区东方广场E座3012</div>
      <div class="title_mechanism">主讲机构：黑砖石传媒机构</div>
    </div>
    <div class="introduction_line"></div>
        <div class="introduction_conent">
          <img src="./image/aa.png" alt="tubiao" class="conent_icon">
          <span class="conent_jianjie">活动简介</span>
          <div class="conent_con"> 黑钻石——城市商业服务新业态创领者与品牌运营商，立足于城市路演、企业服务、电影创作、文化创意、资本对接等领域进行业态的创建与运营。</div>
        </div>
        <div class="introduction_conent">
          <img src="./image/bb.png" alt="tubiao" class="conent_icon">
          <span class="conent_jianjie">讲师信息</span>
          <div class="conent_con">        伴随着互联网技术的成熟，黑钻石还特别开发出《路演大侠》APP,
            将线下活动与线上直播结合，现已吸纳包括清华、北大、及众多资本大咖前来在线分享。</div>
        </div>
        <div class="introduction_conent">
          <img src="./image/cc.png" alt="tubiao" class="conent_icon">
          <span class="conent_jianjie">合作机构</span>
          <div class="conent_con">◇ 北京市众创空间</div>
          <div class="conent_con"> ◇ 科技部火炬中心特聘导师单位</div>
        </div>
        <div class="introduction_conent">
          <img src="./image/dd.png" alt="tubiao" class="conent_icon">
          <span class="conent_jianjie">活动议程</span>
          <table  class="tale_tr">
            <tr v-for="v in arr">
              <td>{{v.friut}}</td>
              <td>{{v.name}}</td>
              <td>{{v.many}}</td>
          </tr>
          </table> 
        </div>
        <div class="introduction_conent">
          <img src="./image/dd.png" alt="tubiao" class="conent_icon">
          <span class="conent_jianjie">活动议程</span>
          <div class="conent_image">
            <img src="./image/kishi.jpg" alt="111">
            <img src="./image/kishi.jpg" alt="222">
            <img src="./image/canzhao.jpg" alt="333">
          </div>
        </div> -->
    </div>
</template>

<script>
  export default {
    data(){
      return{
        // arr:[{friut:"时间",name:"活动",many:"嘉宾"},{friut:"13:00-14:00",name:"签到",many:"-"},{friut:"14:00-14:30",name:"现代教育新思路",many:"张德江"}] ,
        html:'',
      }
    },
    mounted:function(){
      this.load()
    },
    computed: {
    url: {
          get:function () {
              return this.$store.state.detail.url_content
          },
          set:function(){
              this.url = this.$store.state.detail.url_content
          },
        }
    },
    watch:{
      url(){
        this.load()
      },
    },
    methods:{
      load () {
        let url = this.url
        console.log(url)
      if (url && url.length > 0) {
      // 加载中
      let param = {
        accept: 'text/html, text/plain'
      }
      this.$http.get(url, param).then((response) => {
        // 处理HTML显示
        console.log(response)
        this.html = response.body
      }).catch(() => {
        this.html = '加载失败'
      })
    }
    }
  }
  }
</script>

<style  lscoped>
  @import '../../../../static/font/font.css';
  .introduction_title {
    text-align: left;
    padding-left: 10px;
    padding-top: 20px;
  }
  .introduction_title .title_group{
    height:40px;
    font-size:32px;
    font-weight:600;
    color:rgba(74,74,74,1);
    line-height:40px;
  }
  .introduction_title .title_time,.title_address,.title_mechanism{
    height:40px;
    font-size:30px;
    font-weight:400;
    color:rgba(74,74,74,1);
    line-height:40px;
    margin-top: 15px;
  }
  .introduction_line{
    margin-top: 30px;
    height: 1px;
    border-top:3px dashed #eeeeee;
  }
  .introduction_conent{
    text-align: left;
    /* height:180px; */
    
    padding: 10px;
    margin-top: 10px;
  }
  .introduction_conent .conent_icon{
    width: 30px;
    height:30px;

    vertical-align:middle;
    margin-right: 10px;
  }
  .introduction_conent .conent_jianjie{
     vertical-align:middle;
    height:40px;
    font-size:30px;
    font-weight:400;
    /* font-family:PingFangSC-Semibold; */
    color:#666666FF;
    line-height:60px;
    margin-top: 15px;
  }
  .introduction_conent .conent_con{
    margin-top: 10px;
    /* height:40px; */
    font-size:30px;
    /* font-family:PingFangSC-Semibold; */
    font-weight:400;
    color:#666666FF;
    line-height:60px;
    margin-top: 15px;
  }
  .tale_tr{
    width: 100%;
    height:100%;
    margin-top: 20px;
    border: 1px solid gainsboro;
    border-collapse: collapse;
    
  }
  .tale_tr tr,td{
    text-align: center;
    line-height:60px;
    border: 1px solid gainsboro;
  }
  .conent_image img{
    width: 100%;
    height: 430px;
    margin-top: 30px;
  }
</style>