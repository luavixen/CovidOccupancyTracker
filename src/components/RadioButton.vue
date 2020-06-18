<!-- src/components/RadioButton.vue
	Radio buttons for <select>-like lists -->

<template>
	<Button
		class="cot-button-radio"
		:class="{
			'cot-button-radio-checked': checked
		}"

		:id="id"

		role="radio"
		:aria-checked="String(!!checked)"

		@boop="boop"
	>
		<div class="cot-button-radio-circle-container">
			<div class="cot-button-radio-circle">
				<div class="cot-button-radio-outer">
					<div class="cot-button-radio-inner" />
				</div>
			</div>
		</div>
		<div class="cot-button-radio-label-container">
			<label class="cot-button-radio-label" :for="id">{{ title }}</label>
		</div>
	</Button>
</template>

<script lang="ts">
import { Component, Prop, Vue } from "vue-property-decorator";

import Button from "@/components/Button.vue";

@Component({ components: { Button } })
export default class RadioButton extends Vue {
	/* Unique ID */
	@Prop({ type: String, required: true }) readonly id!: string;
	/* Title/label string */
	@Prop({ type: String, required: true }) readonly title!: string;
	/* Checked? */
	@Prop({ type: Boolean, default: false }) readonly checked!: boolean;

	/* Emit the "boop" event with this radio's ID when the button is pressed */
	boop() {
		this.$emit("boop", this.id);
	}
}
</script>
