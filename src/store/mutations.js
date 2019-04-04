import {
  LIVE_DETAIL,
  USER_TOKEN,
  DEL_TOKEN,
  VIDEO_URL,
  ORDER_LIST
} from './mutation-types'


export default {
  [LIVE_DETAIL](state, {detail}) {
    state.detail = detail
  },
  // 获取用户token
  [USER_TOKEN](state, {user}) {
    state.Authorization = user;
    localStorage.setItem('Authorization', user);
  },
  // 删除用户token
  [DEL_TOKEN](state) {
    localStorage.removeItem('Authorization')
    state.Authorization = ''
  },
  [VIDEO_URL](state, {video}) {
    state.videoUrl = video
  },
  //直播详解介绍页面
  // [URL_CONTENT] (state,{url}){
  //   state.url_content = url
  // }

  // 获取订单列表
  [ORDER_LIST](state,{detail}) {
    state.orders = detail.list
  }
}
