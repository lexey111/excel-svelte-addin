<script lang="ts">
	import { onMount, onDestroy } from 'svelte';
	import { Alert } from '../../components';
	import { connections } from '../../stores';
	import type { Connection } from '../../types';
	import { TrackingCell, TrackingSource } from './partials';
	import { getCurrentCellPosition, getCurrentSheet } from './excel-utils';

	let selectedCell = $state('');
	let sheetAvailable = $state(false);

	let autoSelected = $state(false);
	let manuallySelected = $state(false);

	let bookName = $state('');
	let sheetName = $state('');
	let sheetNumber = $state(0);

	let connection: Connection | null = $state(null);

	const selectConnection = () => {
		console.log('Select connection...', bookName, sheetName);
		if (manuallySelected) {
			console.log('-- skip');
			return;
		}

		// 1. By bookName
		// order: bookName, sheetName, sheetNumber
		let selectedConnectionIdx = ($connections.data || [])
			.filter((c) => !!c.bookName)
			.findIndex((c) => {
				return c.bookName === bookName;
			});

		if (selectedConnectionIdx !== -1) {
			connection = $connections.data[selectedConnectionIdx];
			autoSelected = true;
			return;
		}

		// 2. By sheetName
		selectedConnectionIdx = ($connections.data || [])
			.filter((c) => !c.bookName && !!c.sheetTitle)
			.findIndex((c) => {
				return c.sheetTitle === sheetName;
			});

		if (selectedConnectionIdx !== -1) {
			connection = $connections.data[selectedConnectionIdx];
			autoSelected = true;
			return;
		}

		// 3. By sheetNumber
		selectedConnectionIdx = ($connections.data || [])
			.filter((c) => !c.bookName && !c.sheetTitle && typeof c.sheetNumber !== 'undefined')
			.findIndex((c) => {
				return c.sheetNumber == sheetNumber;
			});

		if (selectedConnectionIdx !== -1) {
			connection = $connections.data[selectedConnectionIdx];
			autoSelected = true;
			return;
		}
	};

	$effect(() => {
		if (bookName && sheetName) {
			selectConnection();
		}
	});

	onMount(() => {
		handleSetTrackingOn();
	});

	onDestroy(() => {
		handleSetTrackingOff();
	});

	const processSelectedCell = async (cellAddr?: string) => {
		let currentCell = cellAddr;
		if (!cellAddr) {
			currentCell = await getCurrentCellPosition();
		}
		selectedCell = currentCell || '';
		console.log('->', selectedCell);
	};

	const handleSelectionChanged = async (event: Excel.WorksheetSelectionChangedEventArgs) => {
		try {
			await processSelectedCell(event.address);
		} catch (err) {
			console.error(err);
			sheetAvailable = false;
		}
	};

	const handleSheetChanged = async (event: Excel.WorksheetActivatedEventArgs) => {
		try {
			// todo: book change
			await Excel.run(async (context) => {
				// restore subscription
				context.workbook.worksheets.onActivated.add(handleSheetChanged);

				const activeSheet = context.workbook.worksheets.getActiveWorksheet();
				activeSheet.onSelectionChanged.add(handleSelectionChanged);

				await context.sync();
			});

			const { currentBookName, currentSheetName, currentSheetNumber } = await getCurrentSheet(
				event.worksheetId
			);
			bookName = currentBookName;
			sheetName = currentSheetName;
			sheetNumber = currentSheetNumber;

			await processSelectedCell();
		} catch (err) {
			console.error(err);
			sheetAvailable = false;
		}
	};

	const handleSetTrackingOn = async () => {
		let activeSheet: Excel.Worksheet | null = null;
		let activeSheetId = '';

		try {
			// subscribe to events
			// todo: book change
			await Excel.run(async (context) => {
				context.workbook.worksheets.onActivated.add(handleSheetChanged);

				activeSheet = context.workbook.worksheets.getActiveWorksheet();
				activeSheet.onSelectionChanged.add(handleSelectionChanged);

				await context.sync();
				activeSheetId = activeSheet.id;
			});

			const { currentBookName, currentSheetName, currentSheetNumber } =
				await getCurrentSheet(activeSheetId);

			bookName = currentBookName;
			sheetName = currentSheetName;
			sheetNumber = currentSheetNumber;

			await processSelectedCell();
			sheetAvailable = true;
		} catch (err) {
			console.error(err);
			sheetAvailable = false;
		}
	};

	const handleSetTrackingOff = async () => {
		try {
			await Excel.run(async (context) => {
				const sheet = context.workbook.worksheets.getActiveWorksheet();

				sheet.onSelectionChanged.remove(handleSelectionChanged);
				context.workbook.worksheets.onActivated.remove(handleSheetChanged);

				await context.sync();
				sheetAvailable = false;
				console.log('Tracking is OFF');
			});
		} catch (err) {
			console.error(err);
			sheetAvailable = false;
		}
	};

	const onTargetCellClick = async (cellAddress: string) => {
		console.log('navigate to source cell ->', cellAddress);
		await Excel.run(async (context) => {
			// const range = context.workbook.worksheets.getItem('Sheet2').getRange('Z300');

			const activeSheet = context.workbook.worksheets.getActiveWorksheet();
			const range = activeSheet.getRange(cellAddress);
			range.select();

			await context.sync();

			await processSelectedCell();
		});
	};

	const onChangeConnectionId = (id: string) => {
		const connectionIdx = ($connections.data || []).findIndex((c) => c.id === id);

		if (connectionIdx !== -1) {
			autoSelected = false;
			manuallySelected = true;
			connection = $connections.data[connectionIdx];

			processSelectedCell();
		}
	};
</script>

{#if sheetAvailable}
	<TrackingSource
		{autoSelected}
		{sheetName}
		{bookName}
		{sheetNumber}
		{connection}
		{onTargetCellClick}
		{onChangeConnectionId}
	/>

	<TrackingCell cellAddress={selectedCell} {connection} />
{:else}
	<Alert>Excel is not available. The plugin cannot establish a connection to the sheet.</Alert>
{/if}
