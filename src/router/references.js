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
      children: [
        {
          path: "",
          component: () => import("../pages/references/quiz/List.vue"),
          name: "List",
        },
        {
          path : ":id",
          component : () => import("../pages/references/quiz/View.vue"),
          name : "View"
        },
        {
          path: "add",
          component: () => import("../pages/references/quiz/AddOrUpdate.vue"),
          name: "Quiz add",
        },
        {
          path: ":id/update",
          component: () => import("../pages/references/quiz/AddOrUpdate.vue"),
          name: "Quiz edit",
        },
      ],
    },
    {
      path: "subject",
      component: () => import("../pages/references/subject/List.vue"),
      name: "Subject",
      children: [
        {
          path: "add",
          component: () =>
            import("../pages/references/subject/AddOrUpdate.vue"),
          name: "Subject add",
        },
        {
          path: ":id/update",
          component: () =>
            import("../pages/references/subject/AddOrUpdate.vue"),
          name: "Subject edit",
        },
      ],
    },
  ],
};
