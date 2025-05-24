<script lang="ts">
	import type { Snippet } from 'svelte';

	import Spinner from './Spinner.svelte';
	import { AddIcon, CloseIcon, DeleteIcon } from '../icons';

	type Props = {
		children?: Snippet;
		onClick: () => void;
		loading?: boolean;
		disabled?: boolean;
		autofocus?: boolean;
		variant?: 'primary' | 'secondary' | 'dangerous' | 'ghost' | 'white';
		size?: 'small' | 'normal' | 'square24' | 'square36';
		icon?: 'delete' | 'add' | 'close';
	};

	let {
		children,
		onClick,
		loading,
		disabled,
		autofocus,
		variant = 'primary',
		size = 'normal',
		icon
	}: Props = $props();
</script>

<!-- svelte-ignore a11y_autofocus -->
<button
	onclick={onClick}
	{disabled}
	class:loading
	{autofocus}
	class={[variant, size, icon ? 'with-icon' : ''].join(' ')}
>
	<div class="button-content">
		{#if loading}
			<div class="button-spinner">
				<Spinner />
			</div>
		{/if}

		{#if icon === 'delete'}
			<DeleteIcon />
		{/if}

		{#if icon === 'add'}
			<AddIcon />
		{/if}

		{#if icon === 'close'}
			<CloseIcon />
		{/if}

		{#if children}
			<div class="button-text">
				{@render children?.()}
			</div>
		{/if}
	</div>
</button>

<style>
	:global button {
		border-radius: var(--border-radius);
		border: none;
		padding: 0.6em 3em;
		font-size: 1em;
		font-weight: 500;
		font-family: inherit;
		cursor: pointer;

		background: var(--accent-color);
		color: var(--accent-contrast-color);
		transition: var(--default-transition);

		display: flex;
		flex-flow: row wrap;
		align-items: center;
		align-content: center;
		justify-content: center;
		gap: 6px;
		font-size: 0.8em;
		height: 36px;
		width: auto;
		flex-grow: 0;
		flex-shrink: 0;
		font-weight: 600;

		svg {
			opacity: 0.8;
		}

		&:hover {
			filter: brightness(0.9);
			svg {
				opacity: 1;
			}
		}

		&:focus,
		&:focus-visible {
			outline: none;
			box-shadow: var(--border-active-ring);
			background: var(--primary-color);
			color: var(--primary-contrast-color);
			filter: brightness(1.2);
		}

		&:disabled {
			pointer-events: none;
			filter: grayscale(1) brightness(1.2);
			opacity: 0.4;
		}

		&.dangerous {
			background: var(--dangerous-color);
			color: var(--dangerous-contrast-color);
		}
		&.ghost {
			background: transparent;
			color: #222;
			border: 1px solid var(--secondary-color);
		}
		&.white {
			background: #fff;
			color: #222;
			border: none;
		}
		&.secondary {
			background: var(--secondary-color);
			color: var(--secondary-contrast-color);
		}
		&.small {
			padding: 0.6em 1em;
			font-size: 1em;
			font-size: 0.6em;
			height: auto;
			width: auto;

			svg.icon {
				width: 16px;
				height: 16px;
			}
		}
		&.square24 {
			padding: 0 !important;
			height: 24px;
			width: 24px;
			flex-shrink: 0;
			flex-grow: 0;
			min-height: 24px;
			min-width: 24px;
			max-height: 24px;
			max-width: 24px;

			svg.icon {
				width: 14px;
				height: 14px;
			}
		}
		&.square36 {
			padding: 0 !important;
			height: 36px;
			width: 36px;
			flex-shrink: 0;
			flex-grow: 0;
			min-height: 36px;
			min-width: 36px;
			max-height: 36px;
			max-width: 36px;

			svg.icon {
				width: 16px;
				height: 16px;
			}
		}
		&.with-icon {
			padding: 0.6em 1em;
		}
	}

	:global .button-content {
		transition: all 0.2s ease;
		display: flex;
		flex-flow: row nowrap;
		align-items: center;
		gap: 6px;

		svg.icon {
			width: 20px;
			height: 20px;
		}
	}

	.loading {
		padding: 0.6em 2em;
		.button-content {
			position: relative;

			.button-text {
				transform: translateX(0.7em);
			}

			.button-spinner {
				position: absolute;
				left: -0.7em;
				top: 50%;
				transform: translateY(-40%);
			}
		}
	}
	@container (width < 300px) {
		button {
			padding: 0.6em 1em;
		}
	}
</style>
