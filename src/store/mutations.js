import {
    LIVE_DETAIL,
    USER_TOKEN,
    DEL_TOKEN,
    VIDEO_URL,
    EDITADD
} from './mutation-types'


export default {
    [LIVE_DETAIL] (state, {detail}) {
      state.detail = detail
    },
    // 获取用户token
    [USER_TOKEN] ( state,{user}){
      state.Authorization = user;
      localStorage.setItem('Authorization', user);
    },
    // 删除用户token
    [DEL_TOKEN] (state) {
      localStorage.removeItem('Authorization')
      state.Authorization = ''
    },
    [VIDEO_URL](state,{video}){
      state.videoUrl = video
    },
    //直播详解介绍页面
    // [URL_CONTENT] (state,{url}){
    //   state.url_content = url
    // }
    [EDITADD](state,{editadd}){
        state.editadd=editadd
    }
  }
