import { createRouter, createWebHistory } from "vue-router";
import { authStore } from "../stores/counter";
import news from "@/pages/news.vue";
import { loadingStore } from "../stores/loading.store";
import { app } from "../main";
import { h, resolveComponent } from "vue";

// let weather = "<></>"
// let weatherInfo = "<></>"
// let weatherInfoUpdate = "<></>"

const weather = {
  template: `
    <h1>Weather</h1>
  `,
};

const weatherInfo = {
  template: `
    <h1>Weather Info</h1>
  `,
};

const weatherInfoUpdate = {
  template: `
    <h1>Weather Info Update</h1>
  `,
};

const routes = [
  {
    path: "/",
    component: () => import("../pages/homeView.vue"),
    name: "Dashboard",
    meta: {
      public: false,
    },
    children: [
      {
        path: "/",
        name: "Dashboard",
        component: () => import("../pages/mainLayout.vue"),
        meta: {
          public: false,
          isMain: true,
        },
      },
      {
        path: "/management",
        name: "Management",
        redirect: { name: "" },
        component: {
          render() {
            return h(resolveComponent("router-view"));
          },
        },

        children: [
          {
            path: "users",
            name: "Users",
            component: {
              render() {
                return h(resolveComponent("router-view"));
              },
            },
            children: [
              {
                path: "",
                name: "",
                component: () => import("../pages/management/users/List.vue"),
              },
              {
                path: "add",
                name: "User add",
                component: () =>
                  import("../pages/management/users/AddOrUpdate.vue"),
              },
              {
                path: "update",
                name: "User update",
                component: () =>
                  import("../pages/management/users/AddOrUpdate.vue"),
              },
            ],
          },
          {
            path: "roles",
            name: "Roles",
            component: {
              render() {
                return h(resolveComponent("router-view"));
              },
            },
            children: [
              {
                path: "",
                name: "",
                component: () => import("../pages/management/roles/List.vue"),
              },
              {
                path: "create",
                name: "Role create",
                component: () =>
                  import("../pages/management/roles/AddOrUpdate.vue"),
              },
              {
                path: "update",
                name: "Role update",
                component: () =>
                  import("../pages/management/roles/AddOrUpdate.vue"),
              },
            ],
          },
        ],
      },
      {
        path: "/news",
        component: () => import("../pages/news.vue"),
        name: "news",
        meta: {
          public: false,
        },
      },
      {
        path: "/posts",
        component: () => import("../pages/posts.vue"),
        name: "posts",
      },
      {
        path: "/movies",
        // component : () => import("../pages/movies/List.vue"),
        component: {
          render() {
            return h(resolveComponent("router-view"));
          },
        },
        name: "Movies",
        children: [
          {
            path: "",
            component: () => import("../pages/movies/List.vue"),
            name: "",
          },
          {
            path: ":id",
            component: () => import("../pages/movies/MovieSingle.vue"),
            name: "Informatsiya",
            meta: {
              info: true,
            },
          },
        ],
      },
      {
        path : "todos",
        name : "Todos",
        component : {
           render() {
            return h(resolveComponent("router-view"))
           }
        },
        children : [
          {
            path : "",
            component : () => import("../pages/todos/List.vue"),
            name : ""
          },
          {
            path : ":id/update",
            component : () => import("../pages/todos/AddOrUpdate.vue"),
            name : "Todo update"
          },
          {
            path : "add",
            component : () => import("../pages/todos/AddOrUpdate.vue"),
            name : "Todo add"
          }
        ]
      }
    ],
  },
  {
    path: "/login",
    component: () => import("../pages/login.vue"),
    name: "login",
    meta: {
      public: true,
    },
  },
  {
    path: "/register",
    component: () => import("../pages/register.vue"),
    name: "register",
    meta: {
      public: true,
    },
  },
  {
    path: "/404",
    component: () => import("../pages/notFound.vue"),
    name: "NotFound",
    meta: {
      public: true,
    },
  },
  {
    path: "/:pathMatch(.*)*",
    redirect: { name: "NotFound" },
  },
];

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: routes,
});
router.beforeEach((to, from, next) => {
  // const isAuthenticated = authStore().isAuth;
  let  isAuthenticated = true
  const isPublic = to.meta.public ? true : false;
  const isMain = to.meta.isMain;
  const isMounted = loadingStore().isMounted;
  if (!isPublic && !isAuthenticated) {
    next("/login");
  } else {
    // loadingStore().$patch({loading : true})
    // setTimeout(() => {
    //   next()
    //   loadingStore().$patch({loading : false})
    // }, 300);
    if (!loadingStore().isMounted) {
      setTimeout(() => {
        next();
      }, 500);
    } else {
      next();
    }
  }
});
export default router;
