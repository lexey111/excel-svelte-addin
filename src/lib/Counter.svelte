<script lang="ts">
	let count: number = $state(0);
	const increment = () => {
		count += 1;
	};
</script>

<button onclick={increment}>
	Count is {count}
</button>
