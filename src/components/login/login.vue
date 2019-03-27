<template>
  <section class="loginContainer">
    <div class="loginInner">
      <div class="login_header">
        <img src="./image/Bitmap.png" alt="头像">
        <p>路演大侠</p>
      </div>
      <div class="login_content">
        <form>
          <div >
            <section class="login_phone">
              <div class="login_phoneInput">
               <input type="tel" maxlength="11" placeholder="输入11位手机号码" v-model="username" @focus="focus" @blur.prevent="inputLoseFocus">
               <div class="login_phonep" :class="{login_phonepfocus: isfocus}" ></div>
              </div>
            </section>
            <section class="login_pass">
               <div class="login_passcss">
                <input :type="showPwd ? 'text' : 'password'" maxlength="16" placeholder="请输入登录密码" v-model="password" @focus="focusPwd" @blur.prevent="inputLoseFocus">
                <div class="switch_button" >
                  <div class="switch_circle"></div>
                  <span class="switch_text">{{showPwd ? 'abc' : ''}}</span>
                </div>
                <div class="login_passdiv" :class="{login_passpfocus: focuspwds}"></div>
               </div>
            </section>
          </div>
          <div class="login_submit">
               <input style='-webkit-appearance:none,appearance:none' class="login_buttoned" type="button" value="确定" :disabled="!isRightPhone" :class="{login_button:isRightPhone}" @click.prevent="liveSharing">
          </div>
          <p class="login_users">
             <a class="login_user" @click="login">注册账号</a>
          </p>
          <!-- <button class="login_submit" @click.prevent="login">登录</button> -->
        </form>
      </div>
    </div>
  </section>
</template>

<script>
  import { reqPwdLogin} from '../../api'
  import Vue from 'vue'
  export default {
   data(){
     return {
        username: '', // 手机号
        password: '', // 密码
        showPwd:false,
        isfocus:false,
        focuspwds:false,
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
        return /^1\d{10}$/.test(this.username)
      },
   
    },
   methods: {
     inputLoseFocus() {
        setTimeout(() => {
          window.scrollTo(0, 0);
        }, 100);
      },
     login(){
       this.$router.push({  
        //  回到注册页面
        // path:'/',
        // 测试直播分享页面
            path:'/liveSharing',
      })
   },
   
    focus(){
         this.isfocus=true
         this.focuspwds=false
     },
     focusPwd(){
         this.isfocus=false
         this.focuspwds=true
     },
    async liveSharing () {
        // 1. 进行前台表单验证
        const {username, password} = this
        let result
          // 2. 发送登陆的请求
        result = await reqPwdLogin(username, password)
         if (!password) {
            return MessageBox.alert('密码必须指定')
          } 

        // 2. 根据请求返回的结果, 做不同的响应
        if(result.code===200) { // 登陆请求成功
          // 保存user到state中
          const user = result.data
          // this.$store.dispatch('saveUser', user)
          // 跳转到个人中心
          this.$router.replace('/liveSharing')
        } else { // 失败
          MessageBox.alert(result.msg)
        }
      },
  }
  }
</script>

<style  lscoped>
  @import '../../../static/font/font.css';
  .login_header img{
    width: 160px;
    height: 160px;
    margin: 165px 295px 20px 295px;
  }
  .login_header p{
    /* width: 192px; */
    height:67px;
    font-size:48px;
    font-family:PingFangSC-Medium;
    font-weight:600;
    color:rgba(74,74,74,1);
    line-height:67px;
  }
  .login_content{
    margin-top: 56px;
  }
  .login_content .login_phoneInput{
    margin: 0 80px 0 80px;
    width:590px;
    height:128px;
    background:rgba(255,255,255,1);
  }
  .login_content div input{
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
  .login_content div .login_phonep{
   width:587px;
   height:2px;
   border-top:3px solid rgba(187,187,187,1);
  }
  .login_content div .login_phonepfocus{
    width:587px;
    height:2px;
    border-top:3px solid rgba(253,153,27,1);
  }
  .login_passcss {
    margin: 2px 80px 0 80px;
    width:590px;
    height:128px;
    background:rgba(255,255,255,1);
  }
  .login_passcss input{
    margin: 77px 0 11px 0;
    width:196px;
    height:40px;
    font-size:28px;
    font-family:PingFangSC-Regular;
    font-weight:400;
    color:rgba(187,187,187,1);
    line-height:40px;
  }
  .login_passcss .login_passdiv{
    width:587px;
    height:2px;
    border-top:3px solid rgba(209,209,209,1);
  }
   .login_passcss .login_passpfocus{
    width:587px;
    height:2px;
    border-top:3px solid rgba(253,153,27,1);
  }
  .login_submit .login_button{
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

  .login_submit .login_buttoned{
    margin: 70px 61px 0 60px;
    width:629px;
    height:88px;
    background:linear-gradient(90deg,rgba(#FFD8D8D8) 0%,rgba(#FFD8D8D8) 100%);
    border-radius:45px;
    font-size:36px;
    font-family:PingFangSC-Medium;
    font-weight:500;
    color:rgba(255,255,255,1);
    line-height:50px;
    opacity: 1;
    -webkit-appearance:none  !important;
    appearance:none !important;
    -webkit-tap-highlight-color:rgba(0, 0, 0, 0) !important; /*去除点击高亮的颜色*/
  }
  input:disabled{ 
     background-color: #C0C0C0!important; 
   } 
  .login_users{
    margin-top: 30px;
  }
  .login_users .login_user{
    width:120px;
    height:42px;
    font-size:30px;
    font-family:PingFangSC-Regular;
    font-weight:400;
    color:rgba(243,117,5,1);
    line-height:42px;
  }

</style>