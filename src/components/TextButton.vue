<!-- src/components/TextButton.vue
	Button designed to display text in a *clickable manner* with colors! -->

<template>
	<Button
		class="cot-button-text"
		:disabled="disabled"
		@boop="$emit('boop', $event)"
	>
		<span><slot /></span>
	</Button>
</template>

<script lang="ts">
import { Component, Prop, Vue } from "vue-property-decorator";

import Button from "@/components/Button.vue";

@Component({ components: { Button } })
export default class TextButton extends Vue {
	@Prop({ type: Boolean, default: false }) readonly disabled!: boolean;
}
</script>
