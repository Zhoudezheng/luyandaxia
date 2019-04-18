<template>
  <div class="shoppingcart_content">
    <div class="shoppingcart_div">
      <img src="./image/fanhui.png" alt="协议按钮" @click="liveSharing" class="shoppingcart_check">
      <span class="shoppingcart_mode">购物车</span>
      <input type="button" value="删除" class="shopping_del" @click="delshopping">
    </div>
    <div class="car-list">
      <ul>
        <li class="car-item" v-for="(item,index) in goodLits">
          <div class="input-block" @click.prevent="selectOne(index)">
            <label class="input-label" :class="{ active: item.isSelected }" :for="'car-checkbox-'+index"></label>
          </div>
          <div class="car-item-content">
            <div class="car-img">
              <img :src="item.cover"/>
            </div>
            <div class="car-cont">
              <div class="cont">
                <div class="shop_top">
                  <span class="shop_name">{{item.name}}</span>
                  <span class="car-num">X{{item.num}}</span>
                </div>

                <div class="cat-desc">
                  <span>VIP特惠价：￥{{item.vip_price}}</span>
                </div>
                <div v-if="item.spec" class="cat-spec">{{item.spec}}</div>
                <div class="cat_mony">
                  <span class="mony_zero">¥{{item.price}}</span>
                  <span class="mony_hua">¥{{item.local_price}}</span>
                </div>
                <div class="num">
                  <div class="num_left" @click="reduce(index)">
                    <span class="num_reduce"></span>
                  </div>
                  <span class="num_nu">{{item.num}}</span>
                  <div class="num_right" @click="add(index)">
                    <span class="num_add"></span>
                  </div>
                </div>
              </div>

            </div>
          </div>
        </li>
      </ul>
    </div>
    <div class="car-footer">
      <div class="foot-car">
        <label for="foot-check" class="input-label_s" :class="{active: selected_all}" @click="slect_all"></label>
        <span class="foot_all">全选</span>
      </div>
      <div class="total-cont">
        <span>总价：￥{{totalPrice}}</span>
        <!-- <span>共{{totalNum}}件</span> -->
      </div>
      <div class="btn-box">
        <input type="button" @click="createOrder()" value="去结算" class="buy_link">
      </div>
    </div>
  </div>
</template>

<script>
  import {mapState} from 'vuex'
  import { MessageBox,Toast } from 'mint-ui';

  export default {
    data() {
      return {
        goodLits: [ ],
        totalPrice: 0,
        // totalNum: 0,
        selected_all: false,
        arraychecked: [],

      }
    },
    mounted() {
      this.getTotal()
      this.getShoppingCart();
      localStorage.setItem('invoice' ,"不开发票")
    },
    watch: {
      'goodLits': {
        handler: function (val, oldVal) {
          // console.log('aaa', val)
          return val;
        },
        deep: true
      }
    },
    computed: {
      ...mapState(['goods'])
    },
    methods: {

      liveSharing() {
        this.$router.push({
          path: '/shoppingmall',
        })
      },
      getTotal() {
        this.totalPrice = 0
        this.totalNum = 0
        for (var i = 0; i < this.goodLits.length; i++) {
          var _d = this.goodLits[i]
          if (_d.isSelected) {
            // console.log(_d.isSelected)
            this.totalPrice += _d['price'] * _d['num']
            // this.totalNum +=_d['num']
          }
        }
      },
      selectOne(index) {
        // 判断当前勾选状态
        var obj = this.goodLits[index];
        this.$set(this.goodLits, index, obj);
        var arraylist = [];
        var arraychecked = [];
        if (this.goodLits[index].isSelected == true) {
          var obj = this.goodLits[index];
          obj.isSelected = !obj.isSelected;
          this.$set(this.goodLits, index, obj);
        } else {
          var obj = this.goodLits[index];
          obj.isSelected = !obj.isSelected;
          this.$set(this.goodLits, index, obj);
        }
        for (var i = 0; i < this.goodLits.length; i++) {
          if (this.goodLits[i].isSelected == false) {
            arraylist.push(this.goodLits[i]);
          } else if (this.goodLits[i].isSelected == true) {
            arraychecked.push(this.goodLits[i]);
          }
        }
        // 判断是否全部勾选
        if (arraylist.length !== this.goodLits.length) {
          this.selected_all = false
        }
        if (arraychecked.length === this.goodLits.length) {
          this.selected_all = true
        }
        this.arraychecked = arraychecked
        this.getTotal()
      },
      slect_all() {
        // 判断全选还是全不选
        if (this.selected_all) {
          for (var i = 0; i < this.goodLits.length; i++) {
            this.goodLits[i].isSelected = false;
          }
          this.selected_all = false
        } else {
          for (var i = 0; i < this.goodLits.length; i++) {
            this.goodLits[i].isSelected = true;
          }
          this.selected_all = true
        }
        this.getTotal()
      },
      reduce(index) {
        if (this.goodLits[index].num <= 1) return;
        this.goodLits[index].num--
        this.getTotal()
      },
      add(index) {
        this.goodLits[index].num++
        this.getTotal()
      },
      delshopping() {
        if (this.selected_all == true) {
          this.goodLits = [];
          this.getTotal();
        }
        // 删除时的判断
        for (var i = 0; i < this.goodLits.length; i++) {
          var _d = this.goodLits[i]
          if (_d.isSelected) {
            // console.log(_d)
            this.goodLits.splice(i, 1);
            i--;
            let type=2;
            let id=_d.id;
            this.$store.dispatch('addshoppingcart',{type,id})
            this.getTotal();
            Toast('删除成功');
          }
        }
      },
      getShoppingCart() {
        this.$store.dispatch('getShoppingCart').then(()=>{
          this.goodLits= this.goods.list
        })
      },
      createOrder() {
        // console.log(this.arraychecked.length)
        const the = this
        let arrayChecked = this.arraychecked;
        let data = []
        let cartId = []
        for (let i = 0; i < arrayChecked.length; i++) {
          let id = arrayChecked[i].id
          let product_id = arrayChecked[i].product_id
          let num = arrayChecked[i].num
          let spec = arrayChecked[i].spec
          let name = arrayChecked[i].name
          let cover = arrayChecked[i].cover
          let local_price = arrayChecked[i].price
          let vip_price = arrayChecked[i].vip_price
          let price = 0
          let is_vip = the.$store.state.goods.is_vip
          is_vip == 0 ? price = local_price : price = vip_price
          let shopDetails = {
            id,
            num,
            spec,
            name,
            cover,
            price,
            product_id
          }
          cartId.push(arrayChecked[i].product_id)
          data.push(shopDetails)
        }
        localStorage.setItem('type', '1');
        // console.log(data)
        
       if(this.arraychecked.length > 0){
         this.$router.push({
           path: '/PurchaseOrder',
           query: {
             orderData: {
               data,
               cartId,
               totalPrice:this.totalPrice,
             }
           }
         })
       }

      },
    },


  }
