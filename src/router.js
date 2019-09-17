import Vue from "vue";
import Router from "vue-router";
import Home from "./views/Home.vue";
import Content from "./views/Content/Content";

Vue.use(Router);

const router =  new Router({
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
      component: () => import("./views/Login.vue"),
      meta: {
        title: "登录"
      }
    },
    {
      path: "/Form",
      component: Content,
      children: [
        {
          path: "",
          name: "Form",
          component: () => import("./views/Form.vue"),
          meta: {
            title: "分布表单"
          }
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
          component: () => import("./views/MailList.vue"),
          meta: {
            title: "通讯录"
          }
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
          component: () => import("./views/Offer.vue"),
          meta: {
            title: "Offer管理"
          }
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
          component: () => import("./views/OrganizeEmployees.vue"),
          meta: {
            title: "人员组织"
          }
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
          component: () => import("./views/Salary.vue"),
          meta: {
            title: "薪酬管理"
          }
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
          component: () => import("./views/ScheduleManagement.vue"),
          meta: {
            title: "日程管理"
          }
        }
      ]
    },
    {
      path: "/Regist",
      name: "Regist",
      component: () => import("./views/Regist.vue"),
      meta: {
        title: "注册"
      }
    }
  ]
});

//设置白名单，指不需要登录就可以直接进入的页面
let whiteList = ["/Login", "/Regist"]
let user = localStorage.getItem("user")

router.beforeEach((to, from, next) => {
  if (user) {
      next()
  }
  else {
    if (whiteList.indexOf(to.path) !== -1) {
      next()//这里是即将进入的页面是白名单的页面就直接进入
    }
    else {
      next({ path: '/Login' })//这里是即将进入的页面不是白名单的页面又没有登录的情况下重定向到登录页面进行登录操作
    }
  }
})

export default router
