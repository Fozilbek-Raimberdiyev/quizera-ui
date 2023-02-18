import { createRouter, createWebHistory } from "vue-router";
import { loadingStore } from "../stores/loading.store";
import { userStore } from "../stores/management/user.store";
import { h, resolveComponent } from "vue";
import jwtDecode from "jwt-decode";
import references from "./references";
import auth from "../services/auth";
let token =
  localStorage.getItem("token") ||
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiaWF0IjoxNTE2MjM5MDIyfQ.SflKxwRJSMeKKF2QT4fwpMeJf36POk6yJV_adQssw5c";
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
        path: "",
        name: "",
        component: () => import("../pages/mainLayout.vue"),
        meta: {
          public: false,
          isMain: true,
          roles: ["admin", "teacher", "student"],
        },
      },
      {
        path: "/management",
        name: "Management",
        component: {
          render() {
            return h(resolveComponent("router-view"));
          },
        },
        meta: {
          roles: ["admin"],
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
                meta: {
                  roles: ["admin"],
                },
              },
              {
                path: "add",
                name: "User add",
                component: () =>
                  import("../pages/management/users/AddOrUpdate.vue"),
                meta: {
                  roles: ["admin"],
                },
              },

              {
                path: "update",
                name: "User update",
                component: () =>
                  import("../pages/management/users/AddOrUpdate.vue"),
                meta: {
                  roles: ["admin"],
                },
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
            meta: {
              roles: ["admin"],
            },
            children: [
              {
                path: "",
                name: "",
                component: () => import("../pages/management/roles/List.vue"),
                meta: {
                  roles: ["admin"],
                },
              },
              {
                path: "create",
                name: "Role create",
                component: () =>
                  import("../pages/management/roles/AddOrUpdate.vue"),
                meta: {
                  roles: ["admin"],
                },
              },
              {
                path: "update",
                name: "Role update",
                component: () =>
                  import("../pages/management/roles/AddOrUpdate.vue"),
                meta: {
                  roles: ["admin"],
                },
              },
            ],
          },
          {
            path: "permissions",
            name: "Permissions",
            component: () =>
              import("../pages/management/permissions/Permissions.vue"),
            meta: {
              roles: ["admin"],
            },
          },
        ],
      },
      {
        path: "/quiz",
        component: {
          render() {
            return h(resolveComponent("router-view"));
          },
        },
        name: "Tests",
        meta: {
          public: false,
          roles: ["admin", "teacher", "student"],
        },
        children: [
          {
            path: "",
            component: () => import("../pages/quiz/List.vue"),
            name: "",
          },
          {
            path: ":id",
            component: () => import("../pages/quiz/QuizRender.vue"),
            name: "",
          },
          {
            path: "add",
            component: () => import("../pages/quiz/AddOrUpdate.vue.vue"),
            name: "Qo'shish",
          },
          {
            path: "edit",
            component: () => import("../pages/quiz/AddOrUpdate.vue.vue"),
            name: "Tahrirlash",
          },
        ],
      },
      {
        path: "/posts",
        component: () => import("../pages/posts.vue"),
        name: "posts",
        meta: {
          roles: ["admin", "teacher", "student"],
        },
      },
      {
        path: "/movies",
        // component : () => import("../pages/movies/List.vue"),
        component: {
          render() {
            return h(resolveComponent("router-view"));
          },
        },
        meta: {
          roles: ["admin", "teacher", "student"],
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
        path: "todos",
        name: "Todos",
        component: {
          render() {
            return h(resolveComponent("router-view"));
          },
        },
        meta: {
          roles: ["admin", "teacher", "student"],
        },
        children: [
          {
            path: "",
            component: () => import("../pages/todos/List.vue"),
            name: "",
          },
          {
            path: ":id/update",
            component: () => import("../pages/todos/AddOrUpdate.vue"),
            name: "Todo update",
          },
          {
            path: "add",
            component: () => import("../pages/todos/AddOrUpdate.vue"),
            name: "Todo add",
          },
        ],
      },
      {
        path: "/profile",
        component: () => import("../pages/profile/me.vue"),
        name: "Profile",
        meta: {
          roles: ["admin", "teacher", "student"],
        },
      },
      {
        ...references,
      },
    ],
  },
  {
    path: "/login",
    component: () => import("../pages/login.vue"),
    name: "login",
    meta: {
      public: true,
      roles: ["admin", "teacher", "student"],
    },
  },
  {
    path: "/register",
    component: () => import("../pages/register.vue"),
    name: "register",
    meta: {
      public: true,
      roles: ["admin", "teacher", "student"],
    },
  },
  {
    path: "/404",
    component: () => import("../pages/notFound.vue"),
    name: "NotFound",
    meta: {
      public: true,
      roles: ["admin", "teacher", "student"],
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

router.beforeEach(async(to, from, next) => {
  // let userRole = userStore().currentUserRole;
  let userRole = null
  try{
    userStore().getCurrentUserRole()
    userRole =  userStore().currentUserRole;

  }catch(e) {
    userRole = "student"
  }
  const requiredRoles = to.meta.roles;
  let { exp } = jwtDecode(token) || null;
  let current = Math.floor(Date.now() / 1000);
  let isValid = current <= exp;
  const isAuth = userStore().isAuth;

  if(!isValid  && to.name!="login") {
    next("/login")
  } else {
    if(!requiredRoles?.some((role) => role === userRole) && to.path!="/") {
      next("/")
    } else {
      next()
    }
  }
});
export default router;
