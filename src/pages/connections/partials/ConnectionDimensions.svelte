<script lang="ts">
	import { ExclamationIcon, DimensionIcon, Button, Badge } from '../../../components';
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
	<h3 class={locators.length === 0 ? 'dangerous' : ''}>
		<DimensionIcon inline={true} />
		Dimensions {#if locators.length === 0}
			<ExclamationIcon inline={true} color="dangerous" />
		{:else}
			<Badge variant="secondary">{locators.length}</Badge>
		{/if}
	</h3>

	<div class="description">
		<p>
			Dimensions are used to locate exact cell in the source. Please specify the full set of
			dimensions to ensure accurate positioning.
		</p>
	</div>

	{#each locators as locator, idx (locator.id)}
		<ConnectionDimension
			isFirst={idx === 0}
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
		<Button
			onClick={() => onAddDimension(sourceId)}
			icon="add"
			variant="secondary"
			noAutosize={true}>Add dimension</Button
		>
	</div>
</div>

<style>
	.source-dimensions {
		display: flex;
		flex-flow: column wrap;
		container-type: size;
	}

	.source-dimensions-actions {
		margin: 1em 0;
	}
</style>
