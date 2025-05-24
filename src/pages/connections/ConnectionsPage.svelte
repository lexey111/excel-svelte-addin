<script>
	import { Alert, LinearLoader } from '../../components';
	import { connections } from '../../stores';
	import ConnectionList from './ConnectionList.svelte';
</script>

<div class="app-page">
	{#if $connections.isError}
		<Alert>An error occurred while fetching connections.</Alert>
	{/if}

	{#if $connections.isLoading}
		<LinearLoader />
		<p>Loading connections...</p>
	{/if}

	{#if !$connections.isLoading && !$connections.isError}
		{#if $connections.data.length > 0}
			<p>Manage your connections here.</p>
		{:else}
			<h4>There are no connections available yet.</h4>
			<p>You can create your first one by clicking the button below.</p>
		{/if}

		<ConnectionList />

		<p class="description">
			Each connection links your data in FP&amp;A application with Excel cell. You can use this
			feature to import data from FP&amp;A to Excel sheets.
		</p>

		<p class="description">
			Connection includes one or more <b>sources</b> that are pairs of Excel cells and FP&amp;A data
			entity and locator.
		</p>
	{/if}
</div>
