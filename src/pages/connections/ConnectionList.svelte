<script lang="ts">
	import { Button, Modal } from '../../components';
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

<Modal
	open={showEditConnectionModal}
	onClose={() => (showEditConnectionModal = false)}
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
		margin: 2em 0;

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
				grid-template-columns: 16px 1fr 36px;
				gap: 6px;
				flex-flow: row nowrap;
				align-items: center;
				width: 100%;
				transition: var(--transition-default);

				.connection-icon {
					display: inline-flex;
					align-self: flex-start;
					opacity: 0.6;
				}

				.connection-name {
					font-weight: 500;
					display: flex;
					align-self: flex-start;
					flex-flow: column wrap;
					line-height: 1.4em;
				}

				.connection-target {
					line-height: 1.2em;
					margin: 0.4em 0 0 0;
					padding: 0;
					font-weight: normal;
					font-size: var(--font-small);
					color: var(--secondary-text-color);
					b {
						font-weight: 500;
					}
				}

				.connection-sources {
					font-weight: normal;
					font-size: var(--font-small);
					color: var(--secondary-text-color);
					b {
						font-weight: 500;
					}
				}
			}

			@container (width < 400px) {
				.connection-content {
					grid-template-columns: 14px 1fr 36px;
					padding: 6px;
				}
			}

			@container (width < 300px) {
				.connection-content {
					grid-template-columns: 0 1fr 36px;

					.connection-icon {
						opacity: 0;
					}
				}
			}
		}
	}
</style>