</script>

<style scoped>
  @import '../../../static/font/font.css';

  .shoppingcart_content {
    background: rgba(249, 250, 251, 1);
    height: 1334px;
  }

  .shoppingcart_div {
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    height: 90px;
    line-height: 90px;
    z-index: 10;
    background-color: #ffffff;
  }

  .shoppingcart_div .shoppingcart_check {
    background-size: 16px 28px;
    float: left;
    margin-top: 32px;
    width: 14px;
    height: 26px;
    margin-left: 30px;
  }

  .shoppingcart_div .shoppingcart_mode {
    /*float: left;*/
    width: 144px;
    height: 50px;
    font-size: 36px;
    font-family: PingFangSC-Medium;
    font-weight: 500;
    color: rgba(74, 74, 74, 1);
    line-height: 50px;
    /*margin-top: 19px;*/
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

  .shopping_del {
    width: 64px;
    height: 39px;
    font-size: 32px;
    float: right;
    margin-top: 25px;
    margin-right: 26px;
    font-family: PingFangSC-Medium;
    font-weight: 500;
    color: rgba(74, 74, 74, 1);
    line-height: 39px;
    background-color: #ffffff
  }

  .car-list {
    background: #ffffff;
    margin-top: 92px;
    margin-bottom: 180px;
  }

  .car-item {
    border-bottom: 1px solid #ddd;
    height: 237px;
    display: flex;
    position: relative;
  }

  .car-checkbox {
    display: none;
  }

  .input-block {
    width: 30px;
    height: 55px;
    line-height: 55px;
    flex: 1;
  }

  .input-label {
    cursor: pointer;
    position: absolute;
    width: 32px;
    height: 32px;
    background-image: url('./image/check.png');
    background-size: 32px 32px;
    border-radius: 50%;
    margin-top: 103px;
    margin-left: 28px;
  }

  .input-label_s {
    float: left;
    width: 32px;
    height: 32px;
    background-image: url('./image/check.png');
    background-size: 32px 32px;
    margin-top: 35px;
    margin-left: 28px;
  }

  .input-label:after {
    opacity: 0;
    content: '';
    position: absolute;
    width: 9px;
    height: 5px;
    background: transparent;
    top: 6px;
    left: 6px;
    border: 2px solid #333;
    border-top: none;
    border-right: none;
    -webkit-transform: rotate(-45deg);
    -moz-transform: rotate(-45deg);
    -o-transform: rotate(-45deg);
    -ms-transform: rotate(-45deg);
    transform: rotate(-45deg);
  }

  .car-img {
    width: 184px;
    height: 184px;
    overflow: hidden;
    margin-top: 20px;
    margin-left: 58px;
  }

  .car-item-content {
    flex: 24;
    display: flex;
  }

  .car-img {
    flex: 3;
  }

  .car-cont {
    flex: 7;
    padding: 0 28px 0 24px;
  }

  .car-img img {
    width: 100%
  }

  .shop_top {
    display: flex;
    padding: 20px 0 38px 0;
    align-items: center;
    justify-content: space-between;
  }

  .shop_name {
    font-size: 36px;
    color: #4a4a4a;
  }

  .car-num {
    font-size: 24px;
    color: #bbbbbb;
  }

  .cat-desc {
    text-align: left;
    font-size: 28px;
    line-height: 40px;
  }

  .cat_mony {
    margin-top: 20px;
    text-align: left;
  }

  .mony_zero {
    color: #ff7e00;
    font-weight: 400;
    line-height: 30px;
    font-size: 22px;
  }

  .mony_hua {
    font-size: 20px;
    font-weight: 400;
    line-height: 28px;
    color: #aaaaaa;
    text-decoration: line-through;
    margin-left: 8px;
  }

  .input-label.active {
    cursor: pointer;
    position: absolute;
    width: 32px;
    height: 32px;
    background-image: url('./image/checked.png');
    background-size: 32px 32px;
    border-radius: 50%;
    margin-top: 103px;
    margin-left: 28px;

  }

  .input-label_s.active {
    float: left;
    width: 32px;
    height: 32px;
    background-image: url('./image/checked.png');
    background-size: 32px 32px;
    margin-top: 35px;
    margin-left: 28px;
  }

  .cat-spec{
    text-align: left;
    margin-top: 10px;
    font-size: 20px;
    color: #aaaaaa;
  }
  .car-footer {
    height: 98px;
    background: #ffffff;
    position: fixed;
    bottom: 89px;
    left: 0;
    right: 0;
  }

  .foot-car {
    height: 60px;
    float: left;
  }

  .foot_all {
    float: left;
    width: 56px;
    height: 40px;
    font-size: 28px;
    font-family: PingFangSC-Regular;
    font-weight: 400;
    color: rgba(74, 74, 74, 1);
    line-height: 40px;
    margin-top: 32px;
    margin-left: 18px;
  }

  .total-cont {
    height: 40px;
    font-size: 28px;
    font-family: PingFangSC-Regular;
    font-weight: 400;
    color: rgba(74, 74, 74, 1);
    line-height: 40px;
    float: left;
    margin-top: 34px;
    margin-left: 38px;
  }

  .total-cont span {
    display: inline-block;
    margin-left: 12px;
  }

  .btn-box {
    float: right;
    height: 98px;
    width: 251px;
    line-height: 98px;
    border-bottom: 1px solid #eeeeee
  }

  .btn-box .buy_link {
    width: 250px;
    height: 98px;
    background: linear-gradient(90deg, rgba(255, 161, 44, 1) 0%, rgba(255, 121, 19, 1) 100%);
    font-size: 36px;
    font-family: PingFangSC-Medium;
    font-weight: 500;
    color: rgba(255, 255, 255, 1);
    line-height: 50px;
  }

  input::-webkit-input-placeholder {
    width: 191px;
    height: 40px;
    font-size: 28px;
    font-family: PingFangSC-Regular;
    font-weight: 400;
    color: rgba(187, 187, 187, 1);
    line-height: 40px;
  }

  .num {
    width: 200px;
    position: absolute;
    right: 42px;
    bottom: 10px;
  }

  .num_left {
    float: left;
  }

  .num_left .num_reduce {
    margin-top: 10px;
    float: left;
    width: 44px;
    height: 44px;
    background-image: url('./image/reduce.png');
    background-repeat: no-repeat;
    background-position: 18px 10px;
    background-size: 16px 4px;
    border-radius: 2px;
  }

  .num .num_nu {
    display: inline-block;
    width: 76px;
    height: 44px;
    background: rgba(246, 246, 246, 1);
    text-align: center;
    line-height: 44px;
  }

  .num_right {
    float: right;
  }

  .num .num_add {
    display: inline-block;
    width: 44px;
    height: 44px;
    background-image: url('./image/plus.png');
    background-repeat: no-repeat;
    background-position: 16px 11px;
    background-size: 16px 16px;
    border-radius: 2px;
  }

</style>
