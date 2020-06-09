<!-- src/components/ModalManager.vue
	ModalManager contains all modals and emits the "inert" event with a boolean indicating if any modals are open -->

<template>
	<div class="cot-modal-manager">
		<SettingsModal />
	</div>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";

import { ModalEvents } from "@/components/Modal.vue";

import SettingsModal from "@/components/SettingsModal.vue";

@Component({ components: { SettingsModal } })
export default class ModalManager extends Vue {
	/** List of open modals (by ID) */
	openModals: string[] = [];

	/** Computed property, is it in inert mode? */
	get inert(): boolean {
		return this.openModals.length !== 0;
	}
	/** Last emitted inert value */
	lastInert?: boolean = undefined;
	/** Emit the inert value if it changed */
	updateInert() {
		if (this.lastInert === this.inert) return;
		this.$emit("inert", this.inert);
		this.lastInert = this.inert;
	}

	/** Add a modal to the openModals list */
	addModal(id: string) {
		if (this.openModals.indexOf(id) !== -1) return;
		this.openModals.push(id);
		this.updateInert();
	}
	/** Remove a modal from the openModals list */
	removeModal(id: string) {
		let i;
		while ((i = this.openModals.indexOf(id)) !== -1) {
			this.openModals.splice(i, 1);
		}
		this.updateInert();
	}

	/** Handler for ModalShown */
	modalShownHandler = (id: string) => this.addModal(id);
	/** Handler for ModalHidden */
	modalHiddenHandler = (id: string) => this.removeModal(id);

	/* Register and de-register handlers */
	mounted() {
		this.$root.$on(ModalEvents.ModalShow, this.modalShownHandler);
		this.$root.$on(ModalEvents.ModalHidden, this.modalHiddenHandler);

		this.updateInert();
	}
	destroyed() {
		this.$root.$off(ModalEvents.ModalShow, this.modalShownHandler);
		this.$root.$off(ModalEvents.ModalHidden, this.modalHiddenHandler);
	}
}
</script>


