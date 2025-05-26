<script lang="ts">
	import type { Snippet } from 'svelte';
	import ExclamationIcon from '../icons/ExclamationIcon.svelte';
	// https://ishadeed.com/article/css-relative-colors/

	type Props = {
		children: Snippet;
	};

	let { children }: Props = $props();
</script>

<div class="alert-container">
	<div class="alert-icon">
		<ExclamationIcon size={48} />
	</div>
	<div class="alert-message">
		<div class="alert-message-text">
			{@render children?.()}
		</div>
	</div>
</div>

<style>
	.alert-container {
		display: flex;
		flex-flow: column wrap;
		align-items: center;
		gap: 1em;
		color: var(--error-color);
		background-color: var(--error-background);
		padding: 2em;
		border: 1px solid var(--error-color-border);
		animation-name: fadeIn;
		animation-duration: 0.4s;
		animation-play-state: initial;
		animation-fill-mode: forwards;
		animation-iteration-count: 1;
		opacity: 0.1;
		text-align: center;
	}

	.alert-icon {
		display: flex;
		align-items: center;
		align-content: center;
		justify-content: center;
		flex-grow: 0;
		flex-shrink: 0;
		border-radius: 100%;
		color: var(--error-color);

		animation-name: fadeIn;
		animation-duration: 0.2s;
		animation-delay: 0.1s;
		animation-play-state: initial;
		animation-fill-mode: forwards;
		animation-iteration-count: 1;
		opacity: 0.1;
	}

	.alert-message {
		display: flex;
		flex-flow: column wrap;
		gap: 6px;
		align-items: center;
		justify-content: center;
		font-weight: 500;
	}

	.alert-message-text {
		font-size: var(--font-normal);
	}
</style>
