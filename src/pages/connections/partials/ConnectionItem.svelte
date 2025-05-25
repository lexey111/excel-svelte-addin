<script lang="ts">
	import { Button, ConnectionsIcon } from '../../../components';
	import type { Connection } from '../../../types';

	type Props = {
		connection: Connection;
		onEditConnection: (connectionId?: string) => void;
	};

	let { connection, onEditConnection }: Props = $props();
</script>

<!-- svelte-ignore a11y_no_static_element_interactions -->
<div class="connection-item layered-list-item" ondblclick={() => onEditConnection(connection.id)}>
	<div class="connection-content">
		<div class="connection-icon">
			<ConnectionsIcon />
		</div>
		<div class="connection-name">
			{connection.name}

			{#if !!connection.bookName?.trim() || !!connection.sheetTitle?.trim() || connection.sheetNumber}
				<div class="connection-target">
					{#if connection.bookName}
						<b>Book</b>: {connection.bookName}
					{/if}

					{#if connection.sheetTitle || connection.sheetNumber}
						<b>Sheet</b>: {connection.sheetTitle || connection.sheetNumber}
					{/if}
				</div>
			{:else}
				<div class="connection-target">Book and sheet are not specified</div>
			{/if}

			{#if connection.sources.length > 0}
				<div class="connection-sources">
					<b>Sources</b>: {connection.sources.length},
					{connection.sources.map((s) => s.cellAddress).join(', ')}
				</div>
			{/if}
		</div>

		<Button
			onClick={() => onEditConnection(connection.id)}
			size="square36"
			variant="text"
			icon="right"
		></Button>
	</div>
</div>

<style>
	.connection-item {
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
</style>
