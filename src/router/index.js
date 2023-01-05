import { createRouter, createWebHistory } from 'vue-router'
import {authStore} from "../stores/counter"
import news  from "@/pages/news.vue"
const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path : "/",
      component : () => import("../pages/homeView.vue"),
      name : "home",
      meta : {
        requiresAuth : true
      },
      children : [
        {
          path : "/",
          component : () => import("../pages/mainLayout.vue"),
          name: "index"
        },
        {
                path : "/posts",
                component : () => import("../pages/posts.vue"),
                name : "posts"
              },
              {
                path : "/news",
                component : news,
                name : "news"
              },
              {
                path : "/movies",
                component : () => import("../pages/movies/List.vue"),
                name : "movies",
                children : [
                  {
                path : "/movies/:id",
                // component : () => import("../pages/movies/MovieSingle.vue"),
                redirect : {name : "moviesingle"},
                component : {
                  render(c) {
                    return c("router-view")
                  }
                },
                name : "movieinfo"
              },
              {
                path : "moviesingle", 
                component : () => import("../pages/movies/MovieSingle.vue"),
                name : "moviesingle" 
              }
                ]
              },
              {
                path : "/weather",
                component : () => import("../pages/weather/List.vue"),
                name : "weather"
              }
      ]
    },
    {
      path : "/login",
      component : () => import("../pages/login.vue"),
      name : "login"
    },
    {
      path : "/register",
      component : () => import("../pages/register.vue"),
      name : "register"
    },
    {
      path : "/404",
      component : () => import("../pages/notFound.vue"),
      name : "NotFound"
    },
    {
      path: '/:pathMatch(.*)*',
      redirect : {name : "NotFound"}
    }
  ]
})

// router.beforeEach((to, from, next) => {
//   let auth = authStore()

//   if (to.meta.requiresAuth && !auth.isAuth) {
//    next({name : "login"})
//   } else {
//      next()
//   }
// }) 

router.beforeEach((to, from, next) => {
  let auth = authStore()
  if(to.meta.requiresAuth && !auth.isAuth) {
    // console.log("ro'yxatdan o'ting")
    next({name : "login"})
  } else {
    // console.log("bemalol")
    next()
  }
})
export default router;
