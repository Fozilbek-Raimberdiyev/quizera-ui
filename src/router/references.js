import { h, resolveComponent } from "vue";
export default {
  path: "/references",
  component: {
    render() {
      return h(resolveComponent("router-view"));
    },
  },
  name: "Ma'lumotnomalar",
  children: [
    {
      path: "quiz",
      component: {
        render() {
          return h(resolveComponent("router-view"));
        },
      },
      name: "Quiz",
      meta: {
        roles: ["admin", "teacher", "student"],
      },
      children: [
        {
          path: "",
          component: () => import("../pages/references/quiz/List.vue"),
          name: "List",
        },
        {
          path: ":id",
          component: () => import("../pages/references/quiz/View.vue"),
          name: "View",
          meta: {
            roles: ["admin","teacher", "student"],
          },
        },
        {
          path: "add",
          component: () => import("../pages/references/quiz/AddOrUpdate.vue"),
          name: "Question add",
          meta: {
            roles: ["admin", "teacher"],
          },
        },
        {
          path: ":id/update",
          component: () => import("../pages/references/quiz/AddOrUpdate.vue"),
          name: "Quiz edit",
          meta: {
            roles: ["admin", "teacher"],
          },
        },
      ],
    },
    {
      path: "subject",
      component: () => import("../pages/references/subject/List.vue"),
      name: "Subject",
      meta: {
        roles: ["admin", "teacher", "student"],
      },
      children: [
        {
          path: "add",
          component: () =>
            import("../pages/references/subject/AddOrUpdate.vue"),
          name: "Subject add",
          meta: {
            roles: ["admin", "teacher"],
          },
        },
        {
          path: ":id/update",
          component: () =>
            import("../pages/references/subject/AddOrUpdate.vue"),
          name: "Subject edit",
          meta: {
            roles: ["admin", "teacher"],
          },
        },
      ],
    },
    {
      path: "listening",
      component: () => import("../pages/references/listening/List.vue"),
      name: "Listening",
      meta: {
        roles: ["admin", "teacher", "student"],
      },
      children: [
        {
          path: "add",
          component: () =>
            import("../pages/references/listening/AddOrUpdate.vue"),
          name: "Listening quiz add",
          meta: {
            roles: ["admin", "teacher"],
          },
        },
        {
          path: ":id/update",
          component: () =>
            import("../pages/references/listening/AddOrUpdate.vue"),
          name: "Listening quiz edit",
          meta: {
            roles: ["admin", "teacher"],
          },
        },
      ],
    },
  ],
};
