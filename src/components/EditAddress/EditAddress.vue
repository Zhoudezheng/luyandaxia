<template>
    <div>
      <div class="address_div">
            <img src="./image/huitui.png" alt="回退"  class="address_check" @click="address">
            <span  class="address_mode">编辑地址</span>
      </div>
      <form>
        <div class="address_user">
            <span class="ico_head">收货人:</span>
            <input  type="tel" maxlength="16" class="user_input" placeholder="请输入收货人姓名" v-model="consignee"  @blur.prevent="inputLoseFocus">
         </div>
         <div class="address_user">
            <span class="ico_head">手机号码:</span>
            <input  type="tel" maxlength="16" class="user_input" placeholder="请输入手机号码" v-model="phonenumber"  @blur.prevent="inputLoseFocus">
         </div>
         <div class="address_user">
            <span class="ico_head">所在地区:</span>
            <img src="./image/go.png" alt="选择地址" class="address_go" @click="showAddressPicker" >
            <input  type="tel" maxlength="16" class="user_input" placeholder="请选择" v-model="location"  @blur.prevent="inputLoseFocus" @click="showAddressPicker" >
         </div>
         <div class="address_user">
            <span class="ico_head">详细地址:</span>
            <input  type="tel" maxlength="32" class="user_input" placeholder="请输入小区/楼号/门牌号" v-model="detailed"  @blur.prevent="inputLoseFocus">
         </div>
      </form>
      <div class="footfiexd" @click="saveaddress">
        <img src="./image/buy.png" alt="保存地址" class="fiexd">
        <span class="fiexd_span">保存</span>
      </div>

      <mt-popup v-model="regionVisible" position="bottom" class="region-popup">
        <div class="popup_a">
            <span class="poa_del" @click="cancelpo">取消</span>
            <span class="poa_ok" @click="okloc">完成</span>
        </div>
        <mt-picker :slots="myAddressSlots" valueKey="name" :visibleItemCount="5" @change="addressChange" :itemHeight="40"></mt-picker>
      </mt-popup>
    </div>
