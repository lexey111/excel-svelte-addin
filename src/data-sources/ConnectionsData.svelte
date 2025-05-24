<script lang="ts">
	import { createQuery } from '@tanstack/svelte-query';
	import type { Connection } from '../types';

	const query = createQuery<Connection[]>({
		queryKey: ['connections'],
		queryFn: () => {
			const resultPromise = new Promise<Connection[]>((res) => {
				setTimeout(() => {
					res([]);
				}, 1000);
			});

			return resultPromise;
		}
	});
</script>

<div>
	{#if $query.isLoading}
		<p>Loading...</p>
	{:else if $query.isError}
		<p>Error: {$query.error.message}</p>
	{:else if $query.isSuccess}
		{#each $query.data as connection (connection.id)}
			<p>{connection.name}</p>
		{/each}
	{/if}
</div>
