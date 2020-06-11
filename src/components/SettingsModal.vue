<!-- src/components/SettingsModal.vue
	Settings modal, opened using the top-right settings cog, used to change location -->

<template>
	<Modal class="cot-modal-settings" modal-id="settings" ref="modal">
		<h1>UwU</h1>
		<IconButton :title="$t('settings.toggleTheme')" @boop="toggleTheme">
			<IconThemeToggle/>
		</IconButton>
	</Modal>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";

import store, { Action } from "@/store";

import Modal from "@/components/Modal.vue";
import IconButton from "@/components/IconButton.vue";

// @ts-ignore
import IconThemeToggle from "@/assets/theme-toggle.svg";

@Component({ components: { Modal, IconButton, IconThemeToggle } })
export default class SettingsModal extends Vue {
	/** Simple function that inverts the current theme */
	toggleTheme() {
		store.dispatch(Action.DarkSet, !store.state.dark);
	}
}
</script>

