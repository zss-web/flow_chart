import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import ant from "ant-design-vue";
import DrawFlow from "./components/DrawFlow";
import EchartsDemo from "./components/echarts";
import "ant-design-vue/dist/antd.less";

Vue.config.productionTip = false;
Vue.use(ant);
Vue.use(EchartsDemo);
Vue.use(DrawFlow);
new Vue({
  router,
  store,
  render: h => h(App)
}).$mount("#app");
