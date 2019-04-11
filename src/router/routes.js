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
import shoppingmall from '../components/ShoppingMall/ShoppingMall'
import shoppingcart from '../components/ShoppingCart/ShoppingCart'
import personalcenter from '../components/PersonalCenter/PersonalCenter'
import account from '../components/Account/Account' 
import membership from '../components/Membership/Membership'
import projectsharing from '../components/ProjectSharing/projectsharing'
import background from '../components/ProjectSharing/BackGround/background'
import brightspot from '../components/ProjectSharing/BrightSpot/brightspot'
import creativeteam from '../components/ProjectSharing/CreativeTeam/creativeteam'
import address from '../components/Address/address'
import MyOrders from '../components/MyOrders/MyOrders'
import newaddress from '../components/NewAddress/newaddress'
import editaddress from '../components/EditAddress/editaddress'
import purchaseorder from '../components/PurchaseOrder/purchaseorder'
import commoditydetails from '../components/CommodityDetails/commoditydetails'
import commodity from '../components/CommodityDetails/Commodity/commodity'
import evaluation from '../components/CommodityDetails/Evaluation/evaluation'
import instructions from '../components/CommodityDetails/Instructions/instructions'
import Classification from '../components/Classification/Classification'


export default [
    {
      path: '/',
      component: Login,
    },
    {
      path: '/register',
      component: register,
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
      path:'/commoditydetails',
      component:commoditydetails,
      children: [
        // 二级路由路径,不加/
          {
            path:'commodity',
            name:'commodity',
            component: commodity
          },
          {
            path:'evaluation',
            name:'evaluation',
            component:evaluation
            },
          {
            path:'instructions', 
            name:'instructions', 
            component:instructions
          },
          {
            path:'',           //这个表示的是根目录，即一进入的页面
            redirect:'commodity'    //设置页面一进来就显示的页面，即重定向到goods组件，这里写的内容是对应组将的component的值
          }
        ]
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
    path: '/MyOrders',
    component: MyOrders,
    },
    {
      path:'/shoppingcart',
      component:shoppingcart,
      meta: {
        isShow: true // 标识显示底部导航
      }
    },
    {
      path:'/shoppingmall',
      component:shoppingmall,
      meta: {
        isShow: true // 标识显示底部导航
      }
    },
    {
      path:'/personalcenter',
      component:personalcenter,
      meta: {
        isShow: true // 标识显示底部导航
      }
    },
    {
      path:'/account',
      component:account,
    },
    {
      path:'/membership',
      component:membership,
    },
    {
      path:'/shoppingcart',
      component:shoppingcart,
      meta: {
        isShow: true // 标识显示底部导航
      }
    },
    {
      path:'/shoppingmall',
      component:shoppingmall,
      meta: {
        isShow: true // 标识显示底部导航
      }
    },
    {
      path:'/personalcenter',
      component:personalcenter,
      meta: {
        isShow: true // 标识显示底部导航
      }
    },
    {
      path:'/purchaseorder',
      component:purchaseorder,
    },
    {
      path:'/address',
      component:address
    },
    {
      path: '/newaddress',
      component:newaddress,
    },
    {
      path:'/editaddress',
      component:editaddress
    },
    {
      path:'/account',
      component:account,
    },
    {
      path:'/Classification',
      component:Classification,
    },
    {
      path:'/membership',
      component:membership,
    },
    {
      path:'/projectsharing',
      component:projectsharing,
      children: [
        // 二级路由路径,不加/
          {
            path:'background',
            component: background
          },
          {
            path:'brightspot',
            component:brightspot
          },
          {
            path:'creativeteam', 
            component:creativeteam
          },
          {
            path:'',           //这个表示的是根目录，即一进入的页面
            redirect:'background'    //设置页面一进来就显示的页面，即重定向到goods组件，这里写的内容是对应组将的component的值
          }
        ]
    },
    {
        path:'/',           //这个表示的是根目录，即一进入的页面
        redirect:'login'    //设置页面一进来就显示的页面，即重定向到goods组件，这里写的内容是对应组将的component的值
    }
]
