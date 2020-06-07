<!-- src/components/Button.vue
	Advanced ARIA button component made with a div -->

<template>
	<div
		class="cot-button"
		role="button"

		aria-pressed="undefined"

		:aria-disabled="String(disabled)"
		:tabindex="disabled ? '-1' : '0'"

		@click="boop"
		@keyup.enter="boop"
		@keyup.space="boop"
	><slot /></div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from "vue-property-decorator";

@Component
export default class Button extends Vue {
	/** Is this button disabled? */
	@Prop({ type: Boolean, default: false }) readonly disabled!: boolean;
	/** Method run when the button is pressed, boop! (uwu) */
	boop(event: any) {
		/* Emit the boop event for any listeners */
		this.$emit("boop", event);
	}
}
</script>

