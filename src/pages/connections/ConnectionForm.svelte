<script lang="ts">
	import { Alert } from '../../components';
	import type { Connection } from '../../types';
	import { ConnectionParams, ConnectionSources } from './partials';

	type Props = {
		connection?: Connection;
	};

	let { connection = $bindable() }: Props = $props();
</script>

<div class="connection-form">
	{#if !connection}
		<div class="full-center">
			<Alert>No connection available. Something went wrong.</Alert>
		</div>
	{:else}
		<ConnectionParams bind:connection />
		<ConnectionSources bind:connection />
	{/if}
</div>

<style>
	:global .connection-form {
		container-type: size;
		margin: 0 auto;
		width: clamp(200px, 100%, 600px);

		.mandatory-sign {
			color: var(--dangerous-color);
			padding: 0 4px;
			display: inline-block;
			transform: translateY(-2px);
		}

		fieldset {
			display: grid;
			grid-template-columns: auto 1fr;
			padding: 0;
			margin-bottom: 1em;

			&:has(.description) {
				grid-template-rows: auto;
			}

			border: none;
			align-items: center;
			column-gap: 12px;

			label {
				font-weight: 500;
				width: 120px;
				font-size: var(--font-small);
				align-self: flex-start;
				margin-top: 0.6em;
				padding-bottom: 0.4em;
			}

			input,
			select {
				max-width: 300px;
				min-width: 120px;
			}

			input[type='number'] {
				max-width: 100px;
			}

			.description {
				grid-row-start: 2;
				grid-column-start: 1;
				grid-column-end: 3;
				max-width: 420px;
				margin: 0.5em 0 0 0;
			}

			.input-container {
				display: flex;
				flex-flow: column wrap;
				gap: 6px;
				width: 100%;

				.input-error {
					font-size: var(--font-small);
					color: var(--error-color);
				}
			}
		}

		.source {
			h4 {
				display: flex;
				flex-flow: row nowrap;
				align-items: center;
				.spacer {
					flex-grow: 2;
				}
				padding: 0;
				margin: 0 0 1em 0;
			}
			background: var(--shade-background);
			padding: 1em;
			margin-bottom: 1em;
			box-shadow: 0 0 0 1px var(--shade-background-darker);
			max-width: 600px;
			min-width: 200px;
		}

		.source-dimensions {
			margin-left: 136px;
		}

		.source-dimensions-actions {
			margin: 1em 0;
		}

		.dimension {
			display: grid;
			grid-template-columns: 2fr 2fr auto;
			gap: 6px;
			margin-bottom: 6px;

			button {
				height: 36px;
				width: 36px;
				align-self: flex-end;
			}

			fieldset {
				display: flex;
				flex-flow: column wrap;
				align-items: flex-start;
				padding: 0;
				margin: 0;
				label {
					width: auto;
					display: none;
				}
				input {
					max-width: 100%;
					min-width: 80px;
				}
			}

			&:first-of-type {
				fieldset {
					label {
						display: flex;
						font-weight: bold;
					}
				}
			}
		}

		@container (width < 600px) {
			.source-dimensions {
				margin-left: 20px;
			}
		}

		@container (width < 450px) {
			fieldset {
				display: flex;
				flex-flow: column wrap;
				align-items: flex-start;
				.description {
					max-width: 310px;
				}
			}

			.source {
				fieldset {
					input,
					select {
						width: 100%;
						max-width: 100%;
					}
				}
			}
		}

		@container (width < 300px) {
			.dimension {
				display: grid;
				grid-template-columns: auto;
				gap: 6px;
			}
		}
	}
</style>
