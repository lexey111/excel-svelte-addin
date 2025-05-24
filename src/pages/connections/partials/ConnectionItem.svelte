<script lang="ts">
	import { Button } from '../../../components';
	import type { Connection } from '../../../types';

	type Props = {
		connection: Connection;
		idx: number;
		onShowRemoveConnectionModal: (connectionId?: string) => void;
		onEditConnection: (connectionId?: string) => void;
	};

	let { connection, idx, onShowRemoveConnectionModal, onEditConnection }: Props = $props();
</script>

<!-- svelte-ignore a11y_no_static_element_interactions -->
<div class="connection-item" ondblclick={() => onEditConnection(connection.id)}>
	<div class="connection-number">
		{idx + 1}
	</div>

	<div class="connection-name">
		<!-- svelte-ignore a11y_invalid_attribute -->
		<a href="#" onclick={() => onEditConnection(connection.id)}>
			{connection.name}
		</a>

		{#if connection.bookName || connection.sheetTitle || connection.sheetNumber}
			<div class="connection-target">
				{[connection.bookName, connection.sheetTitle || connection.sheetNumber]
					.filter(Boolean)
					.join(' | ')}
			</div>
		{/if}

		{#if connection.sources.length > 0}
			<div class="connection-sources">
				Sources: {connection.sources.length},
				{connection.sources.map((s) => s.cellAddress).join(',')}
			</div>
		{/if}
	</div>

	<Button
		onClick={() => onShowRemoveConnectionModal(connection.id)}
		size="small"
		variant="secondary"
		icon="delete"
	></Button>
</div>
