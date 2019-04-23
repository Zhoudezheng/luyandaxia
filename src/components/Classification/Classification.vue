<template>
  <div class="class_warp">
    <div class="class_head">
      <div class="back" @click="back"></div>
      <div>{{name}}</div>
    </div>
     <div class="page-loadmore-wrapper" :style="{ height: wrapperHeight + 'px' }">
            <mt-loadmore :top-method="loadTop" @top-status-change="handleTopChange"
                         :bottom-method="loadBottom" @bottom-status-change="handleBottomChange"
                         :bottom-all-loaded="allLoaded" :auto-fill="false" ref="loadmore">
                <!-- :auto-fill="true" 时页面加载完毕时 默认执行loadBottom 值为false时 自己写一个加载 -->
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

                <div slot="top" class="mint-loadmore-top" style="text-align:center">
                <span v-show="topStatus !== 'loading'" :class="{ 'is-rotate': topStatus === 'drop' }"></span>
                <mt-spinner v-show="topStatus == 'loading'" color="#26a2ff"></mt-spinner>
              </div>
              <div v-if="allLoaded" style="text-align:center;" class="data-none">没有更多数据了</div>
              <div slot="bottom" class="mint-loadmore-bottom">
                <span v-show="bottomStatus !== 'loading'" :class="{ 'is-rotate': bottomStatus === 'drop' }"></span>
                <span v-show="bottomStatus === 'loading'">
                    <mt-spinner v-show="bottomStatus == 'loading'" color="#26a2ff"></mt-spinner>
                </span>
              </div>
        </mt-loadmore>
      </div>
  </div>
</template>

<script>
  import {mapState} from 'vuex'
  export default {
    data() {
      return {
        id: '',
        name: '',
        pageNum: 1,//页码
        list: 0,//数据
        allLoaded: false,//数据是否加载完毕
        bottomStatus: '',//底部上拉加载状态
        wrapperHeight: 0,//容器高度
        topStatus: '',//顶部下拉加载状态
        serchdata:false,
        likeList:[],
        next:null,
      }
    },
    mounted() {
      this.getCalls()
      this.getProductList();
      let windowWidth = document.documentElement.clientWidth;//获取屏幕宽度
      if (windowWidth >= 768) {//这里根据自己的实际情况设置容器的高度
          this.wrapperHeight = document.documentElement.clientHeight - 105;
      } else {
          this.wrapperHeight = document.documentElement.clientHeight - 80;
      }
      setTimeout(() => {//页面挂载完毕 模拟数据请求 这里为了方便使用一次性定时器
        var lit = this.$store.state.productList.list;
        this.next=this.$store.state.productList.next;
        for(let i=0; i<lit.length;i++){
          this.likeList.push(lit[i]);
        }
      }, 1500)
    },
    computed: {
      ...mapState(['productList'])
    },
    methods: {
      getCalls() {
        this.id = localStorage.getItem('allList');
        this.name = localStorage.getItem('allListed');
      },
      back() {
        this.$router.go(-1)
        this.productList.list = {}
      },
      getProductList(){
        let category_id = this.id;
        let type = 0;
        let page=this.pageNum;
        this.$store.dispatch('getProductList',{page,category_id,type}).then(()=>{
            console.log(this.productList)
        })
      },
      toDetails(id){
        localStorage.setItem('product_id',id)
        this.$router.push({
          path:'/CommodityDetails',
          query:{
            data:{
              id
            }
          }
        })
      },

      handleBottomChange(status) {
          this.bottomStatus = status;
      },
      loadBottom() {
          this.handleBottomChange("loading");//上拉时 改变状态码
          this.pageNum += 1;
          let page =this.pageNum;
          let category_id = this.id;
          let type=0;
          setTimeout(() => {//上拉加载更多 模拟数据请求这里为了方便使用一次性定时器
              if (this.next) {//最多下拉三次
                   this.$store.dispatch('getProductList',{page,category_id,type}).then(()=>{
                     this.next=this.productList.next;
                     for(let i=0; i<this.productList.list.length;i++){
                        this.likeList.push(this.shopslike.list[i]);
                      }
                  })
                  //上拉加载 每次数值加12
              } else {
                  this.allLoaded = true;//模拟数据加载完毕 禁用上拉加载
              }
              this.handleBottomChange("loadingEnd");//数据加载完毕 修改状态码
              this.$refs.loadmore.onBottomLoaded();
          }, 2000);
      },
      handleTopChange(status) {
          this.topStatus = status;
      },
      loadTop() {//下拉刷新 模拟数据请求这里为了方便使用一次性定时器
          this.handleTopChange("loading");//下拉时 改变状态码
          var page = 1;
          this.allLoaded = false;//下拉刷新时解除上拉加载的禁用
          let category_id = this.id;
          let type=0;
          setTimeout(() => {
              this.$store.dispatch('getProductList',{page,category_id,type}).then(()=>{
                       this.next=this.productList.next;
                       this.likeList=this.productList.list;
              })
              //下拉刷新 数据初始化
              this.handleTopChange("loadingEnd")//数据加载完毕 修改状态码
              this.$refs.loadmore.onTopLoaded();
          }, 2000);
      },
    }
  }
</script>

<style scoped>
  .class_head {
    position: fixed;
    background-color: #ffffff;
    z-index: 200;
    height: 128px;
    text-align: center;
    line-height: 128px;
    font-size: 26px;
    top: 0;
    right: 0;
    top:0;
    color: #4a4a4a;
    width: 100%;
    /* border-bottom: 1px solid #F1F1F1; */
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
  /* .class_list{
    margin-top: 128px;
  } */
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
  .mint-loadmore-bottom,.mint-loadmore-top,.center{
    margin-left: 350px;
  }
  .mint-loadmore-top{
    margin-top: 50px;
  }
  .data-none{
    margin-bottom: 40px;
  }
</style>
