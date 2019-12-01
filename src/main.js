import Vue from 'vue';

import VueRouter from 'vue-router';
Vue.use(VueRouter);

import BootstrapVue from 'bootstrap-vue';
Vue.use(BootstrapVue);

import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap-vue/dist/bootstrap-vue.css';

import './assets/css/fontawesome-all.min.css';

import './assets/css/custom.css';

import App from './App.vue';
import Home from './components/Home/Home.vue';
import GeneralDiagnostic from './components/GeneralDiagnostic/GeneralDiagnostic.vue';
import SpecificDiagnostic from './components/SpecificDiagnostic/SpecificDiagnostic.vue';

Vue.config.productionTip = false;

const routes = [
  { path: '/', name: 'home', component: Home },
  { path: '/generalDiagnostic', name: 'generaldiagnostic', component: GeneralDiagnostic },
  { path: '/specificDiagnostic', name: 'specificdiagnostic', component: SpecificDiagnostic }
];

const router = new VueRouter({
  routes: routes
});

new Vue({
  el: '#app',
  router,
  render: h => h(App)
});