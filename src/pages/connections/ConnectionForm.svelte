<script lang="ts">
	import { Alert } from '../../components';
	import type { Connection } from '../../types';
	import { ConnectionParams, ConnectionSources } from './partials';

	type Props = {
		connection?: Connection;
	};

	let { connection = $bindable() }: Props = $props();
</script>

<div class="connection-form">
	{#if !connection}
		<div class="full-center">
			<Alert>No connection available. Something went wrong.</Alert>
		</div>
	{:else}
		<ConnectionParams bind:connection />
		<ConnectionSources bind:connection />
	{/if}
</div>

<style>
	.connection-form {
		container-type: size;
		margin: 0 auto;
		width: var(--content-clamp);
	}
</style>
