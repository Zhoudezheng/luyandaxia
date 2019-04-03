// const state = {
//     userInfo:localStorage["userData"]?JSON.parse(localStorage["userData"]): {},
//     //currentUser:localStorage.getItem("userData")?JSON.parse(localStorage.getItem("userData")):{}, 
// }
// export default state
export default {
  Authorization: localStorage.getItem('Authorization') ? localStorage.getItem('Authorization') : '',
  detail: {}, 
  videoUrl:{},
  projectDetail:{},
}
