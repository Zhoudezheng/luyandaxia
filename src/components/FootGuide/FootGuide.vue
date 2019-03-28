<template>
  <div class="footer_guide border-1px">
    <span class="guide_item" :class="{on: $route.path==='/shoppingmall'}" @click="goTo('/shoppingmall')">
      <span class="item_icon">
        <i class="iconfont icon-waimai"></i>
      </span>
      <span class="span_a">商场</span>
    </span>
    <a href="javascript:;" class="guide_item"  :class="{on: $route.path==='/shoppingcart'}" @click="goTo('/shoppingcart')">
      <span class="item_icon">
        <i class="iconfont icon-search"></i>
      </span>
      <span class="span_a">购物车</span>
    </a>
    <a href="javascript:;" class="guide_item"  :class="{on: $route.path==='/'}" @click="goTo('/')">
      <span class="item_icon">
        <i class="iconfont icon-geren"></i>
      </span>
      <span class="span_a">我的</span>
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
    height: 99px;
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
.on{
    color: rgba(243, 117, 5, 1)
}
.guide_item .span_a{
     font-size :12px;
     margin-top :10px;
     margin-bottom: 2px;
}
</style>