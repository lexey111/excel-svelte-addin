import { writable } from 'svelte/store';
import type { Connection } from '../types';
import { makeid } from '../lib/utils';

export const connections = writable<Connection[]>([]);

export const createConnection = (): Connection => {
	return {
		id: makeid(8),
		name: 'New connection',
		bookName: undefined,
		sheetNumber: undefined,
		sheetTitle: undefined,
		sources: []
	};
};
