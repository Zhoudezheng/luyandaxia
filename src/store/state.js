// const state = {
//     userInfo:localStorage["userData"]?JSON.parse(localStorage["userData"]): {},
//     //currentUser:localStorage.getItem("userData")?JSON.parse(localStorage.getItem("userData")):{}, 
// }
// export default state
export default {
  Authorization: localStorage.getItem('Authorization') ? localStorage.getItem('Authorization') : '',
  detail: {}, 
  videoUrl:{},
  editadd:{},
  orders:{},
  isVip:{},
  projectDetail:{},
  addressList:[],
  shops:{},
  goods:{},
  orderDetails:{},
  orderId:'',
  productdata:{},
  commonlist:{},
  wechatPayment:{},
  alipayPayment:{},
  productList:{},
  searchlist:[],
  evaluateList:{},
}
