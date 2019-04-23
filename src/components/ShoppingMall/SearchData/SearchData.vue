<template>
    <!--右侧带图标的输入框,长度限制为40个字符,禁止输入表情和某一些特殊元素 -->
 <div class="search">
  <div class="input_co_type">
    <div class="inputicon">
      <img src="./image/group.png">
    </div>
    <input type="text" placeholder="请输入搜索关键字" v-model="inputvalue" class="input_type" maxlength="40" @change="changeEvent" @keydown="search2($event)"/>
     <div class="inputiconed" @click="clearvalue">
      <img src="./image/ee.png">
    </div>
  </div>
  <div class="search_div" @click="delsearch">取消</div>

  <div class="searchostory" v-if="isshowhostory">
      <div class="hostory_s">搜索历史</div>
      <img src="./image/del.png" alt="删除" class="hostory_y" @click="delhostory">
      <div class="HistoryListdata">
          <span v-for=" (item,index) in HistoryListdata" @click="search12(item)">{{item}}</span>
      </div>
  </div>
      <div class="shopping_footer" v-else="!isshowhostory">
      <div class="shopping_list" v-for="(item) in searchlist" :key="item.id" @click="todetail(item.id)">
        <img :src="item.cover" alt="1111" class="list_img">
        <span class="list_a1">{{item.name}}</span>
        <div class="title_a2">VIP会员价:¥{{item.vip_price}}</div>
        <div class="title_a3">
           <span class="a3_a">¥{{item.price}}</span>
           <span class="a3_b">¥{{item.local_price}}</span>
        </div>
        <div class="title_a4">已有{{item.pay_num}}人购买</div>
      </div>
  </div>
 </div>
</template>
 
