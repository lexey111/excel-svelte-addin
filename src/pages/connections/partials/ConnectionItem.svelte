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
<div class="connection-item" ondblclick={() => onEditConnection(connection.id)}>
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
