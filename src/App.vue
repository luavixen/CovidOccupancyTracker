<!-- src/App.vue
	Root Vue component, shows the current router view and not much else -->

<template>
	<div class="cot-app" id="app">
		<router-view class="cot-app-view" />
	</div>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";

@Component
export default class App extends Vue {}
</script>
