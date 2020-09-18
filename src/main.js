import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import Buefy from 'buefy'
import { firestorePlugin } from 'vuefire';
import 'buefy/dist/buefy.css';

Vue.use(Buefy)
Vue.use(firestorePlugin);
Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
