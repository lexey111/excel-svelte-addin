<script lang="ts">
	import type { Snippet } from 'svelte';
	import Button from './Button.svelte';

	type Props = {
		header: Snippet;
		children: Snippet;
		footer?: Snippet;
		open: boolean;
		onClose: () => void;
		allowBack?: boolean;
	};

	let { children, open, onClose, header, footer, allowBack = true }: Props = $props();
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

<dialog bind:this={ref} onclose={handleClose} class="modal" class:open>
	<div class="modal-header" class:allow-back={allowBack}>
		{#if allowBack}
			<div class="modal-header-close">
				<Button onClick={handleClose} variant="text" icon="left" size="square48"></Button>
			</div>
		{/if}
		{@render header?.()}
	</div>

	<div class="modal-body">
		{@render children?.()}
	</div>

	{#if !!footer}
		<div class="modal-footer">
			<div class="modal-footer-content">
				{@render footer?.()}
			</div>
		</div>
	{:else}
		<div class="modal-footer"></div>
	{/if}
</dialog>

<style>
	.modal {
		border: none;
		animation-name: fadeIn;
		animation-duration: 0.2s;
		animation-play-state: initial;
		animation-fill-mode: forwards;
		animation-iteration-count: 1;
		opacity: 0.1;
		padding: 0;

		&:focus {
			outline: none;
		}

		/* For Excel */
		&.open {
			display: grid;
			grid-template-rows: 64px 1fr 64px;
			width: 100vw;
			height: 100vh;
			margin: 0;
			padding: 0;
		}
	}

	.modal:open {
		display: grid;
		grid-template-rows: 64px 1fr 64px;
		width: 100vw;
		height: 100vh;
		margin: 0;
		padding: 0;
	}

	.modal-header {
		display: flex;
		flex-flow: row nowrap;
		position: relative;
		align-items: center;
		font-size: var(--font-large);
		gap: 2px;
		padding: 0 0 0 16px;
		box-sizing: border-box;
		font-weight: bold;

		&.allow-back {
			padding-left: 8px;
		}
	}

	.modal-header-close {
		align-self: center;
	}

	.modal-body {
		display: flex;
		flex-flow: column wrap;
		position: relative;
		overflow-y: auto;
		overflow-x: auto;
		padding: 2em 1em;
	}

	.modal-footer {
		flex-shrink: 0;
		flex-grow: 0;
		display: flex;
		align-items: center;
		align-content: center;
		justify-content: center;
		justify-items: center;
	}

	.modal-footer-content {
		width: var(--content-clamp);
		display: flex;
		gap: 6px;
		padding: 0 2em;
	}
</style>
