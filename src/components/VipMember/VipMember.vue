<template>
  <div class="vip_content">
    <div class="vip_head">
      <div class="vip_div">
        <img src="./image/huitui.png" alt="协议按钮" @click="liveSharing" class="vip_check">
        <span class="vip_mode">选择支付方式</span>
      </div>
      <p class="vip_mony">
        <span class="mony_a">¥</span>
        <span class="mony_b">{{this.price}}</span>
      </p>
      <p class="vip_Member">购买VIP年费会员</p>
    </div>
    <div class="vip_lins"></div>
    <button type="button" class="vip_weixin" @click="showactive(1)">
      <img src="./image/weixin.png" alt="微信" class="weixin_icon">
      <span class="weixin_p">微信支付</span>
      <span :class="activeClass == 1 ?'weixin_check':'weixin_checked'"></span>
    </button>
    <div class="vip_line"></div>
    <button class="vip_weixin" @click="showactive(2)">
      <img src="./image/zhifu.png" alt="支付宝" class="weixin_icon">
      <span class="weixin_p">支付宝支付</span>
      <span :class="activeClass == 2 ?'weixin_check':'weixin_checked'"></span>
    </button>
    <div class="vip_buy">
      <input type="button" value="立即支付" class="buy_button" @click="vipsuccessful">
    </div>
  </div>
</template>

<script>
  import {mapState} from 'vuex'
  import wx from 'weixin-js-sdk'

  export default {
    data() {
      return {
        activeClass: 1,// 支付方式 1 微信 2 支付宝
        os: '',
        price: "0.00"
      }
    },
    computed: {
      ...mapState(['orderId', 'alipayPayment', 'wechatPayment'])
    },
    mounted() {
      this.price = this.$route.query.cost
      this.getOrderDetail()
    },
    methods: {
      liveSharing() {
        console.log(this.$router)
        // this.$router.push({
        //   path: '/liveSharing',
        // })
      },
      vipsuccessful() {
        const the = this
        let way = this.activeClass
        let type = localStorage.getItem('type')
        let order_sn = this.orderId
        let os = this.os
        let return_url = '/VipSuccessful'
        console.log(type, order_sn, os, way);
        if (way == 1) {
          this.$store.dispatch('wechatPayment', {type, order_sn, device_type: os}).then(() => {
            let wechat = this.wechatPayment
            the.wxInitPay(wechat)
          })
        } else if (way == 2) {
          os = '3'
          this.$store.dispatch('alipayPayment', {type, order_sn, device_type: os, return_url}).then(() => {
            let form = this.alipayPayment.key
            const div = document.createElement('div');
            div.innerHTML = form; //此处form就是后台返回接收到的数据
            document.body.appendChild(div);
            document.forms[0].submit()
            console.log(data);
          })
        }
        // this.$router.push({
        //   path: '/vipsuccessful',
        // })
      },
      showactive(val) {
        // 支付方式 1 微信 2 支付宝
        this.activeClass = val
      },
      getOrderDetail() {
        let orderDetail = localStorage.getItem('orderDetail')
        orderDetail = JSON.parse(orderDetail)
        this.price = orderDetail.total
        let os = navigator.userAgent
        let isAndroid = os.indexOf('Android') > -1 || os.indexOf('Adr') > -1
        let isiOS = !!os.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/);
        if (isAndroid) {
          this.os = '1'
        } else if (isiOS) {
          this.os = '2'
        }
      },
      wxInitPay(data) {
        const the = this
        let {appid, noncestr, partnerid, prepayid, sign, timestamp} = data
        let packages = data.package
        console.log(packages);
      }
    },
    destroyed() {
    },
  }
</script>

<style scoped>
  @import '../../../static/font/font.css';

  .vip_content {
    background-color: rgba(249, 250, 251, 1)
  }

  .vip_head {
    background-color: orange;
    height: 400px;;
  }

  .vip_head .vip_div {
    height: 88px;
  }

  .vip_div .vip_check {
    background-size: 16px 28px;
    width: 16px;
    height: 28px;
    float: left;
    margin-top: 58px;
    margin-left: 28px;
  }

  .vip_div .vip_mode {
    float: left;
    height: 50px;
    font-size: 36px;
    font-family: PingFangSC-Medium;
    font-weight: 500;
    color: rgba(255, 255, 255, 1);
    line-height: 50px;
    margin-top: 49px;
    margin-left: 224px;
  }

  .vip_head .vip_mony {
    margin-top: 70px;
    height: 90px;
  }

  .vip_head .vip_mony .mony_a {
    height: 90px;
    font-size: 32px;
    font-family: PingFangSC-Semibold;
    font-weight: 600;
    color: rgba(255, 255, 255, 1);
    line-height: 45px;
  }

  .vip_head .vip_mony .mony_b {
    height: 90px;
    font-size: 64px;
    font-family: PingFangSC-Semibold;
    font-weight: 600;
    color: rgba(255, 255, 255, 1);
    line-height: 45px;
  }

  .vip_head .vip_Member {
    height: 33px;
    font-size: 24px;
    font-family: PingFangSC-Medium;
    font-weight: 500;
    color: rgba(255, 255, 255, 1);
    line-height: 33px;
  }

  .vip_lins {
    height: 15px;
    background-color: #eeeeee
  }

  .vip_weixin {
    height: 120px;
    width: 100%;
    background-color: #ffffff;
    margin: 0;
    padding: 0;
    border: 1px solid transparent;
    outline: none;
  }

  .vip_weixin .weixin_icon {
    float: left;
    margin-top: 30px;
    margin-left: 28px;
    width: 44px;
    height: 40px;
  }

  .vip_weixin .weixin_p {
    float: left;
    margin-top: 30px;
    margin-left: 24px;
    height: 40px;
    font-size: 28px;
    font-family: PingFangSC-Regular;
    font-weight: 400;
    color: rgba(102, 102, 102, 1);
    line-height: 40px;
  }

  .weixin_check {
    background-image: url('./image/kexuan.png');
    width: 36px;
    height: 36px;
    background-size: 36px 36px;
    border-radius: 50%;
    float: right;
    margin-top: 30px;
    margin-right: 28px;
  }

  .vip_line {
    height: 2px;
    background-color: #eeeeee
  }

  .weixin_checked {
    background-image: url('./image/bukexuan.png');
    width: 36px;
    height: 36px;
    background-size: 36px 36px;
    border-radius: 50%;
    float: right;
    margin-top: 40px;
    margin-right: 28px;
  }

  .vip_buy {
    position: fixed;
    height: 160px;
    left: 0;
    right: 0;
    bottom: 0;
  }

  .vip_buy .buy_button {
    width: 694px;
    height: 88px;
    background: linear-gradient(90deg, rgba(254, 154, 28, 1) 0%, rgba(243, 117, 5, 1) 100%);
    border-radius: 59px;
    margin-top: 44px;
    font-size: 36px;
    font-family: PingFangSC-Medium;
    font-weight: 500;
    color: rgba(255, 255, 255, 1);
    line-height: 50px;
  }
</style>
