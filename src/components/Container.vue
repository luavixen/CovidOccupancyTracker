<!-- src/components/Container.vue
	Simple <main> container component, centers content in the middle of the page -->

<template>
	<main class="cot-container">
		<slot />
	</main>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";

@Component
export default class Container extends Vue {}
</script>
