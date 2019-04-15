<template>
  <div class="personal">
    <div class="personalcenter_div">
      <!--<img src="./image/fanhui.png" alt="协议按钮" @click="liveSharing" class="personalcenter_check">-->
      <span class="personalcenter_mode">个人中心</span>
    </div>
    <div class="personal_head">
      <img :src="isVip.avatar" alt="头像" class="head_pert">
      <div class="head_cont">
        <p class="head_name" @click="toAccount">{{isVip.nickname}}</p>
        <span class="head_vip" v-show="isVip.vip_end == 1"> 普通会员</span>
        <span class="head_vip" v-show="isVip.vip_end == 0"> 普通用户</span>
      </div>
      <span class="head_adress" @click="addressp">管理收货地址</span>
      <img src="./image/Path.png" alt="lujing" class="head_path" @click="addressp">
    </div>
    <div class="footer_guide border-1px">
            <span class="guide_item" @click="goTo('/MyOrders','1')">
                <span class="item_icona">
                </span>
                <span class="span_a">待付款</span>
            </span>
      <a href="javascript:;" class="guide_item" @click="goTo('/MyOrders','2')">
                <span class="item_iconb">
                </span>
        <span class="span_a">待发货</span>
      </a>
      <div class="guide_item" @click="goTo('/MyOrders','3')">
                <span class="item_iconc">
                </span>
        <span class="span_a">待评价</span>
      </div>
      <div  class="guide_item" @click="goTo('/MyOrders','14')">
                <span class="item_icond">
                </span>
        <span class="span_a">已完成</span>
      </div>
      <img src="./image/Grouping.png" alt="tubiao" class="personal_division">
      <div class="guide_item" @click="goTo('/MyOrders','100')">
                <span class="item_icone"></span>
        <span class="span_a">全部</span>
      </div>
    </div>
    <div class="admin_content" @click="goTo('/MyOrders','100')">
      <span class="content_in">我的订单</span>
      <img class="conten_to" src="./image/go.png" alt="path">
    </div>
    <div class="admin_contented" @click="membership">
      <span class="content_in">购买VIP</span>
      <img class="conten_to" src="./image/go.png" alt="path">
    </div>
    <div class="admin_content">
      <span class="content_in">联系我们</span>
      <img class="conten_to" src="./image/go.png" alt="path">
    </div>
    <div class="admin_content">
      <span class="content_in">注销登录</span>
      <img class="conten_to" src="./image/go.png" alt="path">
    </div>
  </div>
</template>

<script>
  import {resaddressList} from '../../api'
 import {mapState} from 'vuex'

  export default {
     computed: {
      ...mapState(['isVip']),
     },
    mounted(){
      this.getuserinfo()
    },
    methods: {
      toAccount() {
        this.$router.push({
          path: '/account'
        })
      },
      membership() {
        this.$router.push({
          path: '/membership'
        })
      },
      addressp() {
        localStorage.setItem('iforder', 'no');
        this.$router.push({
          path: '/address'
        })
      },
      goTo(val,status) {
        this.$router.push({
          path: val,
          query:{
            status
          }
        })
      },
      getuserinfo(){
        this.$store.dispatch('getIsVip').then(()=>{
          this.isVip.avatar=this.isVip.avatar || 'http://file.market.xiaomi.com/thumbnail/PNG/l114/AppStore/090d6947f49ac44342fc6c84c25e744aefa7bcc00'
        })
      }

    }
  }
</script>

