<script lang="ts">
	import { Button, Modal } from '../../components';
	import { connections, createConnection } from '../../stores';
	import type { Connection } from '../../types';
	import ConnectionForm from './ConnectionForm.svelte';
	import { ConnectionItem } from './partials';

	let editConnectionModalOpen = $state(false);
	let connectionModalMode = $state<'edit' | 'create'>('create');

	let currentConnection = $state<Connection | undefined>(undefined);

	const handleNewConnection = () => {
		editConnectionModalOpen = true;
		connectionModalMode = 'create';

		currentConnection = createConnection();
	};

	const closeConnectionModal = () => {
		editConnectionModalOpen = false;
	};

	const confirmConnectionModal = async () => {
		if (!currentConnection) {
			editConnectionModalOpen = false;
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

		editConnectionModalOpen = false;
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
		if (!deleteConnectionContext.id) {
			return;
		}

		$connections.data = $connections.data.filter((c) => c.id !== deleteConnectionContext.id);
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

		editConnectionModalOpen = true;
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
		<ConnectionItem
			{connection}
			onShowRemoveConnectionModal={hanldeShowRemoveConnection}
			onEditConnection={handleEditConnection}
		/>
	{/each}
</div>

<div class="page-actions">
	<Button onClick={handleNewConnection} icon="add">New connection</Button>
</div>

{#snippet editConnectionHeader()}
	{#if connectionModalMode === 'create'}
		New connection
	{:else}
		Edit connection
	{/if}
{/snippet}

{#snippet editConnectionFooter()}
	<Button variant="secondary" onClick={closeConnectionModal}>Cancel</Button>
	<Button variant="primary" onClick={confirmConnectionModal} disabled={!connectionCanBeSaved()}>
		{#if connectionModalMode === 'create'}
			Create
		{:else}
			Save
		{/if}
	</Button>
{/snippet}

<Modal
	open={editConnectionModalOpen}
	onClose={() => (editConnectionModalOpen = false)}
	size="full-auto"
	header={editConnectionHeader}
	footer={editConnectionFooter}
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
	:global .connection-list {
		display: flex;
		flex-flow: column wrap;

		.connection-item {
			display: flex;
			flex-flow: row nowrap;
			align-items: center;
			width: 100%;
			transition: var(--transition-default);
			box-shadow: 0 0 0 1px var(--shade-background-darker);
			background: var(--shade-background);

			&:hover {
				background: var(--secondary-color);
			}

			.connection-content {
				padding: 12px;
				display: grid;
				grid-template-columns: 1fr 40px;
				gap: 6px;
				flex-flow: row nowrap;
				align-items: center;
				width: 100%;
				transition: var(--transition-default);

				.connection-name {
					font-weight: bold;
					padding: 0 0 0 1em;
				}

				.connection-target {
					font-weight: normal;
					font-size: var(--font-small);
					color: var(--secondary-text-color);
				}

				.connection-sources {
					font-weight: normal;
					font-size: var(--font-small);
					color: var(--secondary-text-color);
				}

				button {
					margin-left: auto;
					margin-right: 1em;
				}
			}

			@container (width < 400px) {
				.connection-content {
					padding: 6px;
				}
			}
		}
	}
</style>
