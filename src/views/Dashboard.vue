<!-- src/views/Dashboard.vue
	Dashboard view, the one-and-only view in this app, contains all UI functionality -->

<template>
	<div class="cot-dashboard">
		<!-- Header, name + location -->
		<Header><IconButton title="Open the settings menu" class="cot-button-image-accent"><IconSettings/></IconButton></Header>

		<!-- App controls/body -->
		<div />
		<TextButton>{{ $t("ui.yes") }}</TextButton>
		<TextButton color-error>{{ $t("ui.no") }}</TextButton>
		<TextButton color-mono>{{ $t("ui.cancel") }}</TextButton>
		<IconButton title="Open the settings menu"><IconSettings/></IconButton>

		<!-- Footer -->
		<div />
	</div>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";

import Header from "@/components/Header.vue";
import TextButton from "@/components/TextButton.vue";
import IconButton from "@/components/IconButton.vue";

// @ts-ignore
import IconSettings from "@/assets/settings.svg";

@Component({ components: { Header, TextButton, IconButton, IconSettings } })
export default class Dashboard extends Vue {}
</script>
