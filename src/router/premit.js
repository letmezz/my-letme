import {getToken} from "@/utils/app.js";
import router from "./index.js";
import storage from "@/storage/storage.js";
import store from "@/store/index.js";


//路由守卫
// 设置路由守卫，在进页面之前，判断有token，才进入页面，否则返回登录页面
// if (storage.get("token")) {
//     store.commit("SET_TOKEN", storage.get("token"));
// }
// router.beforeEach((to, from, next) => {
// // 判断要去的路由有没有requiresAuth
// // to.matched.some(r => r.meta.requireAuth) or to.meta.requiresAuth
// if (to.matched.some(r => r.meta.requireAuth)) {
//     if (store.state.token) {
//     next(); //有token,进行request请求，后台还会验证token
//     } else {
//     next({
//         path: "/Login",
//         // 将刚刚要去的路由path（却无权限）作为参数，方便登录成功后直接跳转到该路由，这要进一步在登陆页面判断
//         query: { redirect: to.fullPath }  
//     });
//     }
// } else {
//     next(); //如果无需token,那么随它去吧
// }
// });


router.beforeEach((to, from, next) => {
    let token = sessionStorage.getItem('token')
    // 如果已经登录，那我不干涉你，让你随便访问
    if (token) {
        console.log(token)
      next()
    } else {
      if (to.path !== '/Login') {
        // 如果没有登录，但你访问其他需要登录的页面，那我就让你跳到登录页面去
        next({path: '/Login'})
      } else {
        // 如果没有登录，但你访问的login，那就不干涉你，让你访问
        next()
      }
    }
  })
 
 
    /*
    守卫使用
    1.直接进去index的时候，参数to就改变成了index，触发路由指向，就会跑beforeEach
    2.再一次next指向login，再次发生发现路由指向，再去跑beforeEach,参数to这时被改变成login
    3.判断名单存在，直接next放行
    */
  

  