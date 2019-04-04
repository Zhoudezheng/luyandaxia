import {
  LIVE_DETAIL,
  USER_TOKEN,
  DEL_TOKEN,
  VIDEO_URL,
<<<<<<< HEAD
  ORDER_LIST
=======
  EDITADD,
  PROJECT_DETAIL,
>>>>>>> master
} from './mutation-types'


export default {
<<<<<<< HEAD
  [LIVE_DETAIL](state, {detail}) {
    state.detail = detail
  },
  // 获取用户token
  [USER_TOKEN](state, {user}) {
=======
  [LIVE_DETAIL] (state, {detail}) {
    state.detail = detail
  },
  // 获取用户token
  [USER_TOKEN] ( state,{user}){
>>>>>>> master
    state.Authorization = user;
    localStorage.setItem('Authorization', user);
  },
  // 删除用户token
<<<<<<< HEAD
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
=======
  [DEL_TOKEN] (state) {
    localStorage.removeItem('Authorization')
    state.Authorization = ''
  },
  [VIDEO_URL](state,{video}){
    state.videoUrl = video
  },
  [EDITADD](state,{editadd}){
    state.editadd=editadd
  },
  [PROJECT_DETAIL](state,proDetail) {
    state.projectDetail = proDetail
>>>>>>> master
  }
}
