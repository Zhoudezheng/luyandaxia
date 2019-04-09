<template>
    <div>
       <div class="address_div">
            <img src="./image/huitui.png" alt="协议按钮"  class="address_check" @click="presonal">
            <span  class="address_mode">地址管理</span>
      </div>
      <div class="address_content" v-for="(item ,index) in dataList">
          <div class="content_a">
              <span class="content_name">{{item.name}}</span>
              <span class="content_iphone">{{item.phone}}</span>
          </div>
          <span class="content_add">{{item.address}}{{item.info}}</span>
          <div class="content_choice">
             <span class="choice_ico"  :class="{active:item.type}" @click="isdeful(index)"></span>
             <span class="choice_mo" v-show="item.isdefault">默认地址</span>
             <span class="choice_mo" v-show="!item.isdefault">设为默认</span>
             <img src="./image/del.png" alt="删除" class="choice_del" @click="deladdress(index)" >
             <img src="./image/write.png" alt="编辑" class="choice_edit" @click="choiceaddress(index)">
          </div>
      </div>
      <div class="footfiexd"  @click="newaddress">
        <img src="./image/buy.png" alt="新增地址" class="fiexd">
        <span class="fiexd_span">新增地址</span>
      </div>
    </div>
</template>
<script>
import { Toast, MessageBox } from 'mint-ui'
export default {
    data(){
        return {
            dataList:[
            ]
        }
    },
    mounted(){
        this.dataList=this.$store.state.addressList;
    },
    methods:{
       presonal(){
           this.$router.push({
               path:'/personalcenter'
           })
       },
       isdeful(index){
           var obj=this.dataList[index];
           for(var i=0; i<this.dataList.length;i++){
               if(this.dataList[i]=== obj){
                   //方法：设为默认地址并置顶
                    this.dataList[i].type=1;
                    this.dataList.unshift(this.dataList[index]);
                    this.dataList.splice(index+1,1);
                    return this.dataList;
               }else{
                   this.dataList[i].type=0;
               }
           }
       },
       newaddress(){
         this.$router.push({
             path:'/newaddress'
         })
       },
       choiceaddress(index){
           var editadd=this.dataList[index];
           this.$store.dispatch('seteditadd', editadd);
           this.$router.push({
               path:'/editaddress'
           })
       },
       deladdress(index){
           this.dataList.splice(index,1);
        //    this.$store.dispatch('')
           Toast('删除成功');
       }
    }
}
</script>
<style  scoped>
@import '../../../static/font/font.css';
.address_div{
    /* position: fixed;
    left: 0;
    right: 0;
    top: 0; */
    height: 91px;
    background:rgba(243, 117, 5, 1);
}
.address_div .address_check{
    background-size: 16px 28px;
    float: left;
    margin-top: 32px;
    width:14px;
    height:26px;
    margin-left:30px;
}
.address_div .address_mode{
    float: left;
    width:144px;
    height:50px;
    font-size:36px;
    font-family:PingFangSC-Medium;
    font-weight:500;
    color:rgba(255,255,255,1);
    line-height:50px;
    margin-top:19px;
    margin-left: 262px;
}
.address_content{
   height: 210px;
   border-bottom: 1px solid #eeeeee;
   /* margin-top: 91px; */
}
.address_content .content_a{
    height: 100px;
}
.content_a .content_name{
    float: left;
    margin-top:36px;
    margin-left: 20px;
    height:40px;
    font-size:32px;
    font-family:PingFangSC-Semibold;
    font-weight:600;
    color:rgba(74,74,74,1);
    line-height:40px;
}
.content_a .content_iphone{
    float: left;
    margin-top: 36px;
    margin-left: 20px;
    height:40px;
    font-size:32px;
    font-family:PingFangSC-Semibold;
    font-weight:500;
    color:rgba(74,74,74,1);
    line-height:40px;
}
.address_content .content_add{
    float: left;
    margin-left: 20px;
    text-align: left;
    width: 80%;
    padding-bottom: 15px;
    border-bottom: 1px solid #eeeeee;
    height:30px;
    font-size:30px;
    font-family:PingFangSC-Semibold;
    font-weight:500;
    color:rgba(74,74,74,1);
    line-height:30px;
}
.address_content .content_choice{
   float: left;
   width: 100%;
}
.content_choice .choice_ico{
    float: left;
    width: 30px;
    height: 30px;
    margin-top: 20px;
    margin-left: 20px;
    background-image: url('./image/check.png');
    background-size: 30px 30px;
}
.content_choice .choice_ico.active{
    float: left;
    width: 30px;
    height: 30px;
    margin-top: 20px;
    margin-left: 20px;
    background-image: url('./image/checked.png');
    background-size: 30px 30px;
}
.content_choice .choice_mo{
    float: left;
    margin-top: 23px;
    margin-left: 5px;
}
.content_choice .choice_del{
    float:right;
    height: 30px;
    width: 30px;
    margin-top: 20px;
    margin-right: 20px;
}
.content_choice .choice_edit{
    float: right;
    height: 30px;
    width: 30px;
    margin-top: 20px;
    margin-right: 30px;
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

