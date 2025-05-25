<script lang="ts">
	import { Button, LocationIcon } from '../../../components';
	import { isSourceCorrect } from '../../../stores';
	import type { Source } from '../../../types';

	type Props = {
		source: Source;
		onEditSource: (sourceId: string) => void;
	};

	let { source = $bindable(), onEditSource }: Props = $props();

	const sourceCanBeSaved = $derived(() => {
		return isSourceCorrect(source);
	});
</script>

<!-- svelte-ignore a11y_no_static_element_interactions -->
<div
	class="source-item layered-list-item"
	class:error={!sourceCanBeSaved()}
	ondblclick={() => onEditSource(source.id)}
>
	<div class="source-content">
		<div class="source-icon">
			<LocationIcon />
		</div>

		<div class="source-address">
			{source.cellAddress}
			<div class="source-details">
				<span>
					{source.version} | {source.entityType}, {source.entityName}
				</span>
			</div>
		</div>

		<Button onClick={() => onEditSource(source.id)} size="square36" variant="text" icon="right"
		></Button>
	</div>
</div>

<style>
	.source-item {
		.source-content {
			padding: 12px;
			display: grid;
			grid-template-columns: 16px 1fr 36px;
			gap: 6px;
			flex-flow: row nowrap;
			align-items: center;
			width: 100%;
			transition: var(--transition-default);

			.source-icon {
				display: inline-flex;
				align-self: flex-start;
				opacity: 0.6;
			}

			.source-address {
				font-weight: 500;
				display: flex;
				align-self: flex-start;
				flex-flow: column wrap;
				line-height: 1.4em;
			}

			.source-details {
				line-height: 1.2em;
				margin: 0.4em 0 0 0;
				padding: 0;
				font-weight: normal;
				font-size: var(--font-small);
				color: var(--secondary-text-color);
			}
		}

		@container (width < 400px) {
			.source-content {
				grid-template-columns: 14px 1fr 36px;
				padding: 6px;
			}
		}

		@container (width < 300px) {
			.source-content {
				grid-template-columns: 0 1fr 36px;

				.source-icon {
					opacity: 0;
				}
			}
		}

		&.error {
			box-shadow: 0 0 0 1px var(--error-color-border);
			margin-bottom: 2px;
			background: var(--error-color-light);

			.source-icon {
				color: var(--error-color);
			}
		}
	}
</style>