<style scoped>
  @import '../../../static/font/font.css';

  .personal {
    height: 1334px;
    background: rgba(249, 250, 251, 1);
  }

  .personalcenter_div {
    height: 90px;
    line-height: 90px;
    background-color: #ffffff;
  }

  .personalcenter_div .personalcenter_check {
    background-size: 16px 28px;
    float: left;
    margin-top: 32px;
    width: 14px;
    height: 26px;
    margin-left: 30px;
  }

  .personalcenter_div .personalcenter_mode {
    /*float: left;*/
    width: 144px;
    height: 50px;
    font-size: 36px;
    font-family: PingFangSC-Medium;
    font-weight: 500;
    color: rgba(74, 74, 74, 1);
    line-height: 50px;
    /*margin-top:19px;*/
    /*margin-left: 262px;*/
  }

  input:focus, textarea:focus {
    outline: none;
  }

  /* 设置输入框默认文字样式 */
  input::-webkit-input-placeholder {
    width: 191px;
    height: 40px;
    font-size: 28px;
    font-family: PingFangSC-Regular;
    font-weight: 400;
    color: rgba(187, 187, 187, 1);
    line-height: 40px;
  }

  .personal_head {
    background-image: url('./image/background.png');
    height: 302px;
  }

  .personal_head .head_pert {
    width: 150px;
    height: 150px;
    float: left;
    margin-top: 76px;
    margin-left: 46px;
    border-radius: 50%
  }

  .personal_head .head_cont {
    float: left;
    margin-top: 100px;
    margin-left: 32px;
    text-align: left;
  }

  .head_cont .head_name {
    height: 50px;
    font-size: 36px;
    font-family: PingFangSC-Semibold;
    font-weight: 600;
    color: rgba(255, 255, 255, 1);
    line-height: 50px;
  }

  .head_cont .head_vip {
    margin-top: 16px;
    text-align: center;
    float: left;
    width: 126px;
    height: 40px;
    background: rgba(217, 126, 0, 1);
    border-radius: 21px;
    font-size: 24px;
    font-family: PingFangSC-Semibold;
    font-weight: 600;
    color: rgba(255, 255, 255, 1);
    line-height: 40px;
  }

  .personal_head .head_adress {
    float: left;
    margin-top: 136px;
    margin-left: 190px;
    height: 30px;
    font-size: 24px;
    font-family: PingFangSC-Medium;
    font-weight: 500;
    color: rgba(255, 255, 255, 1);
    line-height: 30px;
  }

  .personal_head .head_path {
    width: 13px;
    height: 20px;
    float: right;
    margin-top: 141px;
    margin-right: 25px;
  }

  .footer_guide {
    height: 173px;
    background-color: #ffffff;
    display: flex;
  }

  .guide_item {
    display: flex;
    flex: 1;
    text-align: center;
    flex-direction: column;
    align-items: center;
    margin-top: 44px;
    color: #999999;
  }

  .guide_item .item_icona {
    width: 40px;
    height: 40px;
    background-image: url('./image/Pending.png');
    background-size: 40px 40px;
  }

  .guide_item .item_iconb {
    width: 40px;
    height: 40px;
    background-image: url('./image/shipped.png');
    background-size: 40px 40px;
  }

  .guide_item .item_iconc {
    width: 40px;
    height: 40px;
    background-image: url('./image/evaluated.png');
    background-size: 40px 40px;
  }

  .guide_item .item_icond {
    width: 40px;
    height: 40px;
    background-image: url('./image/Completed.png');
    background-size: 40px 40px;
  }

  .guide_item .item_icone {
    width: 40px;
    height: 40px;
    background-image: url('./image/all.png');
    background-size: 40px 40px;
  }

  .guide_item .span_a {
    height: 33px;
    font-size: 24px;
    font-family: PingFangSC-Regular;
    font-weight: 400;
    color: rgba(102, 102, 102, 1);
    line-height: 33px;
    margin-top: 12px;
  }

  .personal_division {
    height: 124px;
    width: 12px;
    margin-top: 25px;
  }

  .admin_content {
    margin-top: 16px;
    background-color: #ffffff;
    height: 100px;
  }

  .admin_contented {
    background-color: #ffffff;
    height: 100px;
  }

  .content_in {
    float: left;
    height: 40px;
    font-size: 28px;
    font-family: PingFangSC-Medium;
    font-weight: 500;
    color: rgba(74, 74, 74, 1);
    line-height: 35px;
    margin-top: 30px;
    margin-left: 28px;
  }

  .conten_to {
    width: 16px;
    height: 24px;
    float: right;
    margin-top: 36px;
    margin-right: 30px;
  }
</style>
