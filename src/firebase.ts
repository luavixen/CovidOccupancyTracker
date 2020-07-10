/* src/firebase.ts
	Initialize the Firebase JS SDK and enable Firestore persistance */

/* Import the SDK */
import firebase from "firebase/app";

/* Initialize up analytics, performance, and the Firestore modules */
import "firebase/analytics";
import "firebase/performance";
import "firebase/firestore";

/* Import the configuration from config.js */
import { firebaseConfig, firebaseFeatures } from "@/config";
/* Initialize the Firebase SDK */
firebase.initializeApp(firebaseConfig);

/* Start up the analytics/performance/Firestore systems */
if (firebaseFeatures.analytics)
	firebase.analytics();
if (firebaseFeatures.performance)
	firebase.performance();
firebase.firestore();

/* Enable Firestore persistance for offline usage */
firebase.firestore().enablePersistence()
	.then(() => console.log("Persistence enabled"))
	.catch((err) => console.error("Persistence could not be enabled:", err));
