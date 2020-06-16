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

		@touchstart.prevent="down"
		@touchend.prevent="up"
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
		if (!this.pressed) return;
		this.pressed = false;
		/* Emit boop event! */
		this.$emit("boop", event);
	}

	/** Unpress this button whenever the space/enter/mouse1 keys are released *anywhere on the page* */
	protected unpressHandler(event: any) {
		if (typeof event === "object" && (
			event.code === "Space" ||
			event.code === "Enter" ||
			event.button === 0
		)) this.pressed = false;
	};

	/* Register/unregister the unpressHandler */
	mounted() {
		window.addEventListener("touchend", this.unpressHandler);
		window.addEventListener("mouseup", this.unpressHandler);
		window.addEventListener("keyup", this.unpressHandler);
	}
	destroyed() {
		window.removeEventListener("touchend", this.unpressHandler);
		window.removeEventListener("mouseup", this.unpressHandler);
		window.removeEventListener("keyup", this.unpressHandler);
	}
}
</script>

