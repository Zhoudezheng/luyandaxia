/*
包含n个接口请求函数的模块
每个函数的返回值是promise
 */
import ajax from './ajax';

const BASE = 'http://api.kanjian2020.com/api';
// const BASE = 'http://47.93.41.61/api';
// const BASE = 'http://47.95.224.184/api';

// [1、发送短信验证码](#7发送短信验证码)<br/>
export const reqSendCode = (phone,type) => ajax(BASE + '/sms', {phone,type }, 'POST');
// [2、手机号验证码登陆](#8手机号验证码登陆)<br/>
export const reqSmsLogin = (nickname,phone,code,password) => ajax(BASE + '/account/register', {nickname,phone,code,password},'POST');
// [3、用户名密码登陆](#6用户名密码登陆)<br/
export const reqPwdLogin = (username, password) => ajax(BASE+'/login/phone', {username, password}, 'POST');
//  4.直播详情
//export const reqLiveDetail = (id)=>ajax(BASE+'/',{id},'POST');
//[4、直播信息]
export const reqLiveData = (token, id) => ajax(BASE+'/live', {token, id}, 'POST')
//未登录直播
export const reqLiveDataList = (token, id) => ajax(BASE+'/live_h5', {token,id}, 'POST')
//5.订阅
export const reqDingyue = (token, id) => ajax(BASE+'/publisher/subscribe', {token, id}, 'POST')
//6.收藏
export const reqShoucang = (token, type, id) => ajax(BASE+'/collection/create', {token, type, id}, 'POST')
//7.订单列表
export const reqOrderList = (token, status, page) => ajax(BASE+'/mine_order/list', {token, status, page}, 'POST')
//8.项目详情
export const reqProjectData = (token, id) => ajax(BASE+'/project/detail',{token, id},'POST');
// 商城首页
export const reqShopIndex = () => ajax(BASE+'/shop/index1',{},'POST');
//获取商城首页加载更多
export const reqShoplikeIndex = (token,page) => ajax(BASE+'/shop/more_like',{token,page},'POST');
// 获取微信id
export const reqWeixinId = (page) => ajax(`http://api.kanjian2020.com/api/wechat/getopenid?code=${page}`);
// 商城首页
export const reqShoppingCart = (token) => ajax(BASE+'/shopping_cart/list',{token},'POST');
//获取用户地址
export const addressListed = (token) => ajax(BASE+'/address/list',{token},'POST');
//更新收货地址
export const saveAddressList = (token,id,name,phone,address,info,type) =>ajax(BASE+'/address/update',{token,id,name,phone,address,info,type},'POST');
//新增收货地址
export const addAddressList = (token,name,phone,address,info,type) =>ajax(BASE+'/address/create',{token,name,phone,address,info,type},'POST');
//删除收货地址
export const delAddressList = (token,id) =>ajax(BASE+'/address/delete',{token,id},'POST');
//设置默认地址
export const defaultAddressList = (token,id) =>ajax(BASE+'/address/set_default',{token,id},'POST');
// 创建订单
export const reqCreateOrder = (token,remark,cart_list,product_info,address_id,share_id,invoice,pay_type) => ajax(BASE+'/order/create',{token,remark,cart_list,product_info,address_id,share_id,invoice,pay_type},'POST');
// 预览订单
export const reqConfirmOrder = (token,product_info) => ajax(BASE+'/order/confirm',{token,product_info},'POST');
// 微信支付
export const reqWechatPayment = (token,order_sn,device_type,type,openid) => ajax(BASE+'/wechat/payment',{token,order_sn,device_type,type,openid},'POST');
// 支付宝支付
export const reqAlipayPayment = (token,order_sn,device_type,type) => ajax(BASE+'/alipay/payment',{token,order_sn,device_type,type},'POST');
//获取商品详情
export const reqcommondeta = (token,product_id) => ajax(BASE+'/product/detail',{token,product_id},'POST');
//获取商品详情详情数据
export const reqShopdetail = (token,product_id) => ajax(BASE+'/product/detail_h5',{token,product_id},'POST');
//获取商品评价列表
export const reqInstruction = (token,product_id) => ajax(BASE+'/product/evaluate_list',{token,product_id},'POST');

// export const reqAlipayPayment = (token,order_sn,device_type,type,return_url) => ajax(BASE+'/alipay/payment',{token,order_sn,device_type,type,return_url},'POST');
// 获取分类列表
export const reqProductList = (token,page,category_id,type) => ajax(BASE+'/product/list',{token,page,category_id,type},'POST');
// 获取分类列表
export const reqIsVip = (token,) => ajax(BASE+'/mine_vip/info',{token,},'POST');
//购物车数量变化
export const reqShoppingChange = (car_id,num) => ajax(BASE+'/shopping_cart/change',{car_id,num},'POST');
//添加购物车
export const reqaddshopping = (token,type,product_id)=>ajax(BASE+'/shopping_cart/action',{token,type,product_id},'POST');
//详情加入购物车
export const reqaddordershopping = (token,type,product_id,spec,num)=>ajax(BASE+'/shopping_cart/action',{token,type,product_id,spec,num},'POST');
//删除购物车
export const reqdelshopping = (token,type,car_id)=>ajax(BASE+'/shopping_cart/action',{token,type,car_id},'POST')
//获取搜索商品
export const  reqSearchData= (token,page,keyword)=>ajax(BASE+'/search/product',{token,page,keyword},'POST')
//获取用户详情
export const reqUserInfo = (token) => ajax(BASE+'/member/detail',{token},'POST');
//修改用户信息
export const setUserList = (token,avatar,nickname,mobile,realname,company,job,email) => ajax(BASE+'/member/modify_detail',{token,avatar,nickname,mobile,realname,company,job,email},'POST');
//获取购买vip数据
export const reqVipdata = (token) => ajax(BASE+'/vipset/detail',{token},'POST');
//获取vip订单号
export const reqvipinfolist = (token) => ajax(BASE+'/vip/create_new',{token},'POST');
//获取vip购买记录
export const reqshiprecord = (token,page) => ajax(BASE+'/mine_vip/record',{token,page},'POST');
//删除订单
export const delbuyshop = (id ,type) => ajax (BASE+'/order/handle',{id,type},'POST');
//获取订单详情
export const reqorderDetail = (token,order_sn) => ajax(BASE+'/order/detail',{token,order_sn},'POST');
//提醒发货
export const reqshipment = (token,id) => ajax(BASE+'/mine_order/notice',{token,id},'POST');
//获取上传图片token
export const reqImageToekn = (token) => ajax(BASE+'/upload/token',{token},'POST');
//获取更多数据
export const reqpagelist = (token,page) => ajax(BASE+'/shop/more_like',{token,page},'POST');
//创建购买视频订单
export const reqvideoOrder = (token,id) => ajax(BASE+'/live/buy',{token,id},'POST');
//创建项目订单
export const reqProjectOrder = (token,id,type) => ajax(BASE+'/project/buy',{token,id,type},'POST');

