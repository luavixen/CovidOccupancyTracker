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
				<slot />
			</div>
		</div>
	</header>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";

import HeaderBrand from "@/components/HeaderBrand.vue";

@Component({ components: { HeaderBrand } })
export default class Header extends Vue {}
</script>
