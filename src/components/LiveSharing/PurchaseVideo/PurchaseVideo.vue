<template>
    <div class="purchase"> 
      <div class="purchase_cancel" @click="cancelVideo"></div>
      <div class="purchase_mac"></div>
      <div class="purchase_details">
         <div class="purchase_list">
            <img src="./image/kishi.jpg" alt="1111">
            <a href="#" class="list_a1">{{this.detail.title}}</a>
            <a href="#" class="list_a2">{{this.detail.address}}</a>
         </div>
         <div class="purchase_lines"></div>
         <p class="purchase_content">{{this.detail.info}}</p>
         <div class="purchase_linesed"></div>
         <button type="button" :class="activeClass == 1 ? 'purchase_button':'purchase_buttoned'" @click="showactive">
           <span class="button_span">VIP会员</span>
           <span class="button_Vip">（所有全免费）</span>
           <span class="button_money">¥{{this.vip_price}}</span>
           <img src="./image/Group.png" alt="已勾选" v-show="activeClass == 1">
         </button>
          <button type="button" :class="activeClass == 2 ? 'purchase_button':'purchase_buttoned'" @click="showactives" >
           <span class="button_span">购买视频</span>
           <span class="button_Vip">（本视频{{this.detail.viewing_time}}小时免费看）</span>
           <span class="button_money">¥{{this.video_price}}</span>
           <img src="./image/Group.png" alt="已勾选" v-show='activeClass == 2'> 
         </button>
         <div class="purchase_quanyi">
           <img src="./image/quanyi.png" alt="权益">
           <span>VIP特权</span>
         </div>
         <div class="feel">
         <p class="quanyi_content">路演大侠全部直播免费看</p>
         </div>
      </div>
      <div class="purchase_lin"></div>
      <div class="purchase_buy">
        <div class="buy_content">
         <span class="content_total">总计</span>
         <span class="content_mony">¥{{this.tatal_cost}}</span>
        </div>
         <input type="button" value="购买视频" class="buy_link" @click="singlevideo">
      </div>
    </div>
</template>

