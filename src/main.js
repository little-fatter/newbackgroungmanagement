import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import "./mock";
import http from "./http";
import ElementUI from "element-ui";
import "element-ui/lib/theme-chalk/index.css";
import VCharts from 'v-charts'

Vue.use(ElementUI);
Vue.config.productionTip = false;
Vue.prototype.$axios = http;
Vue.use(VCharts)

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount("#app");
