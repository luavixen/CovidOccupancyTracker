<!-- src/views/Dashboard.vue
	Dashboard view, the one-and-only view in this app, contains all UI functionality -->

<template>
	<div class="cot-dashboard">
		<!-- Header, name + location -->
		<Header/>

		<!-- App controls/body -->
		<div />

		<!-- Footer -->
		<div />
	</div>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";

import Header from "@/components/Header.vue";

@Component({ components: { Header } })
export default class Dashboard extends Vue {}
</script>
