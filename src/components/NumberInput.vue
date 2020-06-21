<!-- src/components/NumberInput.vue
	Displays a number input box with correct styles -->

<template>
	<div class="cot-input-number">
		<input
			class="cot-input-number-input"
			:class="{ 'cot-input-number-valid': valid }"

			:aria-label="title"
			:title="title"

			type="number"

			:min="min"
			:max="max"

			:placeholder="placeholder"

			:value="value"
			@input="input"
		/>
	</div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from "vue-property-decorator";

@Component
export default class NumberInput extends Vue {
	/** Title of this input */
	@Prop({ type: String, required: true	}) readonly title!: string;
	/** Minimum number value */
	@Prop({ type: Number, default: 0	}) readonly min!: number;
	/** Maximum number value */
	@Prop({ type: Number, default: 99999	}) readonly max!: number;
	/** Placeholder string */
	@Prop({ type: String, default: ""	}) readonly placeholder!: string;

	/** Value of this field */
	@Prop({ default: "" }) readonly value!: any;

	/** Is the value of the field currently valid? */
	valid: boolean = true;

	/** Input handler */
	input(event: any) {
		/* Grab and emit the value */
		const value: any = event?.target?.value;
		this.$emit("input", value);

		/* Get value/valid */
		const num = parseInt(value, 10);
		const valid = num === num;

		/* Update valid state */
		this.valid = valid;

		/* Emit value/valid */
		this.$emit("value", { value: valid ? num : null, valid });
	}
}
</script>
