import {createRouter, createWebHashHistory, createWebHistory} from 'vue-router'
import Home from "@/views/Home";

const routes = [
    {path: '/', name: '首页', component: Home, redirect: '/home', children: [{path: '/home', name: '首页', component: Home},]},
]

const router = createRouter({
    history:createWebHashHistory(),
    routes
})

// router.beforeEach((to, from, next) => {
//     if (to.path != '/login') { //需要登录
//         next()
//         let token = localStorage.getItem('token')
//         let logindto = {}
//         logindto.token = token
//         logindto.urlpath = to.path
//         if (token != null) { //登录过
//             //验证token
//             request.post("/lishu/user/checkToken", token).then(res => {
//                 //成功
//                 if (res.statusCode == '200') {
//                     // next()
//                     if (to.path == '/' || to.path == '/home') {
//                         next()
//                     } else {
//                         next()
//                     }
//                 } else {
//                     next({path: '/login'})
//                 }
//
//             }).catch(() => {
//                 next({path: '/login'})
//             })
//
//         } else { //没有登录
//             next({path: '/login'})
//         }
//     } else { //不需要登录
//         next()
//     }
// })


export default router
