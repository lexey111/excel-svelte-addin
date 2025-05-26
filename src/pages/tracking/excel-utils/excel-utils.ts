export const getCurrentCellPosition = async (): Promise<string> => {
	return await Excel.run(async (context) => {
		await context.sync();
		const range = context.workbook.getSelectedRange();
		range.load(['address', 'values']);
		await context.sync();

		const addr = (range?.address || '').split('!')?.[1];
		console.log('Cell selected', addr);

		return addr ?? '';
	});
};

export const getCurrentSheet = async (worksheetId?: string) => {
	let currentBookName = '';
	let currentSheetName = '';
	let currentSheetNumber = -1;

	try {
		await Excel.run(async (context) => {
			const workbook = context.workbook;
			workbook.load('name');
			await context.sync();
			currentBookName = workbook.name;

			const worksheets = context.workbook.worksheets;
			worksheets.load('name');
			await context.sync();

			const workSheetIdx = worksheetId
				? (worksheets.items || []).findIndex((ws) => ws.id === worksheetId)
				: 0;

			currentSheetNumber = workSheetIdx;

			if (workSheetIdx !== -1) {
				currentSheetName = worksheets.items[workSheetIdx].name;
			} else {
				currentSheetName = '';
			}
		});
	} catch {
		//
	}
	return {
		currentBookName,
		currentSheetName,
		currentSheetNumber
	};
};
