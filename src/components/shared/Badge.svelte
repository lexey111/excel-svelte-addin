<script lang="ts">
	import type { Snippet } from 'svelte';

	type Props = {
		children: Snippet;
		variant?:
			| 'primary'
			| 'secondary'
			| 'success'
			| 'danger'
			| 'warning'
			| 'info'
			| 'light'
			| 'dark';
	};

	let { children, variant = 'primary' }: Props = $props();
</script>

<span class={'badge ' + variant}>
	{@render children?.()}
</span>

<style>
	.badge {
		font-size: 0.8em;
		padding: 0.2em 0.8em;
		border-radius: 1em;

		&.primary {
			background-color: var(--primary-color);
			color: var(--primary-contrast-color);
		}

		&.secondary {
			background-color: var(--sub-color);
			color: var(--sub-contrast-color);
		}

		&.success {
			background-color: var(--success-color);
			color: var(--success-contrast-color);
		}

		&.danger {
			background-color: var(--dangerous-color);
			color: var(--dangerous-contrast-color);
		}

		&.warning {
			background-color: var(--warning-color);
			color: var(--warning-contrast-color);
		}

		&.info {
			background-color: var(--info-color);
			color: var(--info-contrast-color);
		}

		&.light {
			background-color: var(--light-color);
			color: var(--light-contrast-color);
		}

		&.dark {
			background-color: var(--dark-color);
			color: var(--dark-contrast-color);
		}
	}
</style>