</template>
<script>
  import Vue from 'vue'
  Vue.component(Popup.name, Popup);
  import {Popup, Picker } from 'mint-ui';
  Vue.component(Picker.name, Picker);
  import threeLevelAddress from '../../assets/commom/json/threeLevelAddress.json'
  import { mapState } from 'vuex'
  import { saveAddressList } from '../../api'
  export default {
    data(){
        return {
            consignee:this.$store.state.editadd.name,
            phonenumber:this.$store.state.editadd.phone,
            location:this.$store.state.editadd.address,
            detailed:this.$store.state.editadd.info,
            id:this.$store.state.editadd.id,
            type:this.$store.state.editadd.type,
            arr:[],
            region:'',//三级地址
            province:'',//省
            city:'',//市
            county:'',//县
            provinceCode:'',//省级代码
            cityCode:'', //市级代码
            countyCode:'',//县级代码

            regionVisible:false,//弹出框是否可见
            regionInit:true,//禁止地区选择器自动初始化，picker组件会默认进行初始化，导致一进入页面就会默认选中一个初始3级地址
                
            //picker组件插槽
            myAddressSlots: [
              //省
            {
                flex: 1,
                values: this.getProvinceArr(), //省份数组
                className: 'slot1',
                textAlign: 'center'
            },
               //分隔符
            {
                divider: true,
                content: '',
                className: 'slot2'
            },
              //市
            {
                flex: 1,
                values: this.getCityArr("北京市"),
                className: 'slot3',
                textAlign: 'center'
            },
            {
                divider: true,
                content: '',
                className: 'slot4'
            },
              //县
            {
                flex: 1,
                values: this.getCountyArr("北京市","市辖区"),
                className: 'slot5',
                textAlign: 'center'
            }
            ],
        }
    },
    computed:{
        ...mapState({
            editadd:state=>state.editadd
        })
    },
    methods:{
        address(){
            var iforder=localStorage.getItem('iforder');
            if(iforder === 'yes'){
                this.$router.go('-1');
            }
            this.$router.push({
                path:'/address'
            })
        },
        inputLoseFocus() {
            setTimeout(() => {
            window.scrollTo(0, 0);
            }, 100);
        },
        showAddressPicker(){
            this.regionVisible = true;
        },
        cancelpo(){
            this.regionVisible = false;
        },
        async saveaddress(){
            var name=this.consignee;
            var phone=this.phonenumber;
            var address=this.location;
            var info = this.detailed;
            var id=this.id;
            var type =this.type;
            var token=this.$store.state.Authorization;
            var savelist= await saveAddressList(token,id,name,phone,address,info,type);
            if(savelist.code === 200){
             var iforder=localStorage.getItem('iforder');
             if(iforder === 'yes'){
                this.$router.go(-1)
             }else{
                this.$router.push({
                  path :'/address' 
                })
             }
           }
          
         
        },
        okloc(){
            this.regionVisible = false;
            let a='';
            for(var i=0;i<this.arr.length;i++){
                 a+=`${this.arr[i].name}`;
            }
            this.location=a;
        },
      //picker组件的change事件，进行取值赋值
        addressChange(picker, values){
          if (this.regionInit){
              //给市、县赋值
            this.arr=picker.getValues()
            picker.setSlotValues(1, this.getCityArr(values[0]["name"]));
            picker.setSlotValues(2, this.getCountyArr(values[0]["name"], values[1]["name"]));
          }else {
            this.regionInit = true;
          }
        },
          //遍历json，返回省级对象数组
        getProvinceArr() {
            let provinceArr = [];
            threeLevelAddress.forEach(function (item) {
            let obj = {};
            obj.name = item.name;
            obj.code = item.code;
            provinceArr.push(obj);
            });
            return provinceArr;
        },
      //遍历json，返回市级对象数组
        getCityArr(province) {
            // console.log("省：" + province);
            let cityArr = [];
            threeLevelAddress.forEach(function (item) {
            if (item.name === province) {
                item.children.forEach(function (args) {
                let obj = {};
                obj.name = args.name;
                obj.code = args.code;
                cityArr.push(obj);
                });
            }
            });
            return cityArr;
        },
          //遍历json，返回县级对象数组
        getCountyArr(province,city){
            let countyArr = [];
            threeLevelAddress.forEach(function(item){
            if (item.name === province){
                item.children.forEach(function (args) {
                if (args.name === city){
                    args.children.forEach(function (param) {
                    let obj = {};
                    obj.name=param.name;
                    obj.code=param.code;
                    countyArr.push(obj);
                    })
                }
                });
            }
            });
            // console.log(countyArr);
            return countyArr;
        },
    },
}
</script>
<style  scoped>
@import '../../../static/font/font.css';
.address_div{
    /* position: fixed;
    left: 0;
    right: 0;
    top: 0; */
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
.address_user{
    height: 120px;
    background:rgba(255,255,255,1);
    border-bottom: 1px solid #eeeeee;
}
.address_user .ico_head{
    text-align: justify;
    float: left;
    margin-top: 40px;
    margin-left: 28px;
    width: 140px;
    height:40px;
    font-size:28px;
    font-family:PingFangSC-Medium;
    font-weight:500;
    color:rgba(74,74,74,1);
    line-height:40px;
}
.address_user .user_input{
    height: 40px;
    float: right;
    text-align: right;
    width: 500px;
    margin-top: 40px;
    margin-right: 28px;
}
.address_user .address_go{
    float: right;
    width:20px;
    height: 30px;
    margin-top: 47px;
    margin-right: 20px;
}
span:after{
    display: inline-block ; 
    content: ''; 
    padding-left: 100%; 
}
input:focus, textarea:focus{ 
    outline: none;
}
input::-webkit-input-placeholder,textarea::-webkit-input-placeholder{ 
    height:40px;
    font-size:28px;
    font-family:PingFangSC-Regular;
    font-weight:400;
    color:rgba(187,187,187,1);
    line-height:40px;
}
input:-moz-placeholder,textarea:-moz-placeholder{ 
    height:40px;
    font-size:28px;
    font-family:PingFangSC-Regular;
    font-weight:400;
    color:rgba(187,187,187,1);
    line-height:40px;
}
input::-moz-placeholder,textarea::-moz-placeholder{ 
    height:40px;
    font-size:28px;
    font-family:PingFangSC-Regular;
    font-weight:400;
    color:rgba(187,187,187,1);
    line-height:40px;
} 
input:-ms-input-placeholder,textarea:-ms-input-placeholder{ 
    height:40px;
    font-size:28px;
    font-family:PingFangSC-Regular;
    font-weight:400;
    color:rgba(187,187,187,1);
    line-height:40px;
}
.footfiexd{
    position: fixed;
    left: 0;
    right: 0;
    bottom: 0;
    z-index: 20;
    height: 160px;
}
.footfiexd .fiexd{
    height: 160px;
}
.footfiexd .fiexd_span{
    z-index: 21px;
    position: absolute;
    width:144px;
    height:44px;
    font-size:36px;
    font-family:PingFangSC-Medium;
    font-weight:500;
    color:rgba(255,255,255,1);
    line-height:44px;
    top: 65px;
    left: 304px;

}
.region-popup{
    width: 100%;
}
.region-popup .popup_a{
   width: 100%;
   height: 80px;
}
.region-popup .popup_a .poa_del{
    float: left;
    margin-top: 25px;
    margin-left: 35px;
    font-size:30px;
    font-family:PingFangSC-Medium;
    font-weight:500;
     color:rgba(74,74,74,1);

}
.region-popup .popup_a .poa_ok{
    float: right;
    margin-top: 25px;
    margin-right: 35px;
     font-size:30px;
    font-family:PingFangSC-Medium;
    font-weight:500;
    color:rgba(74,74,74,1);

}
</style>

