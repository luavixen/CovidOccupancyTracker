<!-- src/components/IconButton.vue
	Button designed to show a single clickable icon -->

<template>
	<Button
		class="cot-button-image"
		:class="{ ['cot-button-image-accent']: accent }"

		:title="title"
		:aria-label="title"

		:disabled="disabled"
		@boop="$emit('boop', $event)"
	>
		<div
			class="cot-button-icon-image no-interact"
			aria-hidden="true"
		><slot /></div>
	</Button>
</template>

<script lang="ts">
import { Component, Prop, Vue } from "vue-property-decorator";

import Button from "@/components/Button.vue";

@Component({ components: { Button } })
export default class IconButton extends Vue {
	@Prop({ type: Boolean, default: false }) readonly disabled!: boolean;
	@Prop({ type: Boolean, default: false }) readonly accent!: boolean;
	@Prop({ type: String, required: true }) readonly title!: string;
}
</script>
