<template>
    <div>
       <div class="address_div">
            <img src="./image/huitui.png" alt="协议按钮"  class="address_check" @click="presonal">
            <span  class="address_mode">地址管理</span>
      </div>
      <div>
          <span></span>
          <span></span>
      </div>
    </div>
</template>
<script>
export default {
    methods:{
       presonal(){
           this.$router.push({
               path:'/personalcenter'
           })
       }
    }
}
</script>
<style  scoped>
@import '../../../static/font/font.css';
.address_div{
    position: fixed;
    left: 0;
    right: 0;
    top: 0;
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
</style>

