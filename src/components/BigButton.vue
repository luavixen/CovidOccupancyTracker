<!-- src/components/BigButton.vue
	Much bigger mish-mash of IconButton and TextButton, used for the + and - buttons -->

<template>
	<Button
		class="cot-button-big"

		:title="title"
		:aria-label="title"

		:disabled="disabled"
		@boop="$emit('boop', $event)"
	>
		<div
			class="cot-button-big-icon"
			aria-hidden="true"
		><slot /></div>
	</Button>
</template>

<script lang="ts">
import { Component, Prop, Vue } from "vue-property-decorator";

import Button from "@/components/Button.vue";

@Component({ components: { Button } })
export default class BigButton extends Vue {
	@Prop({ type: Boolean, default: false }) readonly disabled!: boolean;
	@Prop({ type: String, required: true }) readonly title!: string;
}
</script>
