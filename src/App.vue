<!-- src/App.vue
	Root Vue app component, sets up the theme container, renders the view, and not much else -->

<template>
	<div
		class="cot-app-container" id="app"
		:class="{ ['theme-' + ($store.state.dark ? 'dark' : 'light')]: true }"
	>
		<!-- Main application view -->
		<div
			class="cot-app"
			role="application"

			:inert="inert"
			:aria-hidden="inert"
		>
			<router-view class="cot-app-view" />
		</div>

		<!-- Modals as children of the container, for good luck and good z-index -->
		<ModalManager @inert="inert = $event" />
	</div>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";

import ModalManager from "@/components/ModalManager.vue";

@Component({ components: { ModalManager } })
export default class App extends Vue {
	/** Prevent the main app view from being focused? (modals open) */
	inert: boolean = false;
}
</script>
