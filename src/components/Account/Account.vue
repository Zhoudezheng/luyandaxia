<template>
  <div class="account">
    <div class="account_div">
      <img src="./image/huitui.png" alt="协议按钮" class="account_check" @click="accountper">
      <span  class="account_mode">账户信息</span>
      <span  class="shopping_del" >地址管理</span>
    </div>
    <form>
        <!-- <div class="account_ico">
            <span class="ico_head">头像</span>
            <img src="./image/kishi.jpg" alt="头像" class="ico_img">
            <img src="./image/go.png" alt="去哪" class="ico_to">
        </div> -->
        <div class="account_ico">   
             <span class="ico_head">头像</span>
             <!-- 用来真实展示头像图片 -->
             <!-- <div class="picture" :style="'backgroundImage:url('+headerImage+')'"></div> -->
             <!-- 图片测试 -->
             <img preview :src="userinfo.avatar" alt="头像" class="ico_img">  
             <input type="file" id="upload" accept="image" @change="upload" class="to_img">  
             <label for="upload" class="ico_to"></label>
        </div>  
        <div class="account_user">
            <span class="ico_head">用户名</span>
            <input  type="tel" maxlength="16" class="user_input" placeholder="请输入昵称" v-model="username"  @blur.prevent="inputLoseFocus">
         </div>
         <div class="account_user">
            <span class="ico_head">手机号码</span>
            <input  type="tel" maxlength="16" class="user_input" placeholder="请填写联系电话" v-model="iphone"  @blur.prevent="inputLoseFocus">
         </div>
         <div class="account_user">
            <span class="ico_head">姓 名</span>
            <input  type="tel" maxlength="16" class="user_input" placeholder="请输入姓名" v-model="name"  @blur.prevent="inputLoseFocus">
         </div>
         <div class="account_user">
            <span class="ico_head">公司名称</span>
            <input  type="tel" maxlength="16" class="user_input" placeholder="请输入公司名称" v-model="company"  @blur.prevent="inputLoseFocus">
         </div>
         <div class="account_user">
            <span class="ico_head">职 务</span>
            <input  type="tel" maxlength="16" class="user_input" placeholder="请输入职位" v-model="post"  @blur.prevent="inputLoseFocus">
         </div>
         <div class="account_user">
            <span class="ico_head">邮 箱</span>
            <input  type="tel" maxlength="16" class="user_input" placeholder="请输入邮箱" v-model="email"  @blur.prevent="inputLoseFocus">
         </div>
         <div class="account_user">
            <span class="ico_head">银 行 卡</span>
            <input  type="tel" maxlength="18" class="user_input" placeholder="未绑定（点击绑定）" v-model="bankcard"  @blur.prevent="inputLoseFocus">
         </div>
         <div class="user_submit">
               <input style='-webkit-appearance:none,appearance:none' class="user_buttoned" type="button" value="保存" :disabled="!isallwrite" :class="{user_button:isallwrite}" @click="saveUserinfo">
         </div>
    </form>
  </div>
</template>

