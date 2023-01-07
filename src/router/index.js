import { createRouter, createWebHistory } from 'vue-router'
import {authStore} from "../stores/counter"
import news  from "@/pages/news.vue"
import { loadingStore } from '../stores/loading.store'
import { app } from '../main'
import { h, resolveComponent } from 'vue'

const routes = [
  {
    path : "/",
    component : () => import("../pages/homeView.vue"),
    name : "homeView",
    meta : {
      public : false,
    },
    children : [
    {
        path: "/",
        name: "Dashboard",
        component: ()=> import("../pages/mainLayout.vue"),
        meta: {
            public: false,
            isMain : true
        },
    },
    {
        path : "/news",
        component : () => import("../pages/news.vue"),
        name : "news",
        meta : {
          public : false
        }
    },
    {
        path : "/posts",
        component : () => import ("../pages/posts.vue"),
        name : "posts"
    },
    {
        path : "/movies",
        // component : () => import("../pages/movies/List.vue"),
        component : {
          render() {
            return h(resolveComponent("router-view"))
          },
        },
        name : "Movies",
        children : [
          {
            path : "",
            component : () => import("../pages/movies/List.vue"),
            name : "movies"
          },
          {
            path : ":id",
            component : () => import("../pages/movies/movieSingle.vue"),
            name : "Informatsiya"
          }
        ]
    }
    ]
  },
  {
    path : "/login",
    component : () => import("../pages/login.vue"),
    name : "login",
    meta : {
      public : true
    }
  },
  {
    path : "/register",
    component : () => import("../pages/register.vue"),
    name : "register",
    meta : {
      public : true
    }
  },
  {
    path : "/404",
    component : () => import("../pages/notFound.vue"),
    name : "NotFound",
    meta : {
      public : true
    }
  },
  {
    path: '/:pathMatch(.*)*',
    redirect : {name : "NotFound"}
  }
]

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes  : routes
  // routes: [
  //   {
  //     path : "/",
  //     redirect : "/dashboard",
  //     component : () => import("../pages/homeView.vue"),
  //     name : "Dashboard",
  //     meta : {
  //       requiresAuth : true
  //     },
  //     children : [
  //       {
  //         path : "/dashboard",
  //         component : () => import("../pages/mainLayout.vue"),
  //         name: "index"
  //       },
  //       {
  //         path : "/posts",
  //         component : () => import("../pages/posts.vue"),
  //         name : "posts"
  //             },
  //       {
  //       path : "/news",
  //       component : news,
  //       name : "news"
  //       },
  //       {
  //         path : "/movies",
  //         component : () => import("../pages/movies/List.vue"),
  //         component : {
  //           render() {
  //             return h(resolveComponent("router-view"))
  //           }
  //         },
  //         redirect : {label : "moviesList"},
  //         name : "movies",
  //       children : [
  //           {
  //             path : "",
  //             component : () => import("../pages/movies/List.vue"),
  //             label : "moviesList"
  //           },
  //           {
  //             path : ":id",
  //             component : () => import("../pages/movies/MovieSingle.vue"),
  //             name : "movieInfo", 
  //           }
  //         ]
  //       },
  //       {
  //         path : "/weather",
  //         component : () => import("../pages/weather/List.vue"),
  //         name : "weather"
  //       }
  //     ]
  //   },
  //   {
  //     path : "/login",
  //     component : () => import("../pages/login.vue"),
  //     name : "login"
  //   },
  //   {
  //     path : "/register",
  //     component : () => import("../pages/register.vue"),
  //     name : "register"
  //   },
  //   {
  //     path : "/404",
  //     component : () => import("../pages/notFound.vue"),
  //     name : "NotFound"
  //   },
  //   {
  //     path: '/:pathMatch(.*)*',
  //     redirect : {name : "NotFound"}
  //   }
  // ]
})

// router.beforeEach((to, from, next) => {
//   let auth = authStore()

//   if (to.meta.requiresAuth && !auth.isAuth) {
//    next({name : "login"})
//   } else {
//      next()
//   }
// }) 



// router.beforeEach((to, from, next) => {
//   const isPublic = to.meta.isPublic;
//   const loggedIn = authStore().isAuth
//   const loadStore = loadingStore()
//   let auth = authStore()
//   if(to.meta.requiresAuth && !auth.isAuth) {
//     next({name : "login"})
//   } else {
//     loadStore.$patch({loading : true})
//     next()
//     loadStore.$patch({loading : false})
//   }
// })
router.beforeEach((to, from, next) => {
  
  const isAuthenticated = authStore().isAuth;
  const isPublic = to.meta.public ? true : false;
  const isMain = to.meta.isMain;
  const isMounted = loadingStore().isMounted;
  console.log(isMain)
  if(!isPublic && !isAuthenticated) {
    next("/login")
  } else {
    // loadingStore().$patch({loading : true})
    // setTimeout(() => {
    //   next()
    //   loadingStore().$patch({loading : false})
    // }, 300);
    if(isMain && !loadingStore().isMounted) {
      loadingStore().$patch({loading : true})
      setTimeout(() => {
        next()
        loadingStore().$patch({loading : false})
      }, 500);
    } else {
      next()
    }
    
  }
})
export default router;
