// const state = {
//     userInfo:localStorage["userData"]?JSON.parse(localStorage["userData"]): {},
//     //currentUser:localStorage.getItem("userData")?JSON.parse(localStorage.getItem("userData")):{}, 
// }
// export default state
export default {
    detail: {}, // 直播列表
    Authorization: localStorage.getItem('Authorization') ? localStorage.getItem('Authorization') : '',
    //url_content:'',
    videoUrl:{},
    editadd:{},
  }
