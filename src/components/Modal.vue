<!-- src/components/Modal.vue
	Modal implementation, displays an animated modal that takes up the whole screen -->

<template>
	<transition name="fade"><div
		class="cot-modal-layer"
		v-if="showContainer"
		@click.self="hide"
	>
		<div class="cot-modal-container" @click.self="hide">
			<transition name="flyin">
				<div
					class="cot-modal"
					role="dialog"
					v-show="showContent"
					@click.stop
				><slot /></div>
			</transition>
		</div>
	</div></transition>
</template>

<script lang="ts">
import { Component, Prop, Vue } from "vue-property-decorator";

/** Amount of time to wait between transitioning the inner and container elements */
export const transitionBufferTime: number = 50;

/** All modal events */
export enum ModalEvents {
	/** Request for a modal to show, only parameter is the ID  */
	ModalShow = "modal-show",
	/** Request for a modal to hide, only parameter is ID */
	ModalHide = "modal-hide",

	/** A modal has shown, only parameter is ID */
	ModalShown = "modal-shown",
	/** A modal has hidden, only parameter is ID */
	ModalHidden = "modal-hidden"
}

@Component
export default class Modal extends Vue {
	/** Is the modal currently shown? */
	shown: boolean = false;

	/** Is the container currently shown? */
	protected showContainer: boolean = false;
	/** Is the content currently shown? */
	protected showContent: boolean = false;

	/** Attempt to show this modal */
	show() {
		this.showContainer = true;
		setTimeout(() => {
			this.showContent = true;

			this.$emit(ModalEvents.ModalShown, this.modalId);
			this.$root.$emit(ModalEvents.ModalShown, this.modalId);

			this.shown = true;
		}, transitionBufferTime);
	}
	/** Attempt to hide this modal */
	hide() {
		this.showContent = false;
		setTimeout(() => {
			this.showContainer = false;

			this.$emit(ModalEvents.ModalHidden, this.modalId);
			this.$root.$emit(ModalEvents.ModalHidden, this.modalId);

			this.shown = false;
		}, transitionBufferTime);
	}

	/** This modal's ID, required */
	@Prop({ type: String, required: true }) readonly modalId!: string;

	/** Handle keyup events for the Escape key, to hide this modal on escape */
	protected escHandler(event: any) {
		if (typeof event === "object" && event.code === "Escape")
			this.hide();
	}
	/* Handle show/hide events */
	protected showHandler(id: any) {
		if (id === this.modalId) this.show();
	}
	protected hideHandler(id: any) {
		if (id === this.modalId) this.hide();
	}

	/* Register/unregister event handlers */
	mounted() {
		window.addEventListener("keyup", this.escHandler);
		this.$root.$on(ModalEvents.ModalShow, this.showHandler);
		this.$root.$on(ModalEvents.ModalHide, this.hideHandler);
	}
	destroyed() {
		window.removeEventListener("keyup", this.escHandler);
		this.$root.$off(ModalEvents.ModalShow, this.showHandler);
		this.$root.$off(ModalEvents.ModalHide, this.hideHandler);
	}
}
</script>
