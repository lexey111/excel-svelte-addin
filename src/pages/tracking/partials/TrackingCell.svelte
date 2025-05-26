<script lang="ts">
	import { Button } from '../../../components/shared';
	import type { Connection } from '../../../types';
	import { SourceParams } from '../../connections/partials';

	type Props = {
		cellAddress: string;
		connection?: Connection | null;
		onGetData: (sourceId: string) => void;
	};

	let { cellAddress, connection, onGetData }: Props = $props();

	const targetSource = $derived(() => {
		if (!connection) {
			return undefined;
		}
		return connection.sources.find((s) => s.cellAddress === cellAddress);
	});
</script>

<div class="tracking-cell" class:has-cell={!!cellAddress} class:connected={!!targetSource()}>
	{#if !!cellAddress}
		{#if !targetSource()}
			Selected cell {cellAddress} has no data source.
		{/if}
	{:else}
		No cell selected
	{/if}
</div>

{#if targetSource()}
	<div class="connection-params">
		<SourceParams source={targetSource()} />
	</div>

	<div class="connection-get-data">
		<Button
			onClick={() => onGetData(targetSource()?.id || '')}
			disabled={targetSource()?.isBusy}
			icon="download"
			noAutosize={true}>Get data for {targetSource()?.cellAddress}</Button
		>
	</div>
{/if}

<style>
	.tracking-cell {
		margin: 1em 0 0 0;
		color: var(--remark-color);

		&.has-cell {
			color: var(--remark-color);
		}

		&.connected {
			color: var(--success-color);
		}
	}

	.connection-params {
		display: flex;
		flex-flow: column wrap;
	}
</style>