<script>
import {mapState} from 'vuex'
import {reqvipinfolist,reqvideoOrder} from '../../../api'
  export default {
    data(){
      return{
        activeClass:1,
        tatal_cost:"0.00",
        vip_price:"0.00",
        video_price:"0.00",
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
      this.$store.dispatch('getVipList').then(()=>{
          this.vip_price = this.userviplist.annual_fee
          if(this.activeClass == 1){
            this.tatal_cost = this.vip_price
          }else{
            this.tatal_cost = this.video_price
          }
          setTimeout(()=>{
              this.video_price = this.detail.individual_cost
          },1000)
      })
      
      
    },
    methods:{
      cancelVideo(){
        this.$emit('getcacel',false)
      },
      singlevideo(){
        //console.log("cost",this.tatal_cost)
        if(this.activeClass ==1){
            this.buyviplist()
        }else{
            this.buyvideolist()
        }
      },
      async buyvideolist(){
          let token = this.$store.state.Authorization;
          let result= await reqvideoOrder(token,this.detail.id);
          console.log(result)
          let order_sn=result.data.order_sn;
          this.buyvideo(order_sn);
      },
      buyvideo(order_sn){
        localStorage.setItem('type', '3');
        localStorage.setItem('order_sndata', order_sn);
        this.$router.push({
           path: '/singlevideo',
         })
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
        localStorage.setItem('priceed', this.tatal_cost);
        this.$router.push({
           path: '/VipMember',
         })
      },
      showactive(){
        this.activeClass=1
        this.tatal_cost = this.vip_price
      },
       showactives(){
        this.activeClass=2
        this.tatal_cost = this.video_price
      }
    }
  }
</script>

<style  scoped>
  @import '../../../../static/font/font.css';
 .purchase{
   position: fixed;
   bottom: 0;
   z-index: 999;
   left: 0;
   right: 0;
   height: 100%;
 }
 .purchase_cancel{

   width:750px;
   height:390px;
   background:rgba(0,0,0,1);
   opacity:0.6;
 }
 .purchase_mac{
   height:78px;
   background:#616060;
 }
 .purchase .purchase_details{
   position: fixed;
   bottom: 102px;
   margin-top: -78px;
   width:750px;
   height:837px;
   background-color:#ffffff;
   border-radius:36px 36px 0px 0px;
 }
 .purchase .purchase_buy{
   height:103px;
   background:rgba(255,255,255,1);
 }
 .purchase_list{
    height: 183px;
    margin-left: 28px;
 }
 .purchase_list img{
   float: left;
   width: 184px;
   height:184px;
   margin: 28px 16px 28px 0px ;
 }
 .purchase_list a{
   text-decoration:none;
 }
 .purchase_list .list_a1{
   white-space: nowrap;
   overflow: hidden;
   text-overflow: ellipsis;
   float: left;
   margin: 28px 0 14px 0;
    width:445px;
    height:50px;
    font-size:36px;
    font-family:PingFangSC-Medium;
    font-weight:500;
    color:rgba(74,74,74,1);
    line-height:50px;
 }
 .purchase_list .list_a2{
   float: left;
   margin: 20px  0 28px 0px ;
    width:476px;
    height:100px;
    font-size:28px;
    font-family:PingFangSC-Regular;
    font-weight:400;
    color:rgba(102,102,102,1);
    line-height:40px;
    text-align:left
 }
 .purchase .purchase_lines{
    margin-top: 60px;
    height:2px;
    border-top:2px solid rgba(242,245,248,1);
 }
 .purchase .purchase_linesed{
    margin-top: 15px;
    height:2px;
    border-top:2px solid rgba(242,245,248,1);
 }
 .purchase .purchase_content{
    font-size:28px;
    font-family:PingFangSC-Regular;
    font-weight:400;
    color:rgba(102,102,102,1);
    line-height:40px;
    text-align: left;
    padding: 28px 28px 0px 28px;
    overflow: hidden;
    white-space: pre-wrap;
    -webkit-line-clamp: 3;
    -webkit-box-orient: vertical;
    text-overflow: ellipsis;
    display: -webkit-box;
    height: 106px;
 }
 .purchase_details .purchase_button{
    width:694px;
    height:98px;
    background:rgba(255,247,233,1);
    border-radius:11px;
    border:2px solid rgba(243,117,5,1);
    margin-top: 30px;
    outline: none;
   -webkit-appearance: none;
   -webkit-tap-highlight-color: rgba(0, 0, 0, 0);
    text-align: left;
 }
 .purchase_details .purchase_buttoned{
    width:694px;
    height:98px;
    background:rgba(249,250,251,1);
    border-radius:11px;
    border:2px solid rgb(213, 215, 218);
    margin-top: 35px;
    outline: none;
   -webkit-appearance: none;
   -webkit-tap-highlight-color: rgba(0, 0, 0, 0);
    text-align: left;
 }
 .purchase_button .button_span{
    margin-left: 20px;
    height:45px;
    font-size:32px;
    font-family:PingFangSC-Medium;
    font-weight:500;
    color:rgba(243,117,5,1);
    line-height:45px;
    float: left;
    margin-top: 23px;
 }
 .purchase_button .button_Vip{
    height:45px;
    font-size:32px;
    font-family:PingFangSC-Medium;
    font-weight:500;
    color:rgba(243,117,5,1);
    line-height:45px;
    float: left;
    /* margin-left: 29px; */
    margin-top: 23px;
 }
 .purchase_button .button_money{
    height:45px;
    font-size:32px;
    font-family:PingFangSC-Semibold;
    font-weight:600;
    float: right;
    color:rgba(255,126,0,1);
    line-height:28px;
    margin-right: 28px;
    margin-top: 33px;
 }
 .purchase_button img{
    width: 40px;
    height: 41px;
    float:right;
    margin-right: -155px;
    margin-top: 50px;
 }

.purchase_buttoned .button_span{
    margin-left: 20px;
    /* width:487px; */
    height:45px;
    font-size:32px;
    font-family:PingFangSC-Medium;
    font-weight:500;
    color:rgba(74,74,74,1);
    line-height:45px;
    float: left;
    margin-top: 23px;
 }
 .purchase_buttoned .button_Vip{
   /* width:487px; */
    height:45px;
    font-size:32px;
    font-family:PingFangSC-Medium;
    font-weight:500;
    color:#EE4E4EFF;
    line-height:45px;
    float: left;
    /* margin-left: 29px; */
    margin-top: 23px;
 }
.purchase_buttoned .button_money{
    height:45px;
    font-size:32px;
    font-family:PingFangSC-Semibold;
    font-weight:600;
    float: right;
    color:rgba(255,126,0,1);
    line-height:28px;
    margin-right: 28px;
    margin-top: 33px;
}
.purchase_buttoned img{
    width: 40px;
    height: 41px;
    float:right;
    margin-right: -155px;
    margin-top: 52px;
}
.feel{
  height: 40px;
}
.purchase_quanyi{
  vertical-align:middle;
  height: 68px;
}
.purchase_quanyi img{
  width: 28px;
  height: 25px;
  float: left;
  margin-left: 29px;
  margin-top: 28px;
  vertical-align:middle
}
.purchase_quanyi span{
  float: left;
  height:40px;
  font-size:28px;
  font-family:PingFangSC-Medium;
  font-weight:500;
  color:rgba(74,74,74,1);
  line-height:40px;
  margin-top: 24px;
  vertical-align:middle;
  margin-left: 5px;
}
.purchase_lin{
  height: 2px;
  border-top:1px solid rgba(102,102,102,1);
}
.quanyi_content{
  text-align: left;
  height:68px;
  font-size:28px;
  font-family:PingFangSC-Regular;
  font-weight:400;
  color:rgba(102,102,102,1);
  line-height:40px;
  margin-top: 20px;
  float: left;
  margin-left: 20px;
}
.purchase_buy{
  height: 103px;
  position: fixed;
  left: 0;
  right: 0;
  bottom: 0;
}
.purchase_buy .buy_content{
  float: left;
  width:500px;
  height:100px;
  background:rgba(255,255,255,1);
  text-align: left
}
.purchase_buy .buy_content .content_total{
  float: left;
  width:56px;
  height:40px;
  font-size:28px;
  font-family:PingFangSC-Regular;
  font-weight:400;
  color:rgba(102,102,102,1);
  line-height:40px;
  margin-top: 31px;
  margin-left: 28px;
}
.purchase_buy .buy_content .content_mony{
  float: left;
  width:111px;
  height:45px;
  font-size:20px;
  font-family:PingFangSC-Semibold;
  font-weight:600;
  color:rgba(255,126,0,1);
  line-height:28px;
  margin-top: 36px;
  margin-left: 30px;
}
.purchase_buy .buy_link{
  width:250px;
  height:98px;
  background:linear-gradient(90deg,rgba(255,161,44,1) 0%,rgba(255,121,19,1) 100%);
  font-size:36px;
  font-family:PingFangSC-Medium;
  font-weight:500;
  color:rgba(255,255,255,1);
  line-height:50px;
}
input::-webkit-input-placeholder{
   width:191px;
   height:40px;
   font-size:28px;
   font-family:PingFangSC-Regular;
   font-weight:400;
   color:rgba(187,187,187,1);
   line-height:40px;
  }
</style>