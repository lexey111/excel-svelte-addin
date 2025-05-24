import { writable } from 'svelte/store';

export const officeState = writable({
	isOfficeInitialized: false
});

export async function checkOffice(): Promise<boolean> {
	console.log('...checking Office initialization...');
	const Office = window.Office;

	if (Office) {
		await Office?.onReady();
		officeState.set({ isOfficeInitialized: true });
		console.log('Office is available and ready');
		return true;
	}

	return false;
}
