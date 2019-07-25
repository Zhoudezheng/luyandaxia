<template>
  <div id="aaa" ref="wo" class="aaaaa" >
    <div class="videoLess" id='flxedoff'>
          <div class="isFixed">
           <div id="id_test_video" style="width:100%;" class="bbb"></div>
          </div>
          <!-- <div class="mask_a"></div> -->
          <div class="livSharing_router nva_Fixed" id='nav_flexed' >
			<span class="liveSharing_roterone">
                <router-link :to="{path:'introduction',query:{id:this.detail.id}}">介绍</router-link>
            </span>
			<span class="liveSharing_rotertwo">
                <router-link to='Interaction'>互动</router-link>
            </span>
			<span class="liveSharing_roterthree">
                <router-link :to="{path:'recommend',query:{id:this.detail.id}}">推荐</router-link>
            </span>	
	</div>
    </div>
    
    <div class='mask_live'  v-show="isShowLive">
        <p class="masklive_p">试看结束，购买课程或者会员继续观看回看</p>
        <div class="masklive_div" v-show="is_vip">
            <!-- <img src="./video/shuaxin.png" alt="刷新"> -->
            <a href="#"  @click="downApp" >立即购买</a> 
            <!-- @click="showBuyMask"  >立即购买</a> -->
        </div>
        <input type="text" ref="masklive_input" value="开通VIP会员" @click="downApp" > 
        <!-- @click="vipmember"> -->
        <!-- <div class="masklive_buy" v-show="is_vip">
            <span>您也可以</span>
            <a href="#" @click="showBuyMask">购买单片观看</a>
        </div> -->
    </div>
    <div>
    
    <!-- <div class="liveSharing_row " :class=" nvaBarFixed === true ? 'nva_FixedRow' :''"></div> -->
    
    <div class='liveSharing_route' :class=" nvaBarFixed === true ? 'nva_Fixeded' :''">
            <span :class="{on: $route.path==='/liveSharing/introduction'}"></span>
            <span :class="{ontwo: $route.path==='/liveSharing/Interaction'}"></span>
            <span :class="{onthree: $route.path==='/liveSharing/recommend'}"></span>
    </div>
    <div class="liveSharing_lines"></div>
    </div>
    <keep-alive> <router-view></router-view> </keep-alive>
    <purchase  v-show="isBuyVideo" @getcacel="getCal"></purchase>
    <div class="footer_flxed" id='isfootflxed' v-show=" $route.path != '/liveSharing/Interaction'">
           <div class= 'footFixed'>
           <img src="./video/logo.png" alt="商标">
           <span class="footer_app"> 学路演 找大侠</span>
           <input type="button" class="app_download" value="打开APP" @click="downApp">
           </div>
    </div>
  </div>
</template>

