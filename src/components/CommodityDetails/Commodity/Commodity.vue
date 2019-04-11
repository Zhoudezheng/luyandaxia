<template>
  <div class="commodity">
      <p v-html="code"></p>
  </div>
</template>

<script>
  export default {
    data(){
      return {
        productdata:{},
        code:this.$store.state.commonlist.info
      }
    },
  }
</script>

<style scoped>
  @import '../../../../static/font/font.css';
.commodity{
    text-align: left;
    margin-bottom: 100px;
}
.commodity img{
    width: 100%;
}

</style>
