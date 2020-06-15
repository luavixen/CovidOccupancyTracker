<!-- src/components/Header.vue
	Header component, displays a header at the top of the page -->

<template>
	<header class="cot-header" role="banner">
		<div class="cot-header-content">
			<div class="cot-header-section cot-header-left">
				<HeaderBrand />
			</div>
			<div class="cot-header-section cot-header-right">
				<HeaderLocation />
				<IconButton accent :title="$t('header.settings')" @boop="openSettings">
					<IconSettings/>
				</IconButton>
			</div>
		</div>
	</header>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";

import { ModalEvents } from "@/components/Modal.vue";

import HeaderBrand from "@/components/HeaderBrand.vue";
import HeaderLocation from "@/components/HeaderLocation.vue";
import IconButton from "@/components/IconButton.vue";

// @ts-ignore
import IconSettings from "@/assets/settings.svg";

@Component({ components: { HeaderBrand, HeaderLocation, IconButton, IconSettings } })
export default class Header extends Vue {
	openSettings() {
		this.$root.$emit(ModalEvents.ModalShow, "settings");
	}
}
</script>
