<script lang="ts">
	import type { Snippet } from 'svelte';

	import Spinner from './Spinner.svelte';
	import type { Icon } from '../../types';
	import { IconSelector } from '../icons';

	export type ButtonSize = 'small' | 'normal' | 'square24' | 'square36' | 'square48';
	export type ButtonVariant = 'primary' | 'secondary' | 'dangerous' | 'ghost' | 'white' | 'text';

	type Props = {
		children?: Snippet;
		onClick: () => void;
		loading?: boolean;
		disabled?: boolean;
		autofocus?: boolean;
		variant?: ButtonVariant;
		size?: ButtonSize;
		icon?: Icon;
		noAutosize?: boolean;
	};

	let {
		children,
		onClick,
		loading,
		disabled,
		autofocus,
		variant = 'primary',
		size = 'normal',
		icon,
		noAutosize = false
	}: Props = $props();
</script>

<!-- svelte-ignore a11y_autofocus -->
<button
	onclick={onClick}
	{disabled}
	class:loading
	{autofocus}
	class={[variant, size, icon ? 'with-icon' : '', noAutosize ? 'no-autosize' : ''].join(' ')}
>
	<div class="button-content">
		{#if loading}
			<div class="button-spinner">
				<Spinner />
			</div>
		{/if}

		<IconSelector {icon} />

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
		font-weight: 500;
		font-family: inherit;
		cursor: pointer;

		background: var(--accent-color);
		color: var(--accent-contrast-color);
		transition: var(--transition-default);

		display: flex;
		flex-flow: row wrap;
		align-items: center;
		align-content: center;
		justify-content: center;
		gap: 6px;
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
			background: var(--accent-color);
			color: var(--accent-contrast-color);
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
			box-shadow: 0 0 0 1px rgba(0, 0, 0, 0.05);

			&:hover {
				background: rgba(0, 0, 0, 0.05);
			}
			&:focus {
				background: rgba(0, 0, 0, 0.05);
				box-shadow: var(--border-active-ring);
			}
		}

		&.text {
			background: transparent;
			color: #222;

			&:hover {
				background: rgba(0, 0, 0, 0.05);
			}

			&:focus {
				background: rgba(0, 0, 0, 0.05);
				box-shadow: var(--border-active-ring);
			}
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
			font-size: var(--font-small);
			height: auto;
			width: auto;

			svg.icon {
				width: 16px;
				height: 16px;
			}
		}
		&.square24,
		&.square36,
		&.square48 {
			padding: 0 !important;
			flex-shrink: 0;
			flex-grow: 0;
		}
		&.square24 {
			height: 24px;
			width: 24px;
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
			height: 36px;
			width: 36px;
			min-height: 36px;
			min-width: 36px;
			max-height: 36px;
			max-width: 36px;

			svg.icon {
				width: 16px;
				height: 16px;
			}
		}
		&.square48 {
			height: 48px;
			width: 48px;
			min-height: 48px;
			min-width: 48px;
			max-height: 48px;
			max-width: 48px;

			svg.icon {
				width: 20px;
				height: 20px;
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
		padding: 0.6em 3em;

		.button-content {
			position: relative;

			.button-text {
				transform: translateX(0.7em);
			}

			.button-spinner {
				position: absolute;
				left: -1em;
				top: 50%;
				transform: translateY(-40%);
			}
		}
	}
	@container (width < 400px) {
		button:not(.no-autosize) {
			padding: 0.6em 1em;

			&.with-icon {
				.button-text {
					display: none;
				}
			}
		}
	}
</style>
