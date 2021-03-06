/*
包含n个接口请求函数的模块
每个函数的返回值是promise
 */
import ajax from './ajax';

const BASE = '/api'

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
//5.订阅
export const reqDingyue = (token, id) => ajax(BASE+'/publisher/subscribe', {token, id}, 'POST')
//6.收藏
export const reqShoucang = (token, type, id) => ajax(BASE+'/collection/create', {token, type, id}, 'POST')
