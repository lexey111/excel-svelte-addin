<script lang="ts">
	export let message: string = '';
</script>

<div class="spinner-container">
	<span class="spinner"></span>
	{#if !!message}
		<span class="message">{message}</span>
	{/if}
</div>

<style>
	.spinner {
		border: 2px solid #f3f3f3;
		border-top: 2px solid #3498db;
		border-radius: 50%;
		box-sizing: border-box;
		width: 1em;
		height: 1em;
		animation: spin 2s linear infinite;
	}

	@keyframes spin {
		0% {
			transform: rotate(0deg);
		}
		100% {
			transform: rotate(360deg);
		}
	}

	.message {
		font-size: 0.8rem;
		opacity: 0.8;
		margin-left: 0.5em;
	}

	.spinner-container {
		display: inline-flex;
		justify-content: center;
		align-items: center;
		height: 1em;
	}
</style>
