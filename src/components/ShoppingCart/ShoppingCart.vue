<template>
  <div class="shoppingcart_content">
    <div class="shoppingcart_div">
      <img src="./image/fanhui.png" alt="协议按钮" @click="liveSharing" class="shoppingcart_check">
      <span  class="shoppingcart_mode">购物车</span>
      <input type="button" value="删除" class="shopping_del">
    </div>
  </div>
</template>

<script>
  export default {
    data(){
        return {
            activeClass:1
        }
    },
    mounted(){
    },
    methods: {
        liveSharing(){
            this.$router.push({  
                path:'/liveSharing',
            })
        },
        shoppingcart(){
            this.$router.push({  
                path:'/videosuccessful',
            })
        },
        showactive(){
           this.activeClass=1
        },
        showactives(){
           this.activeClass=2
        }
    },
    destroyed () {
    },
}
</script>

<style  scoped>
@import '../../../static/font/font.css';
.shoppingcart_content{
    background:rgba(249,250,251,1);
    height: 1334px;
}
.shoppingcart_div{
    height: 91px;
    background-color: #ffffff;
}
.shoppingcart_div .shoppingcart_check{
    background-size: 16px 28px;
    float: left;
    margin-top: 32px;
    width:14px;
    height:26px;
    margin-left:30px;
}
.shoppingcart_div .shoppingcart_mode{
    float: left;
    width:144px;
    height:50px;
    font-size:36px;
    font-family:PingFangSC-Medium;
    font-weight:500;
    color:rgba(74,74,74,1);
    line-height:50px;
    margin-top:19px;
    margin-left: 262px;
}
input:focus, textarea:focus{ 
    outline: none;
}
  /* 设置输入框默认文字样式 */
input::-webkit-input-placeholder{
   width:191px;
   height:40px;
   font-size:28px;
   font-family:PingFangSC-Regular;
   font-weight:400;
   color:rgba(187,187,187,1);
   line-height:40px;
}
.shopping_del{
    width:64px;
    height:39px;
    font-size:32px;
    float: right;
    margin-top: 25px;
    margin-right: 26px;
    font-family:PingFangSC-Medium;
    font-weight:500;
    color:rgba(74,74,74,1);
    line-height:39px;
    background-color: #ffffff
}

</style>