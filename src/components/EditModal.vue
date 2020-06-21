<!-- src/components/EditModal.vue
	Displays a number input and controls -->

<template>
	<Modal class="cot-modal-edit" modal-id="edit" ref="modal">
		<ModalHeader modal-id="edit" :title="$t('edit.title')" />
		<NumberInput
			:title="$t('edit.input')"

			v-model="userValue"
			@value="actualValueUpdate"
		/>
		<div class="cot-modal-edit-buttons">
			<TextButton :disabled="!actualValueValid" @boop="save">{{
				$t('edit.save')
			}}</TextButton>
			<TextButton @boop="cancel">{{
				$t('edit.cancel')
			}}</TextButton>
		</div>
	</Modal>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";

import store, { Action } from "@/store";

import Modal, { ModalEvents } from "@/components/Modal.vue";
import ModalHeader from "@/components/ModalHeader.vue";
import NumberInput from "@/components/NumberInput.vue";
import TextButton from "@/components/TextButton.vue";

@Component({ components: { Modal, ModalHeader, NumberInput, TextButton } })
export default class EditModal extends Vue {
	/** User value unedited? */
	userValueClean: boolean = true;
	/** Current user value */
	userValueCurrent: string = "";
	/** Reset user value state */
	userValueReset() {
		this.userValueClean = true;
		this.userValueCurrent = "";
	}
	/** Get the value to be displayed */
	get userValue(): any {
		if (this.userValueClean)
			return String(store.state.location.data.people);
		else
			return this.userValueCurrent;
	}
	/** Update the user value */
	set userValue(v: any) {
		this.userValueClean = false;
		this.userValueCurrent = String(v);
	}

	/** Actual value number (or null if invalid) */
	actualValueCurrent: number | null = null;
	/** Is the current actual value valid? */
	actualValueValid: boolean = true;
	/** Update method for actual value triggered by NumberInput */
	actualValueUpdate({ value, valid }: { value: number | null; valid: boolean }) {
		this.actualValueCurrent = value;
		this.actualValueValid = valid;
	}

	/** Reset the state of the input */
	reset() {
		this.userValueReset();
		this.actualValueCurrent = null;
		this.actualValueValid = true;
	}

	/** Get the current Modal component instance */
	get modal(): Modal {
		return this.$refs.modal as Modal;
	}
	/** Hide this modal */
	hide() {
		this.modal.hide();
	}

	/** Function called on save press */
	save() {
		if (this.actualValueCurrent !== null &&this.actualValueValid) {
			store.dispatch(Action.CountSet, this.actualValueCurrent);
		}
		this.hide();
	}
	/** Function called on cancel press */
	cancel() {
		this.hide();
	}

	/* Register/deregister reset methods on hide */
	mounted() {
		this.modal.$on(ModalEvents.ModalHidden, this.reset);
	}
	destroyed() {
		this.modal.$off(ModalEvents.ModalHidden, this.reset);
	}
}
</script>
