<!-- src/views/Dashboard.vue
	Dashboard view, displays the current counter and provides controls for manipulating it -->

<template>
	<div class="cot-dashboard">
		{{ $t("hello") }}
	</div>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";

@Component
export default class Dashboard extends Vue {}
</script>
