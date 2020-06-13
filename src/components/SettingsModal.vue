<!-- src/components/SettingsModal.vue
	Settings modal, opened using the top-right settings cog, used to change location -->

<template>
	<Modal class="cot-modal-settings" modal-id="settings" ref="modal">
		<ModalHeader modal-id="settings" :title="$t('settings.title')" />
		<RadioList
			:list="locationRadios"
			v-model="locationRadioValue"
		/>
	</Modal>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";

import store, { Action } from "@/store";
import { getLocations, lookupLocation } from "@/locations";

import Modal from "@/components/Modal.vue";
import ModalHeader from "@/components/ModalHeader.vue";
import RadioList, { RadioListEntry } from "@/components/RadioList.vue";

@Component({ components: { Modal, ModalHeader, RadioList } })
export default class SettingsModal extends Vue {
	/** Get the current location ID from the store */
	get locationRadioValue(): string {
		return store.state.location.id ?? "";
	}
	/** Set the current location ID in the store (must be truthy) */
	set locationRadioValue(val: string) {
		if (!val || store.state.location.id === val) return;
		store.dispatch(Action.LocationConnect, val);
	}

	/** Generate a list of RadioListEntries from the list of locations */
	get locationRadios(): RadioListEntry[] {
		const list: RadioListEntry[] = [];
		for (const location of getLocations()) {
			list.push({
				value: location.id,
				title: `${location.name} (${location.street})`
			});
		}
		return list;
	}
}
</script>

