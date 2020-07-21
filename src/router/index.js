import Vue from "vue";
import VueRouter from "vue-router";
import Login from "../views/Login/Login.vue";
import Info from "@/views/Info/Info.vue";





Vue.use(VueRouter);


//解决重复点击跳转
const originalPush = VueRouter.prototype.push
   VueRouter.prototype.push = function push(location) {
   return originalPush.call(this, location).catch(err => err)
}


const routes = [


 
  {
    path:"/",
    redirect:"Login",
    hidden:true,
    meta:{
      name:"主页"
    }
  },
  {
    path: "/Login",
    name: "Login",
    component: Login,
    hidden:true,
    meta:{
      name:"登录"
    }
  },
  {
    path: "/Home",
    name: "Home",
    redirect:"index",
    meta:{
      name:"控制台",
      icons:'el-icon-odometer'
    },
    component: () => import("@/views/Layout/Layout.vue"),
    children:[
      {
        path: "/index",
        name: "index",
        meta:{
          name:"首页"
        },
        component: () => import("@/views/Home/Home.vue")
      }
    ]
  },
  {
    path: "/Info",
    name: "Info",
    meta:{
      name:"信息管理",
      icons:'el-icon-message'
    },
    component: () => import("@/views/Layout/Layout.vue"),

    children:[
      {
        path: "/Infoindex",
        name: "Infoindex",
        component:Info,
        meta:{
          name:"信息列表"
        },
      },
      {
        path: "/InfoCategory",
        name: "InfoCategory",
        meta:{
          name:"信息分类"
        },
        component: () => import("@/views/Info/InfoCategory.vue")
      }
    ]
  },
  {
    path: "/User",
    name: "User",
    meta:{
      name:"用户管理",
      icons:'el-icon-s-custom'
    },
    component: () => import("@/views/Layout/Layout.vue"),
    children:[
      {
        path: "/Userindex",
        name: "Userindex",
        meta:{
          name:"用户列表"
        },
        component: () => import("@/views/User/User.vue")
      }
    ]
  }

];


const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes
});

export default router;
