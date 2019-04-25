<template>
    <div class="emptyDetail">
        <div class="detail_div">
            <img src="./image/fanhui.png" alt="回退"  class="detail_check" @click="fanhui">
            <span class="detail_mode">{{this.$route.query.name}}</span>
        </div>
        <iframe :src="this.$route.query.url" class="ifram_class"></iframe>
    </div>
</template>
<script>
export default {
    methods:{
        fanhui(){
            this.$router.go(-1)
        }
    }
    
}
</script>

<style>
.emptyDetail{
    height: 100%;
    overflow-x: hidden;
}
.detail_div{
    height: 90px;
    line-height: 90px;
    background-color:rgba(243, 117, 5, 1);
}
.detail_div .detail_check {
    background-size: 16px 28px;
    float: left;
    margin-top: 32px;
    width: 14px;
    height: 26px;
    margin-left: 30px;
  }
  .detail_div .detail_mode{
    float: left;
    width:8.44rem;
    height:50px;
    font-size:36px;
    font-family:PingFangSC-Medium;
    font-weight:500;
    color:rgba(74, 74, 74, 1);
    line-height:44px;
     margin-top:23px;
     align-self: center;
    /*margin-left: 262px; */
}
.ifram_class{
    width: 100%;
    height: auto;
}
</style>