<script>
    import {mapState} from 'vuex'
    import { Toast } from 'mint-ui';
    export default {
        data() {
            return {
              inputvalue:'',
              isshowhostory:true,
              HistoryList:(window.localStorage.getItem('HistoryList') && JSON.parse(window.localStorage.getItem('HistoryList')))||[],
              HistoryListdata:(JSON.parse(window.localStorage.getItem('HistoryList'))&&JSON.parse(window.localStorage.getItem('HistoryList')))||[],
              inputOtion:{
                  type:Object,
                  default:{
                        autostorage:true,  //是否自动缓存，该值设置为true时必须设置storagename的值
                        storagename:''    //缓存变量存储的变量名称
                  }
              },
            }
        },
        computed: {
          ...mapState(['shops','searchlist'])
        },
        methods: {
          clearvalue(){
            this.inputvalue='';
            this.isshowhostory=true;
             this.HistoryListdata= JSON.parse(window.localStorage.getItem('HistoryList'));
          },
          delhostory(){
             var a=[];
             this.HistoryListdata=window.localStorage.setItem('HistoryList', JSON.stringify(a));
             Toast('删除成功')
          },
          delsearch(){
           this.$emit('searchlist',false)
          },
          changeEvent(){
            if(this.inputOtion.autostorage){
              window.localStorage.setItem(this.inputOtion.storagename,this.inputvalue);
            }
          },
          changeValue:function(value){
            this.inputvalue =value;
          },
          search(){
             this.isshowhostory=false;
             if(this.inputvalue == ''){
                 this.isshowhostory=true
                 this.HistoryListdata= JSON.parse(window.localStorage.getItem('HistoryList'));
             } else{
                this.$store.dispatch('getsearchShopping',this.inputvalue);
             } 
             var val = this.inputvalue.trim() // 清除空格
             if (this.HistoryList.length > 0 && val != '') { // 有数据的话 判断
                if (this.HistoryList.indexOf(val) !== -1) { // 有相同的，先删除 再添加 
                this.HistoryList.splice(this.HistoryList.indexOf(val), 1)
                this.HistoryList.unshift(val)
                } else { // 没有相同的 添加
                this.HistoryList.unshift(val)
                }
             } else if(val != '') { // 没有数据 添加
                this.HistoryList.unshift(val)
             }
             if (this.HistoryList.length > 6 && val !='') { // 保留六个值
                this.HistoryList.pop()
             }
             localStorage.setItem('HistoryList', JSON.stringify(this.HistoryList));
          },
          search12(item){
              this.$store.dispatch('getsearchShopping',item);
              this.inputvalue=item;
              this.isshowhostory=false;
          },
          search2(ev){
            if(ev.keyCode == 13) {  //键盘回车的编码是13
              this.search();
            }
          },
          todetail(id){
            this.$router.push({
            path: '/commoditydetails',
            query:{
                data:{
                id
                }
            }
            })
          },
        },
      watch:{
        inputvalue:function(val){
          this.inputvalue =  val.replace(/[^\u4E00-\u9FA5|\d|\a-zA-Z|\r\n\s,.?!，。？！…—&$=()-+/*{}[\]]|\s/g, '')
        }
      },
    }
</script>
 
<style scoped>
  .search{
    height: 100%;
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    z-index: 40;
    background-color: white
  }
  .mint-searchbar{
    height: 60px;
  }

.input_co_type{
    float: left;
  width:85%;
  height:48px;
  background: #eeeeee;
  margin-top: 10px;
  display: flex;
  margin-left: 15px;
}
  .input_type{
    height:48px;
    border: none;
    font-size: 14px;
    color: #333333;
    letter-spacing: 0;
    padding-left:12px;
    background-color: #eeeeee;
    flex:1;
    outline: none;
  }
  .inputicon{
    width:40px;
    height:48px;
    margin-left:15px;
  }
  .inputicon>img{
    position:relative;
    width:30px;
    height:30px;
    padding-top:10px;
    padding-right:10px;
}
  .inputiconed{
    width:40px;
    height:48px;
    margin-left:15px;
  }
  .inputiconed>img{
    position:relative;
    width:22px;
    height:22px;
    padding-top:15px;
    padding-right:10px;

}
.search_div{
    float: left;
    margin-top: 23px;
    margin-left: 23px;
    font-size: 28px;
}
.searchostory{
    width: 100%;
    float: left;
    margin-left: 15px;
    text-align: left;
    margin-top: 30px;
}
.searchostory .hostory_s{
    float: left;
    width: 30%;
    font-size: 28px;
    margin-top: 5px;
}
.searchostory .hostory_y{
    float:right;
    width: 35px;
    height: 35px;
    margin-right: 45px;
    margin-top: 5px;
}
 .shopping_footer {
    float: left;
    margin-top: 30px;
  }

  .shopping_list {
    height: 183px;
    border-bottom: 1px solid #eee;
    margin-top: 10px;
  }

  .shopping .shopping_list .list_img {
    float: left;
    width: 170px;
    height: 127px;
    margin: 28px 28px 0 28px;
  }

  .shopping_list a {
    text-decoration: none;
  }

  .shopping_list .list_a1 {
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
    float: left;
    margin-top: 25px ;
    width: 434px;
    height: 40px;
    font-size: 28px;
    font-family: PingFangSC-Medium;
    font-weight: 500;
    color: rgba(74, 74, 74, 1);
    line-height: 40px;
    text-align: left
  }

  .shopping_list .list_a2 {
    float: left;
    margin: 0 0 28px 0px;
    width: 434px;
    height: 68px;
    font-size: 24px;
    font-family: PingFangSC-Regular;
    font-weight: 400;
    color: rgba(102, 102, 102, 1);
    line-height: 33px;
    text-align: left
  }
  
  .shopping_list .title_a2 {
    float: left;
    text-align: left;
    height: 33px;
    width: 434px;
    font-size: 28px;
    font-family: PingFangSC-Regular;
    font-weight: 500;
    color: red;
    line-height: 33px;
  }

  .shopping_list .title_a3 {
    float: left;
    width: 434px;
    text-align: left;

  }

  .title_a3 .a3_a {
    height: 33px;
    font-size: 28px;
    font-family: PingFangSC-Regular;
    font-weight: 500;
    color: orange;
    line-height: 33px;
  }

  .title_a3 .a3_b {
    display: inline-block;
    margin-left: 50px;
    height: 33px;
    font-size: 28px;
    font-family: PingFangSC-Regular;
    font-weight: 400;
    color: rgba(102, 102, 102, 1);
    line-height: 33px;
    text-decoration: line-through;
  }
  .title_a4{
    float: left;
    width: 434px;
    text-align: left;
    font-size: 28px;
    font-family: PingFangSC-Regular;
    font-weight: 400;
    color: rgba(102, 102, 102, 1);
    line-height: 33px;
  }
.HistoryListdata{
    float: left;
    width: 100%;
    margin-top: 30px;
    margin-right: 25px;
}
.HistoryListdata span{
    display: inline-block;
    height: 40px;
    border-radius:15px;
    padding-left: 10px;
    padding-right: 10px;
    background-color: #eeeeee;
    margin-right: 15px;
    font-size: 28px;
    line-height: 40px;
}
</style>
