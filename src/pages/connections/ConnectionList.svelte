<script lang="ts">
	import { Button, Modal } from '../../components';
	import { connections, createConnection } from '../../stores';
	import type { Connection } from '../../types';
	import ConnectionForm from './ConnectionForm.svelte';
	import ConnectionItem from './partials/ConnectionItem.svelte';

	let connectionModalOpen = $state(false);
	let connectionModalMode = $state<'edit' | 'create'>('create');

	let currentConnection = $state<Connection | undefined>(undefined);

	const handleNewConnection = () => {
		connectionModalOpen = true;
		connectionModalMode = 'create';

		currentConnection = createConnection();
	};

	const closeConnectionModal = () => {
		connectionModalOpen = false;
	};

	const confirmConnectionModal = () => {
		if (!currentConnection) {
			connectionModalOpen = false;
			return;
		}

		if (connectionModalMode === 'create') {
			$connections = [...$connections, { ...currentConnection }];
		} else {
			$connections = $connections.map((c) => {
				if (c.id !== currentConnection?.id) {
					return c;
				}
				return currentConnection!;
			});
		}

		connectionModalOpen = false;
	};

	let showDeleteConnectionConfirmation = $state(false);
	let deleteConnectionContext = $state({
		id: '',
		name: ''
	});

	const cancelDeleteConnection = () => {
		showDeleteConnectionConfirmation = false;
	};

	const confirmDeleteConnection = () => {
		showDeleteConnectionConfirmation = false;
		if (!deleteConnectionContext.id) {
			return;
		}

		$connections = $connections.filter((c) => c.id !== deleteConnectionContext.id);
	};

	const hanldeShowRemoveConnection = (connectionId?: string) => {
		if (!connectionId) {
			return;
		}
		const connectionIdx = $connections.findIndex((c) => c.id === connectionId);
		if (connectionIdx === -1) {
			return;
		}
		deleteConnectionContext.id = connectionId;
		deleteConnectionContext.name = $connections[connectionIdx].name;
		showDeleteConnectionConfirmation = true;
	};

	const handleEditConnection = (connectionId?: string) => {
		if (!connectionId) {
			return;
		}
		const connectionIdx = $connections.findIndex((c) => c.id === connectionId);
		if (connectionIdx === -1) {
			return;
		}

		currentConnection = JSON.parse(JSON.stringify($connections[connectionIdx]));

		connectionModalOpen = true;
		connectionModalMode = 'edit';
	};
</script>

{#each $connections as connection (connection.id)}
	<ConnectionItem
		{connection}
		onShowRemoveConnectionModal={hanldeShowRemoveConnection}
		onEditConnection={handleEditConnection}
	/>
{/each}

<div class="page-actions">
	<Button onClick={handleNewConnection} icon="add">New connection</Button>
</div>

{#snippet header()}
	{#if connectionModalMode === 'create'}
		New connection
	{:else}
		Edit connection
	{/if}
{/snippet}

{#snippet footer()}
	<Button variant="secondary" onClick={closeConnectionModal}>Cancel</Button>
	<Button variant="primary" onClick={confirmConnectionModal}>
		{#if connectionModalMode === 'create'}
			Create
		{:else}
			Save
		{/if}
	</Button>
{/snippet}

<Modal
	open={connectionModalOpen}
	onClose={() => (connectionModalOpen = false)}
	size="full-auto"
	{header}
	{footer}
>
	<ConnectionForm bind:connection={currentConnection} />
</Modal>

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
	:global .connection-item {
		display: flex;
		flex-flow: row nowrap;
		align-items: center;
		width: 100%;
		transition: var(--default-transition);
		border-radius: var(--border-radius);
		padding: 0.5em 0;

		&:hover {
			background: var(--secondary-color);
		}

		.connection-name {
			font-weight: bold;
			padding: 0 0 0 1em;
		}

		.connection-target {
			font-weight: normal;
			font-size: 0.8em;
		}

		.connection-sources {
			font-weight: normal;
			font-size: 0.8em;
		}

		button {
			margin-left: auto;
			margin-right: 1em;
		}
	}
</style>
