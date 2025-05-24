import { writable } from 'svelte/store';

export type AppPage = '_init' | '_login' | 'connections' | 'tracking' | 'profile';

export const currentPage = writable<AppPage>('_init');
