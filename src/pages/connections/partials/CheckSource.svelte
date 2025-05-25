<script lang="ts">
	import { onMount } from 'svelte';
	import { Button } from '../../../components';
	import type { Source } from '../../../types';
	import SourceParams from './SourceParams.svelte';

	type Props = {
		source?: Source;
	};

	let { source = $bindable() }: Props = $props();

	let isBusy = $state(false);
	let isError = $state(false);
	let result = $state('');

	const emulateCheck = async () => {
		console.log('emulateCheck');
		isBusy = true;
		isError = false;
		result = '';

		const emulatedResponse = new Promise<string>((resolve, reject) => {
			setTimeout(() => {
				if (Math.random() > 0.3) {
					resolve((Math.floor(Math.random() * 10000) / 100).toFixed(2));
				} else {
					reject(new Error('Invalid locator'));
				}
			}, 2000);
		});

		return emulatedResponse
			.then((data) => {
				isBusy = false;
				result = data.toString();
			})
			.catch((err) => {
				isBusy = false;
				isError = true;
				result = 'Error: ' + err.message;
			});
	};

	onMount(() => {
		console.log('mount');
		isBusy = false;
		isError = false;
		result = '';
	});
</script>

<div>
	<p>Here you can check the source: request FP&amp;A application and see the result.</p>

	<div class="source-text">
		<SourceParams {source} />
	</div>

	<Button variant="primary" onClick={emulateCheck} loading={isBusy} disabled={isBusy}>
		{#if isBusy}
			Checking...
		{:else}
			Check
		{/if}
	</Button>

	{#if !isBusy && !!result}
		<div class="result" class:error={isError}>
			{#if isError}
				Error: {result}
			{:else}
				Success, value received: <b>{result}</b>
			{/if}
		</div>
	{/if}
</div>

<style>
	.result {
		margin-top: 1em;
		padding: 1em;
		border: 1px solid var(--success-border-color);
		background-color: var(--success-background);

		&.error {
			border-color: var(--error-color-border);
			background-color: var(--error-color-light);
		}
	}
</style>
