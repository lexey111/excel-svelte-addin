<script>
	import { connections } from '../../stores';
	import ConnectionList from './ConnectionList.svelte';
</script>

<div class="app-page">
	<h3>Connections</h3>

	{#if $connections.length > 0}
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
		Connection includes one or more <b>sources</b> that are pairs of Excel cells and FP&amp;A data entity
		and locator.
	</p>
</div>
