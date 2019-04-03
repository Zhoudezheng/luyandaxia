<template>
  <div class="content">
    <div class="orderTop">
      <div class="backtrack"></div>
      <span class="">我的订单</span>
      <div class="search"></div>
    </div>
    <div class="nav">
      <div class="checked" @click="switcherClass">全部</div>
      <div @click="switcherClass">待付款</div>
      <div @click="switcherClass">待发货</div>
      <div @click="switcherClass">待收货</div>
      <div @click="switcherClass">已完成</div>
      <div @click="switcherClass">已取消</div>
    </div>
    <div class="orderList" v-for="(item) in orderList" :class="item.orderState == 4 ? 'bgGray':'bgWhite' ">
      <div class="orderFirst">
        <span class="orderID">订单编号：{{item.orderId}}</span>
        <span v-if="item.orderState == 0">待付款</span>
        <span v-if="item.orderState == 1">待发货</span>
        <span v-if="item.orderState == 2">已完成</span>
        <span v-if="item.orderState == 3">待收货</span>
        <span v-if="item.orderState == 4">已取消</span>
      </div>
      <div>
        <div class="details">
          <div class="orderImg">
            <img :src="item.orderImg" alt="商品图片">
          </div>
          <div class="order">
            <div class="orderDetails">
              <span>{{item.orderName}}</span>
              <span>X {{item.orderNumber}}</span>
            </div>
            <div class="price">￥{{item.orderPrice}}</div>
          </div>
        </div>
        <div class="accounts">
          <div>
            共 {{item.orderNumber}}件 商品
          </div>
          <div>
            合计
            <span class="wealth">￥{{item.orderPrice}}</span>
            <span class="delivery">(免邮)</span>
          </div>
        </div>
        <div class="btnWarp">
          <input v-if="item.orderState == 0" class="gray" type="button" value="取消订单" >
          <input v-if="item.orderState == 0" class="orange" type="button" value="去付款" >
          <input v-if="item.orderState == 1" class="orange" type="button" value="提醒发货" >
          <input v-if="item.orderState == 2" class="gray" type="button" value="查看发票" >
          <input v-if="item.orderState == 2" class="gray" type="button" value="申请售后" >
          <input v-if="item.orderState == 2" class="orange" type="button" value="评价晒单" >
          <input v-if="item.orderState == 2" class="orange" type="button" value="再次购买" >
          <input v-if="item.orderState == 3" class="gray" type="button" value="查看物流" >
          <input v-if="item.orderState == 3" class="orange" type="button" value="确认收货" >
          <input v-if="item.orderState == 4" class="gray" type="button" value="再次购买" >
        </div>
      </div>
    </div>
    <div class="mark">没有更多了~</div>
  </div>
</template>

<script>
  export default {
    data() {
      return {
        orderList: [
          {
            orderId:1234321312,
            orderState:0,
            orderName:'路演作者亲笔签名版',
            orderNumber:3,
            orderImg:'https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1554201783830&di=170a365137d7fd630ede28fd42cfaa4e&imgtype=0&src=http%3A%2F%2Fimg1.doubanio.com%2Flpic%2Fs6633627.jpg',
            orderPrice:300,
          },
          {
            orderId:1234321312,
            orderState:1,
            orderName:'路演作者亲笔签名版',
            orderNumber:2,
            orderImg:'https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1554201783830&di=170a365137d7fd630ede28fd42cfaa4e&imgtype=0&src=http%3A%2F%2Fimg1.doubanio.com%2Flpic%2Fs6633627.jpg',
            orderPrice:200,
          },
          {
            orderId:1234321312,
            orderState:2,
            orderName:'路演作者亲笔签名版',
            orderNumber:1,
            orderImg:'https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1554201783830&di=170a365137d7fd630ede28fd42cfaa4e&imgtype=0&src=http%3A%2F%2Fimg1.doubanio.com%2Flpic%2Fs6633627.jpg',
            orderPrice:100,
          },
          {
            orderId:1234321312,
            orderState:3,
            orderName:'路演作者亲笔签名版',
            orderNumber:1,
            orderImg:'https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1554201783830&di=170a365137d7fd630ede28fd42cfaa4e&imgtype=0&src=http%3A%2F%2Fimg1.doubanio.com%2Flpic%2Fs6633627.jpg',
            orderPrice:100,
          },
          {
            orderId:1234321312,
            orderState:4,
            orderName:'路演作者亲笔签名版',
            orderNumber:1,
            orderImg:'https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1554201783830&di=170a365137d7fd630ede28fd42cfaa4e&imgtype=0&src=http%3A%2F%2Fimg1.doubanio.com%2Flpic%2Fs6633627.jpg',
            orderPrice:100,
          },
        ],
      }
    },
    mounted(){

    },
   methods:{
     switcherClass(e){
       console.log(this);
     }
   }
  }
