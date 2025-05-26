<script lang="ts">
	import type { Connection } from '../../../types';
	import { SourceParams } from '../../connections/partials';

	type Props = {
		cellAddress: string;
		connection?: Connection | null;
	};

	let { cellAddress, connection }: Props = $props();

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

<div class="connection-params">
	<SourceParams source={targetSource()} />
</div>

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
