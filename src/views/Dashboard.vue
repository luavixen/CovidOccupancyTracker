<!-- src/views/Dashboard.vue
	Dashboard view, the one-and-only view in this app, contains all UI functionality -->

<template>
	<div class="cot-dashboard">
		<!-- Header, name + location -->
		<Header><IconButton title="Open the settings menu" class="cot-button-image-accent"><IconSettings /></IconButton></Header>

		<!-- App controls/body -->

		<!-- Footer buttons -->
	</div>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";

import Header from "@/components/Header.vue";

@Component({ components: { Header } })
export default class Dashboard extends Vue {}
</script>
