import { writable } from 'svelte/store';
import type { Connection, ConnectionsStore } from '../types';
import { makeid } from '../lib/utils';

export const connections = writable<ConnectionsStore>({
	isLoading: false,
	isError: false,
	data: []
});

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

export const makeFakeConnections = (): Connection[] => {
	return [
		{
			id: makeid(8),
			name: 'Fake connection 1',
			bookName: 'Book 1',
			sheetNumber: 1,
			sheetTitle: 'Sheet 1',
			sources: [
				{
					id: makeid(8),
					entityName: 'Metric 1',
					entityType: 'metric',
					cellAddress: 'A10',
					version: 'Live Actuals',
					locators: [
						{
							id: makeid(8),
							name: 'Country',
							value: 'US'
						},
						{
							id: makeid(8),
							name: 'Product',
							value: 'Product B'
						}
					]
				},
				{
					id: makeid(8),
					entityName: 'Metric 1',
					entityType: 'metric',
					cellAddress: 'A11',
					version: 'Live Actuals',
					locators: [
						{
							id: makeid(8),
							name: 'Country',
							value: 'IL'
						},
						{
							id: makeid(8),
							name: 'Product',
							value: 'Product B'
						}
					]
				}
			]
		},
		{
			id: makeid(8),
			name: 'Fake connection 2',
			bookName: '',
			sheetNumber: 1,
			sheetTitle: '',
			sources: [
				{
					id: makeid(8),
					entityName: 'Metric Two',
					entityType: 'metric',
					cellAddress: 'B10',
					version: 'Live Actuals',
					locators: [
						{
							id: makeid(8),
							name: 'Country',
							value: 'UA'
						},
						{
							id: makeid(8),
							name: 'Product',
							value: 'Product C'
						}
					]
				},
				{
					id: makeid(8),
					entityName: 'Metric Three',
					entityType: 'metric',
					cellAddress: 'B14',
					version: 'Live Actuals',
					locators: [
						{
							id: makeid(8),
							name: 'Country',
							value: 'NZ'
						},
						{
							id: makeid(8),
							name: 'Product',
							value: 'Product B'
						}
					]
				}
			]
		},
		{
			id: makeid(8),
			name: 'Fake connection 3',
			bookName: '',
			sheetNumber: 0,
			sheetTitle: '',
			sources: [
				{
					id: makeid(8),
					entityName: 'Metric Three',
					entityType: 'metric',
					cellAddress: 'C2',
					version: 'Live Actuals',
					locators: [
						{
							id: makeid(8),
							name: 'Country',
							value: 'ES'
						},
						{
							id: makeid(8),
							name: 'Product',
							value: 'Product D'
						}
					]
				}
			]
		}
	];
};
