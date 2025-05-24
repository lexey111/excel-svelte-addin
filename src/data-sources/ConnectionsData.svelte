<script lang="ts">
	import { createQuery } from '@tanstack/svelte-query';
	import type { Connection } from '../types';
	import { connections, makeFakeConnections } from '../stores';

	const query = createQuery<Connection[]>({
		queryKey: ['connections'],
		queryFn: async () => {
			const resultPromise = new Promise<Connection[]>((res, rej) => {
				setTimeout(() => {
					if (Math.random() < 0.3) {
						console.log('rejected');
						rej('Failed to fetch connections');
						return;
					}
					console.log('resolved');
					res(makeFakeConnections());
				}, 1500);
			});

			return resultPromise.then((data) => {
				$connections.data = data;
				console.log('data', data);
				return data;
			});
		}
	});

	query.subscribe((state) => {
		if (!state) {
			console.log('no state');
			return;
		}
		$connections.isError = state.isError;
		$connections.isLoading = state.isLoading || state.isFetching || state.isPending;

		console.log('state', state);
	});
</script>
