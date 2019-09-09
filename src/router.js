import Vue from "vue";
import Router from "vue-router";
import Home from "./views/Home.vue";
import Content from "./views/Content/Content";

Vue.use(Router);

export default new Router({
  mode: "history",
  routes: [
    {
      path: "/",
      component: Content,
      children: [
        {
          path: "",
          name: "home",
          component: Home
        }
      ]
    },
    {
      path: "/Login",
      name: "Login",
      component: () => import("./views/Login.vue")
    },
    {
      path: "/Form",
      component: Content,
      children: [
        {
          path: "",
          name: "Form",
          component: () => import("./views/Form.vue")
        }
      ]
    },
    {
      path: "/MailList",
      component: Content,
      children: [
        {
          path: "",
          name: "MailList",
          component: () => import("./views/MailList.vue")
        }
      ]
    },
    {
      path: "/Offer",
      component: Content,
      children: [
        {
          path: "",
          name: "Offer",
          component: () => import("./views/Offer.vue")
        }
      ]
    },
    {
      path: "/OrganizeEmployees",
      component: Content,
      children: [
        {
          path: "",
          name: "OrganizeEmployees",
          component: () => import("./views/OrganizeEmployees.vue")
        }
      ]
    },
    {
      path: "/Salary",
      component: Content,
      children: [
        {
          path: "",
          name: "Salary",
          component: () => import("./views/Salary.vue")
        }
      ]
    },
    {
      path: "/ScheduleManagement",
      component: Content,
      children: [
        {
          path: "",
          name: "ScheduleManagement",
          component: () => import("./views/ScheduleManagement.vue")
        }
      ]
    },
    {
      path: "/Regist",
      name: "Regist",
      component: () => import("./views/Regist.vue")
    }
  ]
});
