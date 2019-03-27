<template>
  <section class="registerContainer">
    <div class="registerInner">
      <div class="register_header">
        <img src="./image/Bitmap.png" alt="头像">
        <p>路演大侠</p>
      </div>
      <div class="register_content">
        <form>
          <div class="register_flex">
            <section class="register_phone">
              <div class="register_phoneInput">
               <input  type="tel" maxlength="11" placeholder="输入11位手机号码" v-model="phone" @focus="focus" @blur.prevent="inputLoseFocus">
               <div class="register_phonep" :class="{register_phonepfocus: isfocus}" ></div>
              </div>
            </section>
            <section class="register_verification">
              <div class="register_verificationInput">
               <input type="text" maxlength="6" placeholder="请输入验证码" v-model="code" @focus="focusCode" @blur.prevent="inputLoseFocus">
               <span class='register_verificationspan'></span>
               <button type="button" class="register_secode" 
                  :disabled="!isRightPhone || computeTime>0" 
                   @click.prevent="sendCode">
                 {{computeTime > 0 ? `${computeTime}s` : '获取验证码'}}
               </button>
               <div class="register_verificationp" :class="{register_verificationpfocus: focusCodes}"></div>
              </div>
            </section>
            <section class="register_pass">
               <div class="register_passcss">
                <input  id='abc' maxlength="16" type='password' placeholder="请输入登录密码" v-model="password" @focus="focusPwd" @blur.prevent="inputLoseFocus">
                <div class="switch_button">
                  <div class="switch_circle"></div>
                  <span class="switch_text"></span>
                </div>
                <div class="register_passdiv" :class="{register_passpfocus: focuspwds}"></div>
               </div>
            </section>
            <div class="register_agreement">
              <input  class="register_check" type='button' alt="协议按钮" @click="buttonImgs =! buttonImgs" :class="buttonImgs?'register_check':'register_checked'">
              <p class="register_agreementp">
                 <span>已阅读并同意</span>
                 <span class="agreement_span">《用户服务协议》</span>
              </p>
            </div>
          </div>
          <div class="register_submit">
               <input class="register_button" type="button" value="确定" @click.prevent="liveSharing" >
          </div>
          <p class="register_users">
             <a class="register_user" @click="login">已有账号</a>
          </p>
          <!-- <button class="login_submit" @click.prevent="login">登录</button> -->
        </form>
      </div>
    </div>
  </section>
 
</template>

<script>
 import {reqSendCode, reqSmsLogin} from '../../api'
 import { Toast, MessageBox } from 'mint-ui'
 export default {
   data () {
      return {
        phone: '', // 手机号
        code: '', // 短信验证码
        password: '', // 密码
        computeTime: 0, // 倒计时剩余的时间(s)
        isfocus:false,
        focusCodes:false,
        focuspwds:false,
        buttonImgs:false,
        intervalId:null,
      }
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
      } 

    },
 
   computed: {
      // 判断phone是否是一个正确的手机号
      isRightPhone () {
        return /^1\d{10}$/.test(this.phone)
      }
    },
   methods: {
     inputLoseFocus() {
        setTimeout(() => {
          window.scrollTo(0, 0);
        }, 100);
      },
     focus(){
         this.isfocus=true
         this.focusCodes=false
         this.focuspwds=false
     },
     focusCode(){
         this.isfocus=false
         this.focuspwds=false
         this.focusCodes=true
     },
     focusPwd(){
         this.isfocus=false
         this.focuspwds=true
         this.focusCodes=false
     },
     login(){
       this.$router.push({  
        path:'/login',
      })
     },
    async liveSharing () {
        // 1. 进行前台表单验证
        const {phone, code, password, isRightPhone} = this
        let result
         // 短信
          // if(!isRightPhone) {
          //   return MessageBox.alert('手机号不正确')
          // } else if (!/^\d{6}$/.test(code)) {
          //   return MessageBox.alert('验证码必须是6位数字')
          // }
          // 2. 发送登陆的请求
          result = await reqSmsLogin(phone, code,password)
          if(result.code!==0) {
            // 停止计时
            this.computeTime = 0
          }

        // 2. 根据请求返回的结果, 做不同的响应
        if(result.code===0) { // 登陆请求成功
          // 保存user到state中
          const user = result.data
          // this.$store.dispatch('saveUser', user)
          // 跳转到个人中心
          this.$router.replace('/liveSharing')
        } else { // 失败
          MessageBox.alert(result.msg)
        }
    },
     async sendCode() {
        // 开始倒计时
        this.computeTime = 60
        // 启动循环定时器
        const intervalId = setInterval(() => {
          // 时间减1
          this.computeTime--
          // 一旦时间到了0, 停止计时
          if(this.computeTime <= 0 ) {
            this.computeTime = 0
            clearInterval(intervalId)
          }
        }, 1000)
        // 发送ajax
        const result = await reqSendCode(this.phone,'register')
        if(result.code===200) { // 发送验证码成功
          // alert('发送验证码成功')
          Toast(result.msg);
        } else { // 失败了
          // 停止定时器
          this.computeTime = 0
          // alert('发送验证码失败')
          MessageBox.alert(result.msg)
        }
      },
    },

   
}
</script>