</script>

<style scoped>
  .content {
    background-color: #F9FAFB;
  }

  .orderTop {
    font-size: 36px;
    padding: 0 26px 0 11px;
    color: #fff;
    height: 88px;
    line-height: 88px;
    background-color: #F37505;
    display: flex;
    align-items: center;
    justify-content: space-between;
  }

  .backtrack {
    width: 44px;
    height: 44px;
    background: url("./image/backtrack.png") no-repeat center;
    background-size: 15px 30px;
    transform: rotate(180deg);
  }

  .search {
    width: 36px;
    height: 36px;
    background: url("./image/search.png") no-repeat;
    -webkit-background-size: 36px;
    background-size: 36px 36px;
  }

  .nav {
    display: flex;
    position: relative;
    background-color: #fff;
    height: 88px;
    line-height: 88px;
  }

  .nav > div {
    flex: 1;
    color: #666;
    font-size: 28px;
  }

  .nav:first-child {
    color: #4a4a4a;
    font-size: 32px;
    font-weight: 400;
  }

  .checked:before {
    content: '';
    display: block;
    width: 36px;
    height: 8px;
    border-radius: 8px;
    background-color: #ff7e00;
    position: absolute;
    bottom: 0;
    margin-left: 45px;
  }

  .bgWhite{
    background-color: #fff;
  }
  .bgGray{
    background-color: #f0f0f0;
  }
  .orderList {
    margin-top: 16px;
  }
  .orderFirst{
    padding: 0 28px;
    height: 80px;
    color: #4a4a4a;
    font-size: 28px;
    display: flex;
    align-items: center;
    justify-content: space-between;
  }
  .orderID{
    color: #9b9b9b;
    font-size: 24px;
  }
  .orderImg{
    display: inline-block;
    width: 120px;
    height: 120px;
    background-color: #F9FAFB;
    border-right: 10px;
  }
  .orderImg>img{
    width: 120px;
    height: 120px;
    border-right: 10px;
  }
  .details{
    padding: 28px;
    display: flex;
    border-bottom: 1px solid #f9fafb;
  }
  .order{
    flex: 1;
    padding-left: 24px
  }
  .orderDetails{
    display: flex;
    align-items: self-start;
    justify-content: space-between;
    ;
  }
  .price{
    display: flex;
    height: 100px;
    justify-items: self-end;
    align-items: flex-end;
    font-size: 20px;
  }
  .accounts{
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 37px 28px 30px 28px;
    color: #9b9b9b;
    font-size: 24px;
  }
  .delivery{
    font-size: 28px;
  }
  .wealth{
    font-size: 20px;
    color: #4a4a4a;
  }
  .btnWarp{
    display: flex;
    height: 100px;
    padding-right: 27px;
    justify-content: flex-end;
  }
  .btnWarp>input{
    width: 160px;
    height: 56px;
    padding: 8px 0;
    margin-left: 18px;
    background-color: #fff;
    -webkit-border-radius: 28px;
    -moz-border-radius: 28px;
    border-radius: 28px;
    outline: none;
  }
  .gray{
    color: #666;
    border: 1px solid #bbb;
  }
  .orange{
    color: #F37505;
    border: 1px solid #F37505;
  }
  .mark{
    font-size: 24px;
    color: #9b9b9b;
    height: 126px;
    line-height: 100px;
  }
</style>
