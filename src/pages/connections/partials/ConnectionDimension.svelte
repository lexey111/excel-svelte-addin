<script lang="ts">
	import { Button, DimensionIcon } from '../../../components';
	import type { DimensionLocator } from '../../../types';

	type Props = {
		isFirst: boolean;
		sourceId: string;
		onShowRemoveDimensionModal: (sourceId: string, dimensionId: string) => void;
	} & DimensionLocator;

	let {
		isFirst,
		sourceId,
		onShowRemoveDimensionModal,
		id,
		name = $bindable(),
		value = $bindable()
	}: Props = $props();
</script>

<div class="dimension" class:first={isFirst}>
	<div class="dimension-icon"><DimensionIcon size={16} /></div>
	<fieldset>
		<label for={'dimensionName' + sourceId + id}>Name</label>
		<input
			type="text"
			id={'dimensionName' + sourceId + id}
			bind:value={name}
			placeholder="Country"
			required
			aria-invalid={!name.trim()}
		/>
	</fieldset>

	<fieldset>
		<label for={'dimensionValue' + sourceId + id}>Value</label>
		<input
			type="text"
			id={'dimensionValue' + sourceId + id}
			bind:value
			placeholder="US"
			required
			aria-invalid={!value.trim()}
		/>
	</fieldset>

	<Button
		onClick={() => onShowRemoveDimensionModal(sourceId, id)}
		size="square36"
		variant="secondary"
		icon="delete"
	></Button>
</div>

<style>
	.dimension {
		display: grid;
		grid-template-columns: 16px 2fr 2fr auto;
		gap: 6px;
		margin-bottom: 6px;
		align-items: flex-end;
		justify-items: flex-end;
		width: var(--content-clamp);

		.dimension-icon {
			display: inline-flex;
			opacity: 0.6;
			align-self: flex-end;

			transform: translateY(-10px);
		}

		fieldset {
			display: flex;
			flex-flow: column wrap;
			align-items: flex-start;
			padding: 0;
			margin: 0;
			width: 100%;
			label {
				width: auto;
				display: none;
			}
			input {
				max-width: 100%;
				min-width: 80px;
			}
		}

		&.first {
			fieldset {
				label {
					display: flex;
				}
			}
		}
	}

	@container (width < 250px) {
		.dimension {
			display: grid;
			grid-template-columns: auto;
			gap: 6px;

			.dimension-icon {
				display: none;
			}

			fieldset {
				width: 100%;
				label {
					display: flex;
				}
			}
		}
	}
</style>
