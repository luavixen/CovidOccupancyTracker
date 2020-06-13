<!-- src/views/Dashboard.vue
	Dashboard view, the one-and-only view in this app, contains all UI functionality -->

<template>
	<div class="cot-dashboard">
		<!-- Header, name + location -->
		<Header><IconButton title="Open the settings menu" class="cot-button-image-accent"><IconSettings /></IconButton></Header>

		<!-- App controls/body -->

		<!-- Footer buttons -->
		<div class="cot-dashboard-buttons">
			<IconButton :title="$t('dashboard.toggleTheme')" @boop="toggleTheme">
				<IconThemeToggle />
			</IconButton>
		</div>
	</div>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";

import store, { Action } from "@/store";

import Header from "@/components/Header.vue";
import IconButton from "@/components/IconButton.vue";

// @ts-ignore
import IconThemeToggle from "@/assets/theme-toggle.svg";

@Component({ components: { Header, IconButton, IconThemeToggle } })
export default class Dashboard extends Vue {
	toggleTheme() {
		store.dispatch(Action.DarkSet, !store.state.dark);
	}
}
</script>
