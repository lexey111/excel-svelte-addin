import { writable } from 'svelte/store';

export type AppState = {
	isBusy: boolean;
	isConnectionsLoading: boolean;
	connectionsLoaded: boolean;
	connectionsCount: number;
};

// todo: add process management
// this implementation is simple and straightforward and should be replaced with a more robust solution in the future.

export const appState = writable<AppState>({
	isBusy: false,
	isConnectionsLoading: false,
	connectionsLoaded: false,
	connectionsCount: 0
});
