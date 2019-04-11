<template>
  <div class="evaluation">
      <div class="evluation_a1">产品咨询</div>
      <div class="evluation_a2">{{this.productdata.info1}}</div>
      <div class="evluation_a1">配送范围及运费</div>
      <div class="evluation_a2">{{this.productdata.info2}}</div>
      <div class="evluation_a1">快递公司</div>
      <div class="evluation_a2">{{this.productdata.info3}}</div>
      <div class="evluation_a1">售后保证</div>
      <div class="evluation_a2">{{this.productdata.info4}}</div>
  </div>
</template>

<script>
  export default {
    data(){
      return {
        productdata:{},
      }
    },
    mounted(){
        this.productdata=this.$store.state.productdata;
    },
  }
</script>

<style scoped>
  @import '../../../../static/font/font.css';
.evaluation{
    text-align: left;
    margin-bottom: 100px;
}
.evluation_a1{
    margin-top: 20px;
    margin-left: 20px;
    height: 33px;
    font-size: 28px;
    font-family: PingFangSC-Regular;
    font-weight: 500;
    color: #000000;
    line-height: 33px;
}
.evluation_a2{
    margin-top: 20px;
    margin-left: 20px;
    height: 33px;
    font-size: 26px;
    font-family: PingFangSC-Regular;
    font-weight: 400;
    color: rgba(102, 102, 102, 1);
    line-height: 33px;
}
</style>
