<!-- src/views/Dashboard.vue
	Dashboard view, the one-and-only view in this app, contains all UI functionality -->

<template>
	<div class="cot-dashboard">
		<!-- Header, name + location -->
		<Header/>

		<!-- App controls/body -->
		<div />
		<TextButton>{{ $t("ui.yes") }}</TextButton>
		<TextButton color-error>{{ $t("ui.no") }}</TextButton>
		<TextButton color-mono>{{ $t("ui.cancel") }}</TextButton>

		<!-- Footer -->
		<div />
	</div>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";

import Header from "@/components/Header.vue";
import TextButton from "@/components/TextButton.vue";

@Component({ components: { Header, TextButton } })
export default class Dashboard extends Vue {}
</script>
