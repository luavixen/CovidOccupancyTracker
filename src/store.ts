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

/* Import locations for default location */
import { getDefaultLocation } from "@/locations";

/** LocalStorage key that contains the dark mode setting */
export const localStorageDarkKey = "covid-occupancy-tracker-dark";
/** LocalStorage key that contains the last valid ID */
export const localStorageIDKey = "covid-occupancy-tracker-last-id";

/** Small utility function to convert any (non-NaN) number to a whole number */
export const asWhole = (num: number) =>
	Math.max(Math.floor(num), 0);

/** In-database representation of location data */
export interface DatabaseLocation {
	/** The number of people at this location */
	people: number;
}

/** State structure */
export interface State {
	/** App using dark mode? */
	dark: boolean;

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
	SetDark		= "set:dark",
	SetPeople	= "set:location/data/people",
	SetID		= "set:location/id",
	SetSubscription	= "set:location/subscription"
}
/** Action enum, used by store.dispatch() <async> */
export enum Action {
	DarkSet			= "darkSet",
	DarkLoad		= "darkLoad",

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
		dark: false,
		location: {
			data: { people: 0 },
			id: null,
			subscription: null
		}
	},
	getters: {
	},
	mutations: {
		/** Set the `.dark` field to a boolean */
		[Mutation.SetDark](state, dark: State["dark"]) {
			state.dark = dark;
		},
		/** Set the `.location.data.people` field to a whole number */
		[Mutation.SetPeople](state, people: State["location"]["data"]["people"]) {
			state.location.data.people = asWhole(people);
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
		/** Update and save the current `.dark` value */
		[Action.DarkSet]: async (store, dark: boolean) => {
			store.commit(Mutation.SetDark, !!dark);
			try {
				localStorage.setItem(localStorageDarkKey, JSON.stringify(store.state.dark));
			} catch (err) {
				console.error(`Failed to update "${localStorageDarkKey}" in LocalStorage:`, err);
			}
		},
		/** Load the last `.dark` value from LocalStorage */
		[Action.DarkLoad]: async (store) => {
			try {
				const data = localStorage.getItem(localStorageDarkKey);
				const dark: boolean = data !== null ? !!JSON.parse(data) : false;
				store.commit(Mutation.SetDark, dark);
			} catch (err) {
				console.error(`Failed to read "${localStorageDarkKey}" from LocalStorage:`, err);
			}
		},

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
		},

		/** "Connect" to a location in the database and stay in sync */
		[Action.LocationConnect]: async (store, id: string) => {
			/* Guard against invalid IDs (currently accepting all truthy strings) */
			if (typeof id !== "string" || !id) {
				throw new Error("Invalid ID");
			}

			/* Disconnect from the current location (if we are connected) */
			await store.dispatch(Action.LocationDisconnect);

			/* Update the store's `.location.id` */
			store.commit(Mutation.SetID, id);

			/* Get a reference to the document for this location */
			const ref = locationCollection.doc(id);

			/* Gonna have to get a bit messy to make this work nicely,
				using a Promise we can async-await-ify the onSnapshot system */

			try {
				await new Promise((resolve, reject) => {
					/* Attempt to subscribe to the document */
					const subscription = ref.onSnapshot(
						(snapshot) => {
							/* Got some data back from the database! Horray! */
							const data = snapshot.data();
							const exists = snapshot.exists;

							resolve(); /* NOTE: Promises can only be resolved/rejected once */

							/* Check to see if the data is valid */
							if (exists && data && typeof data.people === "number") {
								/* Commit it to the store! */
								store.commit(Mutation.SetPeople, data.people);
							} else {
								/* That's no good! Reset the store and database so we have a clean slate */
								store.commit(Mutation.SetPeople, 0);
								ref.set({ people: 0 })
									.catch((err) => console.error(`Failed to reset ${ref.path}:`, err));
							}
						},
						(err) => {
							/* Oh no! Looks like an error, that's bad! */
							reject(err); /* NOTE: Promises can only be resolved/rejected once */
						}
					);
					/* Update the store's `.location.subscription` */
					store.commit(Mutation.SetSubscription, subscription);
				});
			} catch (err) {
				/* OnO! We failed! Reset everything */
				console.error(`Failed to subscribe to ${ref.path}:`, err);
				store.commit(Mutation.SetID, null);
				store.commit(Mutation.SetSubscription, null);
			}

			/* Save the changes we made to LocalStorage */
			await store.dispatch(Action.IDSave);
		},
		/** "Disconnect" from a location and reset ID/subscription */
		[Action.LocationDisconnect]: async (store) => {
			if (store.state.location.id) {
				store.commit(Mutation.SetID, null);
			}
			if (store.state.location.subscription) {
				store.state.location.subscription();
				store.commit(Mutation.SetSubscription, null);
			}

			await store.dispatch(Action.IDSave);
		},

		/** Set the current people count, updating the database if possible */
		[Action.CountSet]: async (store, people: number) => {
			/* Guard against invalid people counts (currently accepting all non-negative numbers) */
			if (typeof people !== "number" || people >= 0) {
				throw new Error("Invalid people");
			}
			/* Convert people to a whole number */
			people = asWhole(people);

			/* Are we connected? */
			if (store.state.location.id && store.state.location.subscription) {
				/* Online! Update the database count for everyone */
				const ref = locationCollection.doc(store.state.location.id);
				await ref.set({ people: people });
			} else {
				/* Offline, set people directly */
				store.commit(Mutation.SetPeople, people);
			}
		},
		/** Increment/decrement the current people count, atomically updating the database if possible */
		[Action.CountUpdate]: async (store, change: number) => {
			/* Guard against invalid change values (currently accepting all non-NaN numbers) */
			if (typeof change !== "number" || change !== change) {
				throw new Error("Invalid change");
			}
			/* Make sure its an integer */
			change = Math.floor(change);

			/* Are we connected? */
			if (store.state.location.id && store.state.location.subscription) {
				/* Online! Update the database count for everyone atomically */

				const ref = locationCollection.doc(store.state.location.id);

				try {
					/* Attempt to atomically update the database's count */

					/* Could this change result in the final value being zero? */
					if (store.state.location.data.people + change < 0) {
						/* Change the value directly to zero if needed */
						if (store.state.location.data.people !== 0) {
							await ref.set({ people: 0 });
						}
					} else {
						/* Nope! Use `FieldValue` to perform an atomic update */
						await ref.update({
							people: firebase.firestore.FieldValue.increment(change)
						});
					}
				} catch (err) {
					/* Crap! Atomic update failed, fall back to a normal set operation */

					console.error(`Failed to atomically update ${ref.path}:`, err);

					/* Download the latest version of the location document */
					const snapshot = await ref.get();
					const data = snapshot.data();

					/* Update appropriately */
					if (data && typeof data.people === "number") {
						await ref.set({ people: asWhole(data.people + change) });
					} else {
						await ref.set({ people: asWhole(change) });
					}
				}
			} else {
				/* Offline, change people directly */
				store.commit(Mutation.SetPeople,
					store.state.location.data.people + change);
			}
		}
	},
	modules: {
	}
});
export default store;

/* Once the store has been set up, attempt to reconnect to the last known location or the default location */
store.dispatch(Action.IDLoad)
	.then(() => {
		if (store.state.location.id) {
			return store.dispatch(Action.LocationConnect, store.state.location.id);
		} else {
			const defaultLocation = getDefaultLocation();
			if (defaultLocation) {
				return store.dispatch(Action.LocationConnect, defaultLocation.id);
			} else {
				return;
			}
		}
	});

/* Load the current darkmode setting as well */
store.dispatch(Action.DarkLoad);

Object.assign(window, { store });
