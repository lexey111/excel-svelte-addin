<script lang="ts">
	import { ConnectionSourceItem, ConnectionSource, CheckSource } from '.';
	import {
		Badge,
		Button,
		Modal,
		ExclamationIcon,
		LocationIcon,
		LayeredModal
	} from '../../../components';
	import { makeid } from '../../../lib/utils';
	import { isSourceCorrect } from '../../../stores';
	import type { Connection, Source } from '../../../types';

	type Props = {
		connection: Connection;
	};

	let { connection = $bindable() }: Props = $props();

	let showDeleteSourceConfirmation = $state(false);

	const cancelDeleteSource = () => {
		showDeleteSourceConfirmation = false;
	};

	const confirmRemoveSource = () => {
		showDeleteSourceConfirmation = false;
		if (!connection || !currentSource?.id) {
			return;
		}
		connection.sources = (connection.sources || []).filter((s) => s.id !== currentSource!.id);
		showDeleteSourceConfirmation = false;
		showSourceLayer = false;
	};

	const handleShowRemoveSourceModal = () => {
		if (!connection || !currentSource) {
			return;
		}
		showDeleteSourceConfirmation = true;
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

	let currentSource = $state<Source | undefined>(undefined);
	let showSourceLayer = $state(false);

	const handleConfirmSourceLayer = () => {
		showSourceLayer = false;
	};

	let isNewSource = $state(false);

	const handleEditSource = (sourceId: string, isNew: boolean = false) => {
		if (!connection) {
			return;
		}

		currentSource = connection.sources.find((s) => s.id === sourceId);
		if (!currentSource) {
			return;
		}

		isNewSource = isNew;
		showSourceLayer = true;

		console.log('Edit source');
	};

	const handleAddSource = () => {
		const newId = makeid(8);

		connection.sources.push({
			id: newId,
			version: '',
			entityName: '',
			entityType: 'metric',
			locators: [],
			cellAddress: ''
		});

		handleEditSource(newId, true);
	};

	let showCheckSourceModal = $state(false);

	const handleShowCheckSourceModal = (sourceId?: string) => {
		console.log('sourceId', sourceId);
		showCheckSourceModal = true;
	};

	const closeCheckSourceModal = () => {
		showCheckSourceModal = false;
	};

	const currentSourceCanBeSaved = $derived(() => {
		return isSourceCorrect(currentSource);
	});
</script>

<h3 class={connection.sources.length === 0 ? 'dangerous' : ''}>
	<LocationIcon inline={true} /> Sources {#if connection.sources.length === 0}
		<ExclamationIcon inline={true} color="dangerous" />
	{:else}
		<Badge variant="primary">{connection.sources.length}</Badge>
	{/if}
</h3>

<div class="sources-list">
	{#each connection.sources as source (source.id)}
		<ConnectionSourceItem {source} onEditSource={handleEditSource} />
	{:else}
		<p>
			There must be at least one source in the connection. Use the button below to create a new
			source.
		</p>
	{/each}
</div>

<div class="page-actions">
	<Button onClick={handleAddSource} icon="add" variant="secondary" noAutosize={true}
		>Add source</Button
	>
</div>

{#snippet removeSourceHeader()}
	Delete Source
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
	<Button variant="dangerous" onClick={confirmDeleteDimension} noAutosize={true}>Delete</Button>
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

{#snippet checkSourceHeader()}
	Check source
{/snippet}

{#snippet checkSourceFooter()}
	<Button variant="secondary" onClick={closeCheckSourceModal} autofocus={true}>Close</Button>
{/snippet}

<Modal
	open={showCheckSourceModal}
	onClose={closeCheckSourceModal}
	size="auto"
	header={checkSourceHeader}
	footer={checkSourceFooter}
>
	{#if showCheckSourceModal}
		<CheckSource source={currentSource} />
	{/if}
</Modal>

{#snippet sourceLayerHeader()}
	{isNewSource ? 'New source' : 'Edit source'}
{/snippet}

{#snippet sourceLayerFooter()}
	<Button variant="dangerous" icon="delete" onClick={handleShowRemoveSourceModal}
		>Delete Source</Button
	>
	<span class="spacer"></span>

	<Button
		onClick={() => handleShowCheckSourceModal(currentSource?.id)}
		variant="secondary"
		disabled={!currentSourceCanBeSaved()}>Check Source...</Button
	>
{/snippet}

<LayeredModal
	open={showSourceLayer}
	onClose={handleConfirmSourceLayer}
	header={sourceLayerHeader}
	footer={sourceLayerFooter}
>
	{#if currentSource && showSourceLayer}
		<ConnectionSource
			bind:version={currentSource.version!}
			bind:entityName={currentSource.entityName!}
			bind:entityType={currentSource.entityType!}
			bind:cellAddress={currentSource.cellAddress!}
			bind:locators={currentSource.locators!}
			id={currentSource.id!}
			onShowRemoveDimensionModal={handleShowRemoveDimensionModal}
			onAddDimension={handleAddDimension}
		/>
	{:else}
		<p>No source selected</p>
	{/if}
</LayeredModal>

<style>
	h3 {
		margin-top: 2em;
	}
</style>
