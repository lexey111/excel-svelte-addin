<script lang="ts">
	import { createQuery } from '@tanstack/svelte-query';
	import type { Connection } from '../types';
	import { connections, makeFakeConnections, userData } from '../stores';
	import { appState } from '../stores/app-store.svelte';

	const query = createQuery<Connection[]>({
		queryKey: ['connections'],
		queryFn: async () => {
			const resultPromise = new Promise<Connection[]>((res, rej) => {
				setTimeout(() => {
					if (Math.random() < 0.3) {
						rej('Failed to fetch connections');
						return;
					}
					res(makeFakeConnections());
				}, 1500);
			});

			return resultPromise.then((data) => {
				$connections.data = data;

				appState.update((s) => ({
					...s,
					isBusy: false,
					isConnectionsLoading: false,
					connectionsLoaded: true,
					connectionsCount: $connections.data.length
				}));
				return data;
			});
		},
		enabled: $userData.isAuthorized
	});

	query.subscribe((state) => {
		if (!state) {
			console.log('no state');
			return;
		}
		$connections.isError = state.isError;
		$connections.isLoading = state.isLoading || state.isFetching || state.isPending;

		appState.update((s) => ({
			...s,
			isBusy: $connections.isLoading,
			isConnectionsLoading: $connections.isLoading,
			connectionsLoaded: $connections.data.length > 0,
			connectionsCount: $connections.data.length
		}));
	});
</script>
