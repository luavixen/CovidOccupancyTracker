<!-- src/components/HeaderLocation.vue
	Display current location in the header, with edit button -->

<template>
	<div class="cot-header-location">
		<div class="cot-header-location-inner">
			<p class="cot-header-location-title" id="cot-header-location-title">{{
				$t("header.location.title")
			}}</p>
			<p class="cot-header-location-body" aria-labelledby="cot-header-location-title">{{
				locationName
			}}</p>
		</div>
	</div>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";

import store from "@/store";
import { lookupLocation } from "@/locations";

@Component
export default class HeaderLocation extends Vue {
	/** Gets the current `location.id` from the store */
	get locationID(): string | null {
		return store.state.location.id;
	}

	/** Generates the location name to display */
	get locationName(): string {
		/* Offline? */
		if (this.locationID !== null) {
			/* Attempt to lookup location in official list */
			const locationInfo = lookupLocation(this.locationID);

			if (locationInfo) {
				return locationInfo.name;
			} else {
				return this.$t("header.location.custom", { name: this.locationID }) as string;
			}
		} else {
			return this.$t("header.location.offline") as string;
		}
	}
}
</script>
