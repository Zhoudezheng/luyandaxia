<template>
  <div class="content">
    <div class="orderTop">
      <div class="backtrack"></div>
      <span class="">我的订单</span>
      <div class="search"></div>
    </div>
    <div class="nav">
      <div :class="{checked:shows==100}" @click="goTou(100)">全部</div>
      <div :class="{checked:shows==1}" @click="goTou(1)">待付款</div>
      <div :class="{checked:shows==2}" @click="goTou(2)">待发货</div>
      <div :class="{checked:shows==3}" @click="goTou(3)">待收货</div>
      <div :class="{checked:shows==4}" @click="goTou(4)">已完成</div>
    </div>
    <div class="orderList" v-for="(item) in orderList" :class="item.status == 4 ? 'bgGray':'bgWhite' ">
      <div class="orderFirst">
        <span class="orderID">订单编号：{{item.order_sn}}</span>
        <span v-if="item.status == 0">待付款</span>
        <span v-if="item.status == 1">待发货</span>
        <span v-if="item.status == 2">已完成</span>
        <span v-if="item.status == 3">待收货</span>
        <span v-if="item.status == 4">已取消</span>
      </div>
      <div>
        <div class="details" v-for="(product) in item.product_list">
          <div class="orderImg">
            <img :src="product.cover" alt="商品图片">
          </div>
          <div class="order">
            <div class="orderDetails">
              <span>{{product.name}}</span>
              <span>X {{product.num}}</span>
            </div>
            <div class="price">￥{{product.price}}</div>
          </div>
        </div>
        <div class="accounts">
          <div>
            共 {{item.product_count}}件 商品
          </div>
          <div>
            合计
            <span class="wealth">￥{{item.total_price}}</span>
            <span v-if="item.freight > 0" class="delivery">(含运费{{item.freight}}元)</span>
            <span v-else class="delivery">(免邮)</span>
          </div>
        </div>
        <div class="btnWarp">
          <input v-if="item.status == 0" class="gray" type="button" value="取消订单">
          <input v-if="item.status == 0" class="orange" type="button" value="去付款">
          <input v-if="item.status == 1" class="orange" type="button" value="提醒发货">
          <input v-if="item.status == 2" class="gray" type="button" @click="unfold()" value="查看发票">
          <input v-if="item.status == 2" class="gray" type="button" value="申请售后">
          <input v-if="item.status == 2" class="orange" type="button" value="评价晒单">
          <input v-if="item.status == 2" class="orange" type="button" value="再次购买">
          <input v-if="item.status == 3" class="gray" type="button" value="查看物流">
          <input v-if="item.status == 3" class="orange" type="button" value="确认收货">
          <input v-if="item.status == 4" class="gray" type="button" value="再次购买">
        </div>
      </div>
    </div>
    <div class="mark" ref="mark">没有更多了~</div>
    <div v-show="popup" class="popup"></div>
    <div v-show="popup" class="invoice">
      <div class="padlockWrap">
        <div class="padlock">
          <div class="padlockImg" @click="occlude()"></div>
        </div>
        <div>发票记录</div>
        <div class="padlockContent">
          <div class="detailed">
            <div class="left">发票状态</div>
            <div class="right">已邮寄</div>
          </div>
          <div class="detailed">
            <div class="left">发票类型</div>
            <div class="right">企业</div>
          </div>
          <div class="detailed">
            <div class="left">发票抬头</div>
            <div class="right">北京xxx有限公司</div>
          </div>
          <div class="detailed">
            <div class="left">税务号</div>
            <div class="right">1234567890</div>
          </div>
        </div>
      </div>
      <div class="ensure" @click="occlude()">确定</div>
    </div>
  </div>
</template>

