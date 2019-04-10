import {
  LIVE_DETAIL,
  USER_TOKEN,
  DEL_TOKEN,
  VIDEO_URL,
  ORDER_LIST,
  EDITADD,
  PROJECT_DETAIL,
  SHOP_INDEX,
  SHOPPING_CART,
  ADDRESS_LIST,
  CREATE_ORDER,
  CONFIRM_ORDER,
  WECHAT_PAYMENT,
  ALIPAY_PAYMENT,
  COMMON_PRODUCT
} from './mutation-types'

import {
  reqLiveData,
  reqProjectData,
  reqOrderList,
  reqShopIndex,
  reqShoppingCart,
  addressListed,
  reqCreateOrder,
  reqConfirmOrder,
  reqWechatPayment,
  reqAlipayPayment
} from '../api'

export default {

  // 获取商家列表的异步action
  async getliveData({commit, state}, id) {

    let token = state.Authorization
    // 1. 发送异步ajax请求
    const result = await reqLiveData(token, id)  // {code: 0, data: shops}
    // 2. 根据结果提交mutation
    if (result.code === 200) {
      const detail = result.data
      //const url = detail.url_content
      commit(LIVE_DETAIL, {detail})  // action提交给mutation的是包含数据的对象, 而不数据本身
      //commit(URL_CONTENT,{url})  //对直播详情介绍url进行复制
      var video = {}
      if (detail.status === 1) {
        video = {
          mp4: '',
          rtmp: detail.video,
          m3u8: '',
          flv: detail.video.replace("rtmp", "http") + ".flv",
        }
      } else {
        video = {
          mp4: detail.video,
          rtmp: '',
          m3u8: '',
          flv: '',
        }
      }
      //console.log(video)
      commit(VIDEO_URL, {video})
    } else {
      console.log(result.msg);
    }
  },

  // 保存user的同步action
  setUserData({commit}, user) {
    commit(USER_TOKEN, {user})
  },

  del_token({commit}) {
    commit(DEL_TOKEN)
  },
// 获取订单列表
  async getOrders({commit}, data) {
    let token = data.token
    let status = data.status
    let page = data.page
    const result = await reqOrderList(token, status, page)
    if (result.code === 200) {
      const detail = result.data
      commit(ORDER_LIST, detail)
    } else {
      console.log(result.msg);
      commit(ORDER_LIST, {})
    }
  },

  seteditadd({commit}, editadd) {
    commit(EDITADD, {editadd})
  },

  async projectData({commit, state}, id) {
    //获取token
    let token = state.Authorization
    //发送异步请求
    const result = await reqProjectData(token, id)
    if (result.code === 200) {
      const prodetail = result.data
      commit(PROJECT_DETAIL, prodetail) //提交给mutation
    } else {
      console.log(result.msg)
    }
  },

  // 商城首页
  async getShop ({commit}){

    const result = await reqShopIndex()
    if(result.code === 200){
      let data = result.data
      commit(SHOP_INDEX,data)
    } else {
      console.log(result.msg);
      commit(SHOP_INDEX,{})
    }
  },

  // 获取购物车列表
  async getShoppingCart ({commit, state}){
    const token = state.Authorization
    let result = await reqShoppingCart(token)
    if(result.code === 200){
      let data = result.data
      commit(SHOPPING_CART,data)
    } else {
      commit(SHOPPING_CART,{})
    }

  },
  //获取收获地址
  async resaddressList({commit, state}){
    const tonken= state.Authorization;
    let result = await addressListed(tonken);
    if(result.code === 200){
      let data = result.data;
      commit(ADDRESS_LIST ,data)
    }else{
      commit(ADDRESS_LIST,[])
    }
  },
  // 创建商城订单
  async createOrder ({commit, state},{remark,cart_list,product_info,address_id}){
    console.log(remark,cart_list,product_info,address_id)
    const token = state.Authorization
    let result = await reqCreateOrder(token,remark,cart_list,product_info,address_id)
    if(result.code === 200){
      let data = result.data
      commit(CREATE_ORDER,data)
    } else {
      commit(CREATE_ORDER,{data})
    }

  },

  // 预览订单
  async previewOrder ({commit, state},data){
    const token = state.Authorization
    let result = await reqConfirmOrder(token,data)
    if(result.code === 200){
      let data = result.data
      commit(CONFIRM_ORDER,data)
    } else {
      commit(CONFIRM_ORDER,result.data)
    }

  },
  // 微信支付
  async wechatPayment ({commit, state},{order_sn,device_type,type}){
    let result = await reqWechatPayment(order_sn,device_type,type)
    if(result.code === 200){
      let data = result.data
      commit(WECHAT_PAYMENT,data)
    } else {
      commit(WECHAT_PAYMENT,result.data)
    }

  },
  // 支付宝支付
  async alipayPayment ({commit, state},{order_sn,device_type,type}){
    let token = state.Authorization
    let result = await reqAlipayPayment(token,order_sn,device_type,type)
    if(result.code === 200){
      let data = result.data
      commit(ALIPAY_PAYMENT,data)
    } else {
      commit(ALIPAY_PAYMENT,result.data)
    }

  },
  setproduct({commit}, data) {
    commit(COMMON_PRODUCT, data)
  },
}

