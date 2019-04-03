import {
  LIVE_DETAIL,
  USER_TOKEN,
  DEL_TOKEN,
  VIDEO_URL,
  PROJECT_DETAIL,
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
  [PROJECT_DETAIL](state,proDetail) {
    state.projectDetail = proDetail
  }
}
