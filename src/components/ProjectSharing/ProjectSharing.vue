<template>
  <div class="project" ref="wo" >
    <div class="project_div">
      <img src="./image/huitui.png" alt="协议按钮" class="project_check">
      <span  class="project_mode">凯利尔</span>
      <img src="./image/Collection.png" alt="收藏" class="div_collection">
      <img src="./image/sharing.png" alt="分享" class="div_sharing">
    </div>
    <div class="project_video">
          <div class="isFixed">
            <div id="id_project_video" style="width:100%; height:aotu"></div>
          </div>
    </div>
    <div class="project_title">
        <span class="prj_span">天亮到天黑做一场真正的路演wwwwww</span>
        <img src="./image/look.png" alt="查看" class="prj_ico">
        <span class="prj_peo">5727人</span>
    </div>
    <div class="project_con">
        <span class="con_span">
            凯利尔环境检测服务有限公司成立于2007年，是面向社会提供公正性技术服务的第三方检测、评价、咨询服务机构。是天津市人力资源和社会保障局认定的第一批…
        </span>
    </div>
    <div class="projectsharing_row" :class=" nvaBarFixed === true ? 'nva_FixedRow' :''"></div>
    <div class="projectsharing_router" id='nav_flexeded' :class=" nvaBarFixed === true ? 'nva_Fixed' :''" >
			<span class="projectsharing_roterone">
                <router-link to='background' exact>背景</router-link>
            </span>
			<span class="projectsharing_rotertwo">
                <router-link to='brightspot' exact>亮点</router-link>
            </span>
			<span class="projectsharing_roterthree">
                <router-link to='creativeteam' exact>创作团队</router-link>
            </span>	
	</div>
    <div class='projectsharing_route' :class=" nvaBarFixed === true ? 'nva_Fixeded' :''">
            <span :class="{on: $route.path==='/projectsharing/background'}"></span>
            <span :class="{ontwo: $route.path==='/projectsharing/brightspot'}"></span>
            <span :class="{onthree: $route.path==='/projectsharing/creativeteam'}"></span>
    </div>
    <div class="projectsharing_lines"></div>
    <keep-alive> <router-view></router-view> </keep-alive>
    <div class="footfiexd">
        <img src="./image/buy.png" alt="购买" class="fiexd">
        <span class="fiexd_span">立即支付</span>
    </div>
  </div>
</template>

<script>
export default {
    data(){
        return {
             nvaBarFixed:false,
        }
    },
    mounted(){
        this.setVideo();
        this.box = this.$refs.wo;
        this.box.addEventListener('scroll', () => {
        var offsetTop = document.querySelector('#nav_flexeded').offsetTop;
        console.log("offsettop",offsetTop);
        console.log('SCROLLTOP',this.$refs.wo.scrollTop)
        if (this.$refs.wo.scrollTop+230 > offsetTop) {
                this.nvaBarFixed = true
        } 
        if(  this.$refs.wo.scrollTop < offsetTop-150) {
                this.nvaBarFixed = false
        }
        },true)
    },
    methods:{
          setVideo(){
                const player = new TcPlayer('id_project_video', {
                "mp4":'',
                "rtmp":'rtmp://live.hzs2010.com/live/3706_3b1e0ff2786311e892905cb9018cf0d4',
                "m3u8":"http://2157.liveplay.myqcloud.com/2157_358535a.m3u8",
                "flv":"http://live.hzs2010.com/live/3706_3b1e0ff2786311e892905cb9018cf0d4.flv", //请替换成实际可用的播放地址
                "autoplay" : true,      //iOS下safari浏览器，以及大部分移动端浏览器是不开放视频自动播放这个能力的
                "coverpic" : {"src":"./video/Bitmap.png"},
                "live":true,
                "flash":true,
                "h5_flv":true,
                "x5_player":true,
                "controls":"system",
                "systemFullscreen":true,
                // "width" :  '480',//视频的显示宽度，请尽量使用视频分辨率宽度
                "height" : '200px',//视频的显示高度，请尽量使用视频分辨率高度
                'wording': {
                       2032: '网络错误',
                       2048: '请求m3u8文件失败，请检查是否跨域',
                       13: '直播已经结束，请稍后再来'
                }
            })
          },
    }
}
</script>

