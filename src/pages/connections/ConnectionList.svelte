<script lang="ts">
	import { Button, Modal, LayeredModal } from '../../components';
	import { connections, createConnection } from '../../stores';
	import type { Connection } from '../../types';
	import ConnectionForm from './ConnectionForm.svelte';
	import { ConnectionItem } from './partials';

	let showEditConnectionModal = $state(false);
	let connectionModalMode = $state<'edit' | 'create'>('create');

	let currentConnection = $state<Connection | undefined>(undefined);

	const handleNewConnection = () => {
		showEditConnectionModal = true;
		connectionModalMode = 'create';

		currentConnection = createConnection();
	};

	const closeConnectionModal = () => {
		showEditConnectionModal = false;
	};

	const confirmConnectionModal = async () => {
		if (!currentConnection) {
			showEditConnectionModal = false;
			return;
		}

		if (connectionModalMode === 'create') {
			$connections.data = [...$connections.data, { ...currentConnection }];
		} else {
			$connections.data = $connections.data.map((c) => {
				if (c.id !== currentConnection?.id) {
					return c;
				}
				return currentConnection!;
			});
		}

		showEditConnectionModal = false;
	};

	let showDeleteConnectionConfirmation = $state(false);
	let deleteConnectionContext = $state({
		id: '',
		name: ''
	});

	const cancelDeleteConnection = () => {
		showDeleteConnectionConfirmation = false;
	};

	const confirmDeleteConnection = async () => {
		showDeleteConnectionConfirmation = false;
		showEditConnectionModal = false;

		if (!deleteConnectionContext.id) {
			return;
		}

		$connections.data = $connections.data.filter((c) => c.id !== deleteConnectionContext.id);

		deleteConnectionContext.id = '';
		deleteConnectionContext.name = '';
		currentConnection = undefined;
	};

	const hanldeShowRemoveConnection = (connectionId?: string) => {
		if (!connectionId) {
			return;
		}
		const connectionIdx = $connections.data.findIndex((c) => c.id === connectionId);
		if (connectionIdx === -1) {
			return;
		}
		deleteConnectionContext.id = connectionId;
		deleteConnectionContext.name = $connections.data[connectionIdx].name;
		showDeleteConnectionConfirmation = true;
	};

	const handleEditConnection = (connectionId?: string) => {
		if (!connectionId) {
			return;
		}
		const connectionIdx = $connections.data.findIndex((c) => c.id === connectionId);
		if (connectionIdx === -1) {
			return;
		}

		currentConnection = JSON.parse(JSON.stringify($connections.data[connectionIdx]));

		showEditConnectionModal = true;
		connectionModalMode = 'edit';
	};

	const connectionCanBeSaved = $derived(() => {
		if (!currentConnection) {
			return false;
		}

		const alreadyExists = ($connections.data || []).some(
			(c) => c.id !== currentConnection!.id && c.name.trim() === currentConnection!.name.trim()
		);

		return (
			!alreadyExists &&
			!!currentConnection.name.trim() &&
			currentConnection.sources.length > 0 &&
			currentConnection.sources.every(
				(source) =>
					!!source.cellAddress.trim() &&
					!!source.entityName.trim() &&
					!!source.entityType.trim() &&
					!!source.version.trim() &&
					source.locators.length > 0 &&
					source.locators.every((locator) => !!locator.name.trim() && !!locator.value.trim())
			)
		);
	});
</script>

<div class="connection-list">
	{#each $connections.data as connection (connection.id)}
		<ConnectionItem {connection} onEditConnection={handleEditConnection} />
	{/each}
</div>

<div class="page-actions">
	<Button onClick={handleNewConnection} icon="add" noAutosize={true}>New connection</Button>
</div>

{#snippet editConnectionHeader()}
	{#if connectionModalMode === 'create'}
		New connection
	{:else}
		Edit connection
	{/if}
{/snippet}

{#snippet editConnectionFooter()}
	{#if connectionModalMode === 'edit'}
		<Button
			variant="dangerous"
			onClick={() => hanldeShowRemoveConnection(currentConnection?.id)}
			icon="delete">Delete</Button
		>
	{/if}
	<span style="margin-right: auto;"></span>

	<Button variant="secondary" onClick={closeConnectionModal}>Cancel</Button>
	<Button variant="primary" onClick={confirmConnectionModal} disabled={!connectionCanBeSaved()}>
		{#if connectionModalMode === 'create'}
			Create
		{:else}
			Save
		{/if}
	</Button>
{/snippet}

<LayeredModal
	open={showEditConnectionModal}
	onClose={() => (showEditConnectionModal = false)}
	allowBack={false}
	header={editConnectionHeader}
	footer={editConnectionFooter}
>
	<ConnectionForm bind:connection={currentConnection} />
</LayeredModal>

{#snippet removeConnectionHeader()}
	Delete Connection
{/snippet}

{#snippet removeConnectionFooter()}
	<Button variant="secondary" onClick={cancelDeleteConnection} autofocus={true}>Cancel</Button>
	<Button variant="dangerous" onClick={confirmDeleteConnection}>Delete</Button>
{/snippet}

<Modal
	open={showDeleteConnectionConfirmation}
	onClose={cancelDeleteConnection}
	size="auto"
	header={removeConnectionHeader}
	footer={removeConnectionFooter}
>
	Are you sure you want to delete connection "{deleteConnectionContext.name}"?
</Modal>

<style>
	.connection-list {
		display: flex;
		flex-flow: column wrap;
		margin: 2em 0;
	}
</style>
