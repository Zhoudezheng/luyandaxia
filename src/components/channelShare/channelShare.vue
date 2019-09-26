<template>
  <div class="channelShare">
    <div class="heard">
      <div class="shareheard" :style="{backgroundImage: 'url(' + (coverImgUrl ? coverImgUrl : baseImg) + ')'}">
      </div>
      <div class="maskheard">
        <div class="heard_a">
            <img :src="avater" class="avater">
            <div class="body">
               <div class="title">
                <span>{{name}}</span>
                <!-- <span class="title_b">已订阅</span> -->
               </div>
               <div class="subtitle">{{introduction}}</div>
            </div>
            <img src="../../assets/go.png" class="godetail" @click="tochannelDeta">
        </div>
      </div>
    </div>
    <div class="sharebody">
      <mt-loadmore :top-method="loadTop" 
      :bottom-method="loadBottom" 
      :bottom-all-loaded="allLoaded" 
      :auto-fill="false"
      ref="loadmore">
        <div v-for="(item,index) of dataList" class="body" :key="index" @click="isclick ? tolivesharing(item):''">
            <img :src="item.cover" class="body_avar">
            <div>
                <div class="body_tit">{{item.title}}</div>
                <div class="boby_subtit">
                    <span class="subtit_a">{{item.status}}</span>
                    <span class="subtit_b" v-show="item.is_vip !== 0">{{item.is_vip}}</span>
                </div>
                <div class="body_deta">
                    <span class="deta_a"><img src="../../assets/time.png" class="a_a">{{item.create_at}}</span>
                    <span class="deta_b"><img src="../../assets/look.png" class="b_a">{{item.pv}}</span>
                </div>
            </div>
        </div>
      </mt-loadmore>
    </div>
  </div>
</template>

<script>
  import {mapState} from 'vuex'
  import { reqpublisher, reqsharingList} from '../../api'
  import Vue from 'vue'
  import { Loadmore } from 'mint-ui';
  Vue.component(Loadmore.name, Loadmore);
  export default {
    data() {
      return {
        coverImgUrl:'',
        baseImg:'',
        avater:'',
        id:'',
        name:'',
        introduction:'',
        info:'',
        dataList:[],
        nextList:'',
        page:1,
        allLoaded: false,//数据是否加载完毕
        isclick:true
      }
    },
    mounted:function(){
      let url =  window.location.search
      function GetQueryString(name){
         var reg = new RegExp("(^|&)"+ name +"=([^&]*)(&|$)");
         var r = window.location.search.substr(1).match(reg);
         if(r!=null)return  unescape(r[2]); return null;
      }
      this.id = GetQueryString('id',url)
      this.load();
      let scrollTimer;
      document.addEventListener("touchend", () => {
        clearTimeout(scrollTimer);
        scrollTimer = setTimeout(() => {
          this.isclick = true
        }, 300);
      });
      let scrollTimerd
      document.addEventListener("touchmove", () => {
        clearTimeout(scrollTimerd);
        this.isclick = false
      });
    },
    watch:{
      url(){
        this.load()
      },
    },
    methods: {
      load () {
       let id = this.id;
       reqpublisher(id).then((result)=>{
          let data =result.data;
          this.coverImgUrl = data.cover;
          this.avater = data.avatar;
          this.name = data.name;
          this.introduction = data.introduction;
          this.info = data.info;
       })
       this.getsharingList();
      },
      getsharingList () {
        let obj = {page:this.page,type:0,channel:this.id}
        reqsharingList(obj).then((result)=>{
          if(this.page === 1){
            let data=result.data.list;   
            this.nextList = result.data.next;       
            data.map(item=>{
                if(item.status === 1){
                item.status = '直播中' 
                }else if (item.status === 0){
                item.status = '预告' 
                }else {
                item.status = '回顾' 
                }
                //  0免费 1vip免费 2vip专享
                if(item.is_vip === 0){
                 item.is_vip = 0
                }else if(item.is_vip === 1){
                item.is_vip = '付费'
                }else {
                item.is_vip = 'VIP'
                }
            })
            this.dataList =data 
            this.$refs.loadmore.onBottomLoaded();
          }else{
            let data=result.data.list;   
            this.nextList = result.data.next;       
            data.map(item=>{
                if(item.status === 1){
                item.status = '已开播' 
                }else if (item.status === 0){
                item.status = '未开播' 
                }else {
                item.status = '已结束' 
                }
                //  0免费 1vip免费 2vip专享
                if(item.is_vip === 0){
                item.is_vip = '免费'
                }else if(item.is_vip === 1){
                item.is_vip = 'vip免费'
                }else {
                item.is_vip = 'vip专享'
                }
            })
            this.dataList =this.dataList.concat(data);
            this.$refs.loadmore.onBottomLoaded();
          }
       })
      },
      tochannelDeta () {
        localStorage.setItem('chanelData',this.info)
        this.$router.push('/chanelDetail')
      },
      loadTop() {
        this.isclick = false
        this.page = 1;
        this.getsharingList();
        this.allLoaded = false;// 若数据已全部获取完毕
        this.$refs.loadmore.onTopLoaded();
      },
      loadBottom() {
        this.isclick = false
        if(this.nextList === 1){
         this.page = ++this.page
         this.getsharingList();
        }else{
          this.allLoaded = true;// 若数据已全部获取完毕
          this.$refs.loadmore.onBottomLoaded();
        }
      },
      tolivesharing (item) {
        this.$router.push(`/liveSharing/introduction?id=${item.id}`)
      }
    }
  }
