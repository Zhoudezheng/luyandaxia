<template>
    <div class="purchase"> 
      <div class="purchase_cancel" @click="cancelVideo"></div>
      <div class="purchase_mac"></div>
      <div class="order_content">
            <div class="content_a">发票</div>
            <div class="content_b">发票类型</div>
            <div class="content_c">
                <div class="c_div" >
                   <span :class=" activeClass == 0 ? 'c_personal': 'c_personals' " @click="ifshow">不开发票</span>
                   <img src="./image/Group.png" alt="发票" class="c_ico" v-show="activeClass == 0">
                </div>
                <div class="c_span" >
                   <span :class="activeClass == 1 ? 'c_company': 'c_companys' " @click="ifshows">普通纸质发票</span>
                   <img src="./image/Group.png" alt="发票" v-show="activeClass == 1" class="c_ico">
                </div>
            </div>
            <div v-show="activeClass == 0"></div>
            <div v-show="activeClass == 1" class="c_type">
                <div class="type_head">发票抬头</div>
                <div class="type_personal" >
                   <span :class=" typeactive == 1 ? 'personal_a': 'personal_b' " @click="iftype">个人</span>
                   <img src="./image/Group.png" alt="发票" class="c_ico" v-show="typeactive == 1">
                </div>
                <div class="type_company" >
                   <span :class=" typeactive == 2 ? 'company_a': 'company_b' " @click="iftypes">单位</span>
                   <img src="./image/Group.png" alt="发票" v-show="typeactive == 2" class="c_ico">
                </div>
                <div  v-show="typeactive == 2" class="company_name">
                    <input type="text" placeholder="单位名称" class="name_a" v-model="compay_t">
                    <input type="text" placeholder="识别号" class="name_b" v-model="compay_h">
                </div>
                <div class="company_nva">发票内容</div>
                <div class="company_content" >
                    <span class="content_a" @click="iftype">商品明细</span>
                    <img src="./image/Group.png" alt="发票" class="c_ico">
                </div>
            </div>
           
      </div>
      <div class="footfiexd" >
        <img src="./image/buy.png" alt="发票确定" class="fiexd">
        <span class="fiexd_span" @click="showoff">确定</span>
      </div>
    </div>
</template>

<script>
  import { Toast } from 'mint-ui';
