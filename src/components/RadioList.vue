<template>
	<div
		class="cot-radios"
		role="radiogroup"
	>
		<RadioButton
			v-for="radio of radios"

			:key="radio.id"
			:id="radio.id"

			:title="radio.title"

			:checked="isChecked(radio)"
			@boop="onChecked(radio)"
		/>
	</div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from "vue-property-decorator";

import RadioButton from "@/components/RadioButton.vue";

/** RadioList list entry */
export interface RadioListEntry {
	/** Title (label) display */
	title: string;
	/** Value of this option, note that this value *must* be unique */
	value: string;
}
/** Internal `radios` entry interface */
export interface RadioListRadio extends RadioListEntry {
	/** Unique ID of this radio */
	id: string;
}

/* This is needed for ARIA so we can refer to other elements with labels */
/** Generate a unique ID string for a RadioButton */
const getUniqueID = (() => {
	let counter: number = 0;
	return ((): string => {
		return `cot-radios-unique-${counter++}`;
	});
})();

@Component({ components: { RadioButton } })
export default class RadioList extends Vue {
	/** List of entries to render */
	@Prop({ type: Array, required: true }) readonly list!: RadioListEntry[];

	/** `list` with unique IDs */
	get radios(): RadioListRadio[] {
		const radios: RadioListRadio[] = [];
		for (const entry of this.list) {
			radios.push({
				...entry,
				id: getUniqueID()
			});
		}
		return radios;
	}

	/** Current selected value (prop) used with v-model */
	@Prop({ type: String, default: "" }) readonly value!: string;
	/** Emit changes to v-model */
	send(value: string) {
		this.$emit("input", value);
	}

	/** Helper to check if a RadioButton is checked */
	isChecked(radio: RadioListRadio): boolean {
		return this.value === radio.value;
	}
	/** Handler for when a RadioButton is pressed/checked */
	onChecked(radio: RadioListRadio) {
		this.send(radio.value);
	}
}
</script>
