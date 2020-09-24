import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import Buefy from "buefy";
import { firestorePlugin } from "vuefire";
import "buefy/dist/buefy.css";
import axios from "axios";

Vue.use(Buefy);
Vue.use(firestorePlugin);
Vue.config.productionTip = false;

axios.defaults.baseURL =
  "http://localhost:5001/poc-firebase-vue-1/us-central1/adminPortal";

new Vue({
  router,
  store,
  render: (h) => h(App),
}).$mount("#app");
