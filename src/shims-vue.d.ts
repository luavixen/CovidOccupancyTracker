/* src/shims-vue.d.ts
	Enable TypeScript .vue checking */

declare module "*.vue" {
	import Vue from "vue";
	export default Vue;
}
