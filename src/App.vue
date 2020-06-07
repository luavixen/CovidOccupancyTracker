<!-- src/App.vue
	Root Vue app component, sets up the theme container, renders the view, and not much else -->

<template>
	<div
		class="cot-app-container" id="app"
		:class="{ ['theme-' + ($store.state.dark ? 'dark' : 'light')]: true }"
	>
		<div class="cot-app" role="application"><router-view class="cot-app-view" /></div>
	</div>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";

@Component
export default class App extends Vue {}
</script>