</script>
<style scoped>
.channelShare .heard{
  height: 400px;
  position: relative;
}
.channelShare .heard .shareheard{
  width: 100%;
  height: 100%;
  background-size: 100% 100%;
}
.channelShare .heard .maskheard{
  position: absolute;
  height: 100%;
  width: 100%;
  top: 0;
  left: 0;
  right: 0;
  background: rgba(0, 0, 0, 0.5)
}
.maskheard .heard_a .avater{
  float: left;
  margin-top: 100px;
  margin-left: 50px;
  width: 200px;
  height: 200px;
  border-radius: 20px;
}
.heard_a .body{
  float: left;
  overflow: hidden;
  margin-top: 120px;
  margin-left: 30px;
}
.heard_a .body .title{
  color: white;
  font-size: 32px;
  text-align: left;
  width: 350px;
  overflow: hidden;
  text-overflow:ellipsis;
  white-space: nowrap;
}
/* .title .title_b{
  width: 120px;
  height: 40px;
  line-height:40px ;
  border-radius: 20px;
  font-size: 18px;
  background:rgb(238, 121, 19);
  display: inline-block;
} */
.subtitle{
  display: inline-block;
  color: #ffffff;
  margin-top: 20px;
  line-height: 40px;
  font-size: 28px;
   width: 400px;
   text-align: left;
  display: -webkit-box;
  -webkit-line-clamp:2;
  overflow: hidden;
  text-overflow: ellipsis;
  -webkit-box-orient: vertical;
}
.godetail{
  float: right;
  width: 30px;
  height: 30px;
  margin-top: 200px;
  margin-right: 25px;
}
.sharebody{
 height: 904px;
 overflow: hidden;
 overflow-y: scroll;
 padding-top: 20px;
}
::-webkit-scrollbar {/*隐藏滚轮*/
  display: none;
}
.sharebody .body{
  padding: 20px 10px;
  border-bottom: 1PX solid #eeeeee;
  overflow: hidden;
}
.sharebody .body_avar{
  float: left;
  width: 280px;
  height: 180px;
}
.body .body_tit{
 float: left;
 width: 420px;
 text-align: left;
 margin-top: 20px;
 margin-left: 10px;
 font-size: 32px;
 overflow: hidden;
 text-overflow:ellipsis;
 white-space: nowrap;
}
.body .boby_subtit{
 float: left;
 width: 400px;
 text-align: left;
 margin-left: 10px;
 margin-top: 20px;
 color: #807e7e;
}
.boby_subtit .subtit_b{
  width: 80px;
  height: 30px;
  text-align: center;
  line-height: 30px;
  font-size: 14px;
  margin-left: 10px;
  color: #ffffff;
  display: inline-block;
  border-radius: 20px;
  background:rgb(236, 57, 33);
}
.body_deta{
 float: left;
 margin-left: 10px;
 margin-top: 25px;
}
.body_deta .deta_a .a_a{
  width: 30px;
  height: 30px;
  vertical-align: bottom;
  margin-right: 10px;
}
.body_deta .deta_b .b_a{
  width: 30px;
  height: 30px;
  vertical-align: bottom;
  margin-right: 10px;
}
.body_deta .deta_a,.deta_b{
   color: #807e7e;
}
</style>