import { type } from 'os';
  export default {
    data(){
      return{
        activeClass:(localStorage.getItem('invoiceed') && JSON.parse(localStorage.getItem('invoiceed')).type) || 0,
        typeactive:(localStorage.getItem('invoiceed') && JSON.parse(localStorage.getItem('invoiceed')).title_type) || 1,
        compay_t:(localStorage.getItem('invoiceed') && JSON.parse(localStorage.getItem('invoiceed')).company)||'',
        compay_h:(localStorage.getItem('invoiceed') && JSON.parse(localStorage.getItem('invoiceed')).company_id)||'',
        istype:'',
      }
    },
    created(){
       this.istype=localStorage.getItem('invoiceed') && JSON.parse(localStorage.getItem('invoiceed'));
       console.log(this.istype)
    },
    methods:{
      cancelVideo(){
        this.$emit('getcacel',false)
      },
      showoff(){
        if(this.activeClass == 0){
            localStorage.setItem('invoice' ,"不开发票")
            this.$emit('gettypelist',"不开发票");
            this.$emit('getcacel',false,0)
        }else{
             if(!this.compay_t && this.typeactive == 2){
                Toast('单位名称不能为空')
             }
             if(this.compay_t && !this.compay_h &&this.typeactive==2){
                Toast('识别号不能为空')
             }
             if(this.compay_t && this.compay_h && this.typeactive ==2 ){
                 this.$emit('getcacel',false,1,2,this.compay_t,this.compay_h)
             }
             if( this.typeactive ==1){
                 this.$emit('getcacel',false,1,1)
             }
             localStorage.setItem('invoice' ,"普通纸质发票")
             this.$emit('gettypelist',"普通纸质发票")
        }
       
      },
      ifshow(){
          this.activeClass = 0;
      },
      ifshows(){
          this.activeClass = 1;
          
      },
      iftype(){
          this.typeactive =1;
      },
      iftypes(){
          this.typeactive =2;
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
   height:310px;
   background:rgba(0,0,0,1);
   opacity:0.6;
 }
 .purchase_mac{
   height:78px;
   background:#616060;
 }
 .order_content{
    margin-top: -78px;
    width:750px;
    height:1020px;
    background:rgba(255,255,255,1);
    border-radius:36px 36px 0px 0px;
    padding-top: 44px;
 }
 .order_content .content_a{
    width:80px;
    height:56px;
    font-size:40px;
    font-family:PingFangSC-Medium;
    font-weight:600;
    color:rgba(74,74,74,1);
    line-height:56px;
    margin-left: 44px;
 }
 .order_content .content_b{
    width:112px;
    height:40px;
    font-size:28px;
    font-family:PingFangSC-Medium;
    font-weight:600;
    color:rgba(74,74,74,1);
    line-height:40px;
    margin-top: 32px;
    margin-left: 44px;
 }
 .order_content .content_c{
     height: 74px;
     margin-top: 24px;
 }
 .content_c .c_div{
     float: left;
     height: 76px;
 }
 .c_ico{
     width: 38px;
     height: 38px;
     margin-top: 38px;
     margin-left: -39px;
 }
 .content_c .c_div .c_personal{
    float: left;
    width:260px;
    height:72px;
    margin-left: 44px;
    background:rgba(255,247,233,1);
    border-radius:11px;
    border:1px solid rgba(243,117,5,1);
    font-size:28px;
    font-family:PingFangSC-Regular;
    font-weight:400;
    color:rgba(243,117,5,1);
    line-height:72px;
 }
 .content_c .c_div .c_personals{
    float: left;
    width:260px;
    height:72px;
    margin-left: 44px;
    background:rgba(249,250,251,1);
    border-radius:11px;
    font-size:28px;
    font-family:PingFangSC-Regular;
    font-weight:400;
    color:rgba(102,102,102,1);
    line-height:72px;
 }
 .content_c .c_span{
     float: left;
     margin-left: 70px;
 }
 .content_c .c_span .c_company{
    float: left;
    width:260px;
    height:72px;
    background:rgba(255,247,233,1);
    border-radius:11px;
    border:1px solid rgba(243,117,5,1);
    font-size:28px;
    font-family:PingFangSC-Regular;
    font-weight:400;
    color:rgba(243,117,5,1);
    line-height:72px;
 }
 .content_c .c_span .c_companys{
    float: left;
    width:260px;
    height:72px;
    background:rgba(249,250,251,1);
    border-radius:11px;
    font-size:28px;
    font-family:PingFangSC-Regular;
    font-weight:400;
    color:rgba(102,102,102,1);
    line-height:72px;
 }
 .order_content .c_type{
    height: 150px;
 }
 .c_type .type_head{
    width:112px;
    height:40px;
    font-size:28px;
    font-family:PingFangSC-Medium;
    font-weight:500;
    color:rgba(74,74,74,1);
    line-height:40px;
    margin-top: 24px;
    margin-left: 44px;
 }
 .c_type .type_personal{
    float: left;
    height: 76px;
    margin-top: 24px;
    margin-left: 44px;
 }
 .type_personal .personal_a{
    float: left;
    width:260px;
    height:72px;
    background:rgba(255,247,233,1);
    border-radius:11px;
    border:1px solid rgba(243,117,5,1);
    font-size:28px;
    font-family:PingFangSC-Regular;
    font-weight:400;
    color:rgba(243,117,5,1);
    line-height:72px;
 }
 .type_personal .personal_b{
    float: left;
    width:260px;
    height:72px;
    background:rgba(249,250,251,1);
    border-radius:11px;
    font-size:28px;
    font-family:PingFangSC-Regular;
    font-weight:400;
    color:rgba(102,102,102,1);
    line-height:72px;
 }
 .c_type .company_nva{
     float: left;
    width: 100%;
    height:40px;
    text-align: left;
    font-size:28px;
    font-family:PingFangSC-Medium;
    font-weight:500;
    color:rgba(74,74,74,1);
    line-height:40px;
    margin-top: 44px;
    margin-left: 44px;
 }
 .type_company{
    float: left;
    height: 76px;
    margin-top: 24px;
    margin-left: 70px;
 }
 .type_company .company_a{
    float: left;
    height:72px;
     width:260px;
    background:rgba(255,247,233,1);
    border-radius:11px;
    border:1px solid rgba(243,117,5,1);
    font-size:28px;
    font-family:PingFangSC-Regular;
    font-weight:400;
    color:rgba(243,117,5,1);
    line-height:72px;
 }
 .type_company .company_b{
    float: left;
    height:72px;
     width:260px;
    background:rgba(249,250,251,1);
    border-radius:11px;
    font-size:28px;
    font-family:PingFangSC-Regular;
    font-weight:400;
    color:rgba(102,102,102,1);
    line-height:72px;
 }
 .company_content{
    float: left;
    height: 78px;
    margin-top: 44px;
 }
 .company_content .content_a{
    float: left;
    height:72px;
    width:260px;
    background:rgba(255,247,233,1);
    border-radius:11px;
    border:1px solid rgba(243,117,5,1);
    font-size:28px;
    font-family:PingFangSC-Regular;
    font-weight:400;
    color:rgba(243,117,5,1);
    line-height:72px;
 }
 .company_name{
     float: left;
     margin-top: 28px;
 }
 .company_name .name_a{
    float: left;
    margin-left: 44px;
    width:620px;
    height:80px;
    background:rgba(255,255,255,1);
    border-radius:11px;
    border:1px solid rgba(216,216,216,1);
 }
 .company_name .name_b{
    margin-top: 20px;
    float: left;
    margin-left: 44px;
    width:620px;
    height:80px;
    background:rgba(255,255,255,1);
    border-radius:11px;
    border:1px solid rgba(216,216,216,1);
 }
 .footfiexd{
    position: fixed;
    left: 0;
    right: 0;
    bottom: 0;
    z-index: 20;
    height: 160px;
    border-top: 1px solid #eeeeee;
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