<script>
import Exif from 'exif-js';
import {mapState} from 'vuex'
import { userInfo } from 'os';
import {setUserList} from '../../api';
import { Toast } from 'mint-ui';
export default {
    data(){
        return{
            username:'',
            avatar:'',
            name:'',
            iphone:'',
            company:'',
            post:'',
            email:'',
            bankcard:'',
            headerImage:'',
            picValue:''  ,
        }
    },
    computed:{
        isallwrite(){
            if(this.username && this.avatar ){
                return true
            }
        },
        ...mapState(['userinfo'])
    },
    mounted () {
      // 处理安卓手机输入法遮挡输入框问题（摘自WEUI）
      if ((/Android/gi).test(navigator.userAgent)) {
        window.addEventListener('resize', function () {
            if (document.activeElement.tagName == 'INPUT' || 
                document.activeElement.tagName == 'TEXTAREA') {
                window.setTimeout(function () {
                    document.activeElement.scrollIntoViewIfNeeded();
                }, 0);
            }
        });
      };
      this.getuserdata()
    },
    methods:{
      inputLoseFocus() {
        setTimeout(() => {
          window.scrollTo(0, 0);
        }, 100);
      },
      accountper(){
          this.$router.push({
              path:'/personalcenter'
          })
      },
      getuserdata(){
          this.$store.dispatch('getUserData').then(()=>{
            this.userinfo.avatar=this.userinfo.avatar || 'http://file.market.xiaomi.com/thumbnail/PNG/l114/AppStore/090d6947f49ac44342fc6c84c25e744aefa7bcc00'
            this.username=this.userinfo.nickname;
            this.avatar=this.userinfo.avatar || 'http://file.market.xiaomi.com/thumbnail/PNG/l114/AppStore/090d6947f49ac44342fc6c84c25e744aefa7bcc00'
            this.name=this.userinfo.realname;
            this.iphone=this.userinfo.phone;
            this.company=this.userinfo.company;
            this.post=this.userinfo.job;
            console.log(this.avatar)
          });
      },

    //可参考 https://www.cnblogs.com/xiaocaiyuxiaoniao/p/9437013.html
      upload (e) {  
      let files = e.target.files || e.dataTransfer.files;  
      if (!files.length) return;  
      this.picValue = files[0];  
      this.imgPreview(this.picValue);  
      },  
      imgPreview (file) {  
        let self = this;  
        let Orientation;  
        //去获取拍照时的信息，解决拍出来的照片旋转问题  
        Exif.getData(file, function(){  
            Orientation = Exif.getTag(this, 'Orientation');  
        });  
        // 看支持不支持FileReader  
        if (!file || !window.FileReader) return;  
    
        if (/^image/.test(file.type)) {  
            // 创建一个reader  
            let reader = new FileReader();  
            // 将图片2将转成 base64 格式  
            reader.readAsDataURL(file);  
            // 读取成功后的回调  
            reader.onloadend = function () {  
                let result = this.result;  
                let img = new Image();  
                img.src = result;  
                //判断图片是否大于100K,是就直接上传，反之压缩图片  
                if (this.result.length <= (100 * 1024)) {  
                self.headerImage = this.result;  
                self.postImg(self.headerImage);  
                }else {  
                img.onload = function () {  
                    let data = self.compress(img,Orientation);  
                    self.headerImage = data;  
                    self.postImg(self.headerImage);  
                }  
                }  
            }   
            }  
      },  
      postImg (result) {  
            //这里写接口  
            this.userinfo.avatar=result;
            this.avatar=result;
      }, 
      async saveUserinfo(){
          var token =this.$store.state.Authorization;
          var avatar=this.avatar;
          var nickname=this.username;
          var mobile=this.iphone;
          var realname=this.name;
          var company=this.company;
          var job =this.post;
          var email =this.email;
          let result =await setUserList(token,avatar,nickname,mobile,realname,company,job,email);
          if(result.code ===200){
              Toast(result.msg)
          }else{
              Toast(result.msg)
          }
          
      }, 
      rotateImg (img, direction,canvas) {  
            //最小与最大旋转方向，图片旋转4次后回到原方向      
            const min_step = 0;      
            const max_step = 3;        
            if (img == null)return;      
            //img的高度和宽度不能在img元素隐藏后获取，否则会出错      
            let height = img.height;      
            let width = img.width;        
            let step = 2;      
            if (step == null) {      
                step = min_step;      
            }      
            if (direction == 'right') {      
                step++;      
                //旋转到原位置，即超过最大值      
                step > max_step && (step = min_step);      
            } else {      
                step--;      
                step < min_step && (step = max_step);      
            }       
            //旋转角度以弧度值为参数      
            let degree = step * 90 * Math.PI / 180;      
            let ctx = canvas.getContext('2d');      
            switch (step) {      
            case 0:      
                canvas.width = width;      
                canvas.height = height;      
                ctx.drawImage(img, 0, 0);      
                break;      
            case 1:      
                canvas.width = height;      
                canvas.height = width;      
                ctx.rotate(degree);      
                ctx.drawImage(img, 0, -height);      
                break;      
            case 2:      
                canvas.width = width;      
                canvas.height = height;      
                ctx.rotate(degree);      
                ctx.drawImage(img, -width, -height);      
                break;      
            case 3:      
                canvas.width = height;      
                canvas.height = width;      
                ctx.rotate(degree);      
                ctx.drawImage(img, -width, 0);      
                break;  
            }      
      },  
      compress(img,Orientation) {  
        let canvas = document.createElement("canvas");  
        let ctx = canvas.getContext('2d');  
            //瓦片canvas  
        let tCanvas = document.createElement("canvas");  
        let tctx = tCanvas.getContext("2d");  
        let initSize = img.src.length;  
        let width = img.width;  
        let height = img.height;  
        //如果图片大于四百万像素，计算压缩比并将大小压至400万以下  
        let ratio;  
        if ((ratio = width * height / 4000000) > 1) {  
            console.log("大于400万像素")  
            ratio = Math.sqrt(ratio);  
            width /= ratio;  
            height /= ratio;  
        } else {  
            ratio = 1;  
        }  
        canvas.width = width;  
        canvas.height = height;  
    //        铺底色  
        ctx.fillStyle = "#fff";  
        ctx.fillRect(0, 0, canvas.width, canvas.height);  
        //如果图片像素大于100万则使用瓦片绘制  
        let count;  
        if ((count = width * height / 1000000) > 1) {  
            console.log("超过100W像素");  
            count = ~~(Math.sqrt(count) + 1); //计算要分成多少块瓦片  
    //            计算每块瓦片的宽和高  
            let nw = ~~(width / count);  
            let nh = ~~(height / count);  
            tCanvas.width = nw;  
            tCanvas.height = nh;  
            for (let i = 0; i < count; i++) {  
            for (let j = 0; j < count; j++) {  
                tctx.drawImage(img, i * nw * ratio, j * nh * ratio, nw * ratio, nh * ratio, 0, 0, nw, nh);  
                ctx.drawImage(tCanvas, i * nw, j * nh, nw, nh);  
            }  
            }  
        } else {  
            ctx.drawImage(img, 0, 0, width, height);  
        }  
        //修复ios上传图片的时候 被旋转的问题  
        if(Orientation != "" && Orientation != 1){  
            switch(Orientation){  
            case 6://需要顺时针（向左）90度旋转  
                this.rotateImg(img,'left',canvas);  
                break;  
            case 8://需要逆时针（向右）90度旋转  
                this.rotateImg(img,'right',canvas);  
                break;  
            case 3://需要180度旋转  
                this.rotateImg(img,'right',canvas);//转两次  
                this.rotateImg(img,'right',canvas);  
                break;  
            }  
        }  
        //进行最小压缩  
        let ndata = canvas.toDataURL('image/jpeg', 0.1);  
        console.log('压缩前：' + initSize);  
        console.log('压缩后：' + ndata.length);  
        console.log('压缩率：' + ~~(100 * (initSize - ndata.length) / initSize) + "%");  
        tCanvas.width = tCanvas.height = canvas.width = canvas.height = 0;  
        return ndata;  
        },     
    },
}
</script>

