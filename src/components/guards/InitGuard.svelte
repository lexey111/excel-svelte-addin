<script lang="ts">
	import { onMount } from 'svelte';
	import { checkOffice } from '../../stores';

	onMount(async () => {
		// check immediately
		const officeIsHere = await checkOffice();

		if (!officeIsHere) {
			// run check loop every 500ms for 5s
			let attemptsCounter = 0;

			const hndlr = setInterval(async () => {
				const officeIsHere = await checkOffice();
				if (officeIsHere) {
					clearInterval(hndlr);
				} else {
					attemptsCounter++;
				}
				// fallback
				if (attemptsCounter > 10) {
					clearInterval(hndlr);
					console.error('Office is not available');
				}
			}, 500);
		}
	});
</script>
