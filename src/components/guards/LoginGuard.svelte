<script lang="ts">
	import { onMount } from 'svelte';
	import { userData } from '../../stores';

	onMount(async () => {
		// emulate check auth token & check
		$userData.isFetching = true;

		setTimeout(() => {
			$userData.isFetching = false;
			$userData.isAuthorized = false;
		}, 500);
	});
</script>
