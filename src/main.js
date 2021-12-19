import Vue from 'vue';
import App from './App';
import uView from "uview-ui";
import '@fower/uniapp';
import './common/bootstrap';

Vue.config.productionTip = false;

App.mpType = 'app';

Vue.use(uView);
uni.$u.config.unit = 'rpx';

const app = new Vue({
  ...App,
});
app.$mount();
