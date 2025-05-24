<script lang="ts">
	import { Button } from '../../../components';
	import type { Connection } from '../../../types';

	type Props = {
		connection: Connection;
		onShowRemoveConnectionModal: (connectionId?: string) => void;
		onEditConnection: (connectionId?: string) => void;
	};

	let { connection, onShowRemoveConnectionModal, onEditConnection }: Props = $props();
</script>

<!-- svelte-ignore a11y_no_static_element_interactions -->
<div class="connection-item" ondblclick={() => onEditConnection(connection.id)}>
	<div class="connection-name">
		<!-- svelte-ignore a11y_invalid_attribute -->
		<a href="#" onclick={() => onEditConnection(connection.id)}>
			{connection.name}
		</a>

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
		onClick={() => onShowRemoveConnectionModal(connection.id)}
		size="square36"
		variant="secondary"
		icon="delete"
	></Button>
</div>
