<!-- src/components/HeaderBrand.vue
	Brand text in the header -->

<template>
	<div class="cot-header-brand">
		<h2 class="cot-header-brand-text cot-noselect">{{ $t("header.brand") }}</h2>
	</div>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";

@Component
export default class HeaderBrand extends Vue {}
</script>
