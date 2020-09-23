import Vue from "vue";
import VueRouter from "vue-router";
import Kanban from "../views/kanban/Kanban.vue";
import beforeEach from "./beforeEach";

Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    name: "Login",
    component: () => import(/* webpackChunkName: "login" */ "../auth/Auth.vue"),
    meta: {
      title: "Login",
      icon: "",
      isMenu: false,
    },
  },
  {
    path: "/home",
    children: [
      {
        path: "/kanban",
        name: "kanban",
        component: Kanban,
        meta: {
          title: "Kanban",
          icon: "mdi-home",
          isMenu: true,
        },
      },
      {
        path: "/todo",
        name: "Todo",
        component: () =>
          import(/* webpackChunkName: "todo" */ "../views/todo/Todo.vue"),
        meta: {
          title: "Trello",
          icon: "mdi-email",
          isMenu: true,
        },
      },
      /*  {
        path: "/cadastro",
        name: "Cadastro",
        component: () =>
          import(
             "../views/paciente/Paciente.vue"
          ),
        meta: {
          title: "Cadastro Usuario",
          icon: "mdi mdi-account-multiple",
          isMenu: true,
        },
      } */
      {
        path: "/medico",
        name: "Medico",
        component: () =>
          import(/* webpackChunkName: "todo" */ "../views/medico/Medico.vue"),
        meta: {
          title: "Medicos",
          icon: "mdi-hospital",
          isMenu: true,
        },
      },
    ],
    name: "Home",
    component: () =>
      import(/* webpackChunkName: "login" */ "../views/home/Home.vue"),
    meta: {
      title: "Home",
      icon: "",
      isMenu: false,
    },
  },
];

const router = new VueRouter({
  /*   mode: "history",
  base: process.env.BASE_URL, */
  routes,
});

router.beforeEach(beforeEach);

export default router;
