<template>
  <div class="class_warp">
    <div class="class_head">
      <div class="back" @click="back"></div>
      <div>{{name}}</div>
    </div>
    <div class="class_list">
      <div class="list_item" v-for="(item) in productList.list" @click="toDetails(item.id)">
        <div class="img_warp">
          <img class="item_img" :src="item.cover" alt="cover">
        </div>
        <div class="item_details">
          <div class="item_name">{{item.name}}</div>
          <div class="item_vip">
            <span>Vip会员价：</span>
            <span>￥{{item.vip_price}}</span>
          </div>
          <div class="item_price">
            <span class="price">￥{{item.price}}</span>
            <span class="local_price">￥{{item.local_price}}</span>
          </div>
          <div class="pay_num">已有{{item.pay_num}}人购买</div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  import {mapState} from 'vuex'
  export default {
    data() {
      return {
        id: '',
        name: ''
      }
    },
    mounted() {
      this.getCalls()
      this.getProductList()
    },
    computed: {
      ...mapState(['productList'])
    },
    methods: {
      getCalls() {
        this.id = this.$route.query.classData.id
        this.name = this.$route.query.classData.name
      },
      back() {
        this.$router.go(-1)
      },
      getProductList(){
        let category_id = this.id
        let type = 0
        this.$store.dispatch('getProductList',{category_id,type})
      },
      toDetails(id){
        this.$router.push({
          path:'/CommodityDetails',
          query:{
            data:{
              id
            }
          }
        })
      }
    }
  }
</script>

<style scoped>
  .class_head {
    height: 128px;
    text-align: center;
    line-height: 128px;
    font-size: 26px;
    color: #4a4a4a;
    border-bottom: 1px solid #F1F1F1;
  }

  .back {
    width: 50px;
    height: 50px;
    display: inline-block;
    position: absolute;
    top: 35px;
    left: 20px;
    background: url("./images/back.png") no-repeat center;
    background-size: 13px 22px;
  }

  .list_item {
    height: 220px;
    display: flex;
    padding: 10px 30px 0 30px;
    margin-top: 20px;
  }

  .img_warp {
    width: 184px;
    height: 184px;
    overflow: hidden;
  }

  .item_img {
    width: 184px;
    height: 184px;
  }

  .item_details {
    flex: 1;
    padding-left: 30px;
    font-size: 28px;
    text-align: left;
    border-bottom: 1px solid #F1F1F1;
  }

  .item_vip, .price {
    color: #FF7E00;
    line-height: 50px;
  }

  .local_price {
    color: #aaaaaa;
    text-decoration:line-through;
    margin-left: 20px;
  }

  .item_name {
    font-weight: 600;
    line-height: 60px;

  }
  .pay_num{
    line-height: 50px;
  }

</style>