<script>
  import { reqDingyue,reqShoucang,reqvipinfolist} from '../../api'
  import purchase from './PurchaseVideo/PurchaseVideo.vue'
  import { Toast } from 'mint-ui'
  import {mapState} from 'vuex'
  export default {
    data(){
        return {
            nvaBarFixed:false,
            footBarFixed:true,
            isShowLive:false,
            isBuyVideo:false,
            computeTime:0,
            currentTime:0,
            is_vip:true,
            dingyue:'',
            is_subscribe:false,
            is_collection:false,
            video:{},
            player:{},
            vip_price:"0.00",
            handler:function(e){
                e.preventDefault();
            },
        }
    },
    components:{
        "purchase":purchase,
    },
    watch:{
        currentTime:{
            deep: true,
            handler: function (val){
                //判断是否能看，能看则播放，不能看则判断试看时间
                //   console.log(this.computeTime,val)
                 let token =this.$store.state.Authorization;
                if(this.detail.can_watch === 0)
                {   
                    if(val >= this.computeTime){
                        this.player.pause()
                        this.player.fullscreen(false)
                        this.isShowLive = true
                    }
                    if(this.detail.is_vip === 0){
                        if(Math.round(this.currentTime) >= 120 && !token){
                           this.player.pause()
                           this.$router.push({
                               path:'/login'
                           })
                    } 
                    }
                }
            }
        }
    },
    computed: {
    ...mapState(['userviplist']),
    detail: {
        get:function () {
            
            return this.$store.state.detail;
        },
        set:function(){
            this.detail = this.$store.state.detail
        }
    }
    },
    mounted(){
        //获取直播id
         let id = this.$route.query.id
        //获取直播信息
         //this.$store.dispatch('getlivedatalist',id)
         this.$store.dispatch('getlivedatalist',id).then(()=>{
             //判断是否显示购买单个视频
            if(this.detail.is_vip === 2)
            {
                this.$refs.masklive_input.style.marginRight = "0"
                this.is_vip = false
            }
            //是否订阅
            this.is_subscribe = this.detail.is_subscribe===0?false:true
            if(!this.is_subscribe){
                this.dingyue = "+ 订阅"
            }else{
                this.dingyue = "已订阅"
            }
            //是否收藏
            this.is_collection = this.detail.is_collection===0?false:true
         })
          setTimeout(()=>{
            this.setVideo();
         },1000)
         this.box = this.$refs.wo;
//          this.box.addEventListener('scroll', () => {
//          var nav = document.querySelector('#nav_flexed')
//          var offsetTop = document.querySelector('#nav_flexed').offsetTop;
//          console.log('nav',nav)
//          console.log('dscroll',this.$refs.wo.scrollTop)
//          console.log('nscroll',offsetTop)
//           if (this.$refs.wo.scrollTop > 20) {
//                  this.nvaBarFixed = true
//           } 
//            if( this.$refs.wo.scrollTop < 20) {
//                  this.nvaBarFixed = false
//           }
//         },true)
         window.addEventListener('scroll', this.handleScrollfoot,true);
    },
    
    methods: {
          setVideo(){
               this.video = this.$store.state.videoUrl
               this.computeTime = this.$store.state.detail.preview_at
               this.player =new TcPlayer('id_test_video', {
                "mp4":this.video.mp4,
                "rtmp":this.video.rtmp,
                "m3u8":this.video.m3u8,
                "flv":this.video.flv, //请替换成实际可用的播放地址
                "autoplay" : true,      //iOS下safari浏览器，以及大部分移动端浏览器是不开放视频自动播放这个能力的
                "coverpic" : {"style": "stretch", "src":this.detail.cover},
                "live":this.$store.state.detail.status === 1?true:false,
                "flash":true,
                "h5_flv":true,
                "x5_player":true,
                "pausePosterEnabled":true,
                "controls":"default",
                "systemFullscreen":true,
                "x5_type":"h5",
                // "width" :  '370',//视频的显示宽度，请尽量使用视频分辨率宽度
                // "height" : '200',//视频的显示高度，请尽量使用视频分辨率高度
                'wording': {
                       2032: '网络错误',
                       2048: '请求m3u8文件失败，请检查是否跨域',
                       13: '直播已经结束，请稍后再来'
                },
                "listener":(msg)=>{
                    if(msg.type != 'error')
                    this.currentTime = msg.src.el.currentTime
                   
                }
            })
             var video = document.getElementsByTagName("video");
             console.log("video",video[0]);
             video[0].setAttribute("x5-playsinline","true");
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
            console.log("12");
          },
          async shoucang(){
              var result = await reqShoucang(this.$store.state.Authorization,"1",this.detail.id)

            if (result.code === 200) {
                Toast(result.msg);
                this.is_collection = !this.is_collection
            }
          },
          reWatch(){
              this.player.play();
              this.player.currentTime(0)
              this.isShowLive = false;
          },
          async buyviplist(){
            let token = this.$store.state.Authorization;
            let result= await reqvipinfolist(token);
            let order_sn=result.data.order_sn;
            this.buyvip(order_sn);
           },
            buyvip(order_sn){
            localStorage.setItem('type', '2');
            localStorage.setItem('order_sndata', order_sn);
            localStorage.setItem('priceed', this.userviplist.annual_fee);
            this.$router.push({
            path: '/VipMember',
            })
           },
          handleScrollfoot () {
              let sh = document.getElementById('aaa').scrollHeight
              let st = document.documentElement.scrollTop
              let ch = document.documentElement.clientHeight
	          if (Math.ceil(st + ch) > sh) {
		         this.footBarFixed = false
               }else if(ch==sh || st == 0){
                 this.footBarFixed = true
               }else{
                 this.footBarFixed = true
               }
          },
          showBuyMask(){
            let token =this.$store.state.Authorization;
            if(token){
              //this.closeTouch();
              this.isBuyVideo=true
            }else{
              this.$router.push({
                 path:'/login'
              }) 
            }
          
          },
          getCal(msg){//msg就是传过来的数据了  这只是个形参  名字可以随意
            //this.openTouch();
            this.isBuyVideo=msg;//然后将数据赋值给isBuyVideo
            
          },
          vipmember(){
            let token =this.$store.state.Authorization;
            if(token){
             this.$store.dispatch('getVipList').then(()=>{
                this.vip_price = this.userviplist.annual_fee
             })
             this.buyviplist()
            }else{
             this.$router.push({
                path:'/login'
              }) 
            }
          },
          closeTouch(){
            document.getElementsByTagName("body")[0].addEventListener('touchmove',
               this.handler,{passive:false});//阻止默认事件
          },
          openTouch(){
            document.getElementsByTagName("body")[0].removeEventListener('touchmove',
               this.handler,{passive:false});//打开默认事件
          },
          downApp() {
                let ua = navigator.userAgent.toLowerCase();
                //Android终端
                let isAndroid = ua.indexOf('Android') > -1 || ua.indexOf('Adr') > -1;  
        　   //Ios终端
                let isiOS = !!ua.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/); 
                if (/(iPhone|iPad|iPod|iOS)/i.test(navigator.userAgent)) {
                    //Ios
                    window.location.href="https://itunes.apple.com/cn/app/%E8%B7%AF%E6%BC%94%E5%A4%A7%E4%BE%A0-%E5%95%86%E4%B8%9A%E8%B7%AF%E6%BC%94%E9%A6%96%E9%80%89%E5%B9%B3%E5%8F%B0/id1313105520?mt=8";
                } else if (/(Android)/i.test(navigator.userAgent)) {
                    //Android终端
                    window.location ='https://android.myapp.com/myapp/detail.htm?apkName=com.BlackDiamond2010.hzs&ADTAG=mobile'
                }
        }, 
    },
    destroyed () {
          window.removeEventListener('scroll', this.handleScrollfoot)
    }
}
</script>