<script>
  import {mapState} from 'vuex'

  export default {
    data() {
      return {
        shows: 100,
        popup:false,
        orderList: [
          {
            "id": 527,
            "order_sn": "NO817201903282025196280",
            "service": 0,
            "total_price": "0.01",
            "freight": "3.03",
            "product_count": 1,
            "pay_type": 2,
            "status": 0,
            "is_notice": 0,
            "is_review": 0,
            "invoice_id": 13,
            "product_list": [
              {
                "id": 6,
                "name": "路演兵法（马强导演亲笔签名版）",
                "cover": "http://cdn.kanjian2020.com/image/2017/12/5/o_1c0isns731lrc1v4v3qqd5v66n1j",
                "price": "0",
                "num": 1,
                "spec": "",
                "is_review": 1
              }
            ],
            "end_time": "19小时19分钟",
            "invoice": {
              "id": 13,
              "type": 1,
              "title_type": 1,
              "company": "lyz",
              "company_id": "",
              "content": "商品明细",
              "status": 0,
              "create_at": "2019-03-28 20:25:19"
            }
          },
          {
            "id": 527,
            "order_sn": "NO817201903282025196280",
            "service": 0,
            "total_price": "0.01",
            "freight": "3.03",
            "product_count": 1,
            "pay_type": 2,
            "status": 0,
            "is_notice": 0,
            "is_review": 0,
            "invoice_id": 13,
            "product_list": [
              {
                "id": 6,
                "name": "路演兵法（马强导演亲笔签名版）",
                "cover": "http://cdn.kanjian2020.com/image/2017/12/5/o_1c0isns731lrc1v4v3qqd5v66n1j",
                "price": "0",
                "num": 1,
                "spec": "",
                "is_review": 1
              }
            ],
            "end_time": "19小时19分钟",
            "invoice": {
              "id": 13,
              "type": 1,
              "title_type": 1,
              "company": "lyz",
              "company_id": "",
              "content": "商品明细",
              "status": 0,
              "create_at": "2019-03-28 20:25:19"
            }
          },
          {
            "id": 527,
            "order_sn": "NO817201903282025196280",
            "service": 0,
            "total_price": "0.01",
            "freight": "3.03",
            "product_count": 1,
            "pay_type": 2,
            "status": 0,
            "is_notice": 0,
            "is_review": 0,
            "invoice_id": 13,
            "product_list": [
              {
                "id": 6,
                "name": "路演兵法（马强导演亲笔签名版）",
                "cover": "http://cdn.kanjian2020.com/image/2017/12/5/o_1c0isns731lrc1v4v3qqd5v66n1j",
                "price": "0",
                "num": 1,
                "spec": "",
                "is_review": 1
              }
            ],
            "end_time": "19小时19分钟",
            "invoice": {
              "id": 13,
              "type": 1,
              "title_type": 1,
              "company": "lyz",
              "company_id": "",
              "content": "商品明细",
              "status": 0,
              "create_at": "2019-03-28 20:25:19"
            }
          },
          {
            "id": 527,
            "order_sn": "NO817201903282025196280",
            "service": 0,
            "total_price": "0.01",
            "freight": "3.03",
            "product_count": 1,
            "pay_type": 2,
            "status": 0,
            "is_notice": 0,
            "is_review": 0,
            "invoice_id": 13,
            "product_list": [
              {
                "id": 6,
                "name": "路演兵法（马强导演亲笔签名版）",
                "cover": "http://cdn.kanjian2020.com/image/2017/12/5/o_1c0isns731lrc1v4v3qqd5v66n1j",
                "price": "0",
                "num": 1,
                "spec": "",
                "is_review": 1
              }
            ],
            "end_time": "19小时19分钟",
            "invoice": {
              "id": 13,
              "type": 1,
              "title_type": 1,
              "company": "lyz",
              "company_id": "",
              "content": "商品明细",
              "status": 0,
              "create_at": "2019-03-28 20:25:19"
            }
          },
          {
            "id": 527,
            "order_sn": "NO817201903282025196280",
            "service": 0,
            "total_price": "0.01",
            "freight": "3.03",
            "product_count": 1,
            "pay_type": 2,
            "status": 0,
            "is_notice": 0,
            "is_review": 0,
            "invoice_id": 13,
            "product_list": [
              {
                "id": 6,
                "name": "路演兵法（马强导演亲笔签名版）",
                "cover": "http://cdn.kanjian2020.com/image/2017/12/5/o_1c0isns731lrc1v4v3qqd5v66n1j",
                "price": "0",
                "num": 1,
                "spec": "",
                "is_review": 1
              }
            ],
            "end_time": "19小时19分钟",
            "invoice": {
              "id": 13,
              "type": 1,
              "title_type": 1,
              "company": "lyz",
              "company_id": "",
              "content": "商品明细",
              "status": 0,
              "create_at": "2019-03-28 20:25:19"
            }
          },
        ]
      }
    },
    mounted() {
      this.getOrders(100, 1)

    },
    computed: {
      ...mapState(['orders'])
    },
    methods: {
      getOrders(status, page) {
        let token = localStorage.getItem('Authorization')
        this.$store.dispatch('getOrders', {token, status, page})
      },
      // 切换导航
      goTou(val) {
        this.shows = val
        this.getOrders(val, 1)
      },
     // 打开弹窗
      unfold(){
        this.popup = true
      },
      // 关闭弹窗
      occlude(){
        this.popup = false
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

  .bgWhite {
    background-color: #fff;
  }

  .bgGray {
    background-color: #f0f0f0;
  }

  .orderList {
    margin-top: 16px;
  }

  .orderFirst {
    padding: 0 28px;
    height: 80px;
    color: #4a4a4a;
    font-size: 28px;
    display: flex;
    align-items: center;
    justify-content: space-between;
  }

  .orderID {
    color: #9b9b9b;
    font-size: 24px;
  }

  .orderImg {
    display: inline-block;
    width: 120px;
    height: 120px;
    background-color: #F9FAFB;
    border-right: 10px;
  }

  .orderImg > img {
    width: 120px;
    height: 120px;
    border-right: 10px;
  }

  .details {
    padding: 28px;
    display: flex;
    border-bottom: 1px solid #f9fafb;
  }

  .order {
    flex: 1;
    padding-left: 24px
  }

  .orderDetails {
    display: flex;
    align-items: self-start;
    justify-content: space-between;;
  }

  .price {
    display: flex;
    height: 100px;
    justify-items: self-end;
    align-items: flex-end;
    font-size: 20px;
  }

  .accounts {
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 37px 28px 30px 28px;
    color: #9b9b9b;
    font-size: 24px;
  }

  .delivery {
    font-size: 28px;
  }

  .wealth {
    font-size: 20px;
    color: #4a4a4a;
  }

  .btnWarp {
    display: flex;
    height: 100px;
    padding-right: 27px;
    justify-content: flex-end;
  }

  .btnWarp > input {
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

  .gray {
    color: #666;
    border: 1px solid #bbb;
  }

  .orange {
    color: #F37505;
    border: 1px solid #F37505;
  }

  .mark {
    font-size: 24px;
    color: #9b9b9b;
    height: 126px;
    line-height: 100px;
  }

  .popup {
    width: 100%;
    height: 1334px;
    position: fixed;
    top: 0;
    left: 0;
    bottom: 0;
    right: 0;
    z-index: 2;
    background-color: #000;
    opacity: 0.5;
  }

  .invoice {
    width: 540px;
    height: 498px;
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    margin: auto;
    border-radius: 27px;
    background-color: #fff;
    opacity: 1;
    z-index: 10;
  }

  .padlock {
    height: 62px;
    padding-right: 20px;
    display: flex;
    justify-content: flex-end;
    align-items: flex-end;
  }

  .padlockImg {
    width: 60px;
    height: 60px;
    background: url("./image/padlock.png") no-repeat center;
    background-size: 16px 16px;
  }

  .padlockWrap {
    height: 448px;
    border-bottom: 1px solid #F2F5F8;
    color: #4a4a4a;
    font-size: 32px;
  }

  .ensure {
    color: #f37505;
    font-size: 36px;
    font-weight: 500;
    line-height: 50px;
  }

  .detailed {
    display: flex;
  }

  .detailed > div {
    flex: 1;
    height: 80px;
    line-height: 52px;
    font-weight:500;
    font-size:28px;
  }

  .left {
    text-align: right;
    padding-right: 10px;
  }

  .right {
    width: 140px;
    box-sizing: border-box;
    text-align: left;
    padding-left: 10px;
    padding-right: 20px;
    word-wrap: break-word;
  }
</style>
