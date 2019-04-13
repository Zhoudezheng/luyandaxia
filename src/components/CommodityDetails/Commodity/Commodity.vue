<template>
  <div class="commodity" >
      <p id="detail" v-html="commonlist.info"></p>
  </div>
</template>

<script>
  import {mapState} from 'vuex'
  export default {
    data(){
      return {
        //productdata:{},
        //code:this.$store.state.commonlist.info
      }
    },
     computed: {
      ...mapState(['commonlist']),
     }
  }
</script>

<style scoped>
  @import '../../../../static/font/font.css';
.commodity{
    text-align: left;
    margin-bottom: 100px;
    width: 100% !important;
}
#detail /deep/ img {
  width: 100% ;
} 

</style>
