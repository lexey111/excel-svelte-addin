<script lang="ts">
	import type { Snippet } from 'svelte';
	// https://ishadeed.com/article/css-relative-colors/

	type Props = {
		children: Snippet;
	};

	let { children }: Props = $props();
</script>

<div class="alert-container">
	<div class="alert-icon">
		<svg
			width="24"
			height="24"
			viewBox="0 0 24 24"
			fill="currentColor"
			xmlns="http://www.w3.org/2000/svg"
		>
			<path
				d="M3.22479 21.5C3.04146 21.5 2.87479 21.4542 2.72479 21.3625C2.57479 21.2708 2.45812 21.15 2.37479 21C2.29146 20.85 2.24562 20.6875 2.23729 20.5125C2.22896 20.3375 2.27479 20.1667 2.37479 20L11.6248 4C11.7248 3.83333 11.854 3.70833 12.0123 3.625C12.1706 3.54167 12.3331 3.5 12.4998 3.5C12.6665 3.5 12.829 3.54167 12.9873 3.625C13.1456 3.70833 13.2748 3.83333 13.3748 4L22.6248 20C22.7248 20.1667 22.7706 20.3375 22.7623 20.5125C22.754 20.6875 22.7081 20.85 22.6248 21C22.5415 21.15 22.4248 21.2708 22.2748 21.3625C22.1248 21.4542 21.9581 21.5 21.7748 21.5H3.22479ZM4.94979 19.5H20.0498L12.4998 6.5L4.94979 19.5ZM12.4998 18.5C12.7831 18.5 13.0206 18.4042 13.2123 18.2125C13.404 18.0208 13.4998 17.7833 13.4998 17.5C13.4998 17.2167 13.404 16.9792 13.2123 16.7875C13.0206 16.5958 12.7831 16.5 12.4998 16.5C12.2165 16.5 11.979 16.5958 11.7873 16.7875C11.5956 16.9792 11.4998 17.2167 11.4998 17.5C11.4998 17.7833 11.5956 18.0208 11.7873 18.2125C11.979 18.4042 12.2165 18.5 12.4998 18.5ZM12.4998 15.5C12.7831 15.5 13.0206 15.4042 13.2123 15.2125C13.404 15.0208 13.4998 14.7833 13.4998 14.5V11.5C13.4998 11.2167 13.404 10.9792 13.2123 10.7875C13.0206 10.5958 12.7831 10.5 12.4998 10.5C12.2165 10.5 11.979 10.5958 11.7873 10.7875C11.5956 10.9792 11.4998 11.2167 11.4998 11.5V14.5C11.4998 14.7833 11.5956 15.0208 11.7873 15.2125C11.979 15.4042 12.2165 15.5 12.4998 15.5Z"
			/>,
		</svg>
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
		background-color: var(--error-color-light);
		padding: 2em;
		border-radius: var(--border-radius);
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
		width: 36px;
		height: 36px;
		display: flex;
		align-items: center;
		align-content: center;
		justify-content: center;
		flex-grow: 0;
		flex-shrink: 0;
		border-radius: 100%;
		background-color: var(--error-color);
		color: var(--error-contrast-color);
		border: 4px solid white;

		animation-name: fadeIn;
		animation-duration: 0.2s;
		animation-delay: 0.1s;
		animation-play-state: initial;
		animation-fill-mode: forwards;
		animation-iteration-count: 1;
		opacity: 0.1;

		svg {
			width: 22px;
			height: 22px;
			transform: translateY(-1px);
			opacity: 0.9;
		}
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
		font-size: 0.9em;
	}
</style>
