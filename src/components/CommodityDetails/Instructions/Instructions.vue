<template>
  <div class="instruction_part">
    <div class="instructions" v-for="(item) in evaluateList && evaluateList.list">
        <img class="user_avatar" :src="item.avatar" alt="">
        <div class="user_info">
            <div class="user_name">{{item.nickname}}</div>
            <div class="user_time">{{item.create_at}}</div>
        </div>
        <div class="content">
          <div class="user_content">{{item.review_content}}</div>
          <img :preview="index" class="image_content" v-for="(img,index) in item.image && item.image.split(',')" :src="img" alt="" >
        </div>
    </div>
  </div>
</template>

<script>
  import {mapState} from 'vuex'
  export default {
    data(){
      return {
      }
    },
     computed: {
      ...mapState(['evaluateList']),
     },
     mounted(){
       this.getList()
     },
     methods:{
       getList() {
        let id = this.$route.query.data.id
        console.log(id)
        this.$store.dispatch('getEvaluate_list', id).then(()=>{
           if(typeof(this.evaluateList.image)!='undefined')
           {
             console.log('imglist',this.evaluateList.image)
              
           }
        })
      },
     }
  }
</script>

<style scoped>
  @import '../../../../static/font/font.css';
  .instruction_part{
    margin-bottom: 60px;
  }
  .instructions{
    overflow: hidden;
    border-bottom: 1px solid #eee;
    margin-top: 10px;
  }
  .instructions .user_info{
    float: left;
    margin-top: 28px;
    margin-left: 28px;
    font-size: 28px;
    font-family: PingFangSC-Regular;
  }
  .instructions .user_avatar{
   float: left;
    width: 60px;
    height: 60px;
    border-radius: 50%; 
    margin: 28px 0 28px 28px;
  }
  .instructions .user_name{
    text-align: left;
    margin-bottom: 14px
  }
  .instructions .user_time{
     text-align: left;
  } 
  .instructions .content{
    margin-left: 28px;
    float: left;
    margin-bottom: 48px;
    width: 100%;
  }
  .instructions .user_content{
      width: 100%;
      text-align: left;
      word-break: break-word;
  }
  .instructions .image_content{
    float: left;
    width:100px;
    height: 100px;
    margin: 28px 28px 28px 0px;
  }

</style>
