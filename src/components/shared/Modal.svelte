<script lang="ts">
	import type { Snippet } from 'svelte';
	import Button from './Button.svelte';

	type Props = {
		header?: Snippet;
		children: Snippet;
		footer?: Snippet;
		size?: 'full' | 'big' | 'auto' | 'full-auto';
		open: boolean;
		onClose: () => void;
	};

	let { children, open, onClose, header, footer, size = 'full' }: Props = $props();
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

<dialog bind:this={ref} onclose={handleClose} class={'modal ' + size}>
	<div class="modal-header">
		{@render header?.()}
		<div class="modal-header-close">
			<Button onClick={handleClose} variant="white" size="square24" icon="close"></Button>
		</div>
	</div>

	<div class="modal-body">
		{@render children?.()}
	</div>

	{#if !!footer}
		<div class="modal-footer">
			{@render footer?.()}
		</div>
	{:else}
		<div class="modal-footer">
			<Button onClick={handleClose} variant="secondary">Close</Button>
		</div>
	{/if}
</dialog>

<style>
	.modal {
		border: none;
		border-radius: var(--border-radius);
		box-shadow: 0 4px 18px rgba(0, 0, 0, 0.3);
		animation-name: fadeIn;
		animation-duration: 0.2s;
		animation-play-state: initial;
		animation-fill-mode: forwards;
		animation-iteration-count: 1;
		opacity: 0.1;
		padding: 0;
	}

	.modal:open {
		display: grid;
		grid-template-rows: 48px 1fr 64px;
	}

	.modal.full {
		width: 100vw;
		height: 100vh;
		border-radius: 0;
		box-shadow: none;
	}

	.modal.big,
	.modal.full-auto {
		width: 90vw;
		height: 90vh;
	}

	@container (width < 600px) {
		.modal.full-auto {
			width: 100vw;
			height: 100vh;
			border-radius: 0;
			box-shadow: none;
			max-width: 100vw;
			max-height: 100vh;

			& > .modal-header {
				background-color: var(--shade-background-darker);
			}
			& > .modal-footer {
				background-color: var(--shade-background-darker);
				height: 56px;
			}
		}
	}

	.modal-header {
		display: flex;
		flex-flow: row nowrap;
		position: relative;
		align-items: center;
		gap: 6px;
		padding: 0 0 0 2em;
		box-sizing: border-box;
		font-weight: bold;
		transition: var(--transition-default);
	}

	.modal-header-close {
		margin-left: auto;
		align-self: center;
		margin-right: 0.7em;
	}

	.modal-body {
		display: flex;
		flex-flow: column wrap;
		position: relative;
		overflow-y: auto;
		overflow-x: auto;
		padding: 2em;
	}

	.modal-footer {
		margin-top: auto;
		display: flex;
		align-items: center;
		align-content: center;
		justify-content: center;
		height: 64px;
		padding: 0 2em;
		gap: 6px;
		transition: var(--transition-slow);
	}

	dialog::backdrop {
		background: rgba(0, 0, 0, 0.1);
		backdrop-filter: blur(4px);
		opacity: 0.75;
	}
</style>
