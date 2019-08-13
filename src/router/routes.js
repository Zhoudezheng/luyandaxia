import register from '../components/register/register'
import Login from '../components/login/login'
import LiveSharing from '../components/LiveSharing/liveSharing'
import Interaction from '../components/LiveSharing/interaction/interaction'
import introduction from '../components/LiveSharing/introduction/introduction'
import recommend from '../components/LiveSharing/recommend/recommend'
import vipmember from '../components/VipMember/VipMember'
import singlevideo from '../components/SingleVideo/SingleVideo'
import vipsuccessful from '../components/VipSuccessful/VipSuccessful'
import viple from '../components/VipSuccessful/viple'
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
import orderdetail from '../components/OrderDetail/orderdetail'
import membershiprecord from '../components/MembershipRecord/membershiprecord'
import recommenddetail from '../components/recommendDetail/recommendDetail'

export default [
    {
      path: '/login',
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
            // meta: {
            //   requireAuth: true, // 添加该字段，表示进入这个路由是需要登录的
            // },
            component: introduction,
          },
          {
            path:'Interaction',
            name:'Interaction',
            // meta: {
            //   requireAuth: true, // 添加该字段，表示进入这个路由是需要登录的
            // },
            component:Interaction
            },
          {
            path:'recommend', 
            name:'recommend', 
            // meta: {
            //   requireAuth: true, // 添加该字段，表示进入这个路由是需要登录的
            // },
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
      meta: {
        requireAuth: true, // 添加该字段，表示进入这个路由是需要登录的
      },
      component: vipmember,
    },
    {
      path:'/singlevideo',
      meta: {
        requireAuth: true, // 添加该字段，表示进入这个路由是需要登录的
      },
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
            // meta: {
            //   requireAuth: true, // 添加该字段，表示进入这个路由是需要登录的
            // },
            component: commodity
          },
          {
            path:'evaluation',
            name:'evaluation',
            // meta: {
            //   requireAuth: true, // 添加该字段，表示进入这个路由是需要登录的
            // },
            component:evaluation
            },
          {
            path:'instructions', 
            name:'instructions', 
            // meta: {
            //   requireAuth: true, // 添加该字段，表示进入这个路由是需要登录的
            // },
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
      meta: {
        requireAuth: true, // 添加该字段，表示进入这个路由是需要登录的
      },
      component:vipsuccessful,
    },
    {
      path:'/videosuccessful',
      // meta: {
      //   requireAuth: true, // 添加该字段，表示进入这个路由是需要登录的
      // },
      component:videosuccessful,
    },
    {
      path:'/viple',
      // meta: {
      //   requireAuth: true, // 添加该字段，表示进入这个路由是需要登录的
      // },
      component:viple,
    },
    {
    path: '/MyOrders',
    meta: {
      requireAuth: true, // 添加该字段，表示进入这个路由是需要登录的
    },
    component: MyOrders,
    },
    {
      path:'/shoppingcart',
      component:shoppingcart,
      meta: {
        isShow: true, // 标识显示底部导航
        requireAuth: true, // 添加该字段，表示进入这个路由是需要登录的
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
      meta: {
        requireAuth: true, // 添加该字段，表示进入这个路由是需要登录的
      },
      component:account,
    },
    {
      path:'/membership',
      meta: {
        requireAuth: true, // 添加该字段，表示进入这个路由是需要登录的
      },
      component:membership,
    },
    {
      path:'/shoppingcart',
      component:shoppingcart,
      meta: {
        isShow: true, // 标识显示底部导航
        requireAuth: true, // 添加该字段，表示进入这个路由是需要登录的
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
      path:'/purchaseorder',
      meta: {
        requireAuth: true, // 添加该字段，表示进入这个路由是需要登录的
      },
      component:purchaseorder,
    },
    {
      path:'/address',
      meta: {
        requireAuth: true, // 添加该字段，表示进入这个路由是需要登录的
      },
      component:address
    },
    {
      path: '/newaddress',
      meta: {
        requireAuth: true, // 添加该字段，表示进入这个路由是需要登录的
      },
      component:newaddress,
    },
    {
      path:'/editaddress',
      meta: {
        requireAuth: true, // 添加该字段，表示进入这个路由是需要登录的
      },
      component:editaddress
    },
    {
      path:'/Classification',
      meta: {
        requireAuth: true, // 添加该字段，表示进入这个路由是需要登录的
      },
      component:Classification,
    },
    {
      path:'/membership',
      component:membership,
    },
    {
      path:'/membershiprecord',
      component:membershiprecord
    },
    {
      path:'/orderdetail',
      component:orderdetail
    },
    {
      path:'/recommenddetail',
      component:recommenddetail
    },
    {
      path:'/projectsharing',
      component:projectsharing,
      children: [
        // 二级路由路径,不加/
          {
            path:'background',
            meta: {
              requireAuth: true, // 添加该字段，表示进入这个路由是需要登录的
            },
            component: background
          },
          {
            path:'brightspot',
            meta: {
              requireAuth: true, // 添加该字段，表示进入这个路由是需要登录的
            },
            component:brightspot
          },
          {
            path:'creativeteam', 
            meta: {
              requireAuth: true, // 添加该字段，表示进入这个路由是需要登录的
            },
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
        redirect:'shoppingmall'    //设置页面一进来就显示的页面，即重定向到goods组件，这里写的内容是对应组将的component的值
    }
]
