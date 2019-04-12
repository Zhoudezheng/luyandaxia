<template>
  <div class="footer_guide border-1px">
    <span class="guide_item"  @click="goTo('/shoppingmall')">
      <span class="item_icona" :class="{ona: $route.path==='/shoppingmall'}">
        <!-- <i class="iconfont icon-waimai"></i> -->
      </span>
      <span class="span_a" :class="{ona: $route.path==='/shoppingmall'}">商场</span>
    </span>
    <a href="javascript:;" class="guide_item"   @click="goTo('/shoppingcart')">
      <span class="item_iconb" :class="{ona: $route.path==='/shoppingcart'}">
        <!-- <i class="iconfont icon-search"></i> -->
      </span>
      <span class="span_a" :class="{ona: $route.path==='/shoppingcart'}">购物车</span>
    </a>
    <a href="javascript:;" class="guide_item"   @click="goTo('/personalcenter')">
      <span class="item_iconc" :class="{ona: $route.path==='/personalcenter'}">
        <!-- <i class="iconfont icon-geren"></i> -->
      </span>
      <span class="span_a" :class="{ona: $route.path==='/personalcenter'}">我的</span>
    </a>
  </div>
</template>

<script>
  export default {
    methods: {
      goTo (path) {
        // 编程式路由导航
        this.$router.replace(path)
      }
    }
  }
</script>

<style  scoped>
.footer_guide{
    position: fixed;
    left: 0;
    right: 0;
    bottom: 0;
    height: 91px;
    background-color: #ffffff;
    display :flex;
}
.guide_item{
      display:flex;
      flex :1;
      text-align :center;
      flex-direction :column;
      align-items :center;
      margin-top:21px;
      color :#999999;
}
.item_icona{
  display: inline-block;
  width: 35px;
  height: 35px;
  background-image: url('./image/shoppcheck.png');
  background-size: 35px 35px;
}
.item_icona.ona{
   display: inline-block;
  width: 35px;
  height: 35px;
  background-image: url('./image/mycheck.png');
  background-size: 35px 35px;
}
.item_iconb{
   display: inline-block;
  width: 35px;
  height: 35px;
  background-image: url('./image/mallcheck.png');
  background-size: 35px 35px;
}
.item_iconb.ona{
   display: inline-block;
  width: 35px;
  height: 35px;
  background-image: url('./image/mallchecked.png');
  background-size: 35px 35px;
}
.item_iconc{
  display: inline-block;
  width: 35px;
  height: 35px;
  background-image: url('./image/mycheck.png');
  background-size: 35px 35px;
}
.item_iconc.ona{
   display: inline-block;
  width: 35px;
  height: 35px;
  background-image: url('./image/mychecked.png');
  background-size: 35px 35px;
}
.span_a.ona{
    color: rgba(243, 117, 5, 1);
}
.guide_item .span_a{
     font-size :28px;
     margin-top :3px;
     margin-bottom: 2px;
     margin-left: 4px;
}
</style>