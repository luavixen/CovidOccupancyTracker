<!-- src/components/ModalHeader.vue
	Display a title and close button at the top of a modal -->

<template>
	<div class="cot-modal-header">
		<h2>{{ title }}</h2>
		<IconButton
			:title="$t('modal.close')"
			@boop="close"
		>
			<IconCancel />
		</IconButton>
	</div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from "vue-property-decorator";

import { ModalEvents } from "@/components/Modal.vue";

import IconButton from "@/components/IconButton.vue";

// @ts-ignore
import IconCancel from "@/assets/cancel.svg";

@Component({ components: { IconButton, IconCancel } })
export default class ModalHeader extends Vue {
	/** ID of the modal (for hide events) */
	@Prop({ type: String, required: true }) readonly modalId!: string;
	/** Title string to display */
	@Prop({ type: String, required: true }) readonly title!: string;

	/** Emit a close event for this modal */
	close() {
		this.$root.$emit(ModalEvents.ModalHide, this.modalId);
	}
}
</script>
