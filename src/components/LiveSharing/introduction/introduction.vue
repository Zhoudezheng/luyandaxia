<template>
  <div class="introduction">
    <div class="liveSharing_nva">
          <div class="liveSharing_nvatitle">{{this.detail.title}}</div>
          <span class="liveSharing_nvapeople">观看人数：{{this.detail.pv}}人</span>
          <span  :class="is_collection?'liveSharing_nvastart':'liveSharing_nvastart_down'" @click="shoucang"></span>
    </div>
    <div class="liveSharing_row"></div>
    <div class="liveSharing_user">
          <img :src="this.detail.publisher_avatar" class="liveuser_toen">
          <span class="liveuser_span">{{this.detail.publisher_name}}</span>
          <span class="liveuser_fensi">{{this.detail.publisher_fans}}个粉丝</span>
          <div class="liveuser_sub">
               <input class="liveuser_button" type="button" v-model=this.dingyue @click.prevent="liveuserToen">
          </div>
    </div>
    <div class="liveSharing_row"></div>
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
import { reqDingyue,reqShoucang} from '../../../api'
import { Toast } from 'mint-ui'
  export default {
    data(){
      return{
        html:'',
        dingyue:'',
        is_subscribe:false,
        is_collection:false,
        handler:function(e){e.preventDefault();},
      }
    },
    mounted:function(){
      this.load()
      
    },
    computed: {
        detail: {
        get:function () {
            return this.$store.state.detail;
        },
        set:function(){
            this.detail = this.$store.state.detail
        }
    }
        
    },
   watch:{
      detail(){
        this.load()
      },
    },
    methods:{
      load () {
        this.is_subscribe = this.detail.is_subscribe===0?false:true
            if(!this.is_subscribe){
                this.dingyue = "+ 订阅"
            }else{
                this.dingyue = "已订阅"
            }
      this.is_collection = this.detail.is_collection===0?false:true
        let url = this.detail.url_content
          var that = this
          setTimeout(function (){
            document.title= that.detail.title
          },"3000");
        localStorage.setItem('livingtitle',this.detail.title)
      if (url && url.length > 0) {
      // 加载中
      let param = {
        accept: 'text/html, text/plain'
      }
      this.$http.get(url, param).then((response) => {
        // 处理HTML显示
        //console.log(response)
        this.html = response.body
      }).catch(() => {
        this.html = '加载失败'
      })
    }
    },
    async shoucang(){
      var result = await reqShoucang(this.$store.state.Authorization,"1",this.detail.id)

      if (result.code === 200) {
          Toast(result.msg);
          this.is_collection = !this.is_collection
      }
    },
    async liveuserToen(){
        
      var result = await reqDingyue(this.$store.state.Authorization,this.detail.publisher_id)

      if (result.code === 200) {
          Toast(result.msg);
          this.is_subscribe = !this.is_subscribe
          if(!this.is_subscribe){
              this.dingyue = "+ 订阅"
          }else{
              this.dingyue = "已订阅"
          }
      }
    },
  }
  }
</script>

<style  scoped>
  @import '../../../../static/font/font.css';
  .introduction{
    position: relative;
  }
  .introduction_title {
    text-align: left;
    line-height: 50px;
    padding-left: 20px;
    padding-top: 20px;
    padding-right: 20px;
    font-size: initial;

  }
  .introduction_title >>> p{
    line-height: 50px;
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
  .liveSharing_nva{
    /* width:750px; */
    height: 130px;
    top: 78px;
    /* height:153px; */
    background:rgba(255,255,255,1);
   }
.liveSharing_nvatitle{
    width:618px;
    height:56px;
    margin: 20px 104px 0 28px;
    font-size:40px;
    font-family:PingFangSC-Semibold;
    font-weight:600;
    color:rgba(74,74,74,1);
    line-height:56px;
    text-align: left;
    white-space: nowrap;
    text-overflow: ellipsis;
    overflow: hidden;
}   
.liveSharing_nva .liveSharing_nvapeople{
    /* display: inline-block; */
    float: left;
    margin: 20px 0px 20px 30px;
    height:33px;
    font-size:24px;
    font-family:PingFangSC-Regular;
    font-weight:400;
    color:rgba(155,155,155,1);
    line-height:33px;
}
.liveSharing_nva .liveSharing_nvastart{
    float:right;
    /* display: inline-block; */
    width: 32px;
    height: 31px;
    margin: 32px 28px 36px 0;
    background-image: url('./../video/shoucang.png');
    background-size: 32px 31px;
    outline: none
}
.liveSharing_nva .liveSharing_nvastart_down{
    float:right;
    /* display: inline-block; */
    width: 32px;
    height: 31px;
    margin: 32px 28px 36px 0;
    background-image: url('./../video/shoucang_down.png');
    background-size: 32px 31px;
    outline: none
}
.liveSharing_row{
    height: 16px;
    background-color:#eeeeee;
}
.nva_FixedRow{
    position:fixed;
    top:370px;
    z-index:20;
    overflow-y: scroll;
    width: 100%;
    -webkit-overflow-scrolling: touch;
    overflow: auto;
    height: 16px;
    background-color:#eeeeee;
}
.liveSharing_user{
    height: 140px;
}
/* .nva_Fixed{
    position:fixed;
    top:385px;
    z-index:20;
    overflow-y: scroll;
    width: 100%;
    -webkit-overflow-scrolling: touch;
    overflow: auto;
    background-color: #ffffff
} */

.liveSharing_user .liveuser_toen{
    float: left;
    width:100px !important;
    height: 100px;
    border-radius: 50%; 
    margin: 20px 0 28px 28px;
}
.liveSharing_user .liveuser_span{
    margin: 20px 0 15px 24px;
    float: left;
    /* width:128px; */
    height:45px;
    font-size:32px;
    font-family:PingFangSC-Medium;
    font-weight:600;
    color:rgba(74,74,74,1);
    line-height:45px;
}
.liveSharing_user .liveuser_fensi{
    float: left;
    margin-top: 80px;
    margin-left: -135px;
    height: 40px;     
    font-size:28px;
    font-family:PingFangSC-Regular;
    font-weight:500;
    color:rgba(187,187,187,1);
    line-height:40px;
}
.liveSharing_user .liveuser_button{
    background-image: url('./../video/juxing.png');
    background-size: 153px 62px;
    width: 153px;
    height: 62px;
    outline: none;
    border-radius: 45px;
    font-size:28px;
    font-family:PingFangSC-Regular;
    font-weight:400;
    color:rgba(255,255,255,1);
    line-height:40px;
}
.liveSharing_user .liveuser_sub{
    float:right;
    margin-top: 36px;
    margin-right: -36px;
    /*margin: 36px 0px 0px -36px; */
}
</style>