<style  lscoped>
  @import '../../../static/font/font.css';
  .register_header img{
    width: 160px;
    height: 160px;
    margin: 165px 295px 20px 295px;
  }
  .register_header p{
    /* width: 192px; */
    height:67px;
    font-size:48px;
    font-family:PingFangSC-Medium;
    font-weight:600;
    color:rgba(74,74,74,1);
    line-height:67px;
  }
  .register_content{
    margin-top: 56px;
  }
  .register_content .register_phoneInput{
    margin: 0 80px 0 80px;
    width:590px;
    height:128px;
    background:rgba(255,255,255,1);
  }
  .register_content div input{
    margin: 77px 399px 11px 0;
    width:100%;
    height:40px;
    font-size:28px;
    font-family:PingFangSC-Regular;
    font-weight:400;
    color:rgba(187,187,187,1);
    line-height:40px;
  }
  /* 去掉边框 */
  input:focus, textarea:focus{ 
    outline: none;
  }
  /* 设置输入框默认文字样式 */
  input::-webkit-input-placeholder{
   width:191px;
   height:40px;
   font-size:28px;
   font-family:PingFangSC-Regular;
   font-weight:400;
   color:rgba(187,187,187,1);
   line-height:40px;
  }
  .register_content div .register_phonep{
   width:587px;
   height:2px;
   border-top:3px solid rgba(204,204,204,1);
  }
  .register_content div .register_phonepfocus{
    width:587px;
    height:2px;
    border-top:3px solid rgba(253,153,27,1);
  }
  .register_content .register_verificationInput{
    margin: 2px 80px 0 80px;
    width:590px;
    height:128px;
    background:rgba(255,255,255,1);
  }
  .register_content .register_verificationInput input{
    float: left;
    margin: 77px 150px 11px 0;
    width:168px;
    height:40px;
    font-size:28px;
    font-family:PingFangSC-Regular;
    font-weight:400;
    color:rgba(187,187,187,1);
    line-height:40px;
  }
  .register_verificationInput .register_verificationspan{
    float: left;
    margin: 80px 0px 16px 0px;
    width:1px;
    height:32px;
    border-left:3px solid rgba(204,204,204,1);
  }
  .register_verification button{
    /* float: left; */
    border: 0;
    margin: 76px 0px 12px 0;
    background-color: rgba(0,0,0,0);
    /* width: 140px; */
    height:40px;
    font-size:28px;
    font-family:PingFangSC-Regular;
    font-weight:400;
    color:rgba(243,117,5,1);
    line-height:40px;
  }
   .register_content div .register_verificationp{
    float: left;
    width:587px;
    height:2px;
    border-top:3px solid rgba(209,209,209,1);
  }
 .register_content div .register_verificationpfocus{
    width:587px;
    height:2px;
    border-top:3px solid rgba(253,153,27,1);
  }
  .register_passcss {
    margin: 2px 80px 0 80px;
    width:590px;
    height:128px;
    background:rgba(255,255,255,1);
  }
  .register_passcss input{
    margin: 77px 0 11px 0;
    width:196px;
    height:40px;
    font-size:28px;
    font-family:PingFangSC-Regular;
    font-weight:400;
    color:rgba(187,187,187,1);
    line-height:40px;
  }
  .register_passcss .register_passdiv{
    width:587px;
    height:2px;
    border-top:3px solid rgba(209,209,209,1);
  }
  .register_passcss .register_passpfocus{
    width:587px;
    height:2px;
    border-top:3px solid rgba(253,153,27,1);
  }
  .register_agreement .register_check{
    float: left;
    width:24px;
    height:24px;
    background-image: url('./image/checked.png');
    background-size: 24px 24px;
    border-radius: 50%;
    margin: 29px 4px 0 82px;
  }
  .register_agreement .register_checked{
    float: left;
    width:24px;
    height:24px;
    background-image: url('./image/check.png');
    background-size: 24px 24px;
    border-radius: 50%;
    margin: 29px 4px 0 82px;
  }
  .register_agreement .register_agreementp{
    float: left;
    margin: 24px 215px 0 4px;
    height:33px;
    font-size:24px;
    font-family:PingFangSC-Regular;
    font-weight:400;
    color:rgba(40,41,47,1);
    line-height:33px;
  }
  .register_agreement .register_agreementp .agreement_span{
   color:rgba(243,117,5,1);
  }
  .register_submit .register_button{
     
    margin: 70px 61px 0 60px;
    width:629px;
    height:88px;
    background:linear-gradient(90deg,rgba(254,154,28,1) 0%,rgba(243,117,5,1) 100%);
    border-radius:45px;
    font-size:36px;
    font-family:PingFangSC-Medium;
    font-weight:500;
    color:rgba(255,255,255,1);
    line-height:50px;
  }
  .register_users{
    margin-top: 30px;
  }
  .register_users .register_user{
    width:120px;
    height:42px;
    font-size:30px;
    font-family:PingFangSC-Regular;
    font-weight:400;
    color:rgba(243,117,5,1);
    line-height:42px;
  }
</style>