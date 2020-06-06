/** src/router.ts
	Vue Router configuration, not really needed for this project, but whatever */

import Vue from "vue";
import VueRouter, { RouteConfig } from "vue-router";

/* Import our Dashboard view */
import Dashboard from "@/views/Dashboard.vue";

Vue.use(VueRouter);

/** Our Vue Router configuration, always redirect to "/" where our Dashboard is */
const routes: RouteConfig[] = [
	{
		path: "/",
		name: "Dashboard",
		component: Dashboard
	},
	{
		path: "*",
		beforeEnter: (to, from, next) => {
			next("/");
		}
	}
];

/** Global COT Vue Router instance */
export const router = new VueRouter({
	mode: "history",
	base: process.env.BASE_URL,
	routes
});
export default router;
