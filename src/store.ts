/* src/store.ts
	Global state store, powered by Vuex
	https://vuex.vuejs.org/ */

import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex);

/* Import the Firebase SDK */
import firebase from "firebase/app";
/** Reference to the "locations" Firestore collection */
export const locationCollection = firebase.firestore().collection("locations");

/** LocalStorage key that contains the last valid ID */
export const localStorageIDKey = "covid-occupancy-tracker-last-id";

/** Small utility function to convert any (non-NaN) number to a natural number */
export const asNatural = (num: number) =>
	Math.max(Math.floor(num), 0);

/** In-database representation of location data */
export interface DatabaseLocation {
	/** The number of people at this location */
	people: number;
}

/** State structure */
export interface State {
	/** Information about the current location */
	location: {
		/** Location data, including person count */
		data: DatabaseLocation;

		/** ID of this location in the database */
		id: string | null;
		/** Subscription reference for the snapshot listener */
		subscription: (() => void) | null;
	}
}

/** Mutation enum, used by store.commit() <sync> */
export enum Mutation {
	SetPeople	= "set:location/data/people",
	SetID		= "set:location/id",
	SetSubscription	= "set:location/subscription"
}
/** Action enum, used by store.dispatch() <async> */
export enum Action {
	IDSave			= "idSave",
	IDLoad			= "idLoad",

	LocationConnect		= "locationConnect",
	LocationDisconnect	= "locationDisconnect",

	CountSet		= "countSet",
	CountUpdate		= "countUpdate"
}

/** Global COT Vuex store instance */
export const store = new Vuex.Store<State>({
	state: {
		location: {
			data: { people: 0 },
			id: null,
			subscription: null
		}
	},
	getters: {
	},
	mutations: {
		/** Set the `.location.data.people` field to a natural number */
		[Mutation.SetPeople](state, people: State["location"]["data"]["people"]) {
			state.location.data.people = asNatural(people);
		},
		/** Set the `.location.id` field to a valid ID or `null` */
		[Mutation.SetID](state, id: State["location"]["id"]) {
			state.location.id = id;
		},
		/** Set the `.location.subscription` field to a valid subscription or `null` */
		[Mutation.SetSubscription](state, subscription: State["location"]["subscription"]) {
			state.location.subscription = subscription;
		}
	},
	actions: {
		/** Save the current `.location.id` field to LocalStorage */
		[Action.IDSave]: async (store) => {
			try {
				if (store.state.location.id) {
					localStorage.setItem(localStorageIDKey, store.state.location.id);
				} else {
					localStorage.removeItem(localStorageIDKey);
				}
			} catch (err) {
				console.error(`Failed to update "${localStorageIDKey}" in LocalStorage:`, err);
			}
		},
		/** Load the last `.location.id` field from LocalStorage */
		[Action.IDLoad]: async (store, overwrite: boolean = false) => {
			try {
				const item = localStorage.getItem(localStorageIDKey);
				if (item || overwrite) {
					store.commit(Mutation.SetID, item);
				}
			} catch (err) {
				console.error(`Failed to read "${localStorageIDKey}" from LocalStorage:`, err);
			}
		}
	},
	modules: {
	}
});
export default store;
