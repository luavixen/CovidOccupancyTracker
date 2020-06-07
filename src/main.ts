/* src/main.ts
	Application entrypoint, sets up Vue.js/Vuex/Vue Router, loads our stylesheet, and renders the page */

/* Load Vue and disable the production tip */
import Vue from "vue";
Vue.config.productionTip = false;

/* Initialize Firebase */
import "@/firebase";

/* Load Vuex and the Vue Router */
import router from "@/router";
import store from "@/store";

/* Load our App component, the root UI element */
import App from "@/App.vue";

/* Import and apply the src/style.scss stylesheet globally */
import "@/style.scss";

/* Create and mount our Vue UI */
new Vue({
	router,
	store,
	render: (h) => h(App)
}).$mount("#app");
