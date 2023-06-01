import { createRouter, createWebHistory } from "vue-router";
import { loadingStore } from "../stores/loading.store";
import { userStore } from "../stores/management/user.store";
import { h, resolveComponent } from "vue";
import jwtDecode from "jwt-decode";
import references from "./references";
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
          breadcrumbs: [
            {
              text: "Dashboard",
              to: "/",
              class: "bx bx-home-alt",
            },
          ],
        },
      },
      {
        path: "/management",
        name: "Management",
        redirect: { path: "/management/users" },
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
                  breadcrumbs: [
                    {
                      text: "Dashboard",
                      to: "/",
                    },
                    {
                      text: "Users",
                      to: "/management/users",
                    },
                  ],
                },
              },
              {
                path: "add",
                name: "User add",
                component: () =>
                  import("../pages/management/users/AddOrUpdate.vue"),
                meta: {
                  roles: ["admin"],
                  breadcrumbs: [
                    {
                      text: "Dashboard",
                      to: "/",
                    },
                    {
                      text: "Users",
                      to: "/management/users",
                    },
                    {
                      text: "Add",
                      to: "/management/users/add",
                    },
                  ],
                },
              },

              {
                path: ":id/update",
                name: "User update",
                component: () =>
                  import("../pages/management/users/AddOrUpdate.vue"),
                meta: {
                  roles: ["admin"],
                  breadcrumbs: [
                    {
                      text: "Dashboard",
                      to: "/",
                    },
                    {
                      text: "Users",
                      to: "/management/users",
                    },
                    {
                      text: "Update",
                      to: "/management/users/update",
                    },
                  ],
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
                  breadcrumbs : [
                    {
                      text: "Dashboard",
                      to: "/",
                    },
                    {
                      text: "Roles",
                      to: "/management/roles",
                    },

                  ]
                },
              },
              {
                path: "create",
                name: "Role create",
                component: () =>
                  import("../pages/management/roles/AddOrUpdate.vue"),
                meta: {
                  roles: ["admin"],
                  breadcrumbs : [
                    {
                      text: "Dashboard",
                      to: "/",
                    },
                    {
                      text: "Roles",
                      to: "/management/roles",
                    },
                    {
                      text: "Add",
                      to: "/management/roles/add",
                    }
                  ]
                },
              },
              {
                path: "update",
                name: "Role update",
                component: () =>
                  import("../pages/management/roles/AddOrUpdate.vue"),
                meta: {
                  roles: ["admin"],
                  breadcrumbs : [
                    {
                      text: "Dashboard",
                      to: "/",
                    },
                    {
                      text: "Roles",
                      to: "/management/roles",
                    },
                    {
                      text: "Update",
                      to: "/management/roles/update",
                    }
                  ]
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
              breadcrumbs : [
                {
                  text: "Dashboard",
                  to: "/",
                },
                {
                  text: "Permissions",
                  to: "/management/permissions",
                }
              ]
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
            meta : {
              breadcrumbs : [
                {
                  text: "Dashboard",
                  to: "/",
                },
                {
                  text: "Tests",
                  to: "/quiz",
                }
              ]
            }
          },
          {
            path: ":id",
            component: () => import("../pages/quiz/QuizRender.vue"),
            name: "",
            meta : {
              breadcrumbs : [
                {
                  text: "Dashboard",
                  to: "/",
                },
                {
                  text: "Tests",
                  to: "/quiz",
                },
                {
                  text: "Quiz",
                  to: "",
                }
              ]
            }
          },
        ],
      },
      {
        path: "/cabinet",
        name: "Kabinet",
        component: {
          render() {
            return h(resolveComponent("router-view"));
          },
        },
        children: [
          {
            path: "",
            name: "",
            component: {
              render() {
                return h(resolveComponent("router-view"));
              },
            },
            meta: { roles: ["teacher"] },
            children: [
              {
                path: "",
                name: "",
                component: () => import("../pages/cabinet/Profile.vue"),
              },
              {
                path: "/groups",
                name: "Guruhlar",
                component: {
                  render() {
                    return h(resolveComponent("router-view"));
                  },
                },
                children: [
                  {
                    path: "",
                    component: () => import("../pages/cabinet/groups/List.vue"),
                    name: "Guruhlar",
                  },
                ],
              },
              {
                path: "students",
                name: "O'quvchilar",
                component: {
                  render() {
                    return h(resolveComponent("router-view"));
                  },
                },
                children: [
                  {
                    path: "",
                    component: () =>
                      import("../pages/cabinet/groups/students/List.vue"),
                  },
                ],
              },
            ],
          },
          {
            path: "groups",
            name: "Guruhlar",
            meta: { roles: ["teacher"] },
            component: {
              render() {
                return h(resolveComponent("router-view"));
              },
            },
            children: [
              {
                path: "",
                name: "",
                component: {
                  render() {
                    return h(resolveComponent("router-view"));
                  },
                },
                children: [
                  {
                    path: "",
                    name: "",
                    component: () => import("../pages/cabinet/groups/List.vue"),
                  },
                ],
              },
              {
                path: "students",
                name: "O'quvchilar",
                component: () =>
                  import("../pages/cabinet/groups/students/List.vue"),
                meta: { roles: ["teacher"] },
                children: [],
              },
            ],
          },
        ],
      },
      {
        path: "/listeningQuizzes",
        component: {
          render() {
            return h(resolveComponent("router-view"));
          },
        },
        name: "Quizzes",
        meta: {
          public: false,
          roles: ["admin", "teacher", "student"],
        },
        children: [
          {
            path: "",
            component: () => import("../pages/listeningQuiz/List.vue"),
            name: "",
          },
          {
            path: ":id",
            component: () => import("../pages/listeningQuiz/QuizRender.vue"),
            name: "",
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
        path: "/statistic",
        component: () => import("../pages/statistic/List.vue"),
        name: "Statistika",
        meta: {
          roles: ["admin", "student", "teacher"],
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

router.beforeEach(async (to, from, next) => {
  let userRole = null;
  try {
    loadingStore().$patch({ loading: true });
    userStore().getCurrentUserRole();
    loadingStore().$patch({ loading: false });
    userRole = userStore().currentUserRole;
  } catch (e) {
    userRole = "student";
  } finally {
    loadingStore().$patch({ loading: false });
  }
  const requiredRoles = to.meta.roles;
  let { exp } = jwtDecode(token) || null;
  let current = Math.floor(Date.now() / 1000);
  let isValid = current <= exp;
  if (!isValid && to.name != "login") {
    next("/login");
  } else {
    if (!requiredRoles?.some((role) => role === userRole) && to.path != "/") {
      next("/");
    } else {
      // performance.mark('next')`
      next();
    }
  }
});
export default router;
