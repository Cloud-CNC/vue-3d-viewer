//Imports
import App from './App.vue';
import Viewer from '../main.js';
import Vue from 'vue';
import Vuetify from 'vuetify';
import 'vuetify/dist/vuetify.css';
import '@mdi/font/css/materialdesignicons.min.css';

//Vue plugins
Vue.use(Viewer);
Vue.use(Vuetify);

//Vue instance
new Vue({
  el: '#app',
  render: h => h(App),
  vuetify: new Vuetify()
});
