/* src/locations.ts
	Handle location information from config.ts */

/** Store location information */
export interface LocationInfo {
	/** In-database ID */
	id: string;
	/** Human-readable store name */
	name: string;
	/** Short street name */
	street?: string;
	/** Default store? */
	default?: boolean;
}
/** List of store location information entries */
export type LocationConfiguration = LocationInfo[];

/* Import the location list from config.ts */
import { locationConfig } from "@/config";

/** Get the current location configuration */
export function getLocations(): LocationConfiguration {
	return locationConfig;
}

/** Get the default location */
export function getDefaultLocation(): LocationInfo | null {
	for (const location of locationConfig)
		if (location.default)
			return location;
	return null;
}
/** Get a location by ID */
export function lookupLocation(id: string): LocationInfo | null {
	for (const location of locationConfig)
		if (location.id === id)
			return location;
	return null;
}
