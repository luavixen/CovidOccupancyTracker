/* src/store.ts
	Global state store, powered by Vuex
	https://vuex.vuejs.org/ */

import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex);

/** State structure */
export interface State {
}

/** Mutation enum, used by store.commit() <sync> */
export enum Mutation {
}
/** Action enum, used by store.dispatch() <async> */
export enum Action {
}

/** Global COT Vuex store instance */
export const store = new Vuex.Store<State>({
	state: {
	},
	getters: {
	},
	mutations: {
	},
	actions: {
	},
	modules: {
	}
});
export default store;
