<script lang="ts">
	import { ExclamationIcon, Button, Badge } from '../../../components';
	import type { DimensionLocator } from '../../../types';
	import ConnectionDimension from './ConnectionDimension.svelte';

	type Props = {
		sourceId: string;
		locators: DimensionLocator[];
		onShowRemoveDimensionModal: (sourceId: string, dimensionId: string) => void;
		onAddDimension: (sourceId: string) => void;
	};

	let {
		sourceId,
		locators = $bindable(),
		onShowRemoveDimensionModal,
		onAddDimension
	}: Props = $props();
</script>

<div class="source-dimensions">
	<h5 class={locators.length === 0 ? 'dangerous' : ''}>
		Dimensions {#if locators.length === 0}
			<ExclamationIcon inline={true} color="dangerous" />
		{:else}
			<Badge variant="secondary">{locators.length}</Badge>
		{/if}
	</h5>

	{#each locators as locator (locator.id)}
		<ConnectionDimension
			bind:name={locator.name}
			bind:value={locator.value}
			id={locator.id}
			{sourceId}
			{onShowRemoveDimensionModal}
		/>
	{:else}
		<p>There are no dimension yet. Please use the button below to set the first one.</p>
	{/each}

	<div class="source-dimensions-actions">
		<Button onClick={() => onAddDimension(sourceId)} icon="add" variant="secondary"
			>Add dimension</Button
		>
	</div>
</div>
