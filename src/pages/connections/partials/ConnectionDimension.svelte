<script lang="ts">
	import { Button } from '../../../components/shared/index';
	import type { DimensionLocator } from '../../../types';

	type Props = {
		sourceId: string;
		onShowRemoveDimensionModal: (sourceId: string, dimensionId: string) => void;
	} & DimensionLocator;

	let {
		sourceId,
		onShowRemoveDimensionModal,
		id,
		name = $bindable(),
		value = $bindable()
	}: Props = $props();
</script>

<div class="dimension">
	<fieldset>
		<label for={'dimensionName' + sourceId + id}>Name</label>
		<input
			type="text"
			id={'dimensionName' + sourceId + id}
			bind:value={name}
			placeholder="Country"
		/>
	</fieldset>

	<fieldset>
		<label for={'dimensionValue' + sourceId + id}>Value</label>
		<input type="text" id={'dimensionValue' + sourceId + id} bind:value placeholder="US" />
	</fieldset>

	<Button
		onClick={() => onShowRemoveDimensionModal(sourceId, id)}
		size="small"
		variant="secondary"
		icon="delete"
	></Button>
</div>
