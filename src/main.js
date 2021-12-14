import Vue from 'vue';
import App from './App';
import {api} from "./common/api";
import msg from './common/msg';
import uView from "uview-ui";
import '@fower/uniapp';

Vue.config.productionTip = false;

App.mpType = 'app';

Vue.use(uView);

Vue.prototype.$api = api;
Vue.prototype.$msg = msg;

const app = new Vue({
  ...App,
});
app.$mount();
