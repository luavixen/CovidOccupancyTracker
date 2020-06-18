<!-- src/views/Dashboard.vue
	Dashboard view, the one-and-only view in this app, contains all UI functionality -->

<template>
	<div class="cot-dashboard">
		<!-- Dashboard top -->
		<div class="cot-dashboard-top">
			<Header />
		</div>
		<!-- Dashboard body -->
		<div class="cot-dashboard-body"><Container>
		</Container></div>
	</div>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";

import store, { Action } from "@/store";

import Header from "@/components/Header.vue";
import Container from "@/components/Container.vue";

@Component({ components: { Header, Container } })
export default class Dashboard extends Vue {}
</script>
