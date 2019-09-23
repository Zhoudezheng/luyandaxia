<template>
  <div class="loginword">
    <div class="register_content">
        <form>
          <div v-if='showCheckcode'>
            <div class="register_flex">
                <section class="register_phone">
                  <div class="register_phoneInput">
                    <input  type="tel" maxlength="11" placeholder="输入11位手机号码" v-model="phone" >
                    <div class="register_phonep" :class="{register_phonepfocus: isfocus}" ></div>
                  </div>
                </section>
                <section class="register_verification">
                  <div class="register_verificationInput">
                    <input type="text" maxlength="6" minlength="6" placeholder="请输入验证码" v-model="code">
                    <span class='register_verificationspan'></span>
                    <button type="button" class="register_secode" 
                        :disabled="!isRightPhone || computeTime>0" 
                        @click.prevent="sendCode">
                        {{computeTime > 0 ? `${computeTime}s` : '获取验证码'}}
                    </button>
                    <div class="register_verificationp" :class="{register_verificationpfocus: focusCodes}"></div>
                  </div>
                </section>
            </div>
            <div class="register_submit">
                <input class="register_button" type="button" value="下一步" @click.prevent="showforgetword" >
            </div>
          </div>
          <div v-else>
            <div class="register_flex">
              <div class="register_passcss">
                <section class="register_phone">
                    <input  id='abc' maxlength="16" type='password' placeholder="请输入新密码" v-model="password">
                    <div class="switch_button">
                    <div class="switch_circle"></div>
                    <span class="switch_text"></span>
                    </div>
                    <div class="register_passdiv" :class="{register_passpfocus: focuspwds}"></div>
                </section>
              </div>
              <div class="register_passcss">
                <section class="register_phone">
                    <input  id='abc' maxlength="16" type='password' placeholder="请确定新密码" v-model="checkpassword">
                    <div class="switch_button">
                    <div class="switch_circle"></div>
                    <span class="switch_text"></span>
                    </div>
                    <div class="register_passdiv" :class="{register_passpfocus: focuspwds}"></div>
                </section>
              </div>
            </div>
            <div class="register_submit">
                <input class="register_button" type="button" value="提交" @click.prevent="forgetword" >
            </div>
          </div>
        </form>
      </div>
  </div>
</template>

<script>
  import { reqforgetCode,reqforgetLogin} from '../../api'
  import { Toast, MessageBox } from 'mint-ui'
  import Vue from 'vue'
  export default {
    data(){
      return {
        phone: '', // 手机号
        code: '', // 短信验证码
        password: '', // 密码
        checkpassword:'',
        computeTime: 0, // 倒计时剩余的时间(s)
        isfocus:false,
        focusCodes:false,
        focuspwds:false,
        buttonImgs:false,
        intervalId:null,
        isCanScroll: false,
        showCheckcode: true,
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
      },
    },
    methods: {
      async forgetword () {
        // 1. 进行前台表单验证
        let result
        const {phone, password, code, checkpassword} = this
          // 2. 发送登陆的请求
        if (!password) {
          return MessageBox.alert('密码必需指定')
        } 
        if (password !== checkpassword) {
          return MessageBox.alert('密码不一致')
        } 
        result = await reqforgetLogin(phone, password, code)
        // 2. 根据请求返回的结果, 做不同的响应
        if(result.code === 200) { // 登陆请求成功
          // 保存user到state中
          Toast('修改成功')
          this.$router.push('/login')
        } else if(result.code === 400){
          Toast(result.msg)
        } else { // 失败
          this.$store.dispatch('del_token')
          MessageBox.alert('修改失败')
        }
      },
      showforgetword () {
        if(this.phone === ''){
          Toast('请输入手机号')
          return
        }
        if(this.code === ''){
          Toast('请输入验证码')
          return
        }
        if(this.code.length<6){
          Toast("请输入正确验证码");
          return
        }
        this.showCheckcode = false  
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
        const result = await reqforgetCode(this.phone,'forget')
        if(result.code===200) { // 发送验证码成功
          // alert('发送验证码成功')
          Toast(result.msg);
        } else { // 失败了
          // 停止定时器
          this.computeTime = 0
          // alert('发送验证码失败')
          MessageBox.alert(result.msg)
        }
      }
    }
  }
</script>

<style  scoped>
  @import '../../../static/font/font.css';
  /* 去掉边框 */
  .register_content{
    padding-top: 156px;
  }
  .register_content .register_phoneInput{
    margin: 0 80px 0 80px;
    width:590px;
    height:128px;
    background:rgba(255,255,255,1);
  }
  .register_content div input{
    margin: 50px 399px 0 0;
    width:100%;
    height:56%;
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
    margin: 60px 150px 0px 0;
    width:168px;
    height:56%;
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
  input:focus { 
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
</style>
<style>
.mint-msgbox {
  padding: 20px 0 !important;
  width:75%;
  height: 19%;
}
.mint-msgbox-header{
  padding-top: 30px;
  height: 40px;
}
.mint-msgbox-title{
  height: 100%;
  font-size: 36px !important;
}
.mint-msgbox-content{
  height: 70px !important;
  line-height: 70px !important;
}
.mint-msgbox-message{
  font-size: 32px;
  line-height: 80px !important;
}
.mint-msgbox-btns{
  height: 80px !important;
  line-height: 80px !important;
}
.mint-msgbox-confirm{
  font-size: 34px;
  line-height: 80px !important;
}
.mint-toast{
  width: 45%;
  height: 6%;
  font-size: 16px;
}
.mint-toast-text{
  font-size: 36px;
}
</style>

