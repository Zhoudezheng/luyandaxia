import {
    LIVE_ADDRESS,
    USER_TOKEN,
    DEL_TOKEN
} from './mutation-types'


export default {
    [LIVE_ADDRESS] (state, {lives}) {
      state.lives = lives
    },
    // 获取用户token
    [USER_TOKEN] ( state,{user}){
      state.Authorization = user;
      localStorage.setItem('Authorization', user);
    },
    // 删除用户token
    [DEL_TOKEN] (state) {
      state.Authorization=''
    }
  }