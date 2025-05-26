<script lang="ts">
	import { Button } from '../../../components';
	import { connections } from '../../../stores';
	import type { Connection } from '../../../types';

	type Props = {
		autoSelected: boolean;
		sheetNumber: number;
		sheetName: string;
		bookName: string;
		connection: Connection | null;
		onTargetCellClick: (cellAddress: string) => void;
		onChangeConnectionId: (id: string) => void;
		onGetAllData: () => void;
		cellAddress: string;
	};

	let {
		autoSelected,
		sheetName,
		sheetNumber,
		bookName,
		connection,
		onTargetCellClick,
		onChangeConnectionId,
		onGetAllData,
		cellAddress
	}: Props = $props();

	// eslint-disable-next-line svelte/prefer-writable-derived
	let currentConnectionId = $state('');

	$effect(() => {
		currentConnectionId = connection?.id || '';
	});

	$effect(() => {
		if (currentConnectionId !== connection?.id) {
			console.log('Manually selected', currentConnectionId);
			onChangeConnectionId(currentConnectionId);
		}
	});

	const connectionIsBusy = $derived(() => {
		return connection?.sources.some((s) => s.isBusy);
	});
</script>

<div class="tracking-source">
	<div class="select-connection">
		<fieldset>
			<label for="connection">Connection</label>
			<select name="connection" id="connection" bind:value={currentConnectionId}>
				{#each $connections.data as conn (conn.id)}
					<option value={conn.id}>{conn.name}</option>
				{/each}
			</select>
		</fieldset>
	</div>

	<div class="tracking-current">
		<div class="book"><b>Book:</b> {bookName || 'unknown'}</div>
		<div class="sheet"><b>Sheet:</b> {sheetName || 'unknown'} ({sheetNumber + 1})</div>

		{#if autoSelected}
			<div>The connection was automatically selected.</div>
		{/if}
	</div>

	{#if connection}
		<h4>Cells in the connection</h4>

		<div class="connection-cells">
			{#each connection.sources as source (source.id)}
				<!-- svelte-ignore a11y_click_events_have_key_events -->
				<!-- svelte-ignore a11y_no_static_element_interactions -->
				<div
					class="cell"
					onclick={() => onTargetCellClick(source.cellAddress)}
					class:disabled={source.isBusy}
					class:current={cellAddress === source.cellAddress}
				>
					{source.cellAddress}
				</div>
			{/each}

			<div class="connection-get-all-data">
				<Button
					onClick={onGetAllData}
					icon="download"
					variant="text"
					size="small"
					disabled={connectionIsBusy()}
					noAutosize={true}>Get all the data</Button
				>
			</div>
		</div>
	{/if}
</div>

<style>
	.tracking-source {
		margin: 0 0 2em 0;
	}

	h4 {
		margin: 0;
		padding: 0;
	}

	.tracking-current {
		margin-bottom: 1em;
		color: var(--remark-color);
		font-size: var(--font-small);

		b {
			font-weight: 500;
		}
	}

	.connection-cells {
		margin-top: 1em;
		display: flex;
		flex-flow: row wrap;
		gap: 6px;
	}

	.cell {
		font-size: var(--font-small);
		font-weight: normal;
		background: var(--success-background);
		border: 1px solid var(--success-border-color);
		color: var(--success-color);
		padding: 0 4px;
		cursor: pointer;
		transition: var(--transition-default);
		opacity: 0.7;
		display: flex;
		align-items: center;
		font-weight: 600;

		&:hover {
			opacity: 1;
		}

		&.disabled {
			pointer-events: none;
			filter: grayscale(1);
		}

		&.current {
			box-shadow: 0 0 0 2px var(--success-border-color);
			background: var(--success-border-color);
			color: var(--success-contrast-color);
		}
	}
</style>
