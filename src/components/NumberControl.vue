<!-- src/components/NumberControl.vue
	NumberControl is a collection of the main controls of the app, the plus (+) and minus (-) buttons as well as the actual current number are handled here -->

<template>
	<div class="cot-number">
		<!-- Increment -->
		<BigButton :title="$t('number.increment')" @boop="update(+1)">
			<IconIncrement />
		</BigButton>
		<!-- Number -->
		<div class="cot-number-display">
			<h1 class="cot-number-display-text">{{ number }}</h1>
			<div class="cot-number-display-edit">
				<IconButton :title="$t('number.edit')" @boop="edit">
					<IconEdit />
				</IconButton>
			</div>
		</div>
		<!-- Decrement -->
		<BigButton :title="$t('number.decrement')" @boop="update(-1)">
			<IconDecrement />
		</BigButton>
	</div>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";

import store, { Action } from "@/store";

import { ModalEvents } from "@/components/Modal.vue";

import BigButton from "@/components/BigButton.vue";
import IconButton from "@/components/IconButton.vue";

// @ts-ignore
import IconIncrement from "@/assets/increment-symbol.svg";
// @ts-ignore
import IconDecrement from "@/assets/decrement-symbol.svg";
// @ts-ignore
import IconEdit from "@/assets/edit.svg";

@Component({ components: { BigButton, IconButton, IconIncrement, IconDecrement, IconEdit } })
export default class NumberControl extends Vue {
	/** Get the current number from the store */
	get number(): number {
		return store.state.location.data.people;
	}
	/** Update the current number */
	update(diff: number) {
		store.dispatch(Action.CountUpdate, diff);
	}
	/** Open the number editing menu */
	edit() {
		this.$root.$emit(ModalEvents.ModalShow, "edit");
	}
}
</script>

