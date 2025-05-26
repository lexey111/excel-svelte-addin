<script lang="ts">
	import type { Snippet } from 'svelte';
	import Button from './Button.svelte';

	type Props = {
		header: Snippet;
		children: Snippet;
		footer?: Snippet;
		open: boolean;
		onClose: () => void;
	};

	let { children, open, onClose, header, footer }: Props = $props();
	let ref: HTMLDialogElement | null = null;

	const handleClose = () => {
		ref?.close();
		onClose();
	};

	$effect(() => {
		if (open) {
			ref?.showModal();
		} else {
			ref?.close();
		}
	});
</script>

<dialog bind:this={ref} onclose={handleClose} class="dialog" class:open>
	<div class="dialog-header">
		{@render header?.()}
		<div class="dialog-header-close">
			<Button onClick={handleClose} variant="white" size="square24" icon="close"></Button>
		</div>
	</div>

	<div class="dialog-body">
		{@render children?.()}
	</div>

	{#if !!footer}
		<div class="dialog-footer">
			{@render footer?.()}
		</div>
	{:else}
		<div class="dialog-footer">
			<Button onClick={handleClose} variant="secondary">Close</Button>
		</div>
	{/if}
</dialog>

<style>
	.dialog {
		border: none;
		border-radius: var(--border-radius);
		box-shadow: 0 4px 18px rgba(0, 0, 0, 0.3);
		animation-name: fadeIn;
		animation-duration: 0.2s;
		animation-play-state: initial;
		animation-fill-mode: forwards;
		animation-iteration-count: 1;
		padding: 0;
	}

	.dialog-header {
		display: flex;
		flex-flow: row nowrap;
		position: relative;
		align-items: center;
		height: 64px;
		gap: 6px;
		font-size: var(--font-large);
		padding: 0 0 0 32px;
		box-sizing: border-box;
		font-weight: bold;
	}

	.dialog-header-close {
		margin-left: auto;
		align-self: center;
		margin-right: 16px;
	}

	.dialog-body {
		display: flex;
		flex-flow: column wrap;
		position: relative;
		overflow-y: auto;
		overflow-x: auto;
		padding: 32px;
	}

	.dialog-footer {
		display: flex;
		align-items: center;
		align-content: center;
		justify-content: center;
		height: 64px;
		padding: 0 16px;
		gap: 6px;
		height: 64px;
	}

	dialog::backdrop {
		background: rgba(0, 0, 0, 0.1);
		backdrop-filter: blur(4px);
		opacity: 0.75;
	}
</style>
