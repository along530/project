import Vue from "vue";
import App from "@/App.vue";
import router from "@/router";
import store from "@/store";
import TypeNav from "@/components/TypeNav";
import "@/mock/mockServer";
import SliderLoop from "@/components/SliderLoop";
import "swiper/css/swiper.min.css";
import Pagination from '@/components/Pagination'

//全局注册TypeNav , 因为它是一个公共的组件
Vue.component("TypeNav", TypeNav);
Vue.component("SliderLoop", SliderLoop);
Vue.component('Pagination',Pagination)

Vue.config.productionTip = false;

new Vue({
  router, //注册注入给Vue添加路由功能并且能让每个组件内部都有两个对象可以拿到$router $route
  render: (h) => h(App),
  store,
  beforeCreate () {
    Vue.prototype.$bus = this; //配置全局事件总线
  },
}).$mount("#app");
