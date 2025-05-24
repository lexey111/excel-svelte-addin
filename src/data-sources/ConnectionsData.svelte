<script lang="ts">
	import { createQuery } from '@tanstack/svelte-query';
	import type { Connection } from '../types';
	import { connections, makeFakeConnections } from '../stores';

	const query = createQuery<Connection[]>({
		queryKey: ['connections'],
		queryFn: async () => {
			$connections.isLoading = false;

			const resultPromise = new Promise<Connection[]>((res) => {
				setTimeout(() => {
					res(makeFakeConnections());
				}, 500);
			});

			return resultPromise.then((data) => {
				$connections.data = data;
				console.log('data', data);
				return data;
			});
		}
	});

	query.subscribe((state) => {
		if (!state) return;
		$connections.isError = state.isError;
		$connections.isLoading = state.isLoading || state.isFetching;

		console.log('state', state);
	});
</script>
