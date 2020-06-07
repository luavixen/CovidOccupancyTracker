<!-- src/components/IconButton.vue
	Button designed to show a single clickable icon -->

<template>
	<Button
		class="cot-button-image"

		:title="title"
		:aria-label="title"

		:disabled="disabled"
		@boop="$emit('boop', $event)"
	>
		<div
			class="cot-button-icon-image"
			:class="{ ['cot-ico-' + icon]: true }"
		/>
	</Button>
</template>

<script lang="ts">
import { Component, Prop, Vue } from "vue-property-decorator";

@Component
export default class IconButton extends Vue {
	@Prop({ type: Boolean, default: false }) readonly disabled!: boolean;
	@Prop({ type: String, required: true }) readonly icon!: string;
	@Prop({ type: String, required: true }) readonly title!: string;
}
</script>
