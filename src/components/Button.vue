<!-- src/components/Button.vue
	Advanced ARIA button component made with a div -->

<template>
	<div
		class="cot-button"
		role="button"

		:class="{ ['cot-button-pressed']: pressed }"

		aria-pressed="undefined"

		:aria-disabled="String(disabled)"
		:tabindex="disabled ? '-1' : '0'"

		@mousedown.left="down"
		@mouseup.left="up"
		@keydown.enter="down"
		@keyup.enter="up"
		@keydown.space="down"
		@keyup.space="up"
	><slot /></div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from "vue-property-decorator";

@Component
export default class Button extends Vue {
	/** Is this button disabled? */
	@Prop({ type: Boolean, default: false }) readonly disabled!: boolean;

	/** Is this button pressed? */
	pressed: boolean = false;

	/** Method run when the button is pressed in */
	down(event: any) {
		this.pressed = true;
	}
	/** Method run when the button is released */
	up(event: any) {
		this.pressed = false;
		/** Emit boop event! */
		this.$emit("boop", event);
	}

	/* Hack to fix a bug where you can press a button and then move the mouse cursor away to break the pressed state */
	unpressCallback: ((event: any) => void) | null = null;
	mounted() {
		this.unpressCallback = (event: any) => {
			if (typeof event === "object" && !(
				event.code === "Space" ||
				event.code === "Enter" ||
				event.button === 0
			)) return;
			this.pressed = false;
		};
		window.addEventListener("mouseup", this.unpressCallback);
		window.addEventListener("keyup", this.unpressCallback);
	}
	destroyed() {
		if (this.unpressCallback) {
			window.removeEventListener("mouseup", this.unpressCallback);
			window.removeEventListener("keyup", this.unpressCallback);
		}
	}
}
</script>

