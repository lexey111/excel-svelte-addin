<script lang="ts">
	import { onMount, onDestroy } from 'svelte';
	import Alert from '../../components/shared/Alert.svelte';
	let selectedCell = $state('No cell selected');
	let sheetAvailable = $state(false);

	onMount(() => {
		handleSetTrackingOn();
	});

	onDestroy(() => {
		handleSetTrackingOff();
	});

	const handleSelectionChanged = async (event: Excel.WorksheetSelectionChangedEventArgs) => {
		try {
			return Excel.run((context) => {
				selectedCell = `Cell selected: ${event.address}`;
				console.log(`Cell selected: ${event.address}`);
				return context.sync();
			});
		} catch {
			sheetAvailable = false;
		}
	};

	const handleSetTrackingOn = async () => {
		try {
			await Excel.run(async (context) => {
				const sheet = context.workbook.worksheets.getActiveWorksheet();
				sheet.onSelectionChanged.add(handleSelectionChanged);
				await context.sync();
				sheetAvailable = true;
				console.log('Tracking ON');
			});
		} catch {
			sheetAvailable = false;
		}
	};

	const handleSetTrackingOff = async () => {
		try {
			await Excel.run(async (context) => {
				const sheet = context.workbook.worksheets.getActiveWorksheet();
				sheet.onSelectionChanged.remove(handleSelectionChanged);
				await context.sync();
				sheetAvailable = false;
				console.log('Tracking OFF');
			});
		} catch {
			sheetAvailable = false;
		}
	};
</script>

{#if sheetAvailable}
	<p>{selectedCell}</p>
{:else}
	<Alert>Excel is not available. The plugin cannot establish a connection to the sheet.</Alert>
{/if}
