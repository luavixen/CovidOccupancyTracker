<!-- src/components/Header.vue
	Header component, displays a header at the top of the page -->

<template>
	<header class="cot-header cot-shadow" role="banner">
		<div class="cot-header-inner">
			<div class="cot-header-left">
				<HeaderBrand />
			</div>
			<div class="cot-header-right">
				<HeaderLocation />
				<IconButton :title="$t('header.settings')" @boop="openSettings">
					<IconSettings/>
				</IconButton>
			</div>
		</div>
	</header>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";

import HeaderBrand from "@/components/HeaderBrand.vue";
import HeaderLocation from "@/components/HeaderLocation.vue";
import IconButton from "@/components/IconButton.vue";

// @ts-ignore
import IconSettings from "@/assets/settings.svg";

@Component({ components: { HeaderBrand, HeaderLocation, IconButton, IconSettings } })
export default class Header extends Vue {
	openSettings() {
		/* TODO */
	}
}
</script>