<style  scoped>
@import '../../../static/font/font.css';
.account{
    height: 1376px;
    background:rgba(249,250,251,1);
}

.account_div{
  height:88px;
  background:rgba(243, 117, 5, 1);
}
.account_div .account_check{
    background-size: 16px 28px;
    float: left;
    margin-top: 32px;
    width:15px;
    height:30px;
    margin-left:30px;
}
.account_div .account_mode{
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
.shopping_del{
    width:128px;
    height:45px;
    font-size:32px;
    font-family:PingFangSC-Medium;
    font-weight:500;
    color:rgba(255,255,255,1);
    line-height:45px;
    float: right;
    margin-top: 22px;
    margin-right: 42px;
}
.account_ico{
    height: 156px;
    background:rgba(255,255,255,1);
}
.account_ico .ico_head{
    float: left;
    height: 40px;
    text-align: justify;
    width: 122px;
    font-size:28px;
    font-family:PingFangSC-Medium;
    font-weight:500;
    color:rgba(74,74,74,1);
    line-height:40px;
    margin-top: 58px;
    margin-left: 28px;
}
/* 文字两端对齐 */
span:after{
    display: inline-block ; 
    content: ''; 
    padding-left: 100%; 
}
.account_ico .ico_img{
    float: left;
    margin-top: 28px;
    margin-left: 435px;
    border-radius: 50%;
    width:100px;
    height:100px;
}
.account_ico .ico_to{
    background-image: url('./image/go.png');
    background-size: 12px 21px;
    float:right;
    width: 12px;
    height: 21px;
    margin-top: 65px;
    margin-right: 28px;
}
.account_ico .to_img{
 display: none
}
.account_user{
    height: 120px;
    background:rgba(255,255,255,1);
}
.account_user .ico_head{
    text-align: justify;
    float: left;
    margin-top: 40px;
    margin-left: 28px;
    width: 112px;
    height:40px;
    font-size:28px;
    font-family:PingFangSC-Medium;
    font-weight:500;
    color:rgba(74,74,74,1);
    line-height:40px;
}
.account_user .user_input{
    height: 40px;
    float: right;
    text-align: right;
    width: 400px;
    margin-top: 40px;
    margin-right: 28px;
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
.user_submit{
    margin-top: 52px;
    margin-left: 28px;
}
.user_submit .user_buttoned{
    width:694px;
    height:88px;
    background:rgba(216,216,216,1);
    border-radius:43px;
    font-size:36px;
    font-family:PingFangSC-Medium;
    font-weight:500;
    color:rgba(255,255,255,1);
    line-height:88px;
}
.user_submit .user_button{
    width:694px;
    height:88px;
    background:linear-gradient(90deg,rgba(254,154,28,1) 0%,rgba(243,117,5,1) 100%);
    border-radius:43px;
     font-size:36px;
    font-family:PingFangSC-Medium;
    font-weight:500;
    color:rgba(255,255,255,1);
    line-height:88px;
}
</style>