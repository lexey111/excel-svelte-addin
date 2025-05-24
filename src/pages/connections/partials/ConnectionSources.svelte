<script lang="ts">
	import { Button, Modal } from '../../../components';
	import ExclamationIcon from '../../../components/icons/ExclamationIcon.svelte';
	import { makeid } from '../../../lib/utils';
	import type { Connection } from '../../../types';
	import ConnectionSource from './ConnectionSource.svelte';

	type Props = {
		connection: Connection;
	};

	let { connection = $bindable() }: Props = $props();

	const handleAddSource = () => {
		connection.sources.push({
			id: makeid(8),
			version: '',
			entityName: '',
			entityType: 'metric',
			locators: [],
			cellAddress: ''
		});
	};

	let showDeleteSourceConfirmation = $state(false);
	let deleteSourceId = $state('');

	const cancelDeleteSource = () => {
		showDeleteSourceConfirmation = false;
	};

	const confirmRemoveSource = () => {
		showDeleteSourceConfirmation = false;
		if (!connection || !deleteSourceId) {
			return;
		}
		connection.sources = (connection.sources || []).filter((s) => s.id !== deleteSourceId);
	};

	const handleShowRemoveSourceModal = (id: string) => {
		if (!connection) {
			return;
		}
		showDeleteSourceConfirmation = true;
		deleteSourceId = id;
	};

	const handleAddDimension = (sourceId: string) => {
		const idx = connection.sources.findIndex((s) => s.id === sourceId);
		if (idx === -1) {
			return;
		}
		connection.sources[idx].locators.push({
			id: makeid(8),
			name: '',
			value: ''
		});
	};

	let showDeleteDimensionConfirmation = $state(false);
	let deleteDimensionContext = $state({
		sourceId: '',
		dimensionId: ''
	});

	const cancelDeleteDimension = () => {
		showDeleteDimensionConfirmation = false;
	};

	const confirmDeleteDimension = () => {
		showDeleteDimensionConfirmation = false;
		if (!connection || !deleteDimensionContext.dimensionId || !deleteDimensionContext.sourceId) {
			return;
		}

		const idx = connection.sources.findIndex((s) => s.id === deleteDimensionContext.sourceId);
		if (idx === -1) {
			return;
		}

		connection.sources[idx].locators = connection.sources[idx].locators.filter(
			(s) => s.id !== deleteDimensionContext.dimensionId
		);
	};

	const handleShowRemoveDimensionModal = (sourceId: string, dimensionId: string) => {
		if (!connection) {
			return;
		}
		showDeleteDimensionConfirmation = true;
		deleteDimensionContext.dimensionId = dimensionId;
		deleteDimensionContext.sourceId = sourceId;
	};
</script>

<h3 class={connection.sources.length === 0 ? 'dangerous' : ''}>
	Sources {#if connection.sources.length === 0}
		<ExclamationIcon inline={true} color="dangerous" />
	{:else}
		[{connection.sources.length}]
	{/if}
</h3>

{#each connection.sources as source, index (source.id)}
	<ConnectionSource
		bind:version={source.version}
		bind:entityName={source.entityName}
		bind:entityType={source.entityType}
		bind:cellAddress={source.cellAddress}
		bind:locators={source.locators}
		id={source.id}
		{index}
		onShowRemoveModal={handleShowRemoveSourceModal}
		onShowRemoveDimensionModal={handleShowRemoveDimensionModal}
		onAddDimension={handleAddDimension}
	/>
{:else}
	<p>
		There must be at least one source in the connection. Use the button below to create a new
		source.
	</p>
{/each}

<div class="page-actions">
	<Button onClick={handleAddSource} icon="add" variant="secondary">Add source</Button>
</div>

{#snippet removeSourceHeader()}
	Delete source
{/snippet}

{#snippet removeSourceFooter()}
	<Button variant="secondary" onClick={cancelDeleteSource} autofocus={true}>Cancel</Button>
	<Button variant="dangerous" onClick={confirmRemoveSource}>Delete</Button>
{/snippet}

<Modal
	open={showDeleteSourceConfirmation}
	onClose={cancelDeleteSource}
	size="auto"
	header={removeSourceHeader}
	footer={removeSourceFooter}
>
	Are you sure you want to delete source?
</Modal>

{#snippet removeDimensionHeader()}
	Delete dimension
{/snippet}

{#snippet removeDimensionFooter()}
	<Button variant="secondary" onClick={cancelDeleteDimension} autofocus={true}>Cancel</Button>
	<Button variant="dangerous" onClick={confirmDeleteDimension}>Delete</Button>
{/snippet}

<Modal
	open={showDeleteDimensionConfirmation}
	onClose={cancelDeleteDimension}
	size="auto"
	header={removeDimensionHeader}
	footer={removeDimensionFooter}
>
	Are you sure you want to delete dimension?
</Modal>
