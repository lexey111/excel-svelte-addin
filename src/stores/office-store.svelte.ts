import { writable } from 'svelte/store';
import { appState } from './app-store.svelte';

export const officeState = writable({
	isOfficeInitialized: false
});

export async function checkOffice(): Promise<boolean> {
	console.log('...checking Office initialization...');
	appState.update((s) => ({
		...s,
		isBusy: true
	}));

	const Office = window.Office;

	if (Office) {
		await Office?.onReady();
		officeState.set({ isOfficeInitialized: true });
		console.log('Office is available and ready');

		appState.update((s) => ({
			...s,
			isBusy: false
		}));

		return true;
	}

	return false;
}