<style scoped>
  @import '../../../static/font/font.css';
.aaaaa{
      height: 100%;
      overflow: scroll;
}
.videoLess{
    /* position: fixed;
    width:750px;
    top: 0px; */
    height: 453px;
}
.videoLess .isFixed{
    overflow: hidden;
    position:fixed;
    top:0px;
    z-index:20;
    height: 453px;
    overflow-y: hidden;
    width: 100%;
    -webkit-overflow-scrolling: touch;

  }
  .bbb{
      height: 372px;
  }
.mask_a{
    height: 400px;
    width: 100%;
    background-color: #ffffff;
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    z-index: 10
}
.vcp-player .touchable .vcp-playing{
    width: 370px;
    /* height: 375px; */
}

.mask_live{
      position: fixed;
      width: 100%;
      height: 375px;
      z-index: 31;
      left: 0;
      right: 0;
      top: 0;
      bottom: 0;
      background-color: black;
      opacity: 0.8;
}
.mask_live .masklive_p{
     width:456px;
    height:33px;
    font-size:24px;
    font-family:PingFangSC-Regular;
    font-weight:400;
    color:rgba(255,255,255,1);
    line-height:33px;
    margin-top: 114px;
    margin-left: 147px;
    white-space: nowrap;
}
.mask_live .masklive_div{
    float: left;
    padding-top: 17px;
    padding-left: 37px;
    margin-top: 32px;
    margin-left: 120px;
    vertical-align: middle;
    width:232px;
    height:67px;
    background:rgba(5,5,5,1);
    border-radius:42px;
}
.mask_live .masklive_div img{
    width: 35px;
    height: 34px;
    vertical-align: middle;
}
.mask_live .masklive_div a{
    margin-left: 3px;
    width:112px;
    height:40px;
    font-size:28px;
    font-family:PingFangSC-Medium;
    font-weight:500;
    color:rgba(255,255,255,1);
    line-height:35px;
    vertical-align: middle;
    
}
.mask_live input{
    width:232px;
    margin-top: 30px;
    height:67px;
    background:rgba(206,64,52,1);
    border-radius:42px;
    font-size:28px;
    font-family:PingFangSC-Medium;
    font-weight:500;
    color:rgba(255,255,255,1);
    line-height:35px;
    text-align: center;
    margin-right: 120px;
} 
.mask_live .masklive_buy{
    margin-top: 30px;
    width:269px;
    height:37px;
    font-size:26px;
    font-family:PingFangSC-Regular;
    font-weight:400;
    color:rgba(255,255,255,1);
    line-height:37px;
    margin-left: 241px;
}
.mask_live .masklive_buy a{
    color:rgba(255,255,255,1);
    text-decoration:underline;
}
.liveSharing_nva{
    /* width:750px; */

    height: 130px;
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
    background-image: url('./video/shoucang.png');
    background-size: 32px 31px;
    outline: none
}
.liveSharing_nva .liveSharing_nvastart_down{
    float:right;
    /* display: inline-block; */
    width: 32px;
    height: 31px;
    margin: 32px 28px 36px 0;
    background-image: url('./video/shoucang_down.png');
    background-size: 32px 31px;
    outline: none
}
.liveSharing_row{
    height: 16px;
    background-color:#eeeeee;
}
.nva_FixedRow{
    position:fixed;
    top:365px;
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
.nva_Fixed{
    position:fixed;
    top:372px;
    z-index:20;
    overflow-y: scroll;
    width: 100%;
    -webkit-overflow-scrolling: touch;
    overflow: hidden;
    background-color: #ffffff
}

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
    background-image: url('./video/juxing.png');
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
.livSharing_router{
    height: 78px;
}
.livSharing_router .liveSharing_roterone,.liveSharing_rotertwo,.liveSharing_roterthree {
    float: left;
    margin: 19px 0 19px 132px;
    font-size:28px;
    font-family:PingFangSC-Regular;
    font-weight:600;
    line-height:40px;
}

.liveSharing_route{
    height: 10px;
}
.liveSharing_route .on,.ontwo,.onthree{
    float: left;
    width: 36px;
    height: 8px;
    margin-left: -50px;
    background-color: rgba(243,117,5,1);
    border-radius: 40px;
}

.nva_Fixeded{
    position:fixed;
    top:445px;
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
    margin-left:150px;
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
    margin-left: 523px;
}
.livSharing_router .liveSharing_line{
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
.liveSharing_lines{
    height: 1px;
    border-top:1px solid #eeeeee;
}
.footFixed {
    width: 100%;
    position: fixed;
    z-index: 222;
    background-color:#141414;
    left: 0;
    right: 0;
    bottom: 0px;
    height: 90px;
}
.footer_flxed{
    bottom: 0;
    width: 100%;
    height: 90px;
}
.footer_flxed img{
    float: left;
    width: 54px !important;
    height:54px;
    margin-left: 30px;
    margin-top:15px;
}
.footer_flxed .footer_app{
    float: left;
    margin: 25px 20px 0 20px;
    font-family: PingFangSC-Thin;
    font-size: 40px;
    color: #FFFFFF;
}
 input:focus { 
    outline: none;
  }
.footer_flxed .app_download{
    float: right;
    color: #eeeeee;
    margin-top: 18px;
    margin-left: 30px;
    margin-right: 10px;
    width: 150px;
    height: 50px;
    border-radius: 45px;
     -webkit-appearance:none  !important;
    appearance:none !important;
    -webkit-tap-highlight-color:rgba(0, 0, 0, 0) !important; /*去除点击高亮的颜色*/
    background-color: rgba(243,117,5,1)
}
</style>
<style>
.vcp-player.touchable .vcp-controls-panel .vcp-timeline .vcp-slider .vcp-slider-thumb{
    left: 0px;
    margin-left: 0px;
}
.vcp-player.touchable .vcp-bigplay{
    height: 100%;
}
</style>