<style scoped>
@import '../../../static/font/font.css';
.project{
      height: 100%;
      overflow: scroll;
}
.project_div{
    position: fixed;
    left: 0;
    right: 0;
    top: 0;
    height: 91px;
    z-index:20;
    background-color:rgba(243, 117, 5, 1);
}
.project_div .project_check{
    background-size: 16px 30px;
    float: left;
    margin-top: 32px;
    width:16px;
    height:30px;
    margin-left:30px;
}
.project_div .project_mode{
    float: left;
    width:108px;
    height:50px;
    font-size:36px;
    font-family:PingFangSC-Medium;
    font-weight:500;
    color:rgba(255,255,255,1);
    line-height:44px;
    margin-top:23px;
    margin-left: 262px;
}
.project_div .div_collection{
   float: left;
   margin-top: 30px;
   margin-left: 199px;
   width: 36px;
   height: 35px;
}
.project_div .div_sharing{
    float: right;
    margin-top: 30px;
    margin-right: 38px;
   width: 36px;
   height: 35px;
}
.project_video{
    height: 392px;
    margin-top: 91px;
}
.project_video .isFixed{
    position:fixed;
    top:90px;
    z-index:20;
    left: 0;
    right: 0;
    height: 375px;
    overflow-y: scroll;
    width: 100%;
    -webkit-overflow-scrolling: touch;
}
.project_title{
    height: 100px;
}
.project_title .prj_span{
    float: left;
    margin-top: 44px;
    margin-left: 28px;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
    width:520px;
    height:56px;
    font-size:40px;
    font-family:PingFangSC-Semibold;
    font-weight:600;
    color:rgba(74,74,74,1);
    line-height:56px;
}
.project_title .prj_ico{
    float: left;
    margin-top: 66px;
    margin-left: 40px;
    width: 24px;
    height: 15px;
}
.project_title .prj_peo{
    float: right;
    margin-top: 56px;
    margin-right: 20px;
    height:33px;
    font-size:24px;
    font-family:PingFangSC-Regular;
    font-weight:400;
    color:rgba(155,155,155,1);
    line-height:33px;
}
.project_con{
    height: 177px;
    text-align: left
}
.project_con .con_span{
    float: left;
    margin-top: 29px;
    margin-left: 28px;
    width:694px;
    height:120px;
    font-size:28px;
    font-family:PingFangSC-Regular;
    font-weight:400;
    color:rgba(102,102,102,1);
    line-height:40px;
}
.projectsharing_row{
    height: 16px;
    background-color:#eeeeee;
}
.nva_FixedRow{
    position:fixed;
    top:455px;
    z-index:20;
    overflow-y: scroll;
    width: 100%;
    -webkit-overflow-scrolling: touch;
    overflow: auto;
    height: 10px;
    background-color:#eeeeee;
}
.projectsharing_router{
    height: 78px;
}
.projectsharing_router .projectsharing_roterone,.projectsharing_rotertwo,.projectsharing_roterthree {
    float: left;
    margin: 19px 0 19px 132px;
    font-size:28px;
    font-family:PingFangSC-Regular;
    font-weight:600;
    line-height:40px;
}
.projectsharing_route{
    height: 10px;
}
.projectsharing_route .on,.ontwo{
    float: left;
    width: 36px;
    height: 8px;
    margin-left: -50px;
    background-color: rgba(243,117,5,1);
    border-radius: 40px;
}
.projectsharing_route .onthree{
    float: left;
    width: 36px;
    height: 8px;
    margin-left: -82px;
    background-color: rgba(243,117,5,1);
    border-radius: 40px;
}
.nva_Fixed{
    position:fixed;
    top:463px;
    z-index:20;
    overflow-y: scroll;
    width: 100%;
    -webkit-overflow-scrolling: touch;
    overflow: auto;
    background-color: #ffffff;
    transform: translateZ(0);
    -webkit-transform: translateZ(0);
}
.nva_Fixeded{
    position:fixed;
    top:535px;
    z-index:20;
    overflow-y: scroll;
    width: 100%;
    -webkit-overflow-scrolling: touch;
    overflow: auto;
    height: 8px;
    background-color: #ffffff
}
.nva_Fixeded .on{
    width: 36px;
    height: 8px;
    background-color: rgba(243,117,5,1);
    border-radius: 40px;
    margin-left:145px;
}
.nva_Fixeded .ontwo{
    width: 36px;
    height: 8px;
    background-color: rgba(243,117,5,1);
    border-radius: 40px;
    margin-left:335px;
}
.nva_Fixeded .onthree{
    width: 36px;
    height: 8px;
    background-color: rgba(243,117,5,1);
    border-radius: 40px;
    margin-left: 550px;
}
.projectsharing_router .projectsharing_line{
   width: 20px;
   color: red
}
.router-link-active{
     width:64px;
     height:45px;
     font-size:32px;
     font-family:PingFangSC-Medium;
     font-weight:500;
     color:rgba(243,117,5,1);
     line-height:45px;
}
.projectsharing_lines{
    height: 6px;
    background-color: #eeeeee;
}
.footfiexd{
    position: fixed;
    left: 0;
    right: 0;
    bottom: 0;
    z-index: 20;
    height: 160px;
}
.footfiexd .fiexd{
    height: 160px;
}
.footfiexd .fiexd_span{
    z-index: 21px;
    position: absolute;
    width:144px;
    height:44px;
    font-size:36px;
    font-family:PingFangSC-Medium;
    font-weight:500;
    color:rgba(255,255,255,1);
    line-height:44px;
    top: 65px;
    left: 304px;

}
</style>