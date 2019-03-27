import {
    LIVE_ADDRESS,
    USER_TOKEN,
    DEL_TOKEN
} from './mutation-types'

import {
    reqLiveData 
} from '../api'

export default {

    // 获取商家列表的异步action
    async getliveData({commit, state}) {
      // 1. 发送异步ajax请求
      const result = await reqLiveData(state)  // {code: 0, data: shops}
      // 2. 根据结果提交mutation
      if (result.code === 200) {
        const lives = result.data
        commit(LIVE_ADDRESS, {lives})  // action提交给mutation的是包含数据的对象, 而不数据本身
      }
    },

    // 保存user的同步action
    getUserData({commit}, user) {
      commit(USER_TOKEN, {user})
    },

    del_token({commit}){
      commit(DEL_TOKEN)
    }

  }