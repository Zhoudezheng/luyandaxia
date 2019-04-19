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
  COMMON_PRODUCT,
  COMMON_COLLEN,
  COMMON_LIST,
  PRODUCT_LIST,
  IS_VIP,
  SEARCH_DATA,
  EVALUATE_LIST,
  USER_INFO,
  USER_VIP,
  SAVE_ORDER,
  ORDER_DETAIL,
  IMAGE_TOKEN,
  SHOP_LIKE,
} from './mutation-types'
import { stat } from 'fs';


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
  [ORDER_LIST](state, detail) {
    state.orders = detail
  },
  [EDITADD](state, {editadd}) {
    state.editadd = editadd
  },
  [PROJECT_DETAIL](state, proDetail) {
    state.projectDetail = proDetail
  },
  [SHOP_INDEX](state, data) {
    state.shops = data
  },
  [SHOPPING_CART](state, {data}){
    state.goodLits = data.list
  },
  [ADDRESS_LIST](state , data){
    state.addressList = data
  },
  [SHOPPING_CART](state, data){
    state.goods = data
  },
  [CREATE_ORDER](state, data){
    state.orderId = data.order_sn
    localStorage.setItem('orderId', data.order_sn);
  },
  [CONFIRM_ORDER](state, data){
    state.orderDetails = data
  },
  [WECHAT_PAYMENT](state, data){
    state.wechatPayment = data
  },
  [ALIPAY_PAYMENT](state, data){
    state.alipayPayment = data
  },
  [COMMON_PRODUCT](state, data){
    state.productdata=data.detail
  },
  [COMMON_COLLEN](state,data){
    state.commcollen=data
  },
  [COMMON_LIST](state,data){
    state.commonlist = data
  },
  [PRODUCT_LIST](state, data){
    state.productList = data
  },
  [IS_VIP](state, data){
    state.isVip = data
  },
  [SEARCH_DATA](state, data){
    state.searchlist=data.list
  },
  [EVALUATE_LIST](state, data){
    state.evaluateList = data
  },
  [USER_INFO](state,data){
    state.userinfo=data
  },
  [USER_VIP](state,data){
    state.userviplist = data;
  },
  [SAVE_ORDER](state,data){
    state.saveorder=data;
  },
  [ORDER_DETAIL](state,data){
    state.orderDetailsList =data.detail
  },
  [IMAGE_TOKEN](state, token) {
    state.imageToken = token;
  },
  [SHOP_LIKE](state,data){
    state.shopslike=data
  }
}
