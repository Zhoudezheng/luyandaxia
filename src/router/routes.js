import register from '../components/register/register'
import Login from '../components/login/login'
import LiveSharing from '../components/LiveSharing/liveSharing'
import Interaction from '../components/LiveSharing/interaction/interaction'
import introduction from '../components/LiveSharing/introduction/introduction'
import recommend from '../components/LiveSharing/recommend/recommend'
import vipmember from '../components/VipMember/VipMember'
import singlevideo from '../components/SingleVideo/SingleVideo'
import vipsuccessful from '../components/VipSuccessful/VipSuccessful'
import videosuccessful from '../components/VideoSuccessful/videoSuccessful'

export default [
    {
      path: '/',
      component: register,
    },
    {
      path: '/login',
      component: Login,
    },
    {
      path: '/liveSharing',
      component: LiveSharing,
      children: [
        // 二级路由路径,不加/
          {
            path:'introduction',
            name:'introduction',
            meta: {
              requireAuth: true, // 添加该字段，表示进入这个路由是需要登录的
            },
            component: introduction
          },
          {
            path:'Interaction',
            name:'Interaction',
            component:Interaction
            },
          {
            path:'recommend', 
            name:'recommend', 
            component:recommend
          },
          {
            path:'',           //这个表示的是根目录，即一进入的页面
            redirect:'introduction'    //设置页面一进来就显示的页面，即重定向到goods组件，这里写的内容是对应组将的component的值
          }
        ]
    },
    {
      path: '/vipmember',
      component: vipmember,
    },
    {
      path:'/singlevideo',
      component:singlevideo,
    },
    {
      path:'/vipsuccessful',
      component:vipsuccessful,
    },
    {
      path:'/videosuccessful',
      component:videosuccessful,
    },
    {
        path:'/',           //这个表示的是根目录，即一进入的页面
        redirect:'register'    //设置页面一进来就显示的页面，即重定向到goods组件，这里写的内容是对应组将的component的值
    }
]