<template>
    <div>
       <div class="address_div">
            <img src="./image/huitui.png" alt="协议按钮"  class="address_check" @click="memship">
            <span  class="address_mode">购买记录</span>
      </div>
       <div class="page-loadmore-wrapper" :style="{ height: wrapperHeight + 'px' }">
            <mt-loadmore :top-method="loadTop" @top-status-change="handleTopChange"
                         :bottom-method="loadBottom" @bottom-status-change="handleBottomChange"
                         :bottom-all-loaded="allLoaded" :auto-fill="false" ref="loadmore">
                <!-- :auto-fill="true" 时页面加载完毕时 默认执行loadBottom 值为false时 自己写一个加载 -->
                           <div class="record_content">
                                <div class="content_zero" v-for="item in likeList" :key='item.id'>
                                    <div>
                                        <span class="content_a">订单：{{item.order_sn}}</span>
                                        <span class="content_b">{{item.create_at}}</span>
                                    </div>
                                    <div>
                                        <span class="content_c">{{item.info}}</span>
                                        <span class="content_d">{{item.price}}元</span>
                                    </div>
                                    <span class="content_e">有效期截止：{{item.end_at}}</span>
                                </div>
                            </div>

                <div slot="top" class="mint-loadmore-top" style="text-align:center">
                <span v-show="topStatus !== 'loading'" :class="{ 'is-rotate': topStatus === 'drop' }">↓</span>
                <mt-spinner v-show="topStatus == 'loading'" color="#26a2ff"></mt-spinner>
                 </div>
                 <div v-if="allLoaded" style="text-align:center;" class="data-none">没有更多数据了</div>
                 <div slot="bottom" class="mint-loadmore-bottom">
                    <span v-show="bottomStatus !== 'loading'" :class="{ 'is-rotate': bottomStatus === 'drop' }">↑</span>
                    <span v-show="bottomStatus === 'loading'">
                        <mt-spinner v-show="bottomStatus == 'loading'" color="#26a2ff"></mt-spinner>
                    </span>
                 </div>
            </mt-loadmore>
      </div>
    </div>
</template>
<script>
import { Toast, MessageBox } from 'mint-ui'
import {mapState} from 'vuex'; 
import { addressListed, delAddressList, defaultAddressList } from '../../api'
import { Loadmore } from 'mint-ui';
import Vue from 'vue'
Vue.component(Loadmore.name, Loadmore);
import { Spinner } from 'mint-ui';
Vue.component(Spinner.name, Spinner);
export default {
    data(){
        return{
            pageNum :1,
            next:0,
            examplename: 'Loadmore',
            allLoaded: false,//数据是否加载完毕
            bottomStatus: '',//底部上拉加载状态
            wrapperHeight: 0,//容器高度
            topStatus: '',//顶部下拉加载状态
            serchdata:false,
            likeList:[],
            next:null,
        }
    },
    mounted(){
        this.getrecord();
        let windowWidth = document.documentElement.clientWidth;//获取屏幕宽度
        if (windowWidth >= 768) {//这里根据自己的实际情况设置容器的高度
            this.wrapperHeight = document.documentElement.clientHeight - 105;
        } else {
            this.wrapperHeight = document.documentElement.clientHeight - 80;
        }
    },
    computed:{
        ...mapState(['viprecord']),
    },
    methods:{
       memship(){
           this.$router.go(-1)
       },
       getrecord(){
           this.$store.dispatch('getshiprecord',this.pageNum).then(()=>{
               this.next=this.viprecord.next;
               this.likeList=this.viprecord.list;
           })
       },
        handleBottomChange(status) {
          this.bottomStatus = status;
       },
        loadBottom() {
            this.handleBottomChange("loading");//上拉时 改变状态码
            this.pageNum += 1;
            setTimeout(() => {//上拉加载更多 模拟数据请求这里为了方便使用一次性定时器
                if (this.next) {//最多下拉三次
                    this.$store.dispatch('getshiprecord',this.pageNum).then(()=>{
                        this.next=this.viprecord.next;
                        for(let i=0; i<this.viprecord.list.length;i++){
                            this.likeList.push(this.viprecord.list[i]);
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
            this.pageNum = 1;
            this.allLoaded = false;//下拉刷新时解除上拉加载的禁用
            setTimeout(() => {
                this.$store.dispatch('getshiprecord',this.pageNum).then(()=>{
                        this.next=this.viprecord.next;
                        this.likeList=this.viprecord.list;
                })
                //下拉刷新 数据初始化
                this.handleTopChange("loadingEnd")//数据加载完毕 修改状态码
                this.$refs.loadmore.onTopLoaded();
            }, 2000);
        },
   }
}
</script>
<style  scoped>
@import '../../../static/font/font.css';
.address_div{
    height: 91px;
    background:rgba(243, 117, 5, 1);
}
.address_div .address_check{
    background-size: 16px 28px;
    float: left;
    margin-top: 32px;
    width:14px;
    height:26px;
    margin-left:30px;
}
.address_div .address_mode{
    float: left;
    width:144px;
    height:50px;
    font-size:36px;
    font-family:PingFangSC-Medium;
    font-weight:500;
    color:rgba(255,255,255,1);
    line-height:50px;
    margin-top:19px;
    margin-left: 262px;
}
.content_zero{
    height: 170px;
    border-bottom: 1px solid #eeeeee;
}
.content_zero div{
    height: 50px;
}
.content_zero .content_a{
    float: left;
    margin-top: 20px;
    margin-left: 20px;
    color: #9b9999;
    font-size: 24px;
}
.content_zero .content_b{
    float:right;
    margin-top: 20px;
    margin-right: 10px;
    color: #9b9999;
    font-size: 24px;
}
.content_zero .content_c{
     float: left;
    margin-top: 20px;
    margin-left: 20px;
    font-size: 24px;
}
.content_zero .content_d{
    float:right;
    margin-top: 20px;
    margin-right: 10px;
    font-size: 24px;
}
.content_zero .content_e{
    float: left;
    margin-top: 20px;
    margin-left: 20px;
    font-size: 24px;
    color: #9b9999;
}
</style